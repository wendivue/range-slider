import { FROM, TO, INPUTFROM, INPUTTO } from './utils';

class Presenters {
  private view: any;
  private model: any;

  constructor(view: any, model: any) {
    this.view = view;
    this.model = model;

    this.onMouseDown(this.view.from);
    this.onMouseDown(this.view.to);

    if (this.view.config.input) {
      this.onChange(
        this.view.inputFrom,
        this.view.inputFrom,
        this.view.inputTo
      );
      this.onChange(this.view.inputTo, this.view.inputFrom, this.view.inputTo);
    }

    if (this.view.config.range) {
      this.onChangeRange(this.view.rangeMin);
      this.onChangeRange(this.view.rangeMax);
    }

    this.onDragStart(this.view.from);
    this.onDragStart(this.view.to);
  }

  calcPercentage(left: number): number {
    return (100 * left) / this.view.slider.offsetWidth;
  }

  calcValue(percentage: number): number {
    return Math.round(
      (this.view.config.max / 100) * percentage + this.view.config.min
    );
  }

  validateEdgePercentage(percentage: number): number {
    if (percentage < 0) percentage = 0;
    const rightEdge = 100;
    if (percentage > rightEdge) percentage = rightEdge;
    return percentage;
  }

  validateEdgeValue(value: number): number {
    if (value < this.view.config.min) value = this.view.config.min;
    if (value > this.view.config.max) value = this.view.config.max;
    return value;
  }

  checkInput(value: number): number {
    return (value * 100) / this.view.config.max;
  }

  onMouseDown(element: HTMLElement): void {
    element.onmousedown = (event: MouseEvent) => {
      const [sliderCoords, fromCoords, toCoords] = this.view.setCoords() ?? [];
      let shiftXFrom = event.pageX - fromCoords.left;
      let shiftXTo = event.pageX - toCoords.left;
      const elementType = this.view.checkElementType(element);

      document.onmousemove = (event) => {
        if (elementType === FROM) {
          shiftXTo = event.pageX - toCoords.left;
        } else if (elementType == TO) {
          shiftXFrom = event.pageX - fromCoords.left;
        }

        const fromLeft = event.pageX - shiftXFrom - sliderCoords.left;
        const toLeft = event.pageX - shiftXTo - sliderCoords.left;
        let fromPercentage = this.calcPercentage(fromLeft);
        let toPercentage = this.calcPercentage(toLeft);
        let fromValue: number;
        let toValue: number;
        fromPercentage = this.validateEdgePercentage(fromPercentage);
        toPercentage = this.validateEdgePercentage(toPercentage);

        fromValue = this.calcValue(toPercentage);
        toValue = this.calcValue(fromPercentage);
        fromValue = this.validateEdgeValue(fromValue);
        toValue = this.validateEdgeValue(toValue);

        this.model.add(fromValue, INPUTFROM);
        this.model.add(toValue, INPUTTO);

        this.view.changeLabelValue(
          this.model.get(INPUTFROM),
          this.model.get(INPUTTO)
        );

        if (fromPercentage > toPercentage) {
          fromValue = this.calcValue(toPercentage);
          toValue = this.calcValue(fromPercentage);
        }

        this.model.add(fromPercentage, FROM);
        this.model.add(toPercentage, TO);
        this.model.add(fromValue, INPUTFROM);
        this.model.add(toValue, INPUTTO);

        if (elementType === FROM) {
          this.view.moveElement(this.model.get(elementType), elementType);
        } else if (elementType === TO) {
          this.view.moveElement(this.model.get(elementType), elementType);
        }

        this.view.changeBetween(this.model.get(FROM), this.model.get(TO));

        if (this.view.config.input) {
          this.view.changeValue(
            this.model.get(INPUTFROM),
            this.model.get(INPUTTO)
          );
        }
      };

      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      };
    };
  }

  onChange(
    element: HTMLElement,
    inputFrom: Record<string, number>,
    inputTo: Record<string, number>
  ): void {
    element.onchange = () => {
      inputFrom.value = this.validateEdgeValue(inputFrom.value);
      inputTo.value = this.validateEdgeValue(inputTo.value);
      if (inputFrom.value > inputTo.value) {
        const temp = inputFrom.value;
        inputFrom.value = inputTo.value;
        inputTo.value = temp;
      }
      const fromPercentage: number = this.checkInput(inputFrom.value);
      const toPercentage: number = this.checkInput(inputTo.value);

      this.model.add(fromPercentage, FROM);
      this.model.add(toPercentage, TO);
      this.model.add(inputFrom, INPUTFROM);
      this.model.add(inputTo, INPUTTO);

      this.view.changeBetween(this.model.get(FROM), this.model.get(TO));
      this.view.moveElement(this.model.get(FROM), FROM);
      this.view.moveElement(this.model.get(TO), TO);
    };
  }

  onChangeRange(element: HTMLElement): void {
    element.onchange = () => {
      this.view.changeRange(element);
    };
  }

  onDragStart(element: HTMLElement): void {
    element.ondragstart = () => false;
  }
}

export default Presenters;
