import { boundMethod } from 'autobind-decorator';

import Constants from 'Helpers/enums';
import { IForMouse, IShift, TypeSlider } from 'Helpers/interface';
import { IView } from 'Ts/View/IView';
import { IEventsHandle } from './IEventsHandle';

const { FROM, TO, DOUBLE, SINGLE, ELEMENTTYPE } = Constants;

class EventsHandle implements IEventsHandle {
  constructor(private anchor: HTMLElement, private isVertical: boolean, private view: IView) {
    this.anchor = anchor;
  }

  public init(type: TypeSlider): void {
    if (type === SINGLE) this.addEventHandlers(SINGLE);
    if (type === DOUBLE) {
      this.addEventHandlers(FROM);
      this.addEventHandlers(TO);
    }
  }

  private addEventHandlers(elementType: Constants): void {
    let element;

    if (elementType === SINGLE)
      element = this.anchor.querySelector<HTMLElement>('.slider__handle_single');
    if (elementType === FROM)
      element = this.anchor.querySelector<HTMLElement>('.slider__handle_from');
    if (elementType === TO) element = this.anchor.querySelector<HTMLElement>('.slider__handle_to');

    if (!element) throw new Error('element не передан');

    element.addEventListener('pointerdown', this.handleMouseDown);
  }

  @boundMethod
  private handleMouseDown(event: PointerEvent): void {
    event.preventDefault();
    const element = event.target;
    if (!(element instanceof HTMLElement)) return;
    const shift: IShift = this.view.getShift(event, element);

    const forMouseMove: IForMouse = {
      shift,
      element,
    };

    const handleMouseMove = (eventMove: PointerEvent) =>
      this.handleMouseMove(forMouseMove, eventMove);

    const onMouseUp = () => {
      document.removeEventListener('pointermove', handleMouseMove);
      document.removeEventListener('pointerup', onMouseUp);
    };
    document.addEventListener('pointermove', handleMouseMove);
    document.addEventListener('pointerup', onMouseUp);
  }

  private handleMouseMove(forMouseMove: IForMouse, event: PointerEvent): void {
    let percentage;
    const elementType = this.validateElementType(forMouseMove.element);
    const newShift = this.view.getNewShift(event, forMouseMove.shift);
    const data: { [k: string]: number | Constants } = {};

    if (this.isVertical) {
      percentage = this.view.calcPercentage(newShift.y);
    } else {
      percentage = this.view.calcPercentage(newShift.x);
    }

    data[elementType] = percentage;
    data[ELEMENTTYPE] = elementType;

    this.view.notify(data);
  }

  private validateElementType(element: HTMLElement): Constants {
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
