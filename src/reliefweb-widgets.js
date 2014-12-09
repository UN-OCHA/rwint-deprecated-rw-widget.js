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

  window.ReliefwebWidgets = {
    widget: function(opts) {
      // Widget method should add template, inject css/js.

      d3.text('../templates/heatmap.hbs', function(res) {
        var template = Handlebars.compile(res);
        var markup = template({title: opts.title, items: []});
        d3.select(opts.selector).html(markup);
        rw.post('disasters')
          .limit(0)
          .send({"facets": [{"field": "date", "interval": "month", "sort": "value"}]})
          .end(function(err, res) {
            var data = _.map(res.body.embedded.facets.date.data, function(facet) {
              var theDate = moment(facet.epoch_ms);
              return {
                count: facet.count,
                label: theDate.format('MMMM YYYY'),
                year: theDate.format('YYYY') * 1,
                month: theDate.format('M') * 1
              }
            });

            var nestedData = d3.nest()
              .key(function(d) {return d.year;})
              .key(function(d) {return d.month;})
              .entries(data);

            var markup = template({title: opts.title, items: data});
            d3.select('#widget').html(markup);

            var blockSize = 8,
                blockSpacer = 2,
                extent = [0, d3.max(data, function(d) {return d.count;})],
                colorRange = d3.scale.pow().exponent(0.8).domain(extent).range(['#FFFFFF', '#8749d8']);

            d3.select('#widget').append('script').attr({
              'type': "text/javascript",
              'src': "../src/widget/heatmap.js"
            });

            // heatmap specific
            var container = d3.select('.heatmap').append('svg');

            var yearContainers = container.selectAll('.year')
              .data(nestedData)
              .enter()
              .append('g')
              .attr({
                'class': function(d, i) {return 'year year-' + d.key;},
                'transform': function(d, i) {return "translate(" + i * (blockSize + blockSpacer) + ",0)"}
              });

            var monthContainers = yearContainers.selectAll('.month')
              .data(function(d) {return d.values;})
              .enter()
              .append('rect')
              .attr({
                'fill': function(d) { return colorRange(d.values[0].count);},
                'y': function(d, i) {return d.values[0].month * (blockSize + blockSpacer)},
                'width': blockSize,
                'height': blockSize
              });
          });
      });
    },
    river: function(opts) {
      this.widget(opts);
    },
    heatmap: function(opts) {
      this.widget(opts);
    }
  };
})(window, d3, Handlebars, moment, Reliefweb);
