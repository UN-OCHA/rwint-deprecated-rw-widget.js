(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['financial.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <a href=\"\" class=\"financial-widget--data-source\">"
    + escapeExpression(((helper = (helper = helpers.dataItemTitle || (depth0 != null ? depth0.dataItemTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dataItemTitle","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"financial-widget\">\n  <h1 class=\"widget-title\"><span><i class=\"un-icon-activity_financing widget-title--icon\"></i>";
  stack1 = ((helper = (helper = helpers.adjustedTitle || (depth0 != null ? depth0.adjustedTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"adjustedTitle","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</span></h1>\n  <div class=\"financial-widget--data-source-chooser\">\n";
  stack1 = ((helper = (helper = helpers.dataSources || (depth0 != null ? depth0.dataSources : depth0)) != null ? helper : helperMissing),(options={"name":"dataSources","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.dataSources) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n  <div class=\"financial-widget--time\">\n    <h1>"
    + escapeExpression(((helper = (helper = helpers.dataItemTitleCurrent || (depth0 != null ? depth0.dataItemTitleCurrent : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dataItemTitleCurrent","hash":{},"data":data}) : helper)))
    + "</h1>\n    <select class=\"financial-widget--time-select\" name=\"time-chooser\" id=\"\">\n    </select>\n  </div>\n  <div class=\"financial-widget--percent-funded\">\n    <div class=\"financial-widget--percent-funded--amount covered\">$2.12B Funded <span class=\"percent\">57% <span>covered</span></span>\n    </div>\n    <div class=\"financial-widget--percent-funded--amount requested \">$3.74B Requested</div>\n  </div>\n  <div class=\"financial-widget--cluster-funding\">\n    <h2>Requirements &amp; Funding Per Cluster</h2>\n    <div id=\"finance-bubbles\"></div>\n  </div>\n  <footer class=\"financial-widget--explore\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.fundingDocumentURL || (depth0 != null ? depth0.fundingDocumentURL : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"fundingDocumentURL","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">Explore Funding Documents via ReliefWeb</a></footer>\n  <footer class=\"financial-widget--sources\">Data Source <cite><a href=\""
    + escapeExpression(((helper = (helper = helpers.dataSourceURL || (depth0 != null ? depth0.dataSourceURL : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dataSourceURL","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">Financial Tracking Service</a></cite></footer>\n</div>\n";
},"useData":true});
})();