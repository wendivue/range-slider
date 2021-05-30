import { Config, Coords, Shift, forMouse } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import {
  TypeEventMouse,
  TypeEventMouseHandle,
  TypeEventChange,
  PartialUI,
  IView,
} from './IView';
import SingleFactory from './Factories/SingleFactory';
import IntervalFactory from './Factories/IntervalFactory';

const { SINGLE, FROM, TO, DOUBLE, MIN, MAX } = Constants;

class View implements IView {
  public UI: PartialUI = {};

  private factory?: SingleFactory | IntervalFactory;

  private slider!: HTMLElement;

  private single!: HTMLElement;

  private from!: HTMLElement;

  private to!: HTMLElement;

  private rangeMin!: HTMLInputElement;

  private rangeMax!: HTMLInputElement;

  private inputSingle!: HTMLInputElement;

  private inputFrom!: HTMLInputElement;

  private inputTo!: HTMLInputElement;

  private labelSingle!: HTMLInputElement;

  private labelFrom!: HTMLInputElement;

  private labelTo!: HTMLInputElement;

  private scale!: HTMLElement;

  private scaleDouble!: HTMLElement;

  private scaleSingle!: HTMLElement;

  private sliderSingle!: HTMLElement;

  private sliderDouble!: HTMLElement;

  constructor(public config: Config, private app: HTMLElement) {
    this.init();
  }

  public bindHandleEvents(
    elementType: Constants,
    func: TypeEventMouseHandle
  ): void {
    let element;

    if (elementType === SINGLE) {
      element = this.single;
    } else if (elementType === FROM) {
      element = this.from;
    } else if (elementType === TO) {
      element = this.to;
    }

    if (element === undefined) throw new Error('element не передан');

    element.addEventListener(
      'mousedown',
      this.handleMouseDown.bind(this, func)
    );
  }

  public bindWrapperEvents(elementType: Constants, func: TypeEventMouse): void {
    let element;

    if (elementType === SINGLE) {
      element = this.sliderSingle;
    } else if (elementType === DOUBLE) {
      element = this.sliderDouble;
    }

    if (element === undefined) throw new Error('element не передан');

    element.addEventListener('click', func);
  }

  public bindScaleEvents(func: TypeEventMouse): void {
    const element = this.scale;

    element.addEventListener('click', func);
  }

  public bindInputEvents(elementType: Constants, func: TypeEventChange): void {
    let element;

    if (elementType === SINGLE) {
      element = this.inputSingle;
    } else if (elementType === FROM) {
      element = this.inputFrom;
    } else if (elementType === TO) {
      element = this.inputTo;
    }

    if (element === undefined) throw new Error('element не передан');

    element.addEventListener('change', func);
  }

  public bindRangeEvents(elementType: Constants, func: TypeEventChange): void {
    let element;

    if (elementType === MIN) {
      element = this.rangeMin;
    } else if (elementType === MAX) {
      element = this.rangeMax;
    }

    if (element === undefined) throw new Error('element не передан');

    element.addEventListener('change', func);
  }

  public checkElementType(element: HTMLElement): Constants {
    let elementType: Constants | undefined;
    const conditionFrom =
      element === this.from ||
      element === this.inputFrom ||
      element === this.sliderDouble ||
      element === this.scaleDouble ||
      element === this.labelFrom;
    const conditionTo =
      element === this.to ||
      element === this.inputTo ||
      element === this.labelTo;
    const conditionSingle =
      element === this.single ||
      element === this.inputSingle ||
      element === this.sliderSingle ||
      element === this.scaleSingle ||
      element === this.labelSingle;

    if (conditionFrom) {
      elementType = FROM;
    } else if (conditionTo) {
      elementType = TO;
    } else if (conditionSingle) {
      elementType = SINGLE;
    }

    if (!elementType) throw new Error('elementType - не найдено');

    return elementType;
  }

  public calcPercentage(left: number): number {
    let slider;

    if (this.config.isVertical) {
      slider = this.slider.offsetHeight;
    } else {
      slider = this.slider.offsetWidth - 10;
    }

    return (100 * left) / slider;
  }

  public getShift(event: MouseEvent, element: HTMLElement): Shift {
    const elemCoords = this.getCoords(element);

    return {
      x: event.pageX - elemCoords.left,
      y: event.pageY - elemCoords.top,
    };
  }

  public getNewShift(event: MouseEvent, shift: Shift): Shift {
    const sliderCoords = this.getCoords(this.slider);

    return {
      x: event.pageX - shift.x - sliderCoords.left,
      y: event.pageY - shift.y - sliderCoords.top,
    };
  }

  public getElement(elementType: Constants): HTMLInputElement {
    let element;

    if (elementType === MAX) {
      element = this.rangeMax;
    } else if (elementType === MIN) {
      element = this.rangeMin;
    }

    if (!element) throw new Error('element - не найдено');

    return element;
  }

  private init(): void {
    this.createFactory();
    this.getHtml();
    this.createElement();
  }

  private getCoords(element: HTMLElement): Coords {
    const box = element.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }

  private handleMouseDown(func: TypeEventMouseHandle, event: MouseEvent): void {
    const element = event.target as HTMLElement;
    const shift: Shift = this.getShift(event, element);

    const forMouseMove: forMouse = {
      shift,
      element,
    };

    const handleMouseMove = func.bind(this, forMouseMove);

    const onMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  private createFactory() {
    if (this.config.type === SINGLE) {
      this.factory = new SingleFactory();
    } else {
      this.factory = new IntervalFactory();
    }
  }

  private getHtml(): void {
    if (this.factory === undefined) {
      throw new Error('factory не передан');
    }

    this.factory.createTemplate(
      this.app,
      this.config.isVertical,
      this.config.type
    );

    this.UI.bar = this.factory.createBar(
      this.app,
      this.config.isVertical,
      this.config.type
    );
    this.UI.handle = this.factory.createHandle(
      this.app,
      this.config.isVertical
    );
    this.UI.scale = this.factory.createScale(
      this.app,
      this.config.isVertical,
      this.config.type
    );

    if (this.config.isLabel) {
      this.UI.label = this.factory.createLabel(
        this.app,
        this.config.isVertical
      );
    }

    if (this.config.isRange) {
      this.factory.createRange(this.app, this.config.min, this.config.max);
    }

    if (this.config.isInput) {
      this.UI.input = this.factory.createInput(this.app);
    }
  }

  private createElement(): void {
    const slider = this.app.querySelector(
      '.slider__main-wrapper'
    ) as HTMLElement;

    this.slider = slider;

    if (this.config.type === SINGLE) {
      const single = this.app.querySelector(
        '.slider__handle_single'
      ) as HTMLElement;

      if (this.config.isLabel) {
        const labelSingle = this.app.querySelector(
          '.slider__label-text_single'
        ) as HTMLInputElement;

        this.labelSingle = labelSingle;
      }

      if (this.config.isScale) {
        const scale = this.app.querySelector(
          '.slider__scale'
        ) as HTMLInputElement;
        const scaleSingle = this.app.querySelector(
          '.slider__scale_single'
        ) as HTMLInputElement;

        this.scale = scale;
        this.scaleSingle = scaleSingle;
      }

      const inputSingle = this.app.querySelector(
        '.input__single'
      ) as HTMLInputElement;

      const sliderSingle = this.app.querySelector(
        '.slider__wrapper_single'
      ) as HTMLElement;

      this.inputSingle = inputSingle;
      this.single = single;
      this.sliderSingle = sliderSingle;
    } else if (this.config.type === DOUBLE) {
      const from = this.app.querySelector(
        '.slider__handle_from'
      ) as HTMLElement;
      const to = this.app.querySelector('.slider__handle_to') as HTMLElement;

      const inputFrom = this.app.querySelector(
        '.input__from'
      ) as HTMLInputElement;
      const inputTo = this.app.querySelector('.input__to') as HTMLInputElement;

      if (this.config.isLabel) {
        const labelFrom = this.app.querySelector(
          '.slider__label-text_from'
        ) as HTMLInputElement;
        const labelTo = this.app.querySelector(
          '.slider__label-text_to'
        ) as HTMLInputElement;

        this.labelFrom = labelFrom;
        this.labelTo = labelTo;
      }

      if (this.config.isScale) {
        const scale = this.app.querySelector(
          '.slider__scale'
        ) as HTMLInputElement;
        const scaleDouble = this.app.querySelector(
          '.slider__scale_double'
        ) as HTMLInputElement;

        this.scale = scale;
        this.scaleDouble = scaleDouble;
      }

      const sliderDouble = this.app.querySelector(
        '.slider__wrapper_double'
      ) as HTMLElement;

      this.sliderDouble = sliderDouble;
      this.inputFrom = inputFrom;
      this.inputTo = inputTo;
      this.from = from;
      this.to = to;
    }

    if (this.config.isRange) {
      const rangeMin = this.app.querySelector(
        '.slider__range-min'
      ) as HTMLInputElement;
      const rangeMax = this.app.querySelector(
        '.slider__range-max'
      ) as HTMLInputElement;

      this.rangeMin = rangeMin;
      this.rangeMax = rangeMax;
    }
  }
}

export default View;
