export class Cell {
  constructor(value: number = 0, isInitial: boolean = false) {
  }

  public getValue(): number {
    return -1;
  }

  public setValue(value: number): void {
  }

  public getIsInitial(): boolean {
    return true;
  }

  public getIsError(): boolean {
    return false;
  }

  public setError(error: boolean): void {
  }
}