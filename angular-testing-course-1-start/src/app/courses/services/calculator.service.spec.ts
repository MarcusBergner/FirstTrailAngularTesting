import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

// describe() bschreibt die zu testende Klasse oder methode, eindeutig erkennbar beschreiben!
//--> mit ein "x" vorangestellt disable-this.Test !
//--> mit ein "f" vorangestellt focused_on these particular Test !
// Es sollten immer nach folgendem Shema definiert sein:
//  1. setup the test --> beforeEach(()=> {});
//  2. perform the operation that want to test --> console.log("add test"); const result = calculator.add(2, 2);
//  3. run series of assertions, that will pass or fail -->  expect(loggerSpy.log).toHaveBeenCalledTimes(1);
describe("CalculatorService", () => {
  // alle zu verwendenden variablen, müssen wie in Java auch,
  // außerhalb mit "let" inizialisiert werden!
  let calculator: CalculatorService, loggerSpy: any;
  // beforeEach() ist wie in Java @BeforeClass(), um eventuelle Enviroments zu setzen!
  beforeEach(() => {
    console.log("Calling beforeEach()");
    // createSpyObj() ==  stellt ein mock-Objekt zur Verfügung
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);

    // TestBed.configureTestingModule({}) --> kreiert ein Testmodule mit möglichen Services-Abhängigkeiten,  (Jasmine-unabhängiges-Object)
    // welches einen Value-Wert zur verfügung stellt, wann/ wo immer die Services in der Anwendung gebraucht werden!

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        // dependencyInjection Key´s müssen den gleiche Name refferenzieren wie die Services-Klasse haben !
        // constucktor-funktionen sind in der javascript-Runtime UNIQE

        // --> somit wird das hier im ersten Übergaben-Argument{provide: ...} auch zu einem uniqe-key,zum identifizieren des zu Injectierendem-Objektes!
        // das zweite Argument nach dem Komma {provide: ...., } --> definiert wie genau injektiert werden soll
        // provide: LoggerService =  ist somit eine reale Instanz des CalculatorService!
        { provide: LoggerService, useValue: loggerSpy }
      ]
    });
    // in Angular 8 wurde es mit TestBed.get() deklariert;
    calculator = TestBed.inject(CalculatorService);
  });

  // mit it() wird ein(Unit) Testfall kurz beschrieben, es sollte aussagekräftig ->funktionelle Beschreibung
  // mit spyOn() -> utilityFunction von Jasmine wird überprüft das der funktionsaufruf nur einmal ausgeführt wird beim Testaufruf
  it("should add two numbers", () => {
    // zuerst wird eine aktuelle Instanz des zu testenendes Objektes deklareiert(FakeObjekt)
    // const logger = new LoggerService();
    // spyOn() - erstes argument ist das zu prüfende objekt,
    // zweites argument ist eine liste an Methoden die geprüft werden sollen.
    // spyOn(logger, "log");
    console.log("add test");
    const result = calculator.add(2, 2);
    // sorgt dafür das der Test fehlschlägt wenn das Errgebnis nicht 4 ist.
    expect(result).toBe(4);
    // toHaveBeenCalledTimes() beschreibt wie oft diese methode/ function ausgeführt werden soll!
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
  it("should subtract two numbers", () => {
    // fail () -> wird in Karma als failure ausgegeben und mit einem "debug" stacktrace ausgegeben, auch wenn alles korrekt ist
    // pending () -> utility-function
    // fail();
    console.log("subtract test");
    const result = calculator.subtract(2, 2);
    expect(result).toBe(0, "unexpected subtrraction result");
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
