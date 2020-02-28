import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs/internal/observable/of";
import { setupCourses } from "../common/setup-test-data";
import { CoursesModule } from "../courses.module";
import { CoursesService } from "../services/courses.service";
import { HomeComponent } from "./home.component";

// this is an example for testing "smart-components/ container-components" [most Observables]
// its a top-level-component (fetch the data for this application to needs from a service )
// testing the conditional logic in the template

describe("HomeComponent", () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let testDebugElement: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().filter(
    course => course.category == "BEGINNER"
  );

  beforeEach(async(() => {
    const coursesServiceSpy = jasmine.createSpyObj("CoursesService", [
      "findAllCourses"
    ]);
    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        // Noop --> No operation
        NoopAnimationsModule
      ],
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
  it("should display only beginner courses", () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges();
    const tabs = testDebugElement.queryAll(By.css(".mat-tab-label"));
  });

  it("should display only advanced courses", () => {
    pending();
  });

  it("should display both tabs", () => {
    pending();
  });

  it("should display advanced courses when tab clicked", () => {
    pending();
  });
});
