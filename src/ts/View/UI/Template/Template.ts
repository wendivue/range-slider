class Template {
  private classWrapperVertical: string;

  constructor(anchor: HTMLElement, vertical: boolean) {
    this.createClass(vertical);
    this.init(anchor);
  }

  private init(anchor: HTMLElement): void {
    const sliderTemplate = `<div class="slider__wrapper ${this.classWrapperVertical}" >`;

    anchor.insertAdjacentHTML('afterbegin', sliderTemplate);
  }

  private createClass(vertical: boolean): void {
    this.classWrapperVertical = vertical ? 'slider__wrapper--vertical' : '';
  }
}

export default Template;
