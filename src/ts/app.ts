import Model from './model';
import View from './view';
import Presenters from './presenters';
import { Config } from './interface';

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
