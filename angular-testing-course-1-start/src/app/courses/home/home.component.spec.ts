import { DebugElement } from "@angular/core";
import {
  async,
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs/internal/observable/of";
import { setupCourses } from "../common/setup-test-data";
import { click } from "../common/test-utils";
import { CoursesModule } from "../courses.module";
import { CoursesService } from "../services/courses.service";
import { HomeComponent } from "./home.component";

// this is an example for testing "smart-components/ container-components" [most Observables]
// its a top-level-component (fetch the data for this application to needs from a service )
// testing the conditional logic in the template

describe("Example Test for Container-Components --> Home-Component", () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let testDebugElement: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().filter(
    course => course.category == "BEGINNER"
  );
  const advancedCourses = setupCourses().filter(
    course => course.category == "ADVANCED"
  );

  // async() --> wait for the promise to reslove , before is going on with the test
  beforeEach(async(() => {
    const coursesServiceSpy = jasmine.createSpyObj("CoursesService", [
      "findAllCourses"
    ]);
    TestBed.configureTestingModule({
      imports: [
        // Noop --> No operation means
        CoursesModule,
        NoopAnimationsModule
      ],
      // Dependency Injection
      providers: [{ provide: CoursesService, useValue: coursesServiceSpy }]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        testDebugElement = fixture.debugElement;
        coursesService = TestBed.get(CoursesService);
      });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
  // synchron testing
  it("should display only beginner courses !", () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges();

    const tabs = testDebugElement.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(1, "Unexpected number of tabs found !");
  });

  it("should display only advanced courses !", () => {
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges();
    const tabs = testDebugElement.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(1, "Unexpected number of tabs found !");
  });

  it("should display both tabs ....", () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs = testDebugElement.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(2, "Expected to find 2 tabs ...!");
  });

  // simulated a user tab clicked in  the DOM
  it("should display advanced courses when simulated tab is clicked by the user -fakeAsync() !", fakeAsync(() => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    // detectChanges() --> reflect any  channges in DOM
    fixture.detectChanges();
    const tabs = testDebugElement.queryAll(By.css(".mat-tab-label"));
    click(tabs[1]);
    fixture.detectChanges();
    flush();
    const cardTitles = testDebugElement.queryAll(
      By.css(".mat-tab-body-active")
    );
    expect(cardTitles.length).toBeGreaterThan(
      0,
      "Could not find any card  titles !"
    );
    expect(cardTitles[0].nativeElement.textContent).toContain(
      "Angular Security Course"
    );

    // setTimeout(() => {

    //   // done() --> Jasmine function, that tell jasmie the implaementation is complete
    //   done();
    // }, 500);
  }));
  it("should display advanced courses, simulated tab clicked by the user - async()!", async(() => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    // detectChanges() --> reflect any  channges in DOM
    fixture.detectChanges();
    const tabs = testDebugElement.queryAll(By.css(".mat-tab-label"));
    click(tabs[1]);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      console.log("called whenSable()");
      const cardTitles = testDebugElement.queryAll(
        By.css(".mat-tab-body-active")
      );
      expect(cardTitles.length).toBeGreaterThan(
        0,
        "Could not find any card  titles !"
      );
      expect(cardTitles[0].nativeElement.textContent).toContain(
        "Angular Security Course"
      );
    });

    // setTimeout(() => {

    //   // done() --> Jasmine function, that tell jasmine the implaementation is complete
    //   done();
    // }, 500);
  }));
});
