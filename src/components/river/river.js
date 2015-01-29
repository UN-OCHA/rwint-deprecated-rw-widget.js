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

    widget.getChart();
  });
};

RiverWidget.prototype.link = function(elements, next) {

  var $element = $(elements[0][0]);
  var widget = this;
  function init() {

    $('select', $element).selectric();

    // Open popup.
    $('.widget-river--results--item, .close').click(function(){
      $('.widget-river--filters').toggleClass('open');
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
  }

  function paint(updatedContent) {
    $('li.widget-river--results--item .widget-river--results--number').each(function(index) {
      $(this).html(updatedContent[index].count);
    });

    $('#chart').html("");
    widget.getChart();
  }

  init();
};

RiverWidget.prototype.getChart = function(period) {
  var widget = this;

  function init() {
    var data = prepareData();

    renderChart(data);
  }

  function prepareData() {
    // TODO: Aggregate results per month;
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
        gData.push({date: dates, total: total});
      });

      // If graph data exist for the day insert it, otherwise leave it blank.
      timePeriodDays.forEach(function(day, key){
        var index = _.findIndex(gData, { 'date': day });
        if (index == -1) {
          data[val.type].push({date: day, total: 0});
        } else {
          data[val.type].push(gData[index]);
        }
      });
    });

    data.max = Math.ceil((data.max + 1) / 5) * 5;
    return data;
  }

  function renderChart(data) {
    var timePeriod = widget.config('timePeriod');
    //TODO: Add grid.

    var margin = {top: 40, right: 20, bottom: 40, left:50},
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

    if (timePeriod.duration == "years") {
      ticks = d3.time.months;
      tickformat = d3.time.format('%b');
    }
    else {
      ticks = d3.time.days;
      tickformat = d3.time.format('%d %b');
    }

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .ticks(ticks, 1)
      .tickFormat(tickformat)
      .tickSize(1)
      .tickPadding(8);

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .tickSize(1)
      .tickPadding(8);

    var svg = d3.select('#chart')
      .attr('class', 'chart')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + width + " " + height)
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

    /*var startDate = data.jobs[0].dates;
    var vis = d3.select('#visualisation'),
      width = 1000,
      height = 500,
      margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
      },
      xRange = d3.time.scale()
        .domain([new Date(data.jobs[0].dates), d3.time.day.offset(new Date(data.jobs[data.jobs.length - 1].dates), 1)])
        .rangeRound([margin.left, width - margin.right]),
      yRange = d3.scale.linear()
        .domain([0, 100])
        .range([height - margin.top - margin.bottom, 0]),
      xAxis = d3.svg.axis()
        .scale(xRange)
        .orient('bottom')
        .ticks(d3.time.days, 1)
        .tickFormat(d3.time.format('%a %d'))
        .tickSize(1),
      yAxis = d3.svg.axis()
        .scale(yRange)
        .tickSize(1)
        .orient('left')
        .tickSubdivide(true);

    vis.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (height - margin.bottom - margin.top) + ')')
      .call(xAxis);

    vis.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + (margin.left) + ',0)')
      .call(yAxis);

    var lineFunc = d3.svg.line()
      .x(function(d) {
        return xRange(Date(d.dates));
      })
      .y(function(d) {
        return yRange(d.total);
      })
      .interpolate('linear');

    vis.append('svg:path')
      .attr('d', lineFunc(data.maps))
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('fill', 'none');*/
  }

  init();
};

RiverWidget.prototype.getData = function(period, updatePage) {
  var widget = this;
  var currentDate = moment().utc().format();
  var fromDate = moment().utc().subtract(1, period).format();
  var countries = widget.config('countries');

  widget.config('timePeriod', {
    duration: period,
    startDate: moment(fromDate).utc().format("MM-DD-YYYY"),
    endDate: moment(currentDate).utc().format("MM-DD-YYYY")
  });

  var factets = {
    facets: [
      {
        "field": "date.created",
        "interval": "day"
      }
    ]
  };

  var content = [
    {
      type: "reports",
      title: "REPORTS",
      icon: "un-icon-product_type_report"
    },
    {
      type: "maps",
      title: "MAPS + INFOGRAPHICS",
      icon: "un-icon-activity_deployment"
    },
    {
      type: "jobs",
      title: "JOBS",
      icon: "un-icon-product_type_map"
    }
  ];

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

  function addCommas(intNum) {
    return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
};

module.exports = RiverWidget;
