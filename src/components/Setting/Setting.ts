import { boundMethod } from 'autobind-decorator';

import Constants from 'Helpers/enums';
import { IConfig } from 'Helpers/interface';
import { getUniqueID } from 'Helpers/helpersFunctions';
import Observable from 'Ts/Observable/Observable';

import { ISetting } from './ISetting';
import './Setting.scss';

const { SINGLE, TYPE, VERTICAL, DOUBLE, LABELS, SCALE } = Constants;

class Setting extends Observable implements ISetting {
  private setting!: HTMLElement;

  constructor(private config: IConfig, private anchor: HTMLElement) {
    super();

    this.init();
  }

  public update(config: IConfig): void {
    this.config = config;
  }

  private init(): void {
    this.createHtml();
    this.addEventHandlersInput();
    this.addEventHandlers();
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
            <input name="hasLabels" id="${labelId}" class="setting__checkbox" type="checkbox" ${checkedLabel}>
            <label for="${labelId}" class="setting__label">Labels</label>
          </div>

          <div class="setting__item">
            <input name="hasScale" id="${scaleId}" class="setting__checkbox" type="checkbox" ${checkedScale}>
            <label for="${scaleId}" class="setting__label">Scale</label>
          </div>

        </div>

        <div class="setting__input-wrapper">
        <label class="setting__input-title" for="${stepId}">Step</label>
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
    const { isVertical, hasLabels, hasScale, type } = this.config;
    const checkedVertical = isVertical ? 'checked' : '';
    const checkedDouble = type === DOUBLE ? 'checked' : '';
    const checkedLabel = hasLabels ? 'checked' : '';
    const checkedScale = hasScale ? 'checked' : '';

    return [checkedVertical, checkedDouble, checkedLabel, checkedScale];
  }

  private addEventHandlers(): void {
    const checkbox: NodeListOf<HTMLInputElement> = this.setting.querySelectorAll(
      '.setting__checkbox'
    );

    checkbox.forEach((element) => {
      element.addEventListener('change', this.inputOnChange);
    });
  }

  private addEventHandlersInput(): void {
    const input = this.setting.querySelector<HTMLInputElement>('.setting__input');

    if (!input) throw new Error('input- не найдено');

    input.addEventListener('change', this.changeStep);
  }

  @boundMethod
  private inputOnChange(event: Event) {
    const element = event.target;
    if (!(element instanceof HTMLInputElement)) return;
    const name = element.getAttribute('name');
    const check = element.checked;
    let { isVertical, hasLabels, hasScale, type } = this.config;

    if (name === VERTICAL) isVertical = check;
    if (name === LABELS) hasLabels = check;
    if (name === SCALE) hasScale = check;

    if (name === TYPE) {
      if (element.checked) {
        type = DOUBLE;
      } else {
        type = SINGLE;
      }
    }

    this.config = { ...this.config, isVertical, hasLabels, hasScale, type };
    const config = { ...this.config };

    this.notify(config);
  }

  private validateStep(value: number): number {
    const { max, min } = this.config;
    const halfMax = max / 2;
    const minStep = 0.5;
    let step = value;

    if (step > halfMax) step = halfMax;
    if (step > max - min) step = max - min;
    if (step < minStep) step = minStep;

    return step;
  }

  @boundMethod
  private changeStep(event: Event) {
    const element = event.target;
    if (!(element instanceof HTMLInputElement)) return;
    let step = parseFloat(element.value);
    const minStep = 0.5;

    if (!step) step = minStep;

    step = this.validateStep(step);
    element.value = step.toString();

    const config = { ...this.config, step };

    this.notify(config);
  }
}

export default Setting;
