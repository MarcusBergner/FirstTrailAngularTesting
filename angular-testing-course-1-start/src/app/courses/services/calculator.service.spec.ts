import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  // mit it() wird der Testfall kurz beschrieben, es sollte aussagekräftig ->funktionelle Beschreibung
  // mit spy() wird überprüft das der funktionsaufruf nur einmal ausgeführt wird beim Testaufruf
  it("should add two numbers", () => {
    // pending();
    const logger = new LoggerService();
    const calculator = new CalculatorService(logger);
    const result = calculator.add(2, 2);
    // sorgt dafür das der Test fehlschlägt wenn das Errgebnis nicht 4 ist.
    expect(result).toBe(4);
  });
  it("should subtract two numbers", () => {
    // fail () -> wird in Karma als failure ausgegeben und mit einem "debug" stacktrace ausgegeben
    // pending () -> utility-function
    // pending();
    // fail();
    const calculator = new CalculatorService(new LoggerService());
    const result = calculator.subtract(2, 2);
    expect(result).toBe(0, "unexpected subtrraction result");
  });
});
