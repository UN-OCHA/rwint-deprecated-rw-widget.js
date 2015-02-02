"use strict";

var _ = require('lodash');
var WidgetBase = require('../../widget-base');
var $ = require('jquery');
var moment = require('moment');
var reliefweb = require('reliefweb');
var d3 = require('d3');

var RiverWidget = function(opts) {
  var config = {
    title: "River Widget",
    template: "river.hbs"
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

RiverWidget.prototype = new WidgetBase();

RiverWidget.prototype.compile = function(elements, next) {
  var widget = this;

  widget.getData("weeks", function(updatedContent){
    widget.config('content', updatedContent);
    widget.template(function(content) {
      elements
        .classed('rw-widget', true)
        .html(content);

      next();
    });

    var timePeriod = widget.config('timePeriod');
    var range = moment(timePeriod.startDate).utc().format("Do MMMM YYYY") + " - " + moment(timePeriod.endDate).utc().format("Do MMMM YYYY");
    $('.widget-river--results--graph .graph--heading').html(range);
    widget.getChart();
  });
};

RiverWidget.prototype.link = function(elements, next) {

  var $element = $(elements[0][0]);
  var widget = this;
  var content = widget.config('content');

  function init() {

    $('select', $element).selectric();

    // Open popup.
    $('.widget-river--results--item').click(function(){
      var icon = $(this).find('.widget-river--results--type span').attr('class');
      rebuildFilters(icon);

      $('.widget-river--filters').addClass('open');
    });

    // Close popup.
    $('.close').click(function(){
      $('.widget-river--filters').removeClass('open');
    });

    $('.widget-river--header select', $element).on('selectric-change', function(element) {
      var period = $(this).val();
      widget.getData(period, function(updatedContent){
        widget.config('content', updatedContent);
        paint(updatedContent);
      });
    });

    // Set initial value for filters
    rebuildFilters(content[0].icon);
  }

  function rebuildFilters(icon) {
    var index = _.findIndex(content, {'icon': icon});
    var currentTab = content[index];
    var links = "";

    currentTab.filters.forEach(function(filter){
      links += '<li><a href="' + filter.location + '" target="_blank">'+ filter.linkTitle + '</a></li>';
    });

    $('.widget-river--filters ul').html(links);
    $('.widget-river--filters').removeClass("results--item--reports results--item--maps results--item--jobs");
    $('.widget-river--filters').addClass("results--item--" + currentTab.type);
    $('.widget-river--filters--title .tab').html(currentTab.title);

  }

  function paint(updatedContent) {
    $('li.widget-river--results--item .widget-river--results--number').each(function(index) {
      $(this).html(addCommas(updatedContent[index].count));
    });

    var timePeriod = widget.config('timePeriod');

    var range = "";
    if (timePeriod.duration == "years") {
      range = moment(timePeriod.startDate).utc().format("MMMM YYYY") + " - " + moment(timePeriod.endDate).utc().format("MMMM YYYY");
    } else {
      range = moment(timePeriod.startDate).utc().format("Do MMMM YYYY") + " - " + moment(timePeriod.endDate).utc().format("Do MMMM YYYY");
    }
    $('.widget-river--results--graph .graph--heading').html(range);

    $('#chart').html("");
    widget.getChart();
  }

  function addCommas(intNum) {
    return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }

  init();
};

RiverWidget.prototype.getChart = function(period) {
  var widget = this;
  var data;

  function init() {
    data = prepareData();
    renderChart(data);
  }

  // TODO: Rebuild the chart with new x-axis.
  /*
  $(window).resize(function() {
    $('#chart').html("");
    renderChart(data);
  });
  */

  function prepareData() {
    var content = widget.config('content');
    var timePeriod = widget.config('timePeriod');
    var now = new Date(timePeriod.endDate);
    var from = new Date(timePeriod.startDate);

    // Get each day in given time period.
    var timePeriodDays = [];
    for (var d = from; d <= now; d.setDate(d.getDate() + 1)) {
      timePeriodDays.push(moment(d).utc().format("MM-DD-YYYY"));
    }

    var data = [];
    data.max = 0;

    content.forEach(function(val, key){
      data[val.type] = [];

      var gData = [];
      val.graphData.forEach(function(rawData){
        var dates = moment(rawData.value).utc().format("MM-DD-YYYY");
        var total = rawData.count / val.count * 100;
        if (total > data.max) {
          data.max = total;
        }
        if (timePeriod.duration != "years") {
          gData.push({date: dates, total: total});
        } else {
          data[val.type].push({date: dates, total: total});
        }
      });

      if (timePeriod.duration != "years") {
        // If graph data exist for the day insert it, otherwise leave it blank.
        timePeriodDays.forEach(function (day, key) {
          var index = _.findIndex(gData, {'date': day});
          if (index == -1) {
            data[val.type].push({date: day, total: 0});
          } else {
            data[val.type].push(gData[index]);
          }
        });
      }
    });

    data.max = Math.ceil((data.max + 1) / 5) * 5;
    return data;
  }

  function renderChart(data) {
    var timePeriod = widget.config('timePeriod');
    var margin = {top: 40, right: 30, bottom: 40, left:50},
      width = $('#chart').parent().width(),
      height = 500;

    var x = d3.time.scale()
      .domain([new Date(timePeriod.startDate), new Date(timePeriod.endDate)])
      .rangeRound([0, width - margin.left - margin.right]);

    var y = d3.scale.linear()
      .domain([0, data.max])
      .range([height - margin.top - margin.bottom, 0]);

    var ticks;
    var tickformat;


    switch (timePeriod.duration) {
      case "weeks":
        ticks = d3.time.days;
        tickformat = d3.time.format('%d %b');
        break;

      case "months":
        ticks = d3.time.weeks;
        tickformat = d3.time.format('%d %b');
        break;

      case "years":
        ticks = d3.time.months;
        tickformat = d3.time.format('%b %Y');
        break;
    }

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .ticks(ticks, 1)
      .tickFormat(tickformat)
      .tickSize(-height + margin.top + margin.bottom, 0, 0)
      .tickPadding(8);

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .tickFormat(function(n){
        if (n === 0) {
          return "";
        }
        return n + "%";
      })
      .tickSize(-width + margin.left + margin.right, 0, 0)
      .tickPadding(8);

    var svg = d3.select('#chart')
      .attr('class', 'chart')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + width + " " + height)
      //.attr("width", width)
      //.attr("height", height)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    var valueline = d3.svg.line()
      .x(function(d) { return x(new Date(d.date)); })
      .y(function(d) { return y(d.total); });

    svg.append("path")
      .attr("class", "graph-jobs")
      .attr("d", valueline(data.jobs))
      .attr('stroke-width', 7)
      .attr('fill', 'none');

    svg.append("path")
      .attr("class", "graph-maps")
      .attr("d", valueline(data.maps))
      .attr('stroke-width', 7)
      .attr('fill', 'none');

    svg.append("path")
      .attr("class", "graph-reports")
      .attr("d", valueline(data.reports))
      .attr('stroke-width', 7)
      .attr('fill', 'none');
  }

  init();
};

RiverWidget.prototype.getData = function(period, updatePage) {
  var widget = this;
  var currentDate = moment().utc().format();
  var fromDate = moment().utc().subtract(1, period).format();
  var countries = widget.config('countries');
  var content = widget.config('content');

  var interval = "day";
  if (period == "years") {
    interval = "month";
  }

  widget.config('timePeriod', {
    duration: period,
    startDate: moment(fromDate).utc().format("MM-DD-YYYY"),
    endDate: moment(currentDate).utc().format("MM-DD-YYYY")
  });

  var factets = {
    facets: [
      {
        "field": "date.created",
        "interval": interval
      }
    ]
  };

  var count = 0;
  var rw = reliefweb.client();
  content.forEach(function(val, key) {

    var type;
    var filters = {
      filter: {
        'operator': 'AND',
        'conditions': [
          {
            "field": "date.created",
            "value": {
              "from": fromDate,
              "to": currentDate
            }
          }
        ]
      }
    };

    if (Array.isArray(countries) && countries.length) {
      filters.filter.conditions.push({
        'field': 'country.name',
        'value': countries,
        'operator': 'OR'
      });
    }

    if (val.type == "maps") {
      type = "reports";
      filters.filter.conditions.push({
        "field": "format.name",
        "value": ["Map", "Infographic"],
        "operator": "OR"
      });
    }
    else {
      type = val.type;
    }

    rw.post(type)
      .send({preset: "analysis", limit: 0})
      .send(factets)
      .send(filters)
      .sort('date.created', 'asc')
      .end(function(err, res) {
        if (!err) {
          count++;
          // TODO: Check to make sure values exists before setting.
          content[key].count = res.body.totalCount;
          content[key].graphData = res.body.embedded.facets["date.created"].data;
          if (count == content.length) {
            updatePage(content);
          }
        }
      });
  });
};

module.exports = RiverWidget;
