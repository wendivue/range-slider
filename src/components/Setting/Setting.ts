import { boundMethod } from 'autobind-decorator';

import { IConfig } from 'Helpers/interface';
import Constants from 'Helpers/enums';
import { getUniqueID } from 'Helpers/helpersFunctions';
import Presenter from 'Ts/Presenter/Presenter';
import Model from 'Ts/Model/Model';
import View from 'Ts/View/View';

import './Setting.scss';

const { SINGLE, STEP, TYPE, VERTICAL, DOUBLE, LABEL, SCALE } = Constants;

class Setting {
  private model = new Model(this.config);

  private setting!: HTMLElement;

  constructor(private config: IConfig, private anchor: HTMLElement) {
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
    const scaleId = `scale-${getUniqueID()}`;
    const [checkedVertical, checkedDouble, checkedLabel, checkedScale] = this.addChecked();

    const settingTemplate = `
    <div id=${settingId} class="setting">
      <h2 class="setting__title">Setting</h2>
      <div class="setting__wrapper">
        <div class="setting__list">
        
          <div class="setting__item">
            <input name="isVertical" id="${verticalId}" class="setting__checkbox" type="checkbox" ${checkedVertical}>
            <label for="${verticalId}" class="setting__label">Vertical</label>
          </div>

          <div class="setting__item">
            <input name="type" id="${typeId}" class="setting__checkbox" type="checkbox" ${checkedDouble}>
            <label for="${typeId}" class="setting__label">Double handles</label>
          </div>

          <div class="setting__item">
            <input name="isLabel" id="${labelId}" class="setting__checkbox" type="checkbox" ${checkedLabel}>
            <label for="${labelId}" class="setting__label">Labels</label>
          </div>

          <div class="setting__item">
            <input name="isScale" id="${scaleId}" class="setting__checkbox" type="checkbox" ${checkedScale}>
            <label for="${scaleId}" class="setting__label">Scale</label>
          </div>

        </div>

        <div class="setting__wrapper-input">
        <label class="setting__title-input" for="${stepId}">Step</label>
          <input id="${stepId}" type="number" class="input setting__input" value=${this.config.step}>
        </div>
      </div>
    </div>
    `;

    this.anchor.insertAdjacentHTML('afterend', settingTemplate);
    const setting = document.getElementById(settingId);

    if (!setting) throw new Error('setting - не найдено');

    this.setting = setting;
  }

  private addChecked(): Array<string> {
    const checkedVertical = this.config.isVertical ? 'checked' : '';
    const checkedDouble = this.config.type === DOUBLE ? 'checked' : '';
    const checkedLabel = this.config.isLabel ? 'checked' : '';
    const checkedScale = this.config.isScale ? 'checked' : '';

    return [checkedVertical, checkedDouble, checkedLabel, checkedScale];
  }

  private createPresenter() {
    this.anchor.innerHTML = '';
    const newConfig = { ...this.model.getConfig() };
    const model = new Model(newConfig);
    return new Presenter(model, new View(model.getConfig(), this.anchor));
  }

  private bindEvents(): void {
    const checkbox: NodeListOf<HTMLInputElement> = this.setting.querySelectorAll(
      '.setting__checkbox'
    );

    checkbox.forEach((element) => {
      element.addEventListener('change', this.changePresenter);
    });
  }

  private bindEventInput(): void {
    const input = this.setting.querySelector<HTMLInputElement>('.setting__input');

    if (!input) throw new Error('input- не найдено');

    input.addEventListener('change', this.changeStep);
  }

  @boundMethod
  private changePresenter(event: Event) {
    const element = event.target;
    if (!(element instanceof HTMLInputElement)) return;
    const name = element.getAttribute('name');
    const check = element.checked;

    if (name === VERTICAL) this.model.add(check, VERTICAL);
    if (name === LABEL) this.model.add(check, LABEL);
    if (name === SCALE) this.model.add(check, SCALE);

    if (name === TYPE) {
      if (element.checked) {
        this.model.add(DOUBLE, TYPE);
      } else {
        this.model.add(SINGLE, TYPE);
      }
    }

    this.createPresenter();
  }

  @boundMethod
  private changeStep(event: Event) {
    const element = event.target;
    if (!(element instanceof HTMLInputElement)) return;
    let step = parseFloat(element.value);
    const minStep = 0.5;

    if (!step) step = minStep;

    step = this.model.validateStep(step);
    element.value = step.toString();
    this.model.add(step, STEP);

    this.createPresenter();
  }
}

export default Setting;
