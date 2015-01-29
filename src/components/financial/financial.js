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

    var margin = {top: 0, bottom: 20, left: 20, right: 20},
        w = 960 - margin.top - margin.bottom,
        h = 500 - margin.left - margin.right;

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
        requested: sampleData[i].original_requirement,
        funded: sampleData[i].funding,
        r: bubbleSizeScale(sampleData[i].funding),
        x: bubblePlacementScale(fundingPercentage),
        y: h / 2 + ((Math.random() * 4) - 2)
      };
    }).sort(function(a, b) {
      return b.fundingPercentage - a.fundingPercentage;
    });

    var svg = elements.select('#finance-bubbles')
      .append("svg")
      .attr({
        "width": w + margin.left + margin.right,
        "height": h + margin.top + margin.bottom
      });

    var xAxis = d3.svg.axis()
      .scale(bubblePlacementScale)
      .tickValues([0, 0.25, 0.5, 0.75, 1])
      .tickFormat(function(d) {
        return (d * 100) + "%";
      })
      .orient("bottom");

    var canvas = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    canvas.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (h) + ")")
      .call(xAxis);

    canvas.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0,0)")
      .call(xAxis.orient("top").tickFormat("").innerTickSize(-h).outerTickSize(0).tickValues([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]));

    var force = d3.layout.force()
      .gravity(0.02)
      .friction(0.8)
      .nodes(nodes)
      .size([w, h]);

    force.start();

    var cluster = canvas.selectAll(".cluster-bubble")
      .data(nodes)
      .enter()
      .append("g")
      .classed({
        'cluster-bubble': true,
        'small': bubbleNeedsSmallClass
      })
      .on('click', function(d) {
        addClusterOverlay(d);
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

        if (o.x + o.r > w) {
          o.x -= 50 * k;
        } else if (o.x - o.r < 0) {
          o.x += 50 * k;
        }

        if (o.y + o.r > h) {
          o.y -= 50 * k;
        } else if (o.y - o.r < 0) {
          o.y += 50 * k;
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

    function addClusterOverlay(node) {
      var percentageFormatter = d3.format("%"),
          fundingFormatter = d3.format("$s");

      var overlay = svg.append("g")
        .attr("id", "detail-overlay")
        .style("display", "block");

      overlay.append("rect")
        .classed("detail--block", true)
        .attr({
          "x": 0,
          "y": 0,
          "width": w + margin.left + margin.right,
          "height": h + margin.top + margin.bottom
        });

      overlay.append("circle")
        .classed("detail--info", true)
        .attr({
          "stroke-width": 5,
          cx: w / 2,
          cy: h / 2,
          r: (w < h) ? (w / 2) - 10 : (h / 2) - 10
        });

      var textContainer = overlay.append("g")
        .classed("detail--text", true);

      textContainer.append("text")
        .classed("detail--title", true)
        .attr({
          "text-anchor": "middle"
        })
        .text(node.title);

      textContainer.append("text")
        .attr({
          "text-anchor": "middle",
          "transform": "translate(0,20)"
        })
        .text(percentageFormatter(node.fundingPercentage) + " funded");

      textContainer.append("text")
        .attr({
          "text-anchor": "middle",
          "transform": "translate(0,40)"
        })
        .text(fundingFormatter(node.requested) + " Requested");

      textContainer.append("text")
        .attr({
          "text-anchor": "middle",
          "transform": "translate(0,60)"
        })
        .text(fundingFormatter(node.funded) + " Funded");

      var bbox = textContainer.node().getBBox(),
        xTrans = ((w / 2)) + 10,
        yTrans = ((h / 2) - (bbox.height / 2) + margin.top) + 10;

      textContainer.attr({
        "transform": "translate(" + xTrans + "," + yTrans + ")"
      });

      overlay.append("rect")
        .attr({
          "x": 0,
          "y": 0,
          "width": w + margin.left + margin.right,
          "height": h + margin.top + margin.bottom,
          "fill": "none"
        })
        .style("pointer-events", "all")
        .on("click", function() {
          removeClusterOverlay();
        });
    }

    function removeClusterOverlay() {
      d3.select('#detail-overlay').remove();
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
