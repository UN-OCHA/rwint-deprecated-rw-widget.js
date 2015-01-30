!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ReliefwebWidgets=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);
var WidgetBase = require('../../widget-base');

var CrisisOverviewWidget = function(opts) {
  var config = {
    title: "Crisis Overview",
    template: "crisis-overview.hbs",
    map: {
      src: "",
      alt: ""
    }
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

CrisisOverviewWidget.prototype = new WidgetBase();

CrisisOverviewWidget.prototype.compile = function(elements, next) {
  var config = this.config();
  this.config('adjustedTitle', titleAdjust(config.title));

  this.template(function(content) {
    elements
      .classed('rw-widget', true)
      .classed('rw-widget-image', true)
      .html(content);

    next();
  });
};

function titleAdjust(title) {
  var snippet = '<span class="word[[counter]]">[[word]]</span>';
  var words = title.split(' ');
  var adjustedTitle = '';
  for (var i = 0; i < words.length; i++) {
    adjustedTitle += snippet.replace('[[counter]]', i + 1).replace('[[word]]', words[i]);
  }
  return adjustedTitle;
}

module.exports = CrisisOverviewWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../widget-base":10}],2:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var WidgetBase = require('../../widget-base');
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null);

var FinancialWidget = function(opts) {
  var config = {
    title: "Financial",
    template: "financial.hbs"
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

FinancialWidget.prototype = new WidgetBase();

FinancialWidget.prototype.compile = function(elements, next) {
  var widget = this;
  var calculatedDataSources = {};

  var dataSources = widget.config('dataSources');

  dataSources.forEach(function(val, key, items) {
    var currentRequirementTotal, pledgesTotal, fundingTotal;
    currentRequirementTotal = pledgesTotal = fundingTotal = 0;

    // Get totals.
    $.each(val.finData, function() {
      currentRequirementTotal += this.current_requirement;
      pledgesTotal += this.pledges;
      fundingTotal += this.funding;
    });

    // Format percentage raised.
    var percentageRaised = (fundingTotal / currentRequirementTotal) * 100;
    percentageRaised = percentageRaised.toFixed(2);

    // Format totals.
    currentRequirementTotal = formatMillionsBillions(currentRequirementTotal);
    pledgesTotal = formatMillionsBillions(pledgesTotal);
    fundingTotal = formatMillionsBillions(fundingTotal);

    calculatedDataSources[val.dataItemTitle] = {
      "currentRequirementTotal": currentRequirementTotal,
      "pledgesTotal": pledgesTotal,
      "fundingTotal": fundingTotal,
      "percentageRaised": percentageRaised
    };
  });

  function formatMillionsBillions(value) {
    var formattedValue = value / 1000000000;
    if ((formattedValue) > 1) {
      formattedValue = formattedValue.toFixed(2) + ' B';
    }
    else {
      formattedValue = value / 1000000;
      formattedValue = formattedValue.toFixed(2) + ' M';
    }
    return formattedValue;
  }

  this.config('calculatedDataSources', calculatedDataSources);

  widget.template(function(content) {
    elements
      .classed('rw-widget', true)
      .html(content);

    next();
  });
};

FinancialWidget.prototype.link = function(elements) {
  var widget = this;
  var calculatedDataSources = widget.config('calculatedDataSources');

  function init() {
    populateYearSelector();

    // Set first item active and populate the bar.
    $('.financial-widget--data-source-chooser :first-child').toggleClass('active');
    populateBar();

    $('.financial-widget--data-source').click(function(e){
      var selected = this.text;

      // Set the title.
      setTitle(selected);

      // Set data for selected source.
      setBar(selected);

      // Toggle active class.
      $('.financial-widget--data-source').removeClass('active');
      $(this).toggleClass('active');

      e.preventDefault();
    });
  }

  function populateYearSelector() {
    var $yearSelector = $('select[name="time-chooser"]');
    var currentYear = moment().format('YYYY');
    var selected = '';
    for (var i = 0; i < 5; i++) {
      selected = (currentYear == 2015) ? 'selected' : '';
      $yearSelector.append('<option value="' + currentYear + '"' + selected + '>' + currentYear + '</option>');
      currentYear--;
    }
  }

  function populateBar() {
    var first = Object.keys(calculatedDataSources)[0];
    setBar(first);
  }

  function setTitle(value) {
    $('.financial-widget--time h1').text(value);
  }

  function setCovered(funded, percentage) {
    var value = '$' + funded + ' Funded <span class="percent">' + percentage + '% <span>covered</span></span>';

    // Not sure why it adds 20 when using .width().
    // Because of this, I'm manually subtracting 20 from the value.
    $('.financial-widget--percent-funded .covered').width(percentage-20 + '%').html(value);
  }

  function setRequested(value) {
    $('.financial-widget--percent-funded .requested').html('$' + value + ' Requested');
  }

  function setBar(value) {
    var selectedSource = calculatedDataSources[value];
    setCovered(selectedSource.fundingTotal, selectedSource.percentageRaised);
    setRequested(selectedSource.currentRequirementTotal);
  }

  init();
};

module.exports = FinancialWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../widget-base":10}],3:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var WidgetBase = require('../../widget-base');

var ImageWidget = function(opts) {
  var config = {
    title: "Image Widget",
    template: "image.hbs",
    src: "https://placekitten.com/g/350/150",
    alt: "Cat",
    credit: ""
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

ImageWidget.prototype = new WidgetBase();

module.exports = ImageWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../widget-base":10}],4:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var WidgetBase = require('../../widget-base');
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null);
var reliefweb = (typeof window !== "undefined" ? window.reliefweb : typeof global !== "undefined" ? global.reliefweb : null);
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);

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
      links += '<li><a href="' + filter.location + '">'+ filter.linkTitle + '</a></li>';
    });

    $('.widget-river--filters ul').html(links);
    $('.widget-river--filters--title .tab').html(currentTab.title);

  }

  function paint(updatedContent) {
    $('li.widget-river--results--item .widget-river--results--number').each(function(index) {
      $(this).html(addCommas(updatedContent[index].count));
    });

    var timePeriod = widget.config('timePeriod');
    var range = moment(timePeriod.startDate).utc().format("Do MMMM YYYY") + " - " + moment(timePeriod.endDate).utc().format("Do MMMM YYYY");
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
      } else {
        // If using years and there are more than 12 months remove the first.
        if (data[val.type].length > 12) {
          data[val.type].shift();
        }
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../widget-base":10}],5:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);
var WidgetBase = require('../../widget-base');
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null);
var reliefweb = (typeof window !== "undefined" ? window.reliefweb : typeof global !== "undefined" ? global.reliefweb : null);
var Handlebars = (typeof window !== "undefined" ? window.Handlebars : typeof global !== "undefined" ? global.Handlebars : null);

var TimelineWidget = function(opts) {
  var config = {
    title: "Timeline",
    template: "timeline.hbs",
    countries: []
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

TimelineWidget.prototype = new WidgetBase();

TimelineWidget.prototype.compile = function(elements, next) {
  var widget = this;

  widget.getData(0, function(timelineItems) {
    widget.config('timeline-items', timelineItems);

    widget.template(function(content) {
      elements
        .classed('rw-widget', true)
        .html(content);

      next();
    });
  });


  //var timelineItems = this.config('timeline-items');
  //
  //timelineItems.forEach(function(val, key, items) {
  //  var prevMonth = (key !== 0) ? moment(items[key - 1]['date-full'], 'DD MMM YYYY').month() : -1;
  //  var myDate = moment(val['date-full'], 'DD MMM YYYY');
  //  items[key]['date-month'] = myDate.format('MMMM');
  //  items[key]['date-day'] = myDate.format('DD');
  //  items[key]['date-year'] = myDate.format('YYYY');
  //  items[key]['new-month'] = prevMonth !== myDate.month();
  //});
  //
  //this.config('timeline-items', timelineItems);
};

TimelineWidget.prototype.getData = function(offset, updatePage) {
  var widget = this;
  var filters = {
    filter: {
      'operator': 'AND',
      'conditions': [
        {
          'field': 'headline.featured'
        }
      ]
    }
  };

  var countries = widget.config('countries');

  if (Array.isArray(countries) && countries.length) {
    filters.filter.conditions.push({
      'field': 'country',
      'value': countries,
      'operator': 'OR'
    });
  }

  var rw = reliefweb.client();
  rw.post('reports')
    .fields(['date', 'headline', 'primary_country', 'url'], [])
    .sort('date.original', 'desc')
    .send(filters)
    .send({offset: offset})
    .end(function(err, res) {
      if (!err) {
        var count = 0;
        var timelineItems = [];
        res.body.data.forEach(function(val, key) {
          var prevMonth = (key !== 0) ? moment(timelineItems[key - 1]['date-full'], 'DD MMM YYYY').month() : -1;
          var item = {
            title: val.fields.headline.title,
            country: val.fields.primary_country.name,
            "long-desc": val.fields.headline.summary,
            "short-desc": val.fields.headline.title,
            "url": val.fields.url
          };

          if (val.fields.headline.image) {
            item["img-src"] = val.fields.headline.image.url;
          } else {
            // @TODO: Default image
          }

          var time = moment(val.fields.date.original,  moment.ISO_8601);
          item['date-full'] = time.format('DD MMM YYYY');
          item['date-month'] = time.format('MMMM');
          item['date-day'] = time.format('DD');
          item['date-year'] = time.format('YYYY');
          item['new-month'] = prevMonth !== time.month();

          timelineItems.push(item);

          count++;
          if (count == res.body.data.length) {
            updatePage(timelineItems);
          }
        });
      }
    });
};

TimelineWidget.prototype.link = function(elements, next) {
  var widget = this;
  var timelineState = {};
  var timelineContent = this.config('timeline-items');

  var $element = $(elements[0][0]); // @TODO, grab any potential element selected.
  var $frame,
      $item,
      margin;

  var $sly,
      $slyPager,
      $slyDropdown;

  function findClosestTimelineContent() {
    var now = moment().unix();
    var closestIndex = 0;
    var closestIndexDistance;

    timelineContent.forEach(function(val, key) {
      var itemTime = moment(val['date-full'], 'DD MMM YYYY').unix();
      if (closestIndexDistance === undefined || Math.abs(now - itemTime) < closestIndexDistance) {
        closestIndexDistance = Math.abs(now - itemTime);
        closestIndex = key;
      }
    });

    return closestIndex;
  }

  function init() {
    timelineState.currentIndex = findClosestTimelineContent();
    var now = moment(timelineContent[timelineState.currentIndex]['date-full'], 'DD MMM YYYY');
    timelineState.currentYear = now.format('YYYY');
    timelineState.currentMonth = now.format('M');
    timelineState.currentFormatted = now.format('YYYY MMMM');

    populateOverlaySelectors();

    $('select', $element).selectric();
    // Initialize Sly Sliders.
    $frame = $('.timeline-widget-frames', $element);
    $item = $('.timeline-widget-item', $element);
    margin = '40px';

    // Set initial widths.
    adjustTimelineWidth($frame.width());
    $item.css({ marginRight : margin});

    // Control resizing.
    $(window).resize(function(e) {
      adjustTimelineWidth($frame.width());
    });

    // Main slider.
    $sly = new Sly($frame, {
      horizontal: 1,
      itemNav: 'forceCentered',
      smart: 1,
      activateMiddle: 1,
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: timelineState.currentIndex,
      scrollBy: 1,
      speed: 200,
      elasticBounds: 1,
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,

      // Buttons
      prev: $('.prev'),
      next: $('.next')
    }).init();

    // Pager.
    $slyPager = new Sly($('.timeline-widget-pager', $element), {
      horizontal: 1,
      itemNav: 'forceCentered',
      smart: 1,
      activateMiddle: 1,
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: timelineState.currentIndex,
      scrollBy: 1,
      speed: 200,
      elasticBounds: 1,
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1
    }).init();

    // Dropdowns.
    $slyDropdown = new Sly($('.timeline-widget--dropdown--container', $element), {
      itemNav: 'basic',
      smart: 1,
      activateOn: 'click',
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: timelineState.currentIndex,
      scrollBy: 1,
      activatePageOn: 'click',
      speed: 300,
      elasticBounds: 1,
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1
    }).init();

    paint();
  }

  function populateOverlaySelectors() {
    var months = moment.months();
    var monthsShort = moment.monthsShort('-MMM-');
    var $monthSelector = $('select[name="month"]', $element);

    months.forEach(function(val, key) {
      $monthSelector.append('<option value="' + monthsShort[key] + '">' + val + '</option>');
    });

    var $yearSelector = $('select[name="year"]', $element);
    var year = timelineState.currentYear;
    for (var i = 0; i < 5; i++) {
      $yearSelector.append('<option value="' + year + '">' + year + '</option>');
      year--;
    }
  }

  function paint() {
    slideTo(timelineState.currentIndex);

    var now = moment(timelineContent[timelineState.currentIndex]['date-full'], 'DD MMM YYYY');
    timelineState.currentYear = now.format('YYYY');
    timelineState.currentMonth = now.format('M');
    timelineState.currentFormatted = now.format('YYYY MMMM');

    $('select[name="month"]', $element).val(now.format('MMM')).selectric('refresh');
    $('select[name="year"]', $element).val(now.format('YYYY')).selectric('refresh');

    $element.find('.timeline-widget-pager--current').text(timelineState.currentFormatted);
  }

  function slideTo(index) {
    var $sliderPos = $sly.getPos(index);
    $sly.slideTo($sliderPos.center);

    var $pagerPos = $slyPager.getPos(index);
    $slyPager.slideTo($pagerPos.center);

    var $dropDownPos = $slyDropdown.getPos(index);
    $slyDropdown.slideTo($dropDownPos.start);
  }

  function adjustTimelineWidth(width) {
    $item.width(width);
    $('.timeline-widget-pager li', $element).width(Math.floor(width/3));

    if ($sly && $slyPager) {
      $sly.reload();
      $slyPager.reload();
    }
  }

  init();

  $('.timeline-widget-pager--item, .timeline-widget-dropdown--list-item', $element).click(function(){
    timelineState.currentIndex = $(this).attr('data-slide');
    paint();
  });

  // Open popup.
  $('.timeline-widget--dropdown-heading, .close', $element).click(function(){
    $('.timeline-widget--dropdown--wrapper').toggleClass('open');
    $slyDropdown.reload();
  });

  // Close popup.
  $('.timeline-widget-dropdown--item', $element).click(function(){
    $('.timeline-widget--dropdown--wrapper').removeClass('open');
  });

  $('.timeline-widget--dropdown-controls select', $element).on('selectric-change', function(element) {
    var currentString = $('select[name="month"]', $element).val() + ' ' + $('select[name="year"]', $element).val();
    var current = moment(currentString, 'MMM YYYY').unix();
    var itemTime;
    var val;


    for (var i = 0; i < timelineContent.length; i++) {
      val = timelineContent[i];
      itemTime = moment(val['date-full'], 'DD MMM YYYY').unix();

      if (current < itemTime) {
        timelineState.currentIndex = i;
        paint();
        break;
      }
    }
  });

  // Update other sliders based on main.
  $sly.on('moveStart', function(){
    timelineState.currentIndex = $sly.rel.activeItem;
    lazyLoad();
    paint();
  });

  function lazyLoad() {
    if (timelineState.currentIndex == ($sly.items.length - 1)) {
      widget.getData($sly.items.length, function(timelineItems) {
        widget.config('timeline-items', timelineItems);

        timelineItems.forEach(function(item){
          var frameTemplate = Handlebars.compile($("#timeline-item-partial").html());
          $sly.add(frameTemplate(item));

          var pagerTemplate = Handlebars.compile($("#timeline-pager-item-partial").html());
          $slyPager.add(pagerTemplate(item));

          var dropdownTemplate = Handlebars.compile($("#timeline-dropdown-item-partial").html());
          $slyDropdown.add(dropdownTemplate(item));
        });

        $frame = $('.timeline-widget-frames');
        var $newItems = $('.timeline-widget-item');

        // Set initial widths.
        $newItems.width($frame.width());
        $newItems.css({ marginRight : margin});

        $sly.reload();
      });
    }
  }
};

module.exports = TimelineWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../widget-base":10}],6:[function(require,module,exports){
"use strict";

/**
 * @file: Exposes various widgets and utilities to the global
 * context, mostly useful in a browser setting.
 */

// Utilities
require('./util/handlebar-extensions');

// Widgets
var widgetBase = require('./widget-base');
var ImageWidget = require('./components/image/image');
var CrisisOverviewWidget = require('./components/crisis-overview/crisis-overview');
var RiverWidget = require('./components/river/river');
var TimelineWidget = require('./components/timeline/timeline');
var FinancialWidget = require('./components/financial/financial');

var widgetRegistry = require('./util/config-manager')();

widgetRegistry.config('image', ImageWidget);
widgetRegistry.config('crisis-overview', CrisisOverviewWidget);
widgetRegistry.config('river', RiverWidget);
widgetRegistry.config('timeline', TimelineWidget);
widgetRegistry.config('financial', FinancialWidget);

module.exports = {
  widget: function(name, opts) {
    var Widget = widgetRegistry.config(name);
    if (Widget) {
      return new Widget(opts);
    }
    throw new Error("Can't find '" + name + "' widget.");
  },
  addWidgetToRegistry: function(name, widget) {
    widgetRegistry.config(name, widget);
  },
  listWidgets: function() {
    return widgetRegistry.list();
  },
  helpers: {
    widgetBase: widgetBase
  }
};

},{"./components/crisis-overview/crisis-overview":1,"./components/financial/financial":2,"./components/image/image":3,"./components/river/river":4,"./components/timeline/timeline":5,"./util/config-manager":7,"./util/handlebar-extensions":8,"./widget-base":10}],7:[function(require,module,exports){
(function (global){
"use strict";

/**
 * @file: Configuration object. Allows for getting and setting of various properties.
 */

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

var config = function() {
  var _config = {};

  /**
   * Shortcut method for .config().
   * @see .config();
   */
  var myConfig = function() {
    return configMethod.apply(this, arguments);
  };

  /**
   * Config get/setter
   * @param - Accepts 0, 1 or 2 parameters
   *
   * .config() - Load config object.
   * .config(obj) - Sets multiple config options.
   * .config(string) - Loads a single config item based on key
   * .config(string, string) - Sets a string
   *
   * @returns {*}
   *   .config() - Returns object.
   *   .config(obj) - Returns resulting config object.
   *   .config(string) - Returns single config object.
   *   .config(string, string) - Returns resulting config object.
   */
  myConfig.config = function () {
    return configMethod.apply(this, arguments);
  };

  /**
   * @see .config().
   */
  function configMethod() {
    if (arguments.length === 0) {
      return _.cloneDeep(_config);
    }

    if (arguments.length === 1) {
      if (_.isObject(arguments[0])) {
        _config = _.defaults(arguments[0], _config);
        return _.cloneDeep(_config);
      } else if (_.isString(arguments[0])) {
        return _config[arguments[0]];
      }
    }

    if (arguments.length === 2) {
      _config[arguments[0]] = arguments[1];
      return _.cloneDeep(_config);
    }
  }

  /**
   *
   * @param key
   * @returns {*|boolean}
   */
  myConfig.has = function(key) {
    return _config.hasOwnProperty(key);
  };

  /**
   *
   * @returns {*}
   */
  myConfig.list = function() {
    return _.keys(_config);
  };

  return myConfig;
};

module.exports = config;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
"use strict";

var Handlebars = (typeof window !== "undefined" ? window.Handlebars : typeof global !== "undefined" ? global.Handlebars : null),
    moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null);

//  format an ISO date using Moment.js
//  http://momentjs.com/
//  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
//  usage: {{#dateFormat creation_date format="MMMM YYYY"}}
Handlebars.registerHelper('dateFormat', function(context, block) {
  if (global.moment) {
    var f = block.hash.format || "MMM Do, YYYY";
    var myDate = new Date(context);
    return moment(myDate).format(f);
  } else {
    return context;   //  moment plugin not available. return data as is.
  }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
/**
 * @file
 *
 * Utility functions/methods that don't fit anywhere else.
 */


var isNode = function() {
  return window === undefined;
};

module.exports = {
  isNode: isNode
};

},{}],10:[function(require,module,exports){
(function (global){
"use strict";

/**
 * @file: Contains the base functionality that we want with all widgets.
 */

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null),
    Handlebars = (typeof window !== "undefined" ? window.Handlebars : typeof global !== "undefined" ? global.Handlebars : null);

var config = require('./util/config-manager');
var junkDrawer = require('./util/junk-drawer');

/**
 * Constructor.
 * @param opts
 *   Options to pass to .config()
 */

var widgetBase = function(opts) {
  this._config = config();

  if (opts) {
    this.config(opts);
  }
};

/**
 * Config get/setter
 * @param [opts] - Options for config.
 * @returns {*}
 *   .config() - Returns config object.
 *   .config(obj) - Returns this for chaining.
 */

widgetBase.prototype.config = function() {
  var _return = this._config.apply(this, arguments);

  // chainable
  return (_return) ? _return : this;
};

widgetBase.prototype.has = function(key) {
  return this._config.has(key);
};

/**
 * Main render method. This should be the primary method that devs use
 * to trigger a component render.
 *
 * @param selector (string) - See https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Selectors
 * for valid css selectors.
 *
 * @return - Nothing
 */

widgetBase.prototype.render = function(selector) {
  var elements = d3.selectAll(selector);
  var widget = this;

  this._compile(elements, function() {
    if (!junkDrawer.isNode()) {
      widget.link(elements);
    }
  });
};

widgetBase.prototype._compile = function(elements, next) {
  var config = this.config();
  var that = this;
  if (config.configFile) {
    d3.json(config.configFile, function(e, res) {
      for (var key in res) {
        that.config(key, res[key]);
      }
      that.compile(elements, next);
    });
  } else {
    this.compile(elements, next);
  }
};

/**
 * Renders the markup of a widget. Should only be used to set the initial state
 * of a widget. See .link() for ways to add interactivity to component.
 *
 * As a convention, this code should be runnable both server-side and in the browser.
 * Only override if you need to adjust how the markup is being processed.
 *
 * @param elements - D3 object with pre-selected elements.
 */

widgetBase.prototype.compile = function(elements, next) {
  this.template(function(content) {
    elements
      .classed('rw-widget', true)
      .html(content);

    next();
  });
};

/**
 * Provides a way to adjust a component after initial rendering. This method should be
 * overridden whenever a component needs to provide interactivity.
 *
 * @param elements - D3 object with pre-selected elements.
 */

widgetBase.prototype.link = function(elements) {};

/**
 * Default templating method. Uses Handlebars (http://handlebarsjs.com/) to render
 * content. Functionality differs depending on what's being passed in via the
 * config.template option.
 *
 * Note that you probably shouldn't load this directly, but instead rely on the render method.
 *
 * If config.template is a method, the template is assumed to be a pre-compiled
 * Handlebars template (see http://handlebarsjs.com/precompilation.html)
 *
 * If config.template is a string, and it starts with a '#', the template is assumed
 * to be an inline template inside a script tag and loaded from there.
 *
 * Otherwise, config.template is assumed to be a url and the template is loaded from
 * the external file.
 *
 * @param callback - A method to call once the Handlebars template method is prepared.
 */

widgetBase.prototype.template = function(callback) {
  var config = this.config();

  if (config.template) {
    if (typeof config.template === "function") {
      callback(config.template(config));
    } else {
      if (config.template.charAt(0) === '#') {
        var content = d3.select(config.template).html();
        var template = Handlebars.compile(content);
        callback(template(config));
      } else {
        d3.text(config.template, function(res) {
          var template = Handlebars.compile(res);
          callback(template(config));
        });
      }
    }
  } else {
    throw new Error("No widget template specified.");
  }
};

module.exports = widgetBase;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./util/config-manager":7,"./util/junk-drawer":9}]},{},[6])(6)
});