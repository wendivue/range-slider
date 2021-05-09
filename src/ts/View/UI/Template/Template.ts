class Template {
  private classWrapperVertical?: string;

  constructor(public anchor: HTMLElement, public isVertical: boolean) {
    this.init();
  }

  private init() {
    this.createClass(this.isVertical);
    this.createHtml(this.anchor);
  }

  private createHtml(anchor: HTMLElement): void {
    const sliderTemplate = `<div class="slider__wrapper ${this.classWrapperVertical}" >`;

    anchor.insertAdjacentHTML('afterbegin', sliderTemplate);
  }

  private createClass(isVertical: boolean): void {
    this.classWrapperVertical = isVertical ? 'slider__wrapper_vertical' : '';
  }
}

export default Template;
