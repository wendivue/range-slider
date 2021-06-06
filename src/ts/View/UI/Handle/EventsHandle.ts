import Constants from 'Helpers/enums';
import { IForMouse, IShift, TypeSlider } from 'Helpers/interface';
import { IView } from 'Ts/View/IView';
import { IEventsHandle } from './IEventsHandle';

const { FROM, TO, DOUBLE, SINGLE, TYPE } = Constants;

class EventsHandle implements IEventsHandle {
  constructor(public anchor: HTMLElement, public isVertical: boolean, public view: IView) {
    this.anchor = anchor;
  }

  public init(type: TypeSlider): void {
    if (type === SINGLE) this.bindHandleEvents(SINGLE);
    if (type === DOUBLE) {
      this.bindHandleEvents(FROM);
      this.bindHandleEvents(TO);
    }
  }

  private bindHandleEvents(elementType: Constants): void {
    let element;

    if (elementType === SINGLE)
      element = this.anchor.querySelector('.slider__handle_single') as HTMLElement;
    if (elementType === FROM)
      element = this.anchor.querySelector('.slider__handle_from') as HTMLElement;
    if (elementType === TO)
      element = this.anchor.querySelector('.slider__handle_to') as HTMLElement;

    if (element === undefined) throw new Error('element не передан');

    element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    element.addEventListener('touchstart', this.handleMouseDown.bind(this), {
      passive: false,
    });
  }

  private handleMouseDown(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    const element = event.target as HTMLElement;
    const shift: IShift = this.view.getShift(event, element);

    const forMouseMove: IForMouse = {
      shift,
      element,
    };

    const handleMouseMove = this.handleMouseMove.bind(this, forMouseMove);

    const onMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onMouseUp);
  }

  private handleMouseMove(forMouseMove: IForMouse, event: MouseEvent | TouchEvent): void {
    let percentage;
    const elementType = this.checkElementType(forMouseMove.element);
    const newShift = this.view.getNewShift(event, forMouseMove.shift);
    const data: { [k: string]: number | Constants } = {};

    if (this.isVertical) {
      percentage = this.view.calcPercentage(newShift.y);
    } else {
      percentage = this.view.calcPercentage(newShift.x);
    }

    data[elementType] = percentage;
    data[TYPE] = elementType;

    this.view.notify(data);
  }

  private checkElementType(element: HTMLElement): Constants {
    const from = this.anchor.querySelector('.slider__handle_from') as HTMLElement;
    const to = this.anchor.querySelector('.slider__handle_to') as HTMLElement;
    const single = this.anchor.querySelector('.slider__handle_single') as HTMLElement;
    const labelFrom = this.anchor.querySelector('.slider__label-text_from') as HTMLInputElement;
    const labelTo = this.anchor.querySelector('.slider__label-text_to') as HTMLInputElement;
    const labelSingle = this.anchor.querySelector('.slider__label-text_single') as HTMLInputElement;
    let elementType;

    if (element === from || element === labelFrom) elementType = FROM;
    if (element === to || element === labelTo) elementType = TO;
    if (element === single || element === labelSingle) elementType = SINGLE;

    if (!elementType) throw new Error('elementType - не найдено');

    return elementType;
  }
}

export default EventsHandle;
