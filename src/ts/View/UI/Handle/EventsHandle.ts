import { boundMethod } from 'autobind-decorator';

import Constants from 'Helpers/enums';
import { IForMouse, IShift, TypeSlider } from 'Helpers/interface';
import { IView } from 'Ts/View/IView';
import { IEventsHandle } from './IEventsHandle';

const { FROM, TO, DOUBLE, SINGLE, TYPE } = Constants;

class EventsHandle implements IEventsHandle {
  constructor(private anchor: HTMLElement, private isVertical: boolean, private view: IView) {
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
      element = this.anchor.querySelector<HTMLElement>('.slider__handle_single');
    if (elementType === FROM)
      element = this.anchor.querySelector<HTMLElement>('.slider__handle_from');
    if (elementType === TO) element = this.anchor.querySelector<HTMLElement>('.slider__handle_to');

    if (!element) throw new Error('element не передан');

    element.addEventListener('mousedown', this.handleMouseDown);
    element.addEventListener('touchstart', this.handleMouseDown, {
      passive: false,
    });
  }

  @boundMethod
  private handleMouseDown(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    const element = <HTMLElement>event.target;
    const shift: IShift = this.view.getShift(event, element);

    const forMouseMove: IForMouse = {
      shift,
      element,
    };

    const handleMouseMove = (eventMove: MouseEvent | TouchEvent) =>
      this.handleMouseMove(forMouseMove, eventMove);

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
    const from = this.anchor.querySelector<HTMLElement>('.slider__handle_from');
    const to = this.anchor.querySelector<HTMLElement>('.slider__handle_to');
    const single = this.anchor.querySelector<HTMLElement>('.slider__handle_single');
    const labelFrom = this.anchor.querySelector<HTMLInputElement>('.slider__label-text_from');
    const labelTo = this.anchor.querySelector<HTMLInputElement>('.slider__label-text_to');
    const labelSingle = this.anchor.querySelector<HTMLInputElement>('.slider__label-text_single');
    let elementType;

    if (element === from || element === labelFrom) elementType = FROM;
    if (element === to || element === labelTo) elementType = TO;
    if (element === single || element === labelSingle) elementType = SINGLE;

    if (!elementType) throw new Error('elementType - не найдено');

    return elementType;
  }
}

export default EventsHandle;
