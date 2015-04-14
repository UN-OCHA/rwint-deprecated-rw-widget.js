"use strict";

var _ = require('lodash');
var WidgetBase = require('beat-blocks').helpers.widgetBase;
var $ = require('jquery');
var d3 = require('d3');
var moment = require('moment');

// load template
require('./financial.hbs.js');

var FinancialWidget = function(opts) {
  var config = {
    title: "Financial Support",
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
    $.each(val.clusters.content, function() {
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

  var config = this.config();
  this.config('adjustedTitle', titleAdjust(config.title));

  widget.template(function(content) {
    elements
      .classed('rw-widget', true)
      .html(content);

    next();
  });

  // Set the initial dataSourceURL
  var dataSourceURL = dataSources[0].dataSourceURL;
  $('.financial-widget--sources a').attr('href', dataSourceURL);
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

FinancialWidget.prototype.link = function(elements) {
  var widget = this,
      config = widget.config(),
      $element = $(elements[0][0]), // @TODO, grab any potential element selected.
      calculatedDataSources = config.calculatedDataSources;

  var labelMapping = widget.config('labelMapping');

  var chartState = {
    direction: ($('#finance-bubbles').width() > 650) ? 'horizontal' : 'vertical',
    currentSection: 0
  };

  function init() {
    populateYearSelector();

    chartInit();

    // Set first item active and populate the bar.
    $('.financial-widget--data-source-chooser :first-child', $element).toggleClass('active');
    populateBar();

    setTitle($('.financial-widget--data-source', $element).first().text());

    $('.financial-widget--data-source', $element).click(function(e) {
      e.preventDefault();
      var selected = this.text;
      chartState.currentSection = _.findKey(config.dataSources, function(val) {return val.dataItemTitle == selected;});

      if (config.dataSources[chartState.currentSection].clusters.content.length < 2) {
        $('.financial-widget--cluster-funding', $element).hide();
      } else {
        $('.financial-widget--cluster-funding', $element).show();
      }

      chartInit();

      // Set the title.
      setTitle(selected);

      // Set data for selected source.
      setBar(selected);

      // Toggle active class.
      $('.financial-widget--data-source').removeClass('active');
      $(this).toggleClass('active');

      // Set the dataSourceURL
      var dataSourceURL = config.dataSources[chartState.currentSection].dataSourceURL;
      $('.financial-widget--sources a').attr('href', dataSourceURL);
    });
  }

  function chartInit() {
    var sampleData = config.dataSources[chartState.currentSection].clusters.content;

    $('#finance-bubbles', $element).empty();

    if (sampleData.length <= 1) {
      return;
    }

    var margin = {top: 50, bottom: 50, left: 20, right: 20},
      w = $('#finance-bubbles', $element).width() - margin.left - margin.right,
      h = (chartState.direction == 'horizontal') ? 500 : 680;

    h = h - margin.top - margin.bottom;

    var maxBubbleRadius = (chartState.direction == 'horizontal') ? 25000 : 4000;

    var bubbleSizeScale = d3.scale.linear()
      .domain(d3.extent(sampleData, function(val) {return val.funding;}))
      .range([1000, maxBubbleRadius]);

    var bubblePlacementRange = (chartState.direction == 'horizontal') ? [0, w] : [h, 0];

    var bubblePlacementScale = d3.scale.linear()
      .domain([0, 1])
      .range(bubblePlacementRange)
      .clamp(true);

    var bubbleNeedsSmallClass = function(d) {
      return d.r < 50;
    };

    var windowResize = function() {
      var axisSwitch = false,
        oldDirection = chartState.direction;

      w = $('#finance-bubbles', $element).width();
      svg.attr("width", w);
      w = w - margin.left - margin.right;

      chartState.direction = ($('#finance-bubbles', $element).width() > 650) ? 'horizontal' : 'vertical';

      axisSwitch = (chartState.direction !== oldDirection);

      var maxBubbleRadius = (chartState.direction == 'horizontal') ? 25000 : 4000;
      bubbleSizeScale.range([1000, maxBubbleRadius]);

      gridYAxis.innerTickSize(-w);

      if (axisSwitch) {
        h = (chartState.direction == "horizontal") ? 500 : 680;
        svg.attr("height", h);
        h = h - margin.top - margin.bottom;

        gridXAxis.innerTickSize(-h);

        nodes.forEach(function(val, key) {
          nodes[key].r = Math.sqrt(bubbleSizeScale(val.funded) / Math.PI);
          nodes[key].x = (chartState.direction == 'horizontal') ? bubblePlacementScale(val.fundingPercentage) : w / 2 + ((Math.random() * 4) - 2);
          nodes[key].y = (chartState.direction == 'horizontal') ? h / 2 + ((Math.random() * 4) - 2) : bubblePlacementScale(val.fundingPercentage);
        });

        cluster.classed({
            'small': bubbleNeedsSmallClass
          });

        cluster.selectAll("circle")
          .attr({
            r: function(d) {return d.r;}
          });

        cluster.selectAll("text")
          .attr({
            transform: function(d) {
              return (bubbleNeedsSmallClass(d)) ? "translate(0," + (d.r + 16) + ")" : '';
            }
          });

        cluster.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; });
      }

      if (force) {
        force.size([w, h]);
        force.start();
      }

      // Offset y-axis tick labels.
      $('.axis.y .tick text').attr("transform", "translate(0, -10)");

      var labelx = w/2 - 52;
      var trianglex = labelx + 110;
      if (chartState.direction == 'horizontal') {
        bubblePlacementScale.range([0, w]);
        canvas.select(".grid.x").style('display', 'block').call(gridXAxis);
        canvas.select(".axis.x-top").style('display', 'block').call(xAxisTop);
        canvas.select(".axis.x").attr("transform", "translate(0," + h + ")").style('display', 'block').call(xAxis);
        canvas.select(".label.x-top").attr("transform", "translate(" + labelx + ",-30)").style('display', 'block');
        canvas.select(".label.x-bottom").attr("transform", "translate(" + labelx + "," + (h + 45) + ")").style('display', 'block');
        canvas.select(".triangle.triangle-top").attr("transform", "translate(" + trianglex + ", -43)").style('display', 'block');
        canvas.select(".triangle.triangle-bottom").attr("transform", "translate(" + trianglex + "," + (h + 32) + ")").style('display', 'block');
        canvas.select(".axis.y").style('display', 'none');
        canvas.select(".grid.y").style('display', 'none');
      } else {
        bubblePlacementScale.range([h, 0]);
        canvas.select(".axis.x-top").style('display', 'none');
        canvas.select(".axis.x").style('display', 'none');
        canvas.select(".grid.x").style('display', 'none');
        canvas.select(".label.x-top").style('display', 'none');
        canvas.select(".label.x-bottom").style('display', 'none');
        canvas.select(".triangle.triangle-top").style('display', 'none');
        canvas.select(".triangle.triangle-bottom").style('display', 'none');
        canvas.select(".axis.y").style('display', 'block').call(yAxis);
        canvas.select(".axis.y .domain").style('display', 'none');
        canvas.select(".grid.y").style('display', 'block').call(gridYAxis);
      }
    };

    $(window).resize(function() {
      windowResize();
    });

    var nodes = d3.range(sampleData.length).map(function(i) {
      var fundingPercentage = (sampleData[i].current_requirement) ? sampleData[i].funding / sampleData[i].current_requirement : 0;
      return {
        title: sampleData[i].name,
        fundingPercentage: fundingPercentage,
        requested: sampleData[i].current_requirement,
        funded: sampleData[i].funding,
        r: Math.sqrt(bubbleSizeScale(sampleData[i].funding) / Math.PI),
        x: (chartState.direction == 'horizontal') ? bubblePlacementScale(fundingPercentage) : w / 2 + ((Math.random() * 4) - 2),
        y: (chartState.direction == 'horizontal') ? h / 2 + ((Math.random() * 4) - 2) : bubblePlacementScale(fundingPercentage)
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

    var xAxisTop = d3.svg.axis()
      .scale(bubblePlacementScale)
      .tickValues([0, 0.25, 0.5, 0.75, 1])
      .tickFormat(function(d) {
        return (d * 100) + "%";
      })
      .orient("top");

    var xAxis = d3.svg.axis()
      .scale(bubblePlacementScale)
      .tickValues([0, 0.25, 0.5, 0.75, 1])
      .tickFormat(function(d) {
        return (d * 100) + "%";
      })
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(bubblePlacementScale)
      .tickValues([0, 0.25, 0.5, 0.75, 1])
      .tickFormat(function(d) {
        if (d == 1) {
          return "100% Funded";
        } else {
          return (d * 100) + "%";
        }
      })
      .orient("right");

    var gridXAxis = d3.svg.axis()
      .scale(bubblePlacementScale)
      .orient("top").tickFormat("")
      .innerTickSize(-h)
      .outerTickSize(0)
      .tickValues([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);

    var gridYAxis = d3.svg.axis()
      .scale(bubblePlacementScale)
      .orient("left").tickFormat("")
      .innerTickSize(-w)
      .outerTickSize(0)
      .tickValues([0, 0.25, 0.5, 0.75, 1]);

    var canvas = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    canvas.append("g")
      .classed({
        "x": true,
        "axis": true
      })
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis);

    canvas.append("g")
      .classed({
        "x-top": true,
        "axis": true
      })
      .attr("transform", "translate(0,0)")
      .call(xAxisTop);

    var labelx = w/2 - 52;
    var trianglex = labelx + 110;
    canvas.append("text")
      .classed({
        "x-top": true,
        "label": true
      })
      .attr("transform", "translate(" + labelx + ",-30)")
      .text("Per Cent Funded");

    canvas.append("path")
      .classed({
        "triangle": true,
        "triangle-top": true
      })
      .attr("transform", "translate(" + trianglex + ", -43)")
      .attr("d", "M0,16 L0,0 L12,8 L0,16 Z")
      .attr("fill", "#D8D8D8");

    canvas.append("text")
      .classed({
        "x-bottom": true,
        "label": true
      })
      .attr("transform", "translate(" + labelx + "," + (h + 45) + ")")
      .text("Per Cent Funded");

    canvas.append("path")
      .classed({
        "triangle": true,
        "triangle-bottom": true
      })
      .attr("transform", "translate(" + trianglex + "," + (h + 32) + ")")
      .attr("d", "M0,16 L0,0 L12,8 L0,16 Z")
      .attr("fill", "#D8D8D8");

    canvas.append("g")
      .classed({
        "y": true,
        "axis": true
      })
      .attr("transform", "translate(0,0)")
      .call(yAxis);

    canvas.append("g")
      .classed({
        "x": true,
        "grid": true
      })
      .attr("transform", "translate(0,0)")
      .call(gridXAxis);

    canvas.append("g")
      .classed({
        "y": true,
        "grid": true
      })
      .attr("transform", "translate(0,0)")
      .call(gridYAxis);

    var force = d3.layout.force()
      .gravity(0)
      .friction(0.8)
      .nodes(nodes)
      .size([w, h]);

    var cluster = canvas.selectAll(".cluster-bubble")
      .data(nodes)
      .enter()
      .append("g")
      .classed({
        'cluster-bubble': true,
        'small': bubbleNeedsSmallClass
      })
      .style({
        "cursor": "pointer"
      })
      .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; })
      .on('click', function(d) {
        addClusterOverlay(d);
      });

    cluster.append("circle")
      .attr({
        r: function(d) {return d.r;}
      });

    cluster.append("text")
      .text(function(d) {return shortClusterLabel(d.title);})
      .style("text-transform", "capitalize")
      .attr({
        "text-anchor": "middle",
        transform: function(d) {
          return (bubbleNeedsSmallClass(d)) ? "translate(0," + (d.r + 16) + ")" : '';
        }
      });

    cluster.selectAll("text")
      .call(wrap, 200);

    windowResize();

    force.on("tick", function(e) {
      var q = d3.geom.quadtree(nodes),
        k = e.alpha * 0.05;

      nodes.forEach(function(o, i) {
        if (chartState.direction == 'horizontal') {
          o.x += (bubblePlacementScale(o.fundingPercentage) - o.x) * k;
          // pull towards middle of chart
          o.y = (o.y > h / 2) ? o.y - (3 * k) : o.y + (3 * k);
        } else {
          o.y += (bubblePlacementScale(o.fundingPercentage) - o.y) * k;
          // pull towards middle of chart
          o.x = (o.x > w / 2) ? o.x - k : o.x + k;
        }

        // Adjust here to help force bubbles towards the center.
        if (o.x + o.r > w) {
          o.x -= 1200 * k;
        } else if ((o.x - o.r < 0 && chartState.direction == 'horizontal') || (o.x - o.r < 40)) {
          o.x += 1200 * k;
        }

        if (o.y + o.r + 20 > h) {
          o.y -= 1200 * k;
        } else if (o.y - o.r < 0) {
          o.y += 1200 * k;
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
            r = node.r + quad.point.r;

          // add padding
          r += (chartState.direction == 'horizontal') ? 40 : 20;

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
      var percentageFormatter = d3.format("%");
      var fundingPrefix;

      var overlayMarkup = "<div id='detail-overlay'><div class='detail--block'><div class='detail--info'><div class='detail--text'><h2 class='detail--title'></h2></div></div></div></div>";
      var $overlay = $('#finance-bubbles', $element).append(overlayMarkup);

      $('.detail--info', $overlay).width((w < h) ? w - 80 : h - 20);
      $('.detail--info', $overlay).height((w < h) ? w - 80 : h - 20);

      $('.detail--title', $overlay).text(longClusterLabel(node.title));

      var icon = getClusterIcon(node.title);
      if (icon) {
        $('.detail--text', $overlay).prepend("<img class='detail--icon' src='images/financial-icon--" + icon + ".svg' />");
      }

      var $textContainer = $('.detail--text', $overlay);

      $textContainer.append("<div>" + percentageFormatter(node.fundingPercentage) + " funded" + "</div>");

      fundingPrefix = d3.formatPrefix(node.requested);
      $textContainer.append("<div>" + fundingPrefix.scale(node.requested).toFixed(2) + fundingPrefix.symbol + " Requested" + "</div>");

      fundingPrefix = d3.formatPrefix(node.funded);
      $textContainer.append("<div>" + fundingPrefix.scale(node.funded).toFixed(2) + fundingPrefix.symbol + " Funded" + "</div>");

      $('#detail-overlay', $overlay).append("<div class='detail--click'></div>")
        .click(removeClusterOverlay);
    }

    function removeClusterOverlay() {
      d3.select('#detail-overlay').remove();
    }

    function getClusterIcon(original) {
      var icon = _.result(_.find(labelMapping, function(item) {
        return item.original == original;
      }), 'icon');

      return (icon) ? icon : undefined;
    }

    function wrap(text, width) {
      text.each(function() {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 20, // px
          y = text.attr("y"),
          dy = 0,
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");

        word = words.pop();
        while (word) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("y", ++lineNumber * lineHeight + dy + "px").text(word);
          }
          word = words.pop();
        }
      });
    }
  }

  function populateYearSelector() {
    //var $yearSelector = $('select[name="time-chooser"]', $element);
    //// We are not pulling any 2015 data at this time. Start with 2014.
    //var currentYear = moment().subtract(1, "years").format('YYYY');
    //var selected = '';
    //for (var i = 0; i < 4; i++) {
    //  selected = (currentYear == 2015) ? 'selected' : '';
    //  $yearSelector.append('<option value="' + currentYear + '"' + selected + '>' + currentYear + '</option>');
    //  currentYear--;
    //}
    //$yearSelector.selectric();
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

    // Align the label to the right if the percentage is less than 20.
    if (percentage < 20) {
      $('.financial-widget--percent-funded--amount .percent').addClass('aligned-right');
    }
  }

  function setRequested(value) {
    $('.financial-widget--percent-funded .requested').html('$' + value + ' Requested');
  }

  function setBar(value) {
    var selectedSource = calculatedDataSources[value];
    setCovered(selectedSource.fundingTotal, selectedSource.percentageRaised);
    setRequested(selectedSource.currentRequirementTotal);
  }

  function longClusterLabel(original) {
    var mapped = _.result(_.find(labelMapping, function(item) {
      return item.original == original;
    }), "long");

    return (mapped) ? mapped : original;
  }

  function shortClusterLabel(original) {
    var mapped = _.result(_.find(labelMapping, function(item) {
      return item.original == original;
    }), "short");

    return (mapped) ? mapped : original;
  }

  init();
};

module.exports = FinancialWidget;
