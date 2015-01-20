"use strict";

var _ = require('lodash');
var d3 = require('d3');
var WidgetBase = require('../../widget-base');
var $ = require('jquery');
var moment = require('moment');

var TimelineWidget = function(opts) {
  var config = {
    title: "Crisis Overview",
    template: "crisis-overview.hbs"
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

TimelineWidget.prototype = new WidgetBase();

TimelineWidget.prototype.link = function(elements) {
  var timelineState = {};
  var $element = $(elements[0][0]); // @TODO, grab any potential element selected.
  var $frame,
      $item,
      $margin,
      $index;

  function init() {
    var now = moment();
    timelineState.currentIndex = 0;
    timelineState.currentYear = now.format('YYYY');
    timelineState.currentMonth = now.format('M');
    timelineState.currentFormatted = now.format('YYYY MMMM');

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

    $('select', $element).selectric();
    // Initialize Sly Sliders.
    $frame = $('.timeline-widget-frames', $element);
    $item = $('.timeline-widget-item', $element);
    $margin = '40px';



    paint();
  }

  function paint() {
    $element.find('.timeline-widget-pager--current').text(timelineState.currentFormatted);
  }

  init();

  // Set initial widths.
  var $initialWidth = $frame.width();
  var $width = $initialWidth;
  $item.width($initialWidth);
  $item.css({ marginRight : $margin});
  $('.timeline-widget-pager li').width(Math.floor($initialWidth/3));

  // Control resizing.
  $(window).resize(function(e) {
    $width = $frame.width();
    $item.width($width);
    $sly.reload();
    $('.timeline-widget-pager li').width(Math.floor($width/3));
    $slyPager.reload();
  });

  // Main slider.
  var $sly = new Sly($frame, {
    horizontal: 1,
    itemNav: 'forceCentered',
    smart: 1,
    activateMiddle: 1,
    mouseDragging: 1,
    touchDragging: 1,
    releaseSwing: 1,
    startAt: 0,
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
  var $slyPager = new Sly('.timeline-widget-pager', {
    horizontal: 1,
    itemNav: 'forceCentered',
    smart: 1,
    activateMiddle: 1,
    mouseDragging: 1,
    touchDragging: 1,
    releaseSwing: 1,
    startAt: 0,
    scrollBy: 1,
    speed: 200,
    elasticBounds: 1,
    dragHandle: 1,
    dynamicHandle: 1,
    clickBar: 1
  }).init();

  // Dropdowns.
  var $slyDropdown = new Sly('.timeline-widget--dropdown--container', {
    itemNav: 'basic',
    smart: 1,
    activateOn: 'click',
    mouseDragging: 1,
    touchDragging: 1,
    releaseSwing: 1,
    startAt: 0,
    scrollBy: 1,
    activatePageOn: 'click',
    speed: 300,
    elasticBounds: 1,
    dragHandle: 1,
    dynamicHandle: 1,
    clickBar: 1
  }).init();

  $('.timeline-widget-pager--item, .timeline-widget-dropdown--item').click(function(){
    $index = $(this).attr('data-slide');
    var $pos = $sly.getPos($index);
    $sly.slideTo($pos.start);
  });

  // Open popup.
  $('.timeline-widget--dropdown-heading, .close').click(function(){
    $('.timeline-widget--dropdown--wrapper').toggleClass('open');
    $slyDropdown.reload();
  });

  // Close popup.
  $('.timeline-widget-dropdown--item').click(function(){
    $('.timeline-widget--dropdown--wrapper').removeClass('open');
  });

  // Update other sliders based on main.
  $sly.on('moveEnd', function(){
    $index = $sly.rel.activeItem;
    timelineState.currentIndex = $index;
    console.log(timelineState, moment.months());

    var $pagerPos = $slyPager.getPos($index);
    $slyPager.slideTo($pagerPos.center);

    var $dropDownPos = $slyDropdown.getPos($index);
    $slyDropdown.slideTo($dropDownPos.start);
  });
};

module.exports = TimelineWidget;
