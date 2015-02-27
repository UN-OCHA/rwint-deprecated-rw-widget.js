(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['timeline.hbs'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "              <li class=\"timeline-widget-dropdown--list-item\" data-slide=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n                <div class=\"timeline-widget-dropdown--item\">\n                  <div class=\"timeline-widget-dropdown--item-date\">"
    + alias3(((helper = (helper = helpers['date-day'] || (depth0 != null ? depth0['date-day'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date-day","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers['date-month'] || (depth0 != null ? depth0['date-month'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date-month","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers['date-year'] || (depth0 != null ? depth0['date-year'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date-year","hash":{},"data":data}) : helper)))
    + "</div>\n                  <div class=\"timeline-widget-dropdown--item-desc\">"
    + alias3(((helper = (helper = helpers['short-desc'] || (depth0 != null ? depth0['short-desc'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"short-desc","hash":{},"data":data}) : helper)))
    + "</div>\n                </div>\n              </li>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "          <li class=\"timeline-widget-item\">\n            <div class=\"timeline-widget-item--header\">\n              <div class=\"timeline-widget-item--headline\">\n                <div class=\"timeline-widget-item--category\">Ocha <div class=\"arrow\"></div></div> <div class=\"timeline-widget-item--date\">"
    + alias2(alias1((depth0 != null ? depth0['date-full'] : depth0), depth0))
    + "</div>\n              </div>\n              <h1 class=\"timeline-widget-item--title\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</h1>\n            </div>\n            <div class=\"timeline-widget-item--content\">\n                  <div class=\"timeline-widget-item--image\">\n                    <div class=\"timeline-widget-item--image--icons\">\n                      <a class=\"timeline-widget-item--image--view-more\"><img src=\"../../images/eye-img--yellow.png\"></a>\n                      <a class=\"timeline-widget-item--image--country\">"
    + alias2(alias1((depth0 != null ? depth0.country : depth0), depth0))
    + "</a>\n                    </div>\n                    <img src=\""
    + alias2(alias1((depth0 != null ? depth0['img-src'] : depth0), depth0))
    + "\" />\n                  </div>\n              <div class=\"timeline-widget-item--description\">\n                  "
    + ((stack1 = alias1((depth0 != null ? depth0['long-desc'] : depth0), depth0)) != null ? stack1 : "")
    + "\n                <div class=\"timeline-widget-item-link\">\n                  <a class=\"btn\" href=\""
    + alias2(alias1((depth0 != null ? depth0.url : depth0), depth0))
    + "\"><span class=\"un-icon-product_type_report\"></span> Read full report</a>\n                </div>\n              </div>\n            </div>\n          </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", buffer = 
  "<div class=\"timeline-widget\">\n  <h1 class=\"widget-title\"><span><i class=\"un-icon-product_type_calendar widget-title--icon\"></i>"
    + ((stack1 = ((helper = (helper = helpers.adjustedTitle || (depth0 != null ? depth0.adjustedTitle : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"adjustedTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span></h1>\n  <div class=\"timeline-widget--controls\">\n    <button class=\"prev\"><div class=\"arrow\"></div></button>\n    <button class=\"next\"><div class=\"arrow\"></div></button>\n  </div>\n\n  <div class=\"timeline-widget--dropdown\">\n    <div class=\"timeline-widget--dropdown-heading\">\n      <span class=\"button-arrow\"></span> Timeline - Calendar</div>\n    <div class=\"clear\"></div>\n    <div class=\"timeline-widget--dropdown--wrapper\">\n      <div class=\"timeline-widget--dropdown-controls\">\n        <div class=\"form-select\">\n          <select name=\"year\">\n          </select>\n        </div>\n        <div class=\"form-select\">\n          <select name=\"month\">\n          </select>\n        </div>\n        <button class=\"form-today\">Today</button>\n        <span class=\"close\"></span>\n      </div>\n      <div class=\"timeline-widget--dropdown--container\">\n        <ul class=\"slidee\">\n";
  stack1 = ((helper = (helper = helpers['timeline-items'] || (depth0 != null ? depth0['timeline-items'] : depth0)) != null ? helper : alias1),(options={"name":"timeline-items","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers['timeline-items']) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "          <li class=\"timeline-widget--dropdown--end-of-line\">No More Entries</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"timeline-widget--frames\">\n    <ul class=\"slidee\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0['timeline-items'] : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n  </div>\n  <div class=\"clear-both\"></div>\n</div>";
},"useData":true});
})();