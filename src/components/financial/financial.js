"use strict";

var _ = require('lodash');
var WidgetBase = require('../../widget-base');
var $ = require('jquery');
var d3 = require('d3');

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

FinancialWidget.prototype.link = function(elements) {
  console.log("D3", d3);

  function init() {
    populateYearSelector();

    var sampleData = [{
      "name": "CLUSTER NOT YET SPECIFIED",
      "current_requirement": 0.0,
      "original_requirement": 0.0,
      "funding": 235341626.0,
      "pledges": 0.0
    }, {
      "name": "COORDINATION",
      "current_requirement": 50814214.0,
      "original_requirement": 50814214.0,
      "funding": 22261415.0,
      "pledges": 0.0
    }, {
      "name": "EARLY RECOVERY AND LIVELIHOODS",
      "current_requirement": 71054434.0,
      "original_requirement": 71054434.0,
      "funding": 13880484.0,
      "pledges": 0.0
    }, {
      "name": "EDUCATION",
      "current_requirement": 103163335.0,
      "original_requirement": 103163335.0,
      "funding": 39294677.0,
      "pledges": 0.0
    }, {
      "name": "EMERGENCY TELECOMMUNICATIONS (ETC)",
      "current_requirement": 1584010.0,
      "original_requirement": 1584010.0,
      "funding": 947887.0,
      "pledges": 0.0
    }, {
      "name": "FOOD AND AGRICULTURE",
      "current_requirement": 1118741037.0,
      "original_requirement": 1118741037.0,
      "funding": 537436935.0,
      "pledges": 44136.0
    }, {
      "name": "HEALTH",
      "current_requirement": 233376172.0,
      "original_requirement": 233376172.0,
      "funding": 103801571.0,
      "pledges": 0.0
    }, {
      "name": "LOGISTICS",
      "current_requirement": 12060910.0,
      "original_requirement": 12060910.0,
      "funding": 5576718.0,
      "pledges": 0.0
    }, {
      "name": "NON-FOOD ITEMS (NFIs) AND SHELTER",
      "current_requirement": 420903819.0,
      "original_requirement": 420903819.0,
      "funding": 29859588.0,
      "pledges": 41614.0
    }, {
      "name": "NUTRITION",
      "current_requirement": 29999820.0,
      "original_requirement": 29999820.0,
      "funding": 23062685.0,
      "pledges": 0.0
    }, {
      "name": "PROTECTION AND COMMUNITY SERVICES",
      "current_requirement": 73493864.0,
      "original_requirement": 73493864.0,
      "funding": 22035159.0,
      "pledges": 0.0
    }, {
      "name": "STAFF SAFETY SERVICES",
      "current_requirement": 6183984.0,
      "original_requirement": 6183984.0,
      "funding": 2466833.0,
      "pledges": 0.0
    }, {
      "name": "WASH",
      "current_requirement": 154773755.0,
      "original_requirement": 154773755.0,
      "funding": 45742146.0,
      "pledges": 0.0
    }];

    var w = 960,
        h = 500;

    var bubbleSizeScale = d3.scale.linear()
      .domain(d3.extent(sampleData, function(val) {return val.funding;}))
      .range([10, 150]);

    var bubblePlacementScale = d3.scale.linear()
      .domain([0, 1])
      .range([0, w]);

    var bubbleNeedsSmallClass = function(d) {
      return d.r < 50;
    };

    var titleCleanup = function(title) {
      return title.toLowerCase();
    };

    var nodes = d3.range(sampleData.length).map(function(i) {
      var fundingPercentage = (sampleData[i].current_requirement) ? sampleData[i].funding / sampleData[i].current_requirement : 0;
      return {
        title: titleCleanup(sampleData[i].name),
        fundingPercentage: fundingPercentage,
        r: bubbleSizeScale(sampleData[i].funding),
        x: bubblePlacementScale(fundingPercentage),
        y: Math.random() * h
      };
    });

    var svg = elements.select('#finance-bubbles')
      .append("svg")
      .attr({
        "width": w,
        "height": h
      });

    var force = d3.layout.force()
      .gravity(0.02)
      .friction(0.8)
      .nodes(nodes)
      .size([w, h]);

    force.start();

    var cluster = svg.selectAll(".cluster-bubble")
      .data(nodes)
      .enter()
      .append("g")
      .classed({
        'cluster-bubble': true,
        'small': bubbleNeedsSmallClass
      })
      .on('click', function(d) {
        console.log("data", d);
      });

    cluster.append("circle")
      .attr({
        r: function(d) {return d.r;}
      });

    cluster.append("text")
      .text(function(d) {return d.title;})
      .style("text-transform", "capitalize")
      .attr({
        "text-anchor": "middle",
        transform: function(d) {
          return (bubbleNeedsSmallClass(d)) ? "translate(0," + (d.r + 16) + ")" : '';
        }
      });

    force.on("tick", function(e) {
      var q = d3.geom.quadtree(nodes),
          k = e.alpha * 0.1;

      nodes.forEach(function(o, i) {
        o.x += (bubblePlacementScale(o.fundingPercentage) - o.x) * k;

        if (o.x + o.r > h) {
          o.x -= 5 * k;
        } else if (o.x - o.r < 0) {
          o.x += 5 * k;
        }

        if (o.y + o.r > w) {
          o.y -= 5 * k;
        } else if (o.y - o.r < 0) {
          o.y += 5 * k;
        }

        q.visit(collide(o));
      });

      cluster.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; });
    });

    function collide(node) {
      var r = node.r + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
      return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
          var x = node.x - quad.point.x,
            y = node.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = node.r + quad.point.r + 15; // 15 is padding between boxes
          if (l < r) {
            l = (l - r) / l * 0.5;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    }
  }

  function populateYearSelector() {
    var $yearSelector = $('select[name="time-chooser"]');
    var year = 2015;
    var selected = '';
    for (var i = 0; i < 5; i++) {
      selected = (year == 2015) ? 'selected' : '';
      $yearSelector.append('<option value="' + year + '"' + selected + '>' + year + '</option>');
      year--;
    }
  }

  init();
};

module.exports = FinancialWidget;
