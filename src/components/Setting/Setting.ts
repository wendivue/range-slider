import Presenter from '../../ts/Presenter/Presenter';
import Model from '../../ts/Model/Model';
import View from '../../ts/View/View';
import { Config } from '../../ts/helpers/interface';
import {
  SINGLE,
  STEP,
  TYPE,
  VERTICAL,
  DOUBLE,
  LABEL,
} from '../../ts/helpers/constants';

import './Setting.scss';

class Setting {
  private model = new Model(this.config);

  public setting: any;

  constructor(public config: Config, public anchor: HTMLElement) {
    this.init();

    this.bindEventInput();
    this.bindEvents();
  }

  private init() {
    const id = `qawe${this.anchor.id}`;
    const [checkedVertical, checkedDouble, checkedLabel] = this.addChecked();

    const settingTemplate = `
    <div id=${id} class="setting">
      <h2 class="setting__title">Setting</h2>
      <div class="setting__wrapper">
        <div class="setting__list">
        <input name="isVertical" id="vertical" class="setting__checkbox" type="checkbox" ${checkedVertical}>
        <label for="vertical" class="setting__label">Vertical</label>
        
        <input name="type" id="type" class="setting__checkbox" type="checkbox" ${checkedDouble}>
        <label for="type" class="setting__label">Double handles</label>

        <input name="isLabel" id="label" class="setting__checkbox" type="checkbox" ${checkedLabel}>
        <label for="label" class="setting__label">Labels</label>
        </div>

        <div class="setting__wrapper-input">
        <label class="setting__title-input" for="step">Step</label>
          <input id="step" type="text" class="input setting__input" value=${this.config.step}>
        </div>
      </div>
    </div>
    `;

    this.anchor.insertAdjacentHTML('afterend', settingTemplate);
    this.setting = document.getElementById(id);
  }

  private addChecked(): Array<string> {
    const checkedVertical = this.config.isVertical ? 'checked' : '';
    const checkedDouble = this.config.type === DOUBLE ? 'checked' : '';
    const checkedLabel = this.config.isLabel ? 'checked' : '';

    return [checkedVertical, checkedDouble, checkedLabel];
  }

  private createPresenter() {
    this.anchor.innerHTML = '';
    return new Presenter(
      this.model,
      new View(this.model.getConfig(), this.anchor)
    );
  }

  public bindEvents(): void {
    const checkbox: NodeListOf<HTMLInputElement> = this.setting.querySelectorAll(
      '.setting__checkbox'
    );

    checkbox.forEach((element: HTMLInputElement) => {
      element.addEventListener('change', this.changePresenter.bind(this));
    });
  }

  public bindEventInput(): void {
    const input: HTMLInputElement = this.setting.querySelector(
      '.setting__input'
    );

    input.addEventListener('change', this.changeStep.bind(this));
  }

  private changePresenter(event: MouseEvent) {
    const element = event.target as HTMLInputElement;
    const name = element.getAttribute('name');
    const check = element.checked;

    if (name === VERTICAL) {
      this.model.add(check, VERTICAL);
    }

    if (name === LABEL) {
      this.model.add(check, LABEL);
    }

    if (name === TYPE) {
      if (element.checked) {
        this.model.add(DOUBLE, TYPE);
      } else {
        this.model.add(SINGLE, TYPE);
      }
    }

    this.createPresenter();
  }

  private changeStep(event: MouseEvent) {
    const element = event.target as HTMLInputElement;
    let step = parseFloat(element.value);
    const { max } = this.config;
    const halfMax = max / 2;
    if (step > halfMax) step = halfMax;

    step = this.model.validateStep(step);
    this.model.add(step, STEP);

    this.createPresenter();
  }
}

export default Setting;
