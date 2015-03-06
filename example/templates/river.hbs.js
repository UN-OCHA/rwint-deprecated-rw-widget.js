(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['river.hbs'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"widget-river\" id=\"widget-river\">\n  <h1 class=\"widget-title\"><span><i class=\"un-icon-activity_reporting widget-title--icon\"></i>"
    + ((stack1 = ((helper = (helper = helpers.adjustedTitle || (depth0 != null ? depth0.adjustedTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"adjustedTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span></h1>\n  <div class=\"widget-river--results clearfix\">\n\n    <div class=\"accordion-set widget-river--filters results--item--reports\">\n      <h5 class=\"widget-river--filters--title\">Filter Results:  <span class=\"tab\">Reports</span> <span class=\"close\"></span></h5>\n      <!--Item 1-->\n      <input type=\"radio\" name=\"river\" id=\"situation-reports\" class=\"accordion-set--check\"/>\n      <label for=\"situation-reports\" class=\"accordion-set--label\">Situation Reports</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Situation Reports</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">25 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Factsheet Syrian Crisis - January 2015</h3>\n\n              <div class=\"filters-content--item-source\">Swiss Agency for Development and Coopration</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">23 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Jordan Refugee Response - Inter-Agency Winterization Update: Response to Snow Storm Jana, 23rd February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN High Commissioner for Refugees</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">18 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Syrian refugees: Inter-agency regional update, 18 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN High Commissioner for Refugees</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">18 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Syria operations from Turkey, Humanitarian Bulletin Issue 13 | 02-17 Feb 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Office for the Coordination of Humanitarian Affairs</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 2-->\n      <input type=\"radio\" name=\"river\" id=\"needs-assessments\" class=\"accordion-set--check\"/>\n      <label for=\"needs-assessments\" class=\"accordion-set--label\">Needs Assessments</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Needs Assessments</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">An assessment of antenatal care among Syrian refugees in Lebanon</h3>\n\n              <div class=\"filters-content--item-source\">BioMed Central</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">23 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Winterisation assessment in Al Za’atari refugee camp in Jordan - October 2014</h3>\n\n              <div class=\"filters-content--item-source\">UN High Commissioner for Refugees, REACH Initiative</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">13 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Economic and social impact assessment of the Syrian conflict and the ISIS crisis</h3>\n\n              <div class=\"filters-content--item-source\">World Bank</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">03 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Understanding livelihoods in northern Syria: how people are coping with repeated shocks, constant change and an uncertain future</h3>\n\n              <div class=\"filters-content--item-source\">Save the Children</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 3-->\n      <input type=\"radio\" name=\"river\" id=\"education\" class=\"accordion-set--check\"/>\n      <label for=\"education\" class=\"accordion-set--label\">Education</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Education</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">28 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Programmes implemented by the UN Agencies with the contribution of the Italian Government for a total amount of 2.5 million Euro</h3>\n\n              <div class=\"filters-content--item-source\">UN Development Programme</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Emergencies updates: 6 to 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">Oxfam</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Japan commits US$ 32.2 million to support Palestine refugees</h3>\n\n              <div class=\"filters-content--item-source\">UN Relief and Works Agency for Palestine Refugees in the Near East</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Implementation of Security Council resolutions 2139 (2014), 2165 (2014) and 2191 (2014) - Report of the Secretary-General (S/2015/124) [EN/AR]</h3>\n\n              <div class=\"filters-content--item-source\">UN Security Council</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 4-->\n      <input type=\"radio\" name=\"river\" id=\"emergency-shelter\" class=\"accordion-set--check\"/>\n      <label for=\"emergency-shelter\" class=\"accordion-set--label\">Emergency Shelter</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Emergency Shelter</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Emergencies updates: 6 to 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">Oxfam</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Syria Response Official Fuel Prices Snapshot (Jan 2014 – Feb 2015)</h3>\n\n              <div class=\"filters-content--item-source\">World Food Programme, Logistics Cluster</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Inter-Sector Working Group (ISWG) Work Plan: January to June 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN High Commissioner for Refugees</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Japan commits US$ 32.2 million to support Palestine refugees</h3>\n\n              <div class=\"filters-content--item-source\">UN Relief and Works Agency for Palestine Refugees in the Near East</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 5-->\n      <input type=\"radio\" name=\"river\" id=\"emergency-telecommunications\" class=\"accordion-set--check\"/>\n      <label for=\"emergency-telecommunications\" class=\"accordion-set--label\">Emergency Telecommunications</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Emergency Telecommunications</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">28 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Turkey | Syria: Border Crossings Status - 27 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Office for the Coordination of Humanitarian Affairs</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Syria Crisis: Logistics Cluster Warehouse Capacity as of 23rd February 2015</h3>\n\n              <div class=\"filters-content--item-source\">World Food Programme, Logistics Cluster</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Assistant Secretary-General for Humanitarian Affairs and Deputy Emergency Relief Coordinator, Kyung-Wha Kang: Security Council Briefing on Syria - New York, 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Office for the Coordination of Humanitarian Affairs</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">More than 55 responses in January, 2015</h3>\n\n              <div class=\"filters-content--item-source\">Syrian Arab Red Crescent</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 6-->\n      <input type=\"radio\" name=\"river\" id=\"food-security\" class=\"accordion-set--check\"/>\n      <label for=\"food-security\" class=\"accordion-set--label\">Food Security</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Food Security</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Emergencies updates: 6 to 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">Oxfam</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">The crisis in Yarmouk Camp, 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Relief and Works Agency for Palestine Refugees in the Near East</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">In Hama, Kirnaz city receives aid for the first time after two years</h3>\n\n              <div class=\"filters-content--item-source\">Syrian Arab Red Crescent</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Implementation of Security Council resolutions 2139 (2014), 2165 (2014) and 2191 (2014) - Report of the Secretary-General (S/2015/124) [EN/AR]</h3>\n\n              <div class=\"filters-content--item-source\">UN Security Council</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 7-->\n      <input type=\"radio\" name=\"river\" id=\"health\" class=\"accordion-set--check\"/>\n      <label for=\"health\" class=\"accordion-set--label\">Health</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Health</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Syria’s Medical Community Under Assault</h3>\n\n              <div class=\"filters-content--item-source\">Physicians for Human Rights</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Emergencies updates: 6 to 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">Oxfam</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Palestinian refugee camps in Lebanon and Syria: Red Cross Red Crescent is calling for greater support for refugees</h3>\n\n              <div class=\"filters-content--item-source\">International Committee of the Red Cross, Palestine Red Crescent Society, International Federation of Red Cross And Red Crescent Societies</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Polio this week as of 25 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">Global Polio Eradication Initiative</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 8-->\n      <input type=\"radio\" name=\"river\" id=\"logistics\" class=\"accordion-set--check\"/>\n      <label for=\"logistics\" class=\"accordion-set--label\">Logistics</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Logistics</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">28 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Turkey | Syria: Border Crossings Status - 27 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Office for the Coordination of Humanitarian Affairs</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Syria Crisis: Logistics Cluster Warehouse Capacity as of 23rd February 2015</h3>\n\n              <div class=\"filters-content--item-source\">World Food Programme, Logistics Cluster</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Assistant Secretary-General for Humanitarian Affairs and Deputy Emergency Relief Coordinator, Kyung-Wha Kang: Security Council Briefing on Syria - New York, 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Office for the Coordination of Humanitarian Affairs</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">More than 55 responses in January, 2015</h3>\n\n              <div class=\"filters-content--item-source\">Syrian Arab Red Crescent</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 9-->\n      <input type=\"radio\" name=\"river\" id=\"nutrition\" class=\"accordion-set--check\"/>\n      <label for=\"nutrition\" class=\"accordion-set--label\">Nutrition</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Nutrition</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Emergencies updates: 6 to 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">Oxfam</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">The crisis in Yarmouk Camp, 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Relief and Works Agency for Palestine Refugees in the Near East</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">In Hama, Kirnaz city receives aid for the first time after two years</h3>\n\n              <div class=\"filters-content--item-source\">Syrian Arab Red Crescent</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Implementation of Security Council resolutions 2139 (2014), 2165 (2014) and 2191 (2014) - Report of the Secretary-General (S/2015/124) [EN/AR]</h3>\n\n              <div class=\"filters-content--item-source\">UN Security Council</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 10-->\n      <input type=\"radio\" name=\"river\" id=\"protection\" class=\"accordion-set--check\"/>\n      <label for=\"protection\" class=\"accordion-set--label\">Protection</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Protection</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Emergencies updates: 6 to 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">Oxfam</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Car bomb kills 11 outside Damascus: monitor</h3>\n\n              <div class=\"filters-content--item-source\">Agence France-Presse</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Syria’s war continues ‘unabated and with total impunity,’ Security Council told</h3>\n\n              <div class=\"filters-content--item-source\">UN News Service</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">The crisis in Yarmouk Camp, 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Relief and Works Agency for Palestine Refugees in the Near East</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>\n";
},"useData":true});
})();