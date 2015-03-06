(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['river-item.hbs'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li class=\"filters-content--item\">\n  <div class=\"filters-content--item-date\">"
    + alias3(((helper = (helper = helpers.item_date || (depth0 != null ? depth0.item_date : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"item_date","hash":{},"data":data}) : helper)))
    + "</div>\n  <h3 class=\"filters-content--item-title\">"
    + alias3(((helper = (helper = helpers.item_title || (depth0 != null ? depth0.item_title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"item_title","hash":{},"data":data}) : helper)))
    + "</h3>\n  <div class=\"filters-content--item-source\">"
    + alias3(((helper = (helper = helpers.item_source || (depth0 != null ? depth0.item_source : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"item_source","hash":{},"data":data}) : helper)))
    + "</div>\n</li>";
},"useData":true});
})();