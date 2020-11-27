import Model from './Model/Model';
import View from './View/View';
import Presenter from './Presenter/Presenter';
import { Config } from './helpers/interface';
import defaultConfig from './Model/defaultConfig';
import Setting from '../components/Setting/Setting';

(($: any) => {
  $.fn.rangeSlider = function (options: Config, id: string) {
    const config = { ...defaultConfig, ...options };

    function app(e: any) {
      const model = new Model(config);
      return (
        new Presenter(model, new View(model.getConfig(), id)) &&
        new Setting(model.getConfig(), id)
      );
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
