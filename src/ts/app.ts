import Model from './Model/Model';
import View from './View/View';
import Presenters from './Presenters/Presenters';
import { Config } from './helpers/interface';
import defaultConfig from './Model/defaultConfig';

(($: any) => {
  $.fn.rangeSlider = function (options: Config, id: string) {
    const config = { ...defaultConfig, ...options };

    function app(e: any) {
      return new Presenters(new View(config, id), new Model(config));
    }
    this.each(() => {
      app($(this).append(`<div id="${id}" class="slider"></div>`));
    });
    return this;
  };
})(jQuery);
