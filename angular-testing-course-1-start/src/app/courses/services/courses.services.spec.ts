import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { COURSES } from "../../../../server/db-data";
import { CoursesService } from "./courses.service";

describe("CoursesService", () => {
  let coursesService: CoursesService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService, HttpClientTestingModule]
    });
    coursesService = TestBed.get(CoursesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  it("should retrieve all courses", () => {
    coursesService.findAllCourses().subscribe(courses => {
      //  toBeTruthy() --> the Servcie should not return if something e.g. undefined etc.
      expect(courses).toBeTruthy("No courses returned !");
      expect(courses.length).toBe(12, "incorrect number of courses !");
      const course = courses.find(course => course.id == 12);
      expect(course.titles.description).toBe("Angular Testing Course");
    });
    const req = httpTestingController.expectOne("/api/courses");
    expect(req.request.method).toEqual("GET");
    //  flush() nur mit diesem MethodenAufruf wird ein Mock-Http-Request simuliert, welcher einen Response mit den gewünschten testDaten gibt.
    req.flush({ payload: Object.values(COURSES) });
  });
});
