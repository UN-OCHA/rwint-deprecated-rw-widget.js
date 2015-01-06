(function(window, d3, Handlebars, moment, _, Reliefweb) {
  var config = {
    'title': "Timeline"
  };

  var HeatmapComponent = function(options) {

    if (options) {
      this.config(options);
    }

  };

  HeatmapComponent.prototype.parameters = function() {
    return [{
      'title': {
        'default': 'Timeline',
        type: 'text'
      }
    }];
  };

  HeatmapComponent.prototype.dependencies = function() {
    return {
      'external': {
        'd3': '~3.3'
      }
    };
  };

  HeatmapComponent.prototype.config = function(newConfig) {
    if (newConfig === undefined) {
      return _.cloneDeep(config);
    }

    config = _.defaults(newConfig, config);

    // chainable
    return this;
  };

  HeatmapComponent.prototype.template = function(callback) {
    d3.text('../src/components/heatmap/heatmap.hbs', function(res) {
      var template = Handlebars.compile(res);
      callback(template(config));
    });
  };

  HeatmapComponent.prototype.render = function(element) {
    this.template(function(content) {
      d3.select(element).html(content);

      var rw = new Reliefweb();

      rw.post('reports')
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

          var blockSize = 8,
            blockSpacer = 2,
            extent = [0, d3.max(data, function(d) {return d.count;})],
            colorRange = d3.scale.linear().domain(extent).range(['#FFFFFF', '#8749d8']);

          // heatmap specific
          var container = d3.select('.heatmap').append('svg').style('width', '100%');

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
              'stroke': '#EEE',
              'y': function(d, i) {return d.values[0].month * (blockSize + blockSpacer)},
              'width': blockSize,
              'height': blockSize
            });
        });
    });


    return this;
  };

  window.HeatmapComponent = HeatmapComponent;
})(window, d3, Handlebars, moment, _, Reliefweb);
