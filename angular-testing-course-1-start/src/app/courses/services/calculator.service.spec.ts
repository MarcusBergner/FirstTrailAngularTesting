import { CalculatorService } from "./calculator.service";

// describe() bschreibt die zu testende Klasse oder methode, eindeutig erkennbar beschreiben!
describe("CalculatorService", () => {
  // alle zu verwendenden variablen, müssen wie in Java auch,
  // außerhalb mit "let" inizialisiert werden!
  let calculator: CalculatorService, loggerSpy: any;
  // beforeEach() ist wie in Java @BeforeClass(), um eventuelle Enviroments zu setzen!
  beforeEach(() => {
    console.log("Calling beforeEach()");
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);
    calculator = new CalculatorService(loggerSpy);
  });

  // mit it() wird der Testfall kurz beschrieben, es sollte aussagekräftig ->funktionelle Beschreibung
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
