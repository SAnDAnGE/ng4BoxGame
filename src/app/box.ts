export class Box {
  _color: string | undefined = 'white';
  letter: string | undefined;

  public reset(): void {
    this.color = 'white';
    this.letter = undefined;
  }

  get selected():boolean {
    return this.color !== 'white';
  }

  get color(): string | undefined {
    return this._color;
  }
  set color(c) {
    this._color = c || 'white';
  }
}
