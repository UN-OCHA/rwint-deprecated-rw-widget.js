(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['dropDownItem.hbs'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li class=\"timeline-widget-dropdown--list-item\" data-slide=\""
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"timeline-widget-dropdown--item\">\n    <div class=\"timeline-widget-dropdown--item-date\">"
    + escapeExpression(((helper = (helper = helpers['date-day'] || (depth0 != null ? depth0['date-day'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date-day","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers['date-month'] || (depth0 != null ? depth0['date-month'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date-month","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers['date-year'] || (depth0 != null ? depth0['date-year'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date-year","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class=\"timeline-widget-dropdown--item-desc\">"
    + escapeExpression(((helper = (helper = helpers['short-desc'] || (depth0 != null ? depth0['short-desc'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"short-desc","hash":{},"data":data}) : helper)))
    + "</div>\n  </div>\n</li>";
},"useData":true});
})();