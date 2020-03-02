import { fakeAsync, flush, flushMicrotasks } from "@angular/core/testing";

// Browser-Runtime --> has 2 different types of Asynchronous operations
//
describe("Async Testing Examples", () => {
  it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log("runnig assertions");
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
      console.log("runnig assertions");
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
  fit("Asynchronouns tes examplwe - plain Promise", fakeAsync(() => {
    // test a complex component that uses internally promises, by Micotasks-Queue and Tasks-Queue!
    // browser is goining to execute any synchronous code here, then is going to empty Micro-Task-Queue !
    let test = false;

    // create a promise
    // add to Task-Queue == Mager-TaskQueue
    console.log("Creating promise !");
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
        console.log("Promise first then() evaluated successfully !");
        // add new promise to Micro-Task-Queue

        return Promise.resolve();
      })
      // second then()-block -->corresponding to second promise
      .then(() => {
        console.log("Promise second then() evaluated successfully !");
        test = true;
      });
    // flushMicrotasks() --> execute all Micro-Task-Queue in correct order first ! --> after then running Mager-TaskQueue !
    flushMicrotasks();
    console.log("Running test assertions");
    expect(test).toBeTruthy();
  }));
});
