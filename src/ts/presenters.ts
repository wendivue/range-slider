import { SINGLE, FROM, TO, INPUTSINGLE, INPUTFROM, INPUTTO } from './utils';

class Presenters {
  private view: any;
  private model: any;

  constructor(view: any, model: any) {
    this.view = view;
    this.model = model;

    if (this.view.config.type === SINGLE) {
      this.onMouseDownSingle(this.view.single);
    } else {
      this.onMouseDown(this.view.from);
      this.onMouseDown(this.view.to);
    }

    if (this.view.config.input) {
      if (this.view.config.type === SINGLE) {
        this.onChangeSingle(this.view.inputSingle, this.view.inputSingle);
      } else {
        this.onChange(
          this.view.inputFrom,
          this.view.inputFrom,
          this.view.inputTo
        );
        this.onChange(
          this.view.inputTo,
          this.view.inputFrom,
          this.view.inputTo
        );
      }
    }

    if (this.view.config.range) {
      this.onChangeRange(this.view.rangeMin);
      this.onChangeRange(this.view.rangeMax);
    }
    if (this.view.config.type === SINGLE) {
      this.onDragStart(this.view.single);
    } else {
      this.onDragStart(this.view.from);
      this.onDragStart(this.view.to);
    }
  }

  calcPercentage(left: number): number {
    let slider;
    if (this.view.config.vertical) {
      slider = this.view.slider.offsetHeight;
    } else {
      slider = this.view.slider.offsetWidth;
    }
    return (100 * left) / slider;
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
      let shiftXFrom: number;
      let shiftXTo: number;
      const elementType = this.view.checkElementType(element);
      const [sliderCoords, fromCoords, toCoords] = this.view.setCoords() ?? [];

      if (this.view.config.vertical) {
        shiftXFrom = event.pageY - fromCoords.top;
        shiftXTo = event.pageY - toCoords.top;
      } else {
        shiftXFrom = event.pageX - fromCoords.left;
        shiftXTo = event.pageX - toCoords.left;
      }

      document.onmousemove = (event) => {
        let fromLeft: number;
        let toLeft: number;
        let fromValue: number;
        let toValue: number;

        if (this.view.config.vertical) {
          if (elementType === FROM) {
            shiftXTo = event.pageY - toCoords.top;
          } else if (elementType == TO) {
            shiftXFrom = event.pageY - fromCoords.top;
          }
        } else {
          if (elementType === FROM) {
            shiftXTo = event.pageX - toCoords.left;
          } else if (elementType == TO) {
            shiftXFrom = event.pageX - fromCoords.left;
          }
        }

        if (this.view.config.vertical) {
          fromLeft = event.pageY - shiftXFrom - sliderCoords.top;
          toLeft = event.pageY - shiftXTo - sliderCoords.top;
        } else {
          fromLeft = event.pageX - shiftXFrom - sliderCoords.left;
          toLeft = event.pageX - shiftXTo - sliderCoords.left;
        }

        let fromPercentage = this.calcPercentage(fromLeft);
        let toPercentage = this.calcPercentage(toLeft);
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

  onMouseDownSingle(element: HTMLElement): void {
    element.onmousedown = (event: MouseEvent) => {
      const elementType = this.view.checkElementType(element);
      const [sliderCoords, singleCoords] = this.view.setCoords() ?? [];
      let shiftXSingle: number;
      if (this.view.config.vertical) {
        shiftXSingle = event.pageY - singleCoords.top;
      } else {
        shiftXSingle = event.pageX - singleCoords.left;
      }

      document.onmousemove = (event) => {
        let singleLeft: number;
        let singleValue: number;

        if (this.view.config.vertical) {
          singleLeft = event.pageY - shiftXSingle - sliderCoords.top;
        } else {
          singleLeft = event.pageX - shiftXSingle - sliderCoords.left;
        }

        let singlePercentage = this.calcPercentage(singleLeft);
        singlePercentage = this.validateEdgePercentage(singlePercentage);

        singleValue = this.calcValue(singlePercentage);
        singleValue = this.validateEdgeValue(singleValue);

        this.model.add(singlePercentage, SINGLE);
        this.model.add(singleValue, INPUTSINGLE);

        this.view.changeLabelValue(this.model.get(INPUTSINGLE));
        this.view.moveElement(this.model.get(elementType), elementType);
        this.view.changeBetween(this.model.get(SINGLE));

        if (this.view.config.input) {
          this.view.changeValue(this.model.get(INPUTSINGLE));
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

  onChangeSingle(
    element: HTMLElement,
    inputSingle: Record<string, number>
  ): void {
    element.onchange = () => {
      inputSingle.value = this.validateEdgeValue(inputSingle.value);
      const singlePercentage: number = this.checkInput(inputSingle.value);

      this.model.add(singlePercentage, SINGLE);
      this.model.add(inputSingle, INPUTSINGLE);

      this.view.changeBetween(this.model.get(SINGLE));
      this.view.moveElement(this.model.get(SINGLE), SINGLE);
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
