import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";

// Browser-Runtime --> has 2 different types of Asynchronous operations
//
describe("Asynchronouns Testing-Examples", () => {
  it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log(
        "runnig assertions, from Asynchronous test example with Jasmine done()"
      );
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  // check BrowserSynchrounos Events, to have correct return value in the view,  after event (check zone[Zone.js])
  // zone --> is going to detect all Browser-Sync-Events
  it("Asynchrounous test example - setTimeout()", fakeAsync(() => {
    // Test-Setup
    let test = false;

    setTimeout(() => {});
    setTimeout(() => {
      console.log(
        "runnig assertions, from Asynchrounous test example - setTimeout()"
      );
      test = true;
    }, 1000);
    // Test-Body
    // tick(500);
    // // tick()  steuert die zeitlichen Ablauf innerhalb der fakeAsync()-function
    // tick(499);
    // tick(1);
    flush();
    expect(test).toBeTruthy();
  }));
  it("Asynchronouns test example - plain Promise", fakeAsync(() => {
    // test a complex component that uses internally promises, by Micotasks-Queue and Tasks-Queue!
    // browser is goining to execute any synchronous code here, then is going to empty Micro-Task-Queue !
    let test = false;

    // create a promise
    // add to Task-Queue == Mager-TaskQueue
    console.log(
      "Creating promise, from Asynchronouns test example - plain Promise !"
    );
    // setTimeout(() => {
    //   console.log("setTimeout() first callback triggered.");
    // });
    // console.log("Creating promise !");
    // setTimeout(() => {
    //   console.log("setTimeout() second callback triggered.");
    // });

    // create a promise - chain
    // add to Micro-Task-Queue --> this will execute any micro-queue-tasks(resolve all promises scheduled) before going over to Task-Queue
    Promise.resolve()
      .then(() => {
        console.log(
          "Promise first then() evaluated successfully, from Asynchronouns test example - plain Promise !"
        );
        // add new promise to Micro-Task-Queue

        return Promise.resolve();
      })
      // second then()-block -->corresponding to second promise
      .then(() => {
        console.log(
          "Promise second then() evaluated successfully, from Asynchronouns test example - plain Promise !"
        );
        test = true;
      });
    // flushMicrotasks() --> execute all Micro-Task-Queue in correct order first ! --> after then running Mager-TaskQueue !
    flushMicrotasks();
    console.log(
      "Running test assertions, from Asynchronouns test example - plain Promise"
    );
    expect(test).toBeTruthy();
  }));
  it("Asynchronous 'mixed' test example --> Promise +  setTimeout()", fakeAsync(() => {
    // define testBody
    let counter = 0;
    console.log("Creating promise, from Asynchronous 'mixed' test example!");

    // create a Promise
    Promise.resolve()
      // create immediately resolved promise
      .then(() => {
        console.log(
          "Promise first then() evaluated successfully, from Asynchronous 'mixed' test example !"
        );

        counter += 10;
        setTimeout(() => {
          counter += 1;
        }, 1000);
      });
    expect(counter).toBe(0);
    flushMicrotasks();
    // check this intermediate state, where promise been executed but not yet setTimeout !!
    expect(counter).toBe(10);
    tick(500);
    // trigger code inside setTimeout()
    expect(counter).toBe(10);

    tick(500);
    // check this intermediate state, where promise been executed and after setTimeout() !!

    expect(counter).toBe(11);
  }));
});
