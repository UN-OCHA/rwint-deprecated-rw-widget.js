(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['crisis-overview.hbs'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "  <div class=\"overview-widget--map\">\n    <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.src : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.alt : stack1), depth0))
    + "\" />\n  </div>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "  <div class=\"overview-widget--description\">\n    <div class=\"accordion-set\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.content : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n";
},"4":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "      <input type=\"checkbox\" id=\""
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" class=\"accordion-set--check\""
    + ((stack1 = helpers['if'].call(depth0,(data && data.index),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + ">\n      <label for=\""
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" class=\"accordion-set--label\"><h2>"
    + alias3(alias4((depth0 != null ? depth0.title : depth0), depth0))
    + "</h2></label>\n      <div class=\"accordion-set--content\" data-eq-pts=\"cols2: 500\">\n        "
    + ((stack1 = alias4((depth0 != null ? depth0.content : depth0), depth0)) != null ? stack1 : "")
    + "\n      </div>\n";
},"5":function(depth0,helpers,partials,data) {
    return "";
},"7":function(depth0,helpers,partials,data) {
    return " checked=\"checked\"";
},"9":function(depth0,helpers,partials,data) {
    var stack1;

  return "  <div class=\"overview-widget--tabs tab-set\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.indicators : depth0),{"name":"each","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"tab-set--content\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.indicators : depth0),{"name":"each","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n";
},"10":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <input type=\"radio\" name=\"tab\" id=\"tab-"
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"tab-set--tab\""
    + ((stack1 = helpers['if'].call(depth0,(data && data.index),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "/>\n    <label for=\"tab-"
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(this.lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</label>\n";
},"12":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression;

  return "      <div id=\"tab-body-"
    + alias1(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"tab-set--body\">\n        <h2>"
    + alias1(this.lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</h2>\n        <i class=\"un-icon-crisis_population_displacement\"></i>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":this.program(13, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "      </div>\n";
},"13":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "        <div class=\"refugees\">\n          <h3><span class=\"figure\">"
    + alias2(alias1((depth0 != null ? depth0.figure : depth0), depth0))
    + "</span> "
    + alias2(alias1((depth0 != null ? depth0.quantifier : depth0), depth0))
    + "</h3>\n          <p>"
    + alias2(alias1((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<div class=\"overview-widget\">\n  <h1 class=\"overview-widget--title\"><span><i class=\"un-icon-crisis_conflict\"></i>"
    + ((stack1 = ((helper = (helper = helpers.adjustedTitle || (depth0 != null ? depth0.adjustedTitle : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"adjustedTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span></h1>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.map : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.content : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.indicators : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  <footer class=\"overview-widget--sources\">"
    + ((stack1 = ((helper = (helper = helpers.dataSource || (depth0 != null ? depth0.dataSource : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dataSource","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</footer>\n</div>\n";
},"useData":true});
})();