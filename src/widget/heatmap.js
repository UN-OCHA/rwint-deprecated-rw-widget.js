var rw = new Reliefweb();

rw.post('disasters')
  .limit(0)
  .send({"facets": [{"field": "date", "interval": "month", "sort": "value"}]})
  .end(function(err, res) {
    console.log(res);
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

    //var template = Handlebars.compile('../template/heatmap.hbs');
    //var markup = template({title: 'Disaster', items: data});
    //d3.select('#widget').html(markup);
    console.log("HI");

    var blockSize = 8,
      blockSpacer = 2,
      extent = [0, d3.max(data, function(d) {return d.count;})],
      colorRange = d3.scale.pow().exponent(0.8).domain(extent).range(['#FFFFFF', '#8749d8']);

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