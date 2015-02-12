(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['timeline.hbs'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, buffer = "";

  stack1 = ((helper = (helper = helpers['new-month'] || (depth0 != null ? depth0['new-month'] : depth0)) != null ? helper : alias1),(options={"name":"new-month","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers['new-month']) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            <li class=\"timeline-widget-dropdown--list-item\" data-slide=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n              <div class=\"timeline-widget--dot\">\n                <div class=\"timeline-widget--dot--date\">\n                  "
    + alias3(((helper = (helper = helpers['date-day'] || (depth0 != null ? depth0['date-day'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date-day","hash":{},"data":data}) : helper)))
    + "\n                </div>\n              </div>\n              <div class=\"timeline-widget-dropdown--item\">\n                "
    + alias3(((helper = (helper = helpers['short-desc'] || (depth0 != null ? depth0['short-desc'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"short-desc","hash":{},"data":data}) : helper)))
    + "\n              </div>\n            </li>\n";
},"2":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "            <li class=\"timeline-widget--dropdown--month\" data-isMonth=\"true\">\n              "
    + alias3(((helper = (helper = helpers['date-month'] || (depth0 != null ? depth0['date-month'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date-month","hash":{},"data":data}) : helper)))
    + " - "
    + alias3(((helper = (helper = helpers['date-year'] || (depth0 != null ? depth0['date-year'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date-year","hash":{},"data":data}) : helper)))
    + "\n            </li>\n";
},"4":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "          <li class=\"timeline-widget-item\">\n            <div class=\"timeline-widget-item--header\">\n              <div class=\"timeline-widget-item--headline\">\n                <div class=\"timeline-widget-item--category\">Ocha <div class=\"arrow\"></div></div> <div class=\"timeline-widget-item--date\">"
    + alias3(((helper = (helper = helpers['date-full'] || (depth0 != null ? depth0['date-full'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date-full","hash":{},"data":data}) : helper)))
    + "</div>\n              </div>\n              <h1 class=\"timeline-widget-item--title\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n            </div>\n            <div class=\"timeline-widget-item--content clearfix\">\n              <div class=\"timeline-widget-item--image grid--item\">\n                <div class=\"timeline-widget-item--image--icons\">\n                  <a class=\"timeline-widget-item--image--view-more\"><img src=\"../../images/eye-img--yellow.png\"></a>\n                  <a class=\"timeline-widget-item--image--country\">"
    + alias3(((helper = (helper = helpers.country || (depth0 != null ? depth0.country : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"country","hash":{},"data":data}) : helper)))
    + "</a>\n                </div>\n                <img src=\""
    + alias3(((helper = (helper = helpers['img-src'] || (depth0 != null ? depth0['img-src'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"img-src","hash":{},"data":data}) : helper)))
    + "\">\n              </div>\n              <div class=\"timeline-widget-item--description grid--item\">\n                "
    + ((stack1 = ((helper = (helper = helpers['long-desc'] || (depth0 != null ? depth0['long-desc'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"long-desc","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n                <div class=\"timeline-widget-item-link\">\n                  <a class=\"btn\" href=\""
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_top\"><span class=\"un-icon-product_type_report\"></span> Read full report</a>\n                </div>\n              </div>\n            </div>\n          </li>\n";
},"6":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <li>\n          <div class=\"timeline-widget-pager--item\" data-slide=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n            <div class=\"timeline-widget--dot\">\n              <div class=\"timeline-widget--dot--date\">\n                "
    + alias3(((helper = (helper = helpers['date-day'] || (depth0 != null ? depth0['date-day'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date-day","hash":{},"data":data}) : helper)))
    + "\n              </div>\n            </div>\n            <div class=\"timeline-widget-pager--item-content\">\n              "
    + alias3(((helper = (helper = helpers['short-desc'] || (depth0 != null ? depth0['short-desc'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"short-desc","hash":{},"data":data}) : helper)))
    + "\n            </div>\n          </div>\n        </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", alias3=helpers.blockHelperMissing, buffer = 
  "<div class=\"timeline-widget-wrapper\">\n  <div class=\"timeline-widget\">\n\n    <div class=\"timeline-widget--controls\">\n      <button class=\"prev\"><div class=\"arrow\"></div></button>\n      <button class=\"next\"><div class=\"arrow\"></div></button>\n    </div><!-- .timeline-widget--controls -->\n\n    <div class=\"timeline-widget--dropdown\">\n      <div class=\"timeline-widget--dropdown-heading\">\n        <span class=\"un-icon-product_type_report\"></span> Timeline - Calendar</div>\n      <div class=\"clear-both\"></div>\n      <div class=\"timeline-widget--dropdown--wrapper\">\n        <div class=\"timeline-widget--dropdown-controls\">\n          <div class=\"form-select\">\n            <select name=\"year\">\n            </select>\n          </div>\n          <div class=\"form-select\">\n            <select name=\"month\"></select>\n          </div>\n          <span class=\"close\"></span>\n        </div>\n        <div class=\"timeline-widget--dropdown--container\">\n          <ul class=\"slidee\">\n";
  stack1 = ((helper = (helper = helpers['timeline-items'] || (depth0 != null ? depth0['timeline-items'] : depth0)) != null ? helper : alias1),(options={"name":"timeline-items","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers['timeline-items']) { stack1 = alias3.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "          </ul>\n        </div>\n      </div>\n    </div><!-- .timeline-widget--controls -->\n\n    <div class=\"timeline-widget-frames-wrapper\">\n      <div class=\"timeline-widget-frames\">\n        <ul class=\"slidee\">\n";
  stack1 = ((helper = (helper = helpers['timeline-items'] || (depth0 != null ? depth0['timeline-items'] : depth0)) != null ? helper : alias1),(options={"name":"timeline-items","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers['timeline-items']) { stack1 = alias3.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </ul>\n        <div class=\"clear-both\"></div>\n      </div><!-- .timeline-widget-frames -->\n    </div><!-- .timeline-widget-frames-wrapper -->\n\n    <div class=\"timeline-widget-pager\">\n      <ul class=\"\">\n";
  stack1 = ((helper = (helper = helpers['timeline-items'] || (depth0 != null ? depth0['timeline-items'] : depth0)) != null ? helper : alias1),(options={"name":"timeline-items","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers['timeline-items']) { stack1 = alias3.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </ul>\n      <div class=\"clear-both\"></div>\n    </div><!-- .timeline-widget-pager -->\n    <div class=\"timeline-widget-pager--current\"></div>\n\n  </div>\n\n</div>\n";
},"useData":true});
})();