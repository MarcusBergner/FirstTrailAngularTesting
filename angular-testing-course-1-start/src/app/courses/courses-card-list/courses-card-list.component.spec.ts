import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { setupCourses } from "../common/setup-test-data";
import { CoursesModule } from "../courses.module";
import { CoursesCardListComponent } from "./courses-card-list.component";

describe("CoursesCardListComponent", () => {
  // define testUtilitys
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;

  let testDebugElement: DebugElement;

  // async() --> wait for any asynchconous operations,
  // that we triggered by the code passed with to complete in this Test-Block (default timeout 5 sek) !
  // after that, beforeEach() runs
  // here is the case: detect that the promise was lunched here and wait for the promise to complete
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule]
      // only safe way to execute code after compilation finished,
      // and wait for promise to resolve --> .then(() =>)
    })
      .compileComponents()
      .then(() => {
        // setup our test
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        testDebugElement = fixture.debugElement;
      });
  }));
  it("should create the component", () => {});

  it("should display the course list", () => {});

  it("should display the first course", () => {
    component.courses = setupCourses();
    const cards = testDebugElement.queryAll(By.css(".course-card"));
    expect(cards).toBeTruthy("Could not find cards !");
    expect(cards.length).toBe(12, "Unexpected number of courses !");
  });
});
