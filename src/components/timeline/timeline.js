"use strict";

var _ = require('lodash');
var d3 = require('d3');
var WidgetBase = require('beat-blocks').helpers.widgetBase;
var $ = require('jquery');
var moment = require('moment');
var reliefweb = require('reliefweb');
var Handlebars = require('handlebars');

// load template
require('./timeline.hbs.js');
require('./timeline--frame-item.hbs.js');
require('./timeline--dropdown-item.hbs.js');

var TimelineWidget = function(opts) {
  var config = {
    title: "Crisis Timeline",
    template: "timeline.hbs",
    countries: [],
    limit: 10
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

TimelineWidget.prototype = new WidgetBase();

TimelineWidget.prototype.getData = function(offset, updatePage) {
  var widget = this;

  var countries = widget.config('countries');
  var disaster = widget.config('disaster');
  var startDate;
  var limit = widget.config('limit');

  if (widget.has("startDate")) {
    startDate = moment(widget.config('startDate'), moment.ISO_8601).utc().format();
  }

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

  if (startDate) {
    filters.filter.conditions.push({
      "field": "date.original",
      "value": {
        "from":  startDate
      }
    });
  }

  if (Array.isArray(countries) && countries.length) {
    filters.filter.conditions.push({
      'field': 'country',
      'value': countries,
      'operator': 'OR'
    });

    filters.filter.conditions.push({
      'field': 'primary_country.name',
      'value': "World",
      'negate': true
    });
  }

  if (Array.isArray(disaster) && disaster.length) {
    filters.filter.conditions.push({
      'field': 'disaster',
      'value': disaster,
      'operator': 'OR'
    });
  }

  var rw = reliefweb.client();
  rw.post('reports')
    .fields(['date', 'headline', 'primary_country', 'url'], [])
    .sort('date.original', 'desc')
    .send(filters)
    .send({limit: limit})
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
            item["img-src"] = val.fields.headline.image['url-large'];
          } else {

            if (widget.has('emptyImage')) {
              item["img-src"] = widget.config('emptyImage');
            }
          }

          var time = moment(val.fields.date.original, moment.ISO_8601);
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

TimelineWidget.prototype.compile = function(elements, next) {
  var widget = this;

  var config = this.config();
  this.config('adjustedTitle', titleAdjust(config.title));

  widget.getData(0, function(timelineItems) {
    timelineItems.reverse();
    widget.config('timeline-items', timelineItems);

    widget.template(function(content) {
      elements
        .classed('rw-widget', true)
        .html(content);

      next();
    });
  });

  function titleAdjust(title) {
    var snippet = '<span class="word[[counter]]">[[word]]</span>';
    var words = title.split(' ');
    var adjustedTitle = '';
    for (var i = 0; i < words.length; i++) {
      adjustedTitle += snippet.replace('[[counter]]', i + 1).replace('[[word]]', words[i]);
    }
    return adjustedTitle;
  }
};

TimelineWidget.prototype.link = function(elements) {
  var widget = this;

  var timelineState = {
    content: this.config('timeline-items')
  };
  var timelineContent = timelineState.content;

  var $element = $(elements[0][0]); // @TODO, grab any potential element selected.
  var $frame,
      $item,
      margin;

  var $sly,
      $slyDropdown;

  // Open links in a new tab.
  $('.timeline-widget-frames li a').attr('target', '_blank');

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
    $frame = $('.timeline-widget--frames', $element);
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
      touchDragging: 1,
      releaseSwing: 1,
      startAt: timelineState.currentIndex,
      speed: 200,
      elasticBounds: 1,
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,

      // Buttons
      prev: $('.prev'),
      next: $('.next')
    }).init();

    // Dropdowns.
    $slyDropdown = new Sly($('.timeline-widget--dropdown--container', $element), {
      itemNav: 'basic',
      smart: 1,
      activateOn: 'click',
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      scrollBy: 1,
      startAt: timelineState.currentIndex,
      activatePageOn: 'click',
      speed: 300,
      elasticBounds: 1,
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1
    }).init();

    // Fix for scrolling in iframe. The height of the container is set to 0 initially.
    setTimeout(function() {
      $slyDropdown.reload();
    }, 100);

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
  }

  function slideTo(index) {
    var $sliderPos = $sly.getPos(index);
    $sly.slideTo($sliderPos.center);
    $sly.activate(index);

    var $dropDownPos = $slyDropdown.getPos(index);
    $slyDropdown.slideTo($dropDownPos.start);
    $slyDropdown.activate(index);
  }

  function adjustTimelineWidth(width) {
    // Fix for iOS mobile browser. For some reason, Sly will cause the browser window to dramatically
    // increase in width. This interacts poorly with our implementation of pym.js, which causes a feedback
    // loop in which the widget gets scaled to infinite width.
    if (window.screen.width < width) {
      width = window.screen.width;
    }

    $('timeline-widget', $element).width(width);
    $item.width(width);

    setTimeout(function() {
      $sly.reload();
    }, 1);
  }

  init();

  $('.timeline-widget-dropdown--list-item', $element).click(function(){
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

  $('.form-today', $element).click(function() {
    timelineState.currentIndex = findClosestTimelineContent();
    paint();
  });

  // Update other sliders based on main.
  $sly.on('moveStart', function() {
    lazyLoad();
  });

  $slyDropdown.on('change', function() {
    //console.log($slyDropdown.rel);
  });

  function lazyLoad() {
    if ($sly.rel.activeItem === 0) {
      widget.getData(timelineState.content.length, function(timelineItems) {

        timelineItems = timelineItems.reverse();
        timelineState.content = timelineItems.concat(timelineState.content);
        timelineState.content = _.uniq(timelineState.content, function(item) {
          return item.url;
        });

        renderTimelineDropdownItems();
        renderTimelineSlideItems();

        timelineState.currentIndex = (timelineState.currentIndex * 1) + (timelineItems.length * 1) + 1;
        slideTo(timelineState.currentIndex);
      });
    }
  }

  function renderTimelineDropdownItems() {
    var timelineItems = '';

    timelineState.content.forEach(function(item){
      timelineItems += Handlebars.templates['timeline--dropdown-item.hbs'](item);
    });

    $('.timeline-widget--dropdown--container .timeline-widget-dropdown--list-item').remove();
    $('.timeline-widget--dropdown--container .timeline-widget--dropdown--end-of-line').first().after(timelineItems);

    $('li.timeline-widget-dropdown--list-item').each(function(idx){
      $(this).attr('data-slide', idx);
    });

    $('.timeline-widget-dropdown--list-item', $element).click(function(){
      timelineState.currentIndex = $(this).attr('data-slide');
      $('.timeline-widget--dropdown--wrapper').toggleClass('open');
      paint();
    });

    $slyDropdown.reload();
  }

  function renderTimelineSlideItems() {
    var timelineItems = '';

    timelineState.content.forEach(function(item){
      timelineItems += Handlebars.templates['timeline--frame-item.hbs'](item);
    });

    $('.timeline-widget--frames .slidee', $element).empty().html(timelineItems);

    $item = $('.timeline-widget-item', $element);
    $item.width($frame.width());
    $item.css({
      marginRight : margin
    });

    $sly.reload();
  }
};

module.exports = TimelineWidget;
