import Model from './Model/Model';
import View from './View/View';
import Presenters from './Presenters/Presenters';
import { Config } from './helpers/interface';
import { defaultConfig } from './Model/defaultConfig';

(function ($: any) {
  $.fn.rangeSlider = function (options: Config, id: string) {
    const config = { ...defaultConfig, ...options };

    function app(e: any) {
      new Presenters(new View(config, id), new Model(config));
    }
    this.each(function () {
      app($(this).append(`<div id="${id}" class="slider"></div>`));
    });
    return this;
  };
})(jQuery);
