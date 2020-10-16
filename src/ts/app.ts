import Model from './Model/Model';
import View from './View/View';
import Presenters from './Presenters/Presenters';
import { Config } from './helpers/interface';

(function ($: any) {
  $.fn.rangeSlider = function (options: Config, id: string) {
    function app(e: any) {
      new Presenters(new View(options, id), new Model());
    }
    this.each(function () {
      app($(this).append(`<div id="${id}" class="slider"></div>`));
    });
    return this;
  };
})(jQuery);
