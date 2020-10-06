import { Coords } from './interface';
import { SINGLE, FROM, TO, INPUTSINGLE, INPUTFROM, INPUTTO } from './utils';

class Presenters {
  private view: any;
  private model: any;

  constructor(view: any, model: any) {
    this.view = view;
    this.model = model;

    if (this.view.config.type === SINGLE) {
      this.initConfigValue(this.view.config.single, SINGLE);
      this.onMouseDown(this.view.single);
    } else {
      this.initConfigValue(this.view.config.from, FROM);
      this.initConfigValue(this.view.config.to, TO);
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

  initConfigValue(value: number, elementType: string): void {
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
      let shiftX: number;
      let sliderCoords: Coords;
      let singleCoords: Coords;
      let fromCoords: Coords;
      let toCoords: Coords;
      const elementType = this.view.checkElementType(element);

      if (this.view.config.type === SINGLE) {
        [sliderCoords, singleCoords] = this.view.setCoords() ?? [];
      } else {
        [sliderCoords, fromCoords, toCoords] = this.view.setCoords() ?? [];
      }

      if (elementType === FROM) {
        shiftX = event.pageX - fromCoords.left;
      } else if (elementType === TO) {
        shiftX = event.pageX - toCoords.left;
      } else if (SINGLE) {
        shiftX = event.pageX - singleCoords.left;
      }

      document.onmousemove = (event) => {
        let left: number;

        if (this.view.config.vertical) {
          left = event.pageY - shiftX - sliderCoords.top;
        } else {
          left = event.pageX - shiftX - sliderCoords.left;
        }

        let percentage = this.calcPercentage(left);
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

      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      };
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
      this.view.changeRange(element);
    };
  }

  onDragStart(element: HTMLElement): void {
    element.ondragstart = () => false;
  }
}

export default Presenters;
