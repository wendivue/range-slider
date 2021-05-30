import { PartialConfig } from 'Helpers/interface';
import Model from './Model/Model';
import View from './View/View';
import Presenter from './Presenter/Presenter';
import defaultConfig from './Model/defaultConfig';

type onGetData = (config: PartialConfig) => VoidFunction;

interface methodsData {
  onGet(this: JQuery, func: onGetData): void;
  reset(): void;
  destroy(): void;
  update(config: PartialConfig): void;
  [key: string]: any;
}

const methods: methodsData = {
  onGet(this: JQuery, func: onGetData) {
    const rangeSlider = $(this).data('rangeSlider');
    const config = rangeSlider.model.getConfig();

    $(this).on('onGet', func(config));
  },
  reset() {
    const rangeSlider = $(this).data('rangeSlider');
    rangeSlider.model.setConfig(defaultConfig);
    rangeSlider.init();
  },
  destroy() {
    $(this)[0].innerHTML = '';

    $(this).off('onGet');
  },
  update(config: PartialConfig = defaultConfig) {
    const rangeSlider = $(this).data('rangeSlider');
    rangeSlider.model.setConfig(config);
    rangeSlider.init();
  },
};

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

  $.fn.rangeSlider = function rangeSlider(
    options: string | PartialConfig,
    data?: onGetData | PartialConfig
  ) {
    let config = { ...defaultConfig };
    const anchor = this[0];

    if (typeof options === 'object') {
      config = { ...defaultConfig, ...options };
    }

    if (!$(this).data('rangeSlider')) {
      if (typeof options === 'object') {
        app.call(this, config, anchor);
      } else {
        app.call(this, defaultConfig, anchor);
      }
    }

    if (typeof options === 'string') {
      if (options === 'onGet' && typeof data === 'function') {
        return methods[options].call(this, data);
      }

      if (options === 'update' && typeof data === 'object') {
        return methods[options].call(this, data);
      }

      if (typeof options === 'string') {
        return methods[options].call(this);
      }
    }

    return this;
  };
})(jQuery);

function importAll(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach(r);
}

importAll(require.context('../../src', true, /\.(s?css|png|jpe?g|gif|svg)$/i));
