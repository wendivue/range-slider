import {
  SINGLE,
  FROM,
  TO,
  INPUTSINGLE,
  INPUTFROM,
  INPUTTO,
  MIN,
  MAX,
} from './utils';

class Presenters {
  private view: any;
  private model: any;

  constructor(view: any, model: any) {
    this.view = view;
    this.model = model;

    if (this.view.config.type === SINGLE) {
      this.initConfigValue(
        this.view.config.single,
        [this.view.config.min, this.view.config.max],
        SINGLE
      );
      this.onMouseDown(this.view.single);
    } else {
      this.initConfigValue(
        this.view.config.from,
        [this.view.config.min, this.view.config.max],
        FROM
      );
      this.initConfigValue(
        this.view.config.to,
        [this.view.config.min, this.view.config.max],
        TO
      );
      this.onMouseDown(this.view.from);
      this.onMouseDown(this.view.to);
    }

    if (this.view.config.input) {
      if (this.view.config.type === SINGLE) {
        this.onChange(this.view.inputSingle);
      } else {
        this.onChange(this.view.inputFrom);
        this.onChange(this.view.inputTo);
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
      (this.model.get(MAX) / 100) * percentage + this.model.get(MIN)
    );
  }

  calcStep(): Array<number> {
    const step = this.view.config.step;
    const max = this.view.config.max;
    const length = max / step - 1;
    let array: Array<number> = [];
    let nextValue = 0;

    for (let astep = 0; astep < length; astep++) {
      nextValue = nextValue + step;
      array = [...array, ...[nextValue]];
    }

    array = [0, ...array, max];

    array = array.map((item: number) => {
      return (100 * item) / this.model.get(MAX);
    });

    return array;
  }

  calcPercentageFromStep(array: Array<number>, percentage: number): number {
    let newPercentage;

    array.map((item: number) => {
      if (item == 0) {
        newPercentage = item;
      }

      const halfItem = item / 2;
      if (percentage > halfItem && percentage < item) {
        newPercentage = item;
      }
    });
    return newPercentage;
  }

  validateEdgePercentage(percentage: number): number {
    if (percentage < 0) percentage = 0;
    const rightEdge = 100;
    if (percentage > rightEdge) percentage = rightEdge;
    return percentage;
  }

  validateEdgeValue(value: number): number {
    if (value < this.model.get(MIN)) value = this.model.get(MIN);
    if (value > this.model.get(MAX)) value = this.model.get(MAX);
    return value;
  }

  checkInput(value: number): number {
    return (value * 100) / this.model.get(MAX);
  }

  initConfigValue(
    value: number,
    [min, max]: Array<number>,
    elementType: string
  ): void {
    const percentage: number = this.checkInput(value);

    if (elementType === FROM) {
      this.model.add(percentage, FROM);
      this.model.add(value, INPUTFROM);
    } else if (elementType === TO) {
      this.model.add(percentage, TO);
      this.model.add(value, INPUTTO);
    } else if (elementType === SINGLE) {
      this.model.add(percentage, SINGLE);
      this.model.add(value, INPUTSINGLE);
    }

    this.model.add(min, MIN);
    this.model.add(max, MAX);

    this.updateView(elementType, false);
  }

  validateTwotumbr(percentage: number, element: string): number {
    const from: number = this.model.get(FROM);
    const to: number = this.model.get(TO);

    if (element === FROM) {
      if (percentage > to) {
        percentage = to;
      }
    }

    if (element === TO) {
      if (percentage < from) {
        percentage = from;
      }
    }

    return percentage;
  }

  updateView(elementType: string, input: boolean): void {
    if (elementType === FROM) {
      this.view.moveElement(this.model.get(elementType), elementType);
    } else if (elementType === TO) {
      this.view.moveElement(this.model.get(elementType), elementType);
    } else if (elementType === SINGLE) {
      this.view.moveElement(this.model.get(elementType), elementType);
    }

    if (this.view.config.type === SINGLE) {
      this.view.changeBetween(this.model.get(SINGLE));
    } else {
      this.view.changeBetween(this.model.get(FROM), this.model.get(TO));
    }

    if (!input) {
      if (this.view.config.type === SINGLE) {
        this.view.changeLabelValue(this.model.get(INPUTSINGLE));
      } else {
        this.view.changeLabelValue(
          this.model.get(INPUTTO),
          this.model.get(INPUTFROM)
        );
      }

      if (this.view.config.input) {
        if (this.view.config.type === SINGLE) {
          this.view.changeValue(this.model.get(INPUTSINGLE));
        } else {
          this.view.changeValue(
            this.model.get(INPUTFROM),
            this.model.get(INPUTTO)
          );
        }
      }
    }
  }

  onMouseDown(element: HTMLElement): void {
    element.onmousedown = (event: MouseEvent) => {
      event.preventDefault();
      const shift = this.view.getShift(event, element);

      const onMouseMove = (event: MouseEvent) => {
        let percentage: number;
        const elementType = this.view.checkElementType(element);
        const newShift = this.view.getNewShift(event, shift);

        if (this.view.config.vertical) {
          percentage = this.calcPercentage(newShift.y);
        } else {
          percentage = this.calcPercentage(newShift.x);
        }

        percentage = this.calcPercentageFromStep(this.calcStep(), percentage);
        percentage = this.validateEdgePercentage(percentage);
        percentage = this.validateTwotumbr(percentage, elementType);

        let value = this.calcValue(percentage);
        value = this.validateEdgeValue(value);

        if (elementType === FROM) {
          this.model.add(percentage, FROM);
          this.model.add(value, INPUTFROM);
        } else if (elementType === TO) {
          this.model.add(percentage, TO);
          this.model.add(value, INPUTTO);
        } else if (elementType === SINGLE) {
          this.model.add(percentage, SINGLE);
          this.model.add(value, INPUTSINGLE);
        }

        this.updateView(elementType, false);
      };

      const onMouseUp = () => {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
  }

  onChange(element: any): void {
    element.onchange = () => {
      const elementType = this.view.checkElementType(element);

      element.value = this.validateEdgeValue(element.value);

      let percentage: number = this.checkInput(element.value);
      percentage = this.validateTwotumbr(percentage, elementType);

      if (elementType === FROM) {
        this.model.add(percentage, FROM);
      } else if (elementType === TO) {
        this.model.add(percentage, TO);
      } else if (elementType === SINGLE) {
        this.model.add(percentage, SINGLE);
      }

      this.updateView(elementType, true);
    };
  }

  onChangeRange(element: HTMLElement): void {
    element.onchange = () => {
      let min: number;
      let max: number;

      if (element === this.view.rangeMin) {
        min = parseInt(this.view.rangeMin.value);
        this.model.add(min, MIN);
      } else if (element === this.view.rangeMax) {
        max = parseInt(this.view.rangeMax.value);
        this.model.add(max, MAX);
      }
    };
  }

  onDragStart(element: HTMLElement): void {
    element.ondragstart = () => false;
  }
}

export default Presenters;
