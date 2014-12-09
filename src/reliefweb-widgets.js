// @TODO: Add lodash to injected
(function(window, d3, Handlebars, moment, Reliefweb) {
  var rw = new Reliefweb();

  //  format an ISO date using Moment.js
  //  http://momentjs.com/
  //  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
  //  usage: {{#dateFormat creation_date format="MMMM YYYY"}}
  Handlebars.registerHelper('dateFormat', function(context, block) {
    if (window.moment) {
      var f = block.hash.format || "MMM Do, YYYY";
      var myDate = new Date(context);
      return moment(myDate).format(f);
    } else {
      return context;   //  moment plugin not available. return data as is.
    }
  });

  var _render = function(selector) {
    var widget = this;

    widget.element = d3.select(selector);

    d3.text(this.opts.templatePath, function(res) {
      var template = Handlebars.compile(res);
      var markup = template({title: widget.opts.title});
      console.log(markup, widget.element);
      widget.element.html(markup);

      d3.select(selector).append('script').attr({
        'type': "text/javascript",
        'src': "../src/widget/heatmap.js"
      });
    });
    console.log(this, selector);

    return widget;
  };

  window.ReliefwebWidgets = {
    widget: function(opts) {
      // Widget method should add template, inject css/js.



      var baseWidget = new this.baseWidget();

      return _.assign(baseWidget, {
        opts: opts,
        render: _render
      });
    },
    river: function(opts) {
      this.widget(opts);
    },
    heatmap: function(opts) {
      opts.templatePath = '../templates/heatmap.hbs';
      return this.widget(opts);
    }
  };
})(window, d3, Handlebars, moment, Reliefweb);
