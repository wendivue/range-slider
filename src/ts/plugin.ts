import { Config } from 'Helpers/interface';
import Model from './Model/Model';
import View from './View/View';
import Presenter from './Presenter/Presenter';
import defaultConfig from './Model/defaultConfig';

((jQuery) => {
  const $: any = jQuery;

  $.fn.rangeSlider = function (options: Config, id: string) {
    const config = { ...defaultConfig, ...options };
    const anchor: HTMLElement = document.getElementById(id);

    function app(e: any) {
      const model = new Model(config);

      return new Presenter(model, new View(model.getConfig(), anchor));
    }

    this.each(() => {
      app($(this).append(`<div id="${id}" class="slider"></div>`));
    });
    return this;
  };
})(jQuery);

function importAll(r: any) {
  r.keys().forEach(r);
}

importAll(require.context('../../src', true, /\.(s?css|png|jpe?g|gif|svg)$/i));
