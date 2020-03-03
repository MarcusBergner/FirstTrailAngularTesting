import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { setupCourses } from "../common/setup-test-data";
import { CoursesModule } from "../courses.module";
import { CoursesCardListComponent } from "./courses-card-list.component";

// this is a sample for testing Angular-Components
describe("Testing-Example --> For Angular-Components --> Courses-Card-List.Component", () => {
  // define testUtilitys
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let testDebugElement: DebugElement;

  // NOTICE: only safe way to execute code after compilation finished, and wait for promise to resolve --> .then(() =>).

  // async() --> wait for any asynchconous operations, that we triggered by the code passed with to complete in this Test-Block (default timeout 5 sek), after that beforeEach() runs !
  // here is the case: detect that the promise was lunched here and wait for the promise to complete
  beforeEach(async(() => {
    // setup testing module
    TestBed.configureTestingModule({
      imports: [CoursesModule]
    })
      .compileComponents()
      .then(() => {
        // initialize test variables
        fixture = TestBed.createComponent(CoursesCardListComponent);
        // grab an instance of the component itself
        component = fixture.componentInstance;
        testDebugElement = fixture.debugElement;
      });
  }));
  it("should create the component", () => {
    expect(component).toBeTruthy();
    console.log(component);
  });

  // example for a purely synchronous test!
  it("should display the course list", () => {
    // initialize courses member-variable of our components
    component.courses = setupCourses();
    // need to notify the component, after assinging data to it for trigger change detection!
    fixture.detectChanges();
    // nativeElement --> return the corresponds native DOM element!
    console.log(testDebugElement.nativeElement.outerHTML);
    const cards = testDebugElement.queryAll(By.css(".course-card"));
    expect(cards).toBeTruthy("Could not find cards !");
    expect(cards.length).toBe(12, "Unexpected number of courses !");
  });
  it("should display the first course", () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    // start by grabbing first course on list
    const course = component.courses[0];
    const card = testDebugElement.query(By.css(".course-card:first-child")),
      titel = card.query(By.css("mat-card-title")),
      image = card.query(By.css("img"));
    expect(card).toBeTruthy("Could not find course card");
    expect(titel.nativeElement.textContent).toBe(course.titles.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);
  });
});
