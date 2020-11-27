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

  public anchor: HTMLElement;

  constructor(public config: Config, public id: string) {
    this.init();

    this.bindEventInput();
    this.bindEvents();
  }

  private init() {
    this.anchor = document.getElementById(this.id);

    const settingTemplate = `
    <div class="setting">
      <h2 class="setting__title">Setting</h2>
      <div class="setting__wrapper">
        <div class="setting__list">
        <input name="vertical" id="vertical" class="setting__checkbox" type="checkbox">
        <label for="vertical" class="setting__label">Vertical</label>
        
        <input name="type" id="type" class="setting__checkbox" type="checkbox">
        <label for="type" class="setting__label">Double handles</label>

        <input name="label" id="label" class="setting__checkbox" type="checkbox">
        <label for="label" class="setting__label">Labels</label>
        </div>

        <div class="setting__wrapper-input">
        <label class="setting__title-input" for="step">Step</label>
          <input id="step" type="text" class="input setting__input">
        </div>
      </div>
    </div>
    `;

    this.anchor.insertAdjacentHTML('afterend', settingTemplate);
  }

  private createPresenter() {
    this.anchor.innerHTML = '';
    return new Presenter(this.model, new View(this.model.getConfig(), this.id));
  }

  public bindEvents(): void {
    const checkbox: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      '.setting__checkbox'
    );

    checkbox.forEach((element: HTMLInputElement) => {
      element.addEventListener('change', this.changePresenter.bind(this));
    });
  }

  public bindEventInput(): void {
    const input: HTMLInputElement = document.querySelector('.setting__input');

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
    const step = parseFloat(element.value);

    this.model.add(step, STEP);

    this.createPresenter();
  }
}

export default Setting;
