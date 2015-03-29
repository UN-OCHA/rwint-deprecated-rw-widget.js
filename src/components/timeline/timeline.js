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
    limit: 100
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

TimelineWidget.prototype = new WidgetBase();

/**
 * Method for getting filters needed for ReliefWeb API.
 * @returns {{filter: {operator: string, conditions: {field: string}[]}}}
 */

TimelineWidget.prototype.getRWFilters = function() {
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

  return filters;
};

TimelineWidget.prototype.getData = function(offset, updatePage) {
  var widget = this;

  var filters = this.getRWFilters();

  var rw = reliefweb.client();
  rw.post('reports')
    .fields(['date', 'headline', 'primary_country', 'url'], [])
    .sort('date.original', 'desc')
    .send(filters)
    .send({limit: 50})
    .send({offset: offset})
    .end(function(err, res) {
      if (!err) {
        var timelineItems = _.map(res.body.data, function(item) {
          var returnItem = {
            title: item.fields.headline.title,
            country: item.fields.primary_country.name,
            "long-desc": item.fields.headline.summary,
            "short-desc": item.fields.headline.title,
            "url": item.fields.url,
            id: item.id
          };

          if (item.fields.headline.image) {
            returnItem["img-src"] = item.fields.headline.image['url-large'];
          } else if (widget.has('emptyImage')) {
            returnItem["img-src"] = widget.config('emptyImage');
          }

          var time = moment(item.fields.date.original, moment.ISO_8601);
          returnItem['date-full'] = time.format('DD MMM YYYY');
          returnItem['date-month'] = time.format('MMMM');
          returnItem['date-day'] = time.format('DD');
          returnItem['date-year'] = time.format('YYYY');

          return returnItem;
        });

        updatePage(timelineItems);
      }
    });
};

TimelineWidget.prototype.compile = function(elements, next) {
  var widget = this;

  var config = this.config();
  this.config('adjustedTitle', titleAdjust(config.title));

  var rw = reliefweb.client();

  rw.post('reports')
    .send({limit: 0})
    .send({offset: 0})
    .send(widget.getRWFilters())
    .send({facets: [
      {
        'field': 'date.original',
        'interval': 'month'
      }
    ]})
    .end(function(err, res) {
      if (!err) {
        widget.config('dataRanges', _.map(res.body.embedded.facets['date.original'].data, function(item) {
          return {
            count: item.count,
            value: moment(item.value, moment.ISO_8601())
          };
        }));
      }

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
    currentIndex: null,
    currentYear: null,
    currentMonth: null,
    currentFormatted: null,
    requestedDate: null,
    range: [null, null],
    activeId: null
  };

  var timelineDataStore = {
    rangePerMonth: this.config('dataRanges'),
    content: this.config('timeline-items')
  };

  var $element = $(elements[0][0]); // @TODO, grab any potential element selected.
  var $frame,
      $item,
      margin;

  var $sly,
      $slyDropdown;

  // Open links in a new tab.
  $('.timeline-widget-frames li a').attr('target', '_blank');

  function findClosestTimelineContent(date) {
    var now = (date) ? date.unix() : moment().unix();
    var closestId;
    var closestIndexDistance;

    timelineDataStore.content.forEach(function(val, key) {
      var itemTime = moment(val['date-full'], 'DD MMM YYYY').unix();
      if (closestIndexDistance === undefined || Math.abs(now - itemTime) < closestIndexDistance) {
        closestIndexDistance = Math.abs(now - itemTime);
        closestId = val.id;
      }
    });

    return closestId;
  }

  function init() {
    timelineState.activeId = findClosestTimelineContent();
    //var now = moment(timelineDataStore.content[timelineState.currentIndex]['date-full'], 'DD MMM YYYY');
    var content = _.find(timelineDataStore.content, function(item) {
      return item.id == timelineState.activeId;
    });
    var now = moment(content['date-full'], 'DD MMM YYYY');
    timelineState.currentYear = now.format('YYYY');
    timelineState.currentMonth = now.format('M');
    timelineState.currentFormatted = now.format('YYYY MMMM');

    populateOverlaySelectors();

    $('select', $element).selectric({
      disableOnMobile: false
    });
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

    $(window).on( "orientationchange", function(event) {
      adjustTimelineWidth($frame.width());
    });

    // Main slider.
    $sly = new Sly($frame, {
      horizontal: 1,
      itemNav: 'forceCentered',
      smart: 0,
      activateMiddle: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: 0,
      speed: 200,
      elasticBounds: 1,
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,
      scrollHijack: 0,

      // Buttons
      prev: $('.prev'),
      next: $('.next')
    }).init();

    // Dropdowns.
    $slyDropdown = new Sly($('.timeline-widget--dropdown--container', $element), {
      itemNav: 'basic',
      smart: 0,
      //activateOn: 'click',
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      scrollBy: 1,
      startAt: 0,
      //activatePageOn: 'click',
      speed: 300,
      elasticBounds: 1,
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1
    }).init();

    window.dropdown = $slyDropdown;

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
    lazyLoadImage();
    //slideTo(timelineState.currentIndex);
    slideToById(timelineState.activeId);

    var content = _.find(timelineDataStore.content, function(item) {
      return item.id == timelineState.activeId;
    });
    var now = moment(content['date-full'], 'DD MMM YYYY');
    timelineState.currentYear = now.format('YYYY');
    timelineState.currentMonth = now.format('M');
    timelineState.currentFormatted = now.format('YYYY MMMM');

    $('select[name="month"]', $element).val(now.format('MMM')).selectric('refresh');
    $('select[name="year"]', $element).val(now.format('YYYY')).selectric('refresh');
  }

  function slideToById(id) {
    var $sliderItem = $('.timeline-widget-item[data-rw-id="' + id + '"]');
    if ($sliderItem) {
      var $sliderPos = $sly.getPos($sliderItem);
      $sly.activate($sliderItem);
      $sly.slideTo($sliderPos.center);
    }

    var $dropDownItem = $('.timeline-widget-dropdown--list-item[data-rw-id="' + id + '"]');
    if ($dropDownItem) {
      var $dropDownPos = $slyDropdown.getPos($dropDownItem);
      $slyDropdown.activate($dropDownItem, true);
      $slyDropdown.slideTo($dropDownPos.center);
    }
  }

  // @TODO: Depreciate-ish. slideTo should use id instead of index.

  function slideTo(index) {
    var $sliderPos = $sly.getPos(index);
    $sly.activate(index);
    $sly.slideTo($sliderPos.center);

    var $dropDownPos = $slyDropdown.getPos(index);
    $slyDropdown.activate(index);
    $slyDropdown.slideTo($dropDownPos.center);

    lazyLoadImage();
  }

  function adjustTimelineWidth(width) {
    // Fix for iOS mobile browser. For some reason, Sly will cause the browser window to dramatically
    // increase in width. This interacts poorly with our implementation of pym.js, which causes a feedback
    // loop in which the widget gets scaled to infinite width.

    // Do the orientation check to deal with safari not adjusting screen dimensions properly in iframe context.
    if (Math.abs(window.orientation) == 90) {
      // landscape
      width = (window.screen.width < window.screen.height) ? window.screen.height : window.screen.width;
      $('.timeline-widget', $element).width(width);
    } else if (window.orientation === 0) {
      // portrait
      width = (window.screen.width > window.screen.height) ? window.screen.height : window.screen.width;
      $('.timeline-widget', $element).width(width);
    }

    $item.width(width);

    setTimeout(function() {
      $sly.reload();
      $slyDropdown.reload();
    }, 1);
  }

  init();

  $('.timeline-widget-dropdown--list-item', $element).click(function(){
    timelineState.activeId = $(this).data('rwId');
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

  $('.timeline-widget--dropdown-controls select', $element).on('change', function() {
    selectChange();
  });

  $('.next').on('click', function() {
    var $item = $('.timeline-widget-item[data-rw-id="' + timelineState.activeId + '"]');
    var activeIndex = $sly.getIndex($item);

    if (activeIndex < $sly.items.length - 1) {
      timelineState.activeId = $($sly.items[activeIndex + 1].el).data('rwId');
      paint();
    }
  });

  $(".prev").on("click", function() {
    var $item = $('.timeline-widget-item[data-rw-id="' + timelineState.activeId + '"]');
    var activeIndex = $sly.getIndex($item);

    if (activeIndex > 0) {
      timelineState.activeId = $($sly.items[activeIndex - 1].el).data('rwId');
      paint();
    }
  });

  function selectChange() {
    var currentString = $('select[name="month"]', $element).val() + ' ' + $('select[name="year"]', $element).val();

    var offset = findOffsetForTime(moment(currentString, 'MMM YYYY')) - 5;
    offset = (offset < 5) ? 0 : offset;

    widget.getData(offset, function(items) {
      var timelineItems = items.reverse();
      timelineDataStore.content = timelineItems;
      timelineDataStore.content = _.uniq(timelineDataStore.content, 'id');

      var newActive = findClosestTimelineContent(moment(currentString, 'MMM YYYY'));
      timelineState.activeId = newActive;

      renderTimelineDropdownItems();
      renderTimelineSlideItems();

      $sly.reload();
      $slyDropdown.reload();
      paint();
    });

    //var current = moment(currentString, 'MMM YYYY').unix();
    //var itemTime;
    //var val;
    //
    //for (var i = 0; i < timelineDataStore.content.length; i++) {
    //  val = timelineDataStore.content[i];
    //  itemTime = moment(val['date-full'], 'DD MMM YYYY').unix();
    //
    //  if (current < itemTime) {
    //    timelineState.currentIndex = i;
    //    paint();
    //    break;
    //  }
    //}
  }

  $('.form-today', $element).click(function() {
    var now = moment();

    var offset = findOffsetForTime(now) - 5;
    offset = (offset < 5) ? 0 : offset;

    widget.getData(offset, function(items) {
      var timelineItems = items.reverse();
      timelineDataStore.content = timelineItems;
      timelineDataStore.content = _.uniq(timelineDataStore.content, 'id');

      var newActive = findClosestTimelineContent(now);
      timelineState.activeId = newActive;

      renderTimelineDropdownItems();
      renderTimelineSlideItems();

      $sly.reload();
      $slyDropdown.reload();
      paint();
    });
  });

  $slyDropdown.on('change', function() {
    //console.log("stuff from slider", $slyDropdown.pos, $slyDropdown.items);
  });

  function lazyLoadImage() {
    var $headlineImage = $('.timeline-widget-item[data-rw-id="' + timelineState.activeId + '"] img').last();
    $headlineImage.attr('src', $headlineImage.data('src'));
  }

  // @TODO: Depreciate

  function lazyLoad() {
    if ($sly.rel.activeItem === 0) {
      widget.getData(timelineDataStore.content.length, function(timelineItems) {

        timelineItems = timelineItems.reverse();
        timelineDataStore.content = timelineItems.concat(timelineDataStore.content);
        timelineDataStore.content = _.uniq(timelineDataStore.content, 'id');

        renderTimelineDropdownItems();
        renderTimelineSlideItems();

        timelineState.currentIndex = (timelineState.currentIndex * 1) + (timelineItems.length * 1) + 1;
        slideTo(timelineState.currentIndex);
      });
    }
  }

  function renderTimelineDropdownItems() {
    var timelineItems = '';

    timelineDataStore.content.forEach(function(item, i) {
      item.index = i;
      timelineItems += Handlebars.templates['timeline--dropdown-item.hbs'](item);
    });

    $('.timeline-widget--dropdown--container .timeline-widget-dropdown--list-item').remove();
    $('.timeline-widget--dropdown--container .timeline-widget--dropdown--end-of-line').first().before(timelineItems);

    $('.timeline-widget-dropdown--list-item', $element).click(function(){
      timelineState.activeId = $(this).data('rwId');
      paint();
      $('.timeline-widget--dropdown--wrapper').removeClass('open');
    });

    $slyDropdown.reload();
  }

  function renderTimelineSlideItems() {
    var timelineItems = '';

    timelineDataStore.content.forEach(function(item){
      timelineItems += Handlebars.templates['timeline--frame-item.hbs'](item);
    });

    $('.timeline-widget--frames .slidee', $element).empty().html(timelineItems);

    // Open links in a new tab.
    $('.timeline-widget-frames li a').attr('target', '_blank');

    $item = $('.timeline-widget-item', $element);
    $item.width($frame.width());
    $item.css({
      marginRight : margin
    });

    $sly.reload();
  }

  /**
   * Given data in timelineDataStore.rangePerMonth that's based on the facet return from
   * RW API, return the offset needed to load data starting at a particular time.
   *
   * @param date - Moment.js object.
   * @returns offset #, useful for getData
   */

  function findOffsetForTime(date) {
    var priorDates = _.filter(timelineDataStore.rangePerMonth, function(item) {
      return item.value.isAfter(date);
    });

    var sum = _.reduce(priorDates, function(sum, item) {
      return sum + item.count;
    }, 0);

    return sum;
  }
};

module.exports = TimelineWidget;
