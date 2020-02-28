import { HttpErrorResponse } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { COURSES } from "../../../../server/db-data";
import { Course } from "../model/course";
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
    //  flush() nur mit diesem MethodenAufruf wird ein Mock-Http-Request simuliert,
    //   welcher einen Response mit den gewünschten testDaten gibt!
    req.flush({ payload: Object.values(COURSES) });
  });
  it("should find a course by id", () => {
    coursesService.findCourseById(12).subscribe(courses => {
      expect(courses).toBeTruthy();
      expect(courses.id).toBe(12);
    });
    const req = httpTestingController.expectOne("/api/courses/12");
    expect(req.request.method).toEqual("GET");

    req.flush(COURSES[12]);
  });
  it("should save the course data", () => {
    const changes: Partial<Course> = {
      titles: { description: "Testing Course" }
    };
    coursesService.saveCourse(12, changes).subscribe(course => {
      expect(course.id).toBe(12);
    });
    const req = httpTestingController.expectOne("/api/courses/12");
    expect(req.request.method).toEqual("PUT");
    expect(req.request.body.titles.description).toEqual(
      changes.titles.description
    );
    req.flush({
      ...COURSES[12],
      ...changes
    });
  });
  it("should give an error if save course fails", () => {
    const changes: Partial<Course> = {
      titles: { description: "Testing Course" }
    };

    coursesService.saveCourse(12, changes).subscribe(
      () => fail("the save course operation should have failed"),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      }
    );
    const req = httpTestingController.expectOne("/api/courses/12");
    expect(req.request.method).toEqual("PUT");
    req.flush("Save course failed !", {
      status: 500,
      statusText: "Internal Server Error !"
    });
  });

  //  Test-Methode to test a get request with multiple query parameters
  it("should find the lessons", () => {});
  afterEach(() => {
    //  httpTestingController.verify() stellt sicher,
    // dass nur die hier definierte HttpRequest im  httpTestingController genutz werden, um die dort definierten  API-Url's zu  übberprüfen!
    httpTestingController.verify();
  });
});
