import { PartialConfig, OnGetData } from 'Helpers/interface';
import Model from './Model/Model';
import View from './View/View';
import Presenter from './Presenter/Presenter';
import defaultConfig from './Model/defaultConfig';

function app(this: JQuery, config = defaultConfig, anchor: HTMLElement) {
  const model = new Model(config);

  return this.each(function initApp(this: HTMLElement) {
    $(this).data('rangeSlider');
    $(this).data().rangeSlider = new Presenter(
      model,
      new View(model.getConfig(), anchor)
    );
  });
}

((jQuery) => {
  const $: JQueryStatic = jQuery;

  $.fn.rangeSlider = function rangeSlider(options: PartialConfig) {
    const config = { ...defaultConfig, ...options };
    const anchor = this[0];

    if (!$(this).data('rangeSlider')) {
      app.call(this, config, anchor);
    }

    this.onGet = (func: OnGetData) => {
      const slider = $(this).data('rangeSlider');
      const data = slider.getConfig();

      $(this).on('onGet', func(data));
    };

    this.reset = () => {
      $(this)[0].innerHTML = '';
      const model = new Model(defaultConfig);
      new Presenter(model, new View(defaultConfig, this[0]));
    };

    this.destroy = () => {
      $(this)[0].innerHTML = '';

      $(this).off('onGet');
    };

    this.update = (data: PartialConfig = defaultConfig) => {
      $(this)[0].innerHTML = '';
      const slider = $(this).data('rangeSlider');

      const newConfig = { ...slider.getConfig(), ...data };
      const model = new Model(newConfig);
      new Presenter(model, new View(model.getConfig(), this[0]));
    };

    return this;
  };
})(jQuery);

function importAll(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach(r);
}

importAll(require.context('../../src', true, /\.(s?css|png|jpe?g|gif|svg)$/i));
