interface IScale {
  changeScale(
    ArrayPercentage: Array<number>,
    min: number,
    max: number,
    step: number
  ): void;
}

export { IScale };
