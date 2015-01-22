(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['river.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "          <li>\n            <span class=\"number\">"
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\n            <div class=\"river-widget--dropdown\">\n              <div class=\"river-widget--dropdown-heading\">\n                <span class=\""
    + escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></span> "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\n              </div>\n              <div class=\"river-widget--dropdown--wrapper\">\n                <span class=\"un-icon-damage_destroyed close\"></span>\n                <div class=\"river-widget--dropdown--container\">\n                  <ul class=\"slidee\">\n                    <li>\n                      <div class=\"filters\">\n                        <h5>Filter Results</h5>\n                        <ul>\n";
  stack1 = ((helper = (helper = helpers.filters || (depth0 != null ? depth0.filters : depth0)) != null ? helper : helperMissing),(options={"name":"filters","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.filters) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                        </ul>\n                      </div>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </div>\n          </li>\n";
},"2":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            <li><a href=\"\">"
    + escapeExpression(lambda(depth0, depth0))
    + "</a></li>\n";
},"4":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "          <li><a href=\"\">"
    + escapeExpression(lambda(depth0, depth0))
    + "</a></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "<div class=\"widget-river\">\n  <header>\n    <h3>I want content from</h3>\n    <select>\n      <option>This week</option>\n      <option>This month</option>\n      <option>This year</option>\n    </select>\n  </header>\n  <div class=\"results clearfix\">\n    <div class=\"graph\">\n      <ul class=\"river-tabs clearfix\">\n";
  stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(options={"name":"content","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.content) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "      </ul>\n      <div class=\"placeholder\">\n        <img src=\"../../img/river-graph-placeholder.png\">\n      </div>\n    </div>\n    <div class=\"filters hidden\">\n      <h5>Filter Results</h5>\n      <ul>\n";
  stack1 = ((helper = (helper = helpers.defaultFilters || (depth0 != null ? depth0.defaultFilters : depth0)) != null ? helper : helperMissing),(options={"name":"defaultFilters","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.defaultFilters) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </ul>\n    </div>\n  </div>\n</div>";
},"useData":true});
})();