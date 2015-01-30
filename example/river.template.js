(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['river.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <li class=\"widget-river--results--item\">\n          <span class=\"widget-river--results--number\">"
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\n\n          <div class=\"widget-river--results--type\">\n            <span class=\""
    + escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></span>\n            "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\n          </div>\n        </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "<div class=\"widget-river\">\n  <header class=\"widget-river--header\">\n    <h1 class=\"widget-river--title\">I want content from</h1>\n    <select>\n      <option value=\"weeks\" >This week</option>\n      <option value=\"months\">This month</option>\n      <option value=\"years\">This year</option>\n    </select>\n  </header>\n  <div class=\"widget-river--results clearfix\">\n    <div class=\"widget-river--results--graph\">\n      <ul class=\"widget-river--results-tabs clearfix\">\n";
  stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(options={"name":"content","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.content) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </ul>\n      <div class=\"placeholder\">\n        <p class=\"graph--heading\"></p>\n        <svg id=\"chart\"></svg>\n      </div>\n    </div>\n    <div class=\"widget-river--filters\">\n      <h5 class=\"widget-river--filters--title\">Filter Results:  <span class=\"tab\">Reports</span> <span class=\"close\"></span></h5>\n      <ul></ul>\n    </div>\n  </div>\n</div>\n";
},"useData":true});
})();