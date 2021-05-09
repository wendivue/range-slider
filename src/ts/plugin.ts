import { Config } from 'Helpers/interface';
import Model from './Model/Model';
import View from './View/View';
import Presenter from './Presenter/Presenter';
import defaultConfig from './Model/defaultConfig';

((jQuery) => {
  const $: JQueryStatic = jQuery;

  $.fn.rangeSlider = function rangeSlider(options: Config, id: string) {
    const config = { ...defaultConfig, ...options };
    const anchor = document.getElementById(id) as HTMLElement;

    if (!anchor) throw new Error('anchorId - не передан');

    function app() {
      const model = new Model(config);

      return new Presenter(model, new View(model.getConfig(), anchor));
    }

    app();

    return this;
  };
})(jQuery);

function importAll(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach(r);
}

importAll(require.context('../../src', true, /\.(s?css|png|jpe?g|gif|svg)$/i));
