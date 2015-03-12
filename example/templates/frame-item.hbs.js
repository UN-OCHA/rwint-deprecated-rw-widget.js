(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['frame-item.hbs'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<li class=\"timeline-widget-item\">\n  <div class=\"timeline-widget-item--header\">\n    <div class=\"timeline-widget-item--headline\">\n      <div class=\"timeline-widget-item--category\">Ocha <div class=\"arrow\"></div></div> <div class=\"timeline-widget-item--date\">"
    + alias2(alias1((depth0 != null ? depth0['date-full'] : depth0), depth0))
    + "</div>\n    </div>\n    <h1 class=\"timeline-widget-item--title\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</h1>\n  </div>\n  <div class=\"timeline-widget-item--content\">\n    <div class=\"timeline-widget-item--image\">\n      <div class=\"timeline-widget-item--image--icons\">\n        <a class=\"timeline-widget-item--image--view-more\"><img src=\"../../images/eye-img--yellow.png\"></a>\n        <a class=\"timeline-widget-item--image--country\">"
    + alias2(alias1((depth0 != null ? depth0.country : depth0), depth0))
    + "</a>\n      </div>\n      <img src=\""
    + alias2(alias1((depth0 != null ? depth0['img-src'] : depth0), depth0))
    + "\" />\n    </div>\n    <div class=\"timeline-widget-item--description\">\n      "
    + ((stack1 = alias1((depth0 != null ? depth0['long-desc'] : depth0), depth0)) != null ? stack1 : "")
    + "\n      <div class=\"timeline-widget-item-link\">\n        <a class=\"btn\" href=\""
    + alias2(alias1((depth0 != null ? depth0.url : depth0), depth0))
    + "\" target=\"_blank\"><span class=\"un-icon-product_type_report\"></span> Read full report</a>\n      </div>\n    </div>\n  </div>\n</li>";
},"useData":true});
})();