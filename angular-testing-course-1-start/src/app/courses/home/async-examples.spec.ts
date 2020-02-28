import { fakeAsync, flush } from "@angular/core/testing";

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
    let test = false;
    //
    setTimeout(() => {});
    setTimeout(() => {
      console.log("runnig assertions");
      test = true;
    }, 1000);
    // tick(500);
    // // tick()  steuert die zeitlichen Ablauf innerhalb der fakeAsync()-function
    // tick(499);
    // tick(1);
    flush();
    expect(test).toBeTruthy();
  }));
});
