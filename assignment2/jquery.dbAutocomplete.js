//
// 20151023 - Jeroen Wever - jeroenrwever@gmail.com
// jQuery.fn.dbSuggestions
// Font-End Trail Assignment 2 - Deskbookers.com
//

(function($) {
  'use strict';

  var Suggestions = (function() {

    var suggestionTemp = [
      '<div class="suggestions-item">{{full}}</div>'
    ].join('');

    var emptySuggestionsTemp = [
      '<div class="suggestions">',
      '<div class="suggestions-item suggestions-item-empty">No results found.</div>',
      '</div>'
    ].join('');

    var wait = function(func, delay) {
      var to = null;
      return function() {
        to && clearTimeout(to);
        to = setTimeout(func.bind(this), delay, arguments);
      };
    };

    var app = {
      //defaults
      options: {
        url: null,
        delay: 300,
        queryParam: 'q',
        min: 3
      },

      pickValueListner: function() {
        this.scope.parent().on('click', '.suggestions-item', this.pickValue.bind(this));
      },

      suggestionsListner: function() {
        this.scope.keyup(wait(this.suggest.bind(this), this.options.delay));
      },

      bindTemplate: function(item) {
        return suggestionTemp.replace('{{full}}', item.full);
      },

      clearResults: function() {
        $('.suggestions').remove();
      },

      doRequest: function(val) {
        var self = this,
          requestData = {};

        requestData[this.options.queryParam] = val;

        $.get(this.options.url, requestData, function(result) {
          self.showResults(result);
        });
      },

      setScope: function(item) {
        this.scope = $(item);
      },

      pickValue: function(e) {
        this.scope.val($(e.currentTarget).text());
        this.clearResults();
      },

      suggest: function(e) {
        var val = $(e[0].target).val();
        val.length >= this.options.min &&
          this.doRequest(val);
      },

      showResults: function(result) {
        this.clearResults();
        this.scope.after(
          result.length > 0 ?
            ['<div class="suggestions">',
              result.map(this.bindTemplate).join(''),
              '</div>'
            ].join('') :
            emptySuggestionsTemp
        );
      }
    };

    return {
      main: function(item, options) {
        $.extend(app.options, options);
        app.setScope(item);
        app.suggestionsListner();
        app.pickValueListner();
      }
    };
  })();

  $.fn.dbAutocomplete = function() {
    var args = [].slice.call(arguments, 0);

    return this.each(function() {
      Suggestions.main.apply(Suggestions, [this].concat(args));
      return this;
    });
  };

})(jQuery);
