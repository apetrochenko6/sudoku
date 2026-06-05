export class Cell {
  private value: number;
  private isInitial: boolean;
  private isError: boolean;

  constructor(value: number = 0, isInitial: boolean = false) {
    this.value = value;
    this.isInitial = isInitial;
    this.isError = false;
  }

  public getValue(): number {
    return this.value;
  }

  public setValue(value: number): void {
    if (!this.isInitial) {
      this.value = value;
    }
  }

  public getIsInitial(): boolean {
    return this.isInitial;
  }

  public getIsError(): boolean {
    return this.isError;
  }

  public setError(error: boolean): void {
    this.isError = error;
  }
}