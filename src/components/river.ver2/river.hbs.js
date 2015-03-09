(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['river.hbs'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=this.lambda, alias2=this.escapeExpression;

  return "        <input type=\"radio\" name=\"river\" id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" class=\"accordion-set--check\" />\n        <label for=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" class=\"accordion-set--label\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</label>\n        <div id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "-accordion\" class=\"accordion-set--content\">\n          <div class=\"widget-river--filters-content\">\n            <h2 class=\"filters-content--title\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</h2>\n            <ul class=\"filters-content--items\">\n            </ul>\n            <a class=\"filters-content--more btn\" href=\""
    + alias2(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"location","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">View full list on ReliefWeb</a>\n          </div>\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"widget-river\" id=\"widget-river\">\n  <h1 class=\"widget-title\"><span><i class=\"un-icon-activity_reporting widget-title--icon\"></i>"
    + ((stack1 = ((helper = (helper = helpers.adjustedTitle || (depth0 != null ? depth0.adjustedTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"adjustedTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span></h1>\n  <div class=\"widget-river--results clearfix\">\n\n    <div class=\"accordion-set widget-river--filters results--item--reports\">\n      <h5 class=\"widget-river--filters--title\">Filter Results:  <span class=\"tab\">Reports</span> <span class=\"close\"></span></h5>\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.filters : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n</div>\n";
},"useData":true});
})();