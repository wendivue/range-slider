class Template {
  private classWrapperVertical: string;

  constructor(anchor: HTMLElement, isVertical: boolean) {
    this.createClass(isVertical);
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const sliderTemplate = `<div class="slider__wrapper ${this.classWrapperVertical}" >`;

    anchor.insertAdjacentHTML('afterbegin', sliderTemplate);
  }

  private createClass(isVertical: boolean): void {
    this.classWrapperVertical = isVertical ? 'slider__wrapper--vertical' : '';
  }
}

export default Template;
