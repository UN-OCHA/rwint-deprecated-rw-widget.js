"use strict";

/**
 * @file: Exposes various widgets and utilities to the global
 * context, mostly useful in a browser setting.
 */

var BeatBlocks = require('beat-blocks');
var numeral = require('numeral');

// Widgets
var CrisisOverviewWidget = require('./components/crisis-overview/crisis-overview');
var RiverWidget = require('./components/river.ver2/river');
var TimelineWidget = require('./components/timeline/timeline');
var FinancialWidget = require('./components/financial/financial');

BeatBlocks.addWidgetToRegistry('crisis-overview', CrisisOverviewWidget);
BeatBlocks.addWidgetToRegistry('river', RiverWidget);
BeatBlocks.addWidgetToRegistry('timeline', TimelineWidget);
BeatBlocks.addWidgetToRegistry('financial', FinancialWidget);

// The Numeral library allows whole-language overrides. Using that to map our
// unit abbreviations to longer terms.
numeral.language('en-long', {
  delimiters: {
    thousands: ',',
    decimal: '.'
  },
  abbreviations: {
    thousand: 'thousand',
    million: 'million',
    billion: 'billion',
    trillion: 'trillion'
  },
  ordinal: function (number) {
    var b = number % 10;
    return (~~ (number % 100 / 10) === 1) ? 'th' :
      (b === 1) ? 'st' :
        (b === 2) ? 'nd' :
          (b === 3) ? 'rd' : 'th';
  },
  currency: {
    symbol: '$'
  }
});

module.exports = {};
