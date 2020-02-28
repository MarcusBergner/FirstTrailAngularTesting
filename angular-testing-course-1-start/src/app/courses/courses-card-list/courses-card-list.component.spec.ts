import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CoursesModule } from "../courses.module";
import { CoursesCardListComponent } from "./courses-card-list.component";

describe("CoursesCardListComponent", () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;

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
      });
  }));
  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display the course list", () => {
    pending();
  });

  it("should display the first course", () => {
    pending();
  });
});
