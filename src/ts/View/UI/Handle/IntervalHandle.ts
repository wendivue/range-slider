import Constants from 'Helpers/enums';

const { FROM, TO } = Constants;

class IntervalHandle {
  private classHandleVertical?: string;

  private classHandleToVertical?: string;

  constructor(public anchor: HTMLElement, public isVertical: boolean) {
    this.anchor = anchor;
    this.init();
  }

  private init(): void {
    this.createClass(this.isVertical);
    this.createHtml(this.anchor);
  }

  private createHtml(anchor: HTMLElement): void {
    const handleTemplate =
      `<div class="slider__handle ${this.classHandleVertical} slider__handle_from"></div>` +
      `<div class="slider__handle ${this.classHandleVertical} ${this.classHandleToVertical} slider__handle_to"></div>`;
    const slider = anchor.querySelector('.slider__wrapper');

    if (!slider) throw new Error('.slider__wrapper - не найдено');

    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  private createClass(isVertical: boolean): void {
    this.classHandleVertical = isVertical ? 'slider__handle_vertical' : '';
    this.classHandleToVertical = isVertical ? 'slider__handle_to_vertical' : '';
  }

  public moveElement(percentage: number, elementType: string): void {
    const from = this.anchor.querySelector(
      '.slider__handle_from'
    ) as HTMLElement;
    const to = this.anchor.querySelector('.slider__handle_to') as HTMLElement;

    if (!from) throw new Error('.slider__handle_from - не найдено');
    if (!to) throw new Error('.slider__handle_to - не найдено');

    if (this.isVertical) {
      if (elementType === FROM) {
        from.style.top = `${percentage}%`;
      } else if (elementType === TO) {
        to.style.top = `${percentage}%`;
      }
    } else if (elementType === FROM) {
      from.style.left = `${percentage}%`;
    } else if (elementType === TO) {
      to.style.left = `${percentage}%`;
    }
  }
}

export default IntervalHandle;
