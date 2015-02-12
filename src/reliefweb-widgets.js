"use strict";

/**
 * @file: Exposes various widgets and utilities to the global
 * context, mostly useful in a browser setting.
 */

var BeatBlocks = require('beat-blocks');

// Widgets
var CrisisOverviewWidget = require('./components/crisis-overview/crisis-overview');
var RiverWidget = require('./components/river/river');
var TimelineWidget = require('./components/timeline/timeline');
var FinancialWidget = require('./components/financial/financial');

BeatBlocks.addWidgetToRegistry('crisis-overview', CrisisOverviewWidget);
BeatBlocks.addWidgetToRegistry('river', RiverWidget);
BeatBlocks.addWidgetToRegistry('timeline', TimelineWidget);
BeatBlocks.addWidgetToRegistry('financial', FinancialWidget);

module.exports = {};
