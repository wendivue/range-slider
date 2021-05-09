import { Config } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import getUniqueID from 'Helpers/helpersFunctions';
import Presenter from 'Ts/Presenter/Presenter';
import Model from 'Ts/Model/Model';
import View from 'Ts/View/View';

import './Setting.scss';

const { SINGLE, STEP, TYPE, VERTICAL, DOUBLE, LABEL } = Constants;

class Setting {
  private model = new Model(this.config);

  public setting: HTMLElement;

  constructor(public config: Config, public anchor: HTMLElement) {
    this.init();
  }

  private init(): void {
    this.createHtml();
    this.bindEventInput();
    this.bindEvents();
  }

  private createHtml() {
    const settingId = `setting-${getUniqueID()}`;
    const verticalId = `vertical-${getUniqueID()}`;
    const typeId = `type-${getUniqueID()}`;
    const labelId = `label-${getUniqueID()}`;
    const stepId = `step-${getUniqueID()}`;
    const [checkedVertical, checkedDouble, checkedLabel] = this.addChecked();

    const settingTemplate = `
    <div id=${settingId} class="setting">
      <h2 class="setting__title">Setting</h2>
      <div class="setting__wrapper">
        <div class="setting__list">
        <input name="isVertical" id="${verticalId}" class="setting__checkbox" type="checkbox" ${checkedVertical}>
        <label for="${verticalId}" class="setting__label">Vertical</label>
        
        <input name="type" id="${typeId}" class="setting__checkbox" type="checkbox" ${checkedDouble}>
        <label for="${typeId}" class="setting__label">Double handles</label>

        <input name="isLabel" id="${labelId}" class="setting__checkbox" type="checkbox" ${checkedLabel}>
        <label for="${labelId}" class="setting__label">Labels</label>
        </div>

        <div class="setting__wrapper-input">
        <label class="setting__title-input" for="${stepId}">Step</label>
          <input id="${stepId}" type="text" class="input setting__input" value=${this.config.step}>
        </div>
      </div>
    </div>
    `;

    this.anchor.insertAdjacentHTML('afterend', settingTemplate);
    const setting = document.getElementById(settingId) as HTMLElement;
    this.setting = setting;

    if (!this.setting) throw new Error('setting id - не найдено');
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
    const input = this.setting.querySelector(
      '.setting__input'
    ) as HTMLInputElement;

    input.addEventListener('change', this.changeStep.bind(this));
  }

  private changePresenter(event: Event) {
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

  private changeStep(event: Event) {
    const element = event.target as HTMLInputElement;
    let step = parseFloat(element.value);
    const { max } = this.config;

    if (max === undefined) throw new Error('max не передан');

    const halfMax = max / 2;
    if (step > halfMax) step = halfMax;

    step = this.model.validateStep(step);
    this.model.add(step, STEP);

    this.createPresenter();
  }
}

export default Setting;
