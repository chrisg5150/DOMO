"use strict";function configs(a,e,t){var n=function(a,e,t){function n(a){return 401===a.status?e.error("You are unauthorised to access the requested resource (401)"):404===a.status?e.error("The requested resource could not be found (404)"):500===a.status&&e.error("Internal server error (500)"),t.reject(a)}function o(a){return a}return function(a){return a.then(o,n)}};n.$inject=["$location","$log","$q"],a.defaults.useXDomain=!0,delete a.defaults.headers.common["X-Requested-With"],a.interceptors.push(n),e.debugEnabled(t.enableDebug)}function runs(a,e){a.$on("$routeChangeStart",function(){e.loading=!0}),a.$on("$routeChangeSuccess",function(){e.loading=!1})}function config(a){a.when("/revenue",{templateUrl:"sections/revenue/revenue.tpl.html",controller:"RevenueController as revenue",resolve:{revenueData:["DomoService",function(a){return a.getAppData()}]}}).when("/volume",{templateUrl:"sections/volume/volume.tpl.html",controller:"VolumeController as volume",resolve:{volumeData:["DomoService",function(a){return a.getAppData()}]}}).when("/accounts",{templateUrl:"sections/accounts/accounts.tpl.html",controller:"AccountsController as accounts",resolve:{accountsData:["DomoService",function(a){return a.getAppData()}]}}).when("/groups/:groupId",{templateUrl:"sections/groups/groups.tpl.html",controller:"GroupsController as groups",resolve:{groupsData:["DomoService",function(a){return a.getAppData()}]}}).otherwise({redirectTo:"/revenue"})}function domoService(a,e,t,n,o){function r(a,e){var o="/data/v1/"+a,r={url:o,method:"GET",headers:{Accept:"application/array-of-objects"}};return e&&(r.params=e),t(r).then(function(e){return n.domoData[a]=e.data,{}}).catch(u)}function p(){var a=c("revenue_volume"),e=c("accounts");return o.all([a,e]).then(function(a){return a})}function i(a){return n.domoData[a]?!0:!1}function c(a,e){return i(a)?o.when({}):r(a,e)}function u(e){return a.info("XHR Failed for DomoService"),a.info(e),e}{var l={getAppData:p};e.domo}return l}function optionbar(){function a(a,e,t,n){function o(a){l.pageData.optionBar.timeCurrent=a,n.$broadcast("time-change",a.val)}function r(a){l.pageData.optionBar.metricCurrent=a,l.pageData.metricType="Revenue"===a.val?"currency":"number",n.$broadcast("metric-change",a.val)}function p(a){l.pageData.optionBar.viewCurrent=a,n.$broadcast("view-change",a.val)}function i(a){l.pageData.optionBar.viewAccountCurrent=a,n.$broadcast("account-view-change",a.val)}function c(a){l.pageData.optionBar.metricAccountCurrent=a,l.pageData.metricType="CommAmt"===a.val?"currency":"number",n.$broadcast("account-metric-change",a.val)}function u(a){l.pageData.optionBar.aggCurrent=a,n.$broadcast("agg-change",a.val)}var l=this;l.pageData=e,l.pageData.optionBar.metricCurrent=l.pageData.optionBar.metricChoices[0],l.pageData.optionBar.timeCurrent=l.pageData.optionBar.timeChoices[0],l.pageData.optionBar.viewCurrent=l.pageData.optionBar.viewChoices[0],l.pageData.optionBar.viewAccountCurrent=l.pageData.optionBar.viewAccountChoices[0],l.pageData.optionBar.metricAccountCurrent=l.pageData.optionBar.metricAccountChoices[0],l.pageData.optionBar.aggCurrent=l.pageData.optionBar.aggChoices[0],l.changeTime=o,l.changeMetric=r,l.changeView=p,l.changeAccountView=i,l.changeAccountMetric=c,l.changeAgg=u}var e={controller:["$scope","PageData","$log","$rootScope",a],controllerAs:"optionbar",templateUrl:"components/optionbar/optionbar.tpl.html",restrict:"E",replace:!0,scope:{}};return e}function graphbar(){function a(a,e,t,n,o){function r(a){e.$broadcast("bar-click",a)}function p(a){return a&&a.length>0?n("max")(a,"value"):1}var i=this;i.pageData=o,i.barClick=r,a.$watch("graphdata",function(){var e=p(a.graphdata);angular.forEach(a.graphdata,function(t){t.width=Math.round(t.value/e.value*100),t.change=t.value-t.prevValue,t.color=t.change>=0?"green":"red",a.reverse&&(t.color=t.change<=0?"green":"red")})})}var e={controller:["$scope","$rootScope","$log","$filter","PageData",a],controllerAs:"graphbar",templateUrl:"components/graphbar/graphbar.tpl.html",restrict:"E",replace:!0,scope:{graphdata:"=",reverse:"=",metric:"="}};return e}function datatable(){function a(a,e,t,n,o){a.pageData=o,a.open=function(a,e){function t(a,e,t,n,o,r,p){a.pageData=n,a.fieldTypes=p,o&&angular.isArray(o)&&(a.title=o[0][n.dataGroup],a.headings=[],a.data=o,angular.forEach(o[0],function(e,t){var n={name:t.replace(/_/g," "),id:t};"$$hashKey"!==t&&a.headings.push(n)})),a.cancel=function(){e.dismiss("cancel")}}var o=n.open({animation:!0,templateUrl:"datatable-modal.html",controller:["$scope","$uibModalInstance","$log","PageData","obj","$rootScope","fieldTypes",t],size:"lg",resolve:{obj:function(){return a},fieldTypes:function(){return e}}});o.result.then(function(){},function(){})}}var e={controller:["$scope","$rootScope","$log","$uibModal","PageData",a],controllerAs:"datatable",templateUrl:"components/datatable/datatable.tpl.html",restrict:"E",scope:!1};return e}function ngEnter(){return function(a,e,t){e.bind("keydown keypress",function(e){13===e.which&&(a.$apply(function(){a.$eval(t.ngEnter)}),e.preventDefault())})}}function useFilter(a){return function(e,t){return"STRING"===t||""===t?e:a(t)(e)}}function percentage(a){return function(e,t){return a("number")(100*e,t)+"%"}}function useSummaryFilter(a){return function(e,t){return"STRING"===t||""===t?e:"currency"===t?"$"+a("number")(Math.round(e)):a(t)(e)}}var env={};window&&(env=window.__env),angular.module("app.config",[]).config(configs).run(runs).constant("ENV",env),configs.$inject=["$httpProvider","$logProvider","ENV"],runs.$inject=["$rootScope","PageData"],angular.module("app.routes",["ngRoute"]).config(config),config.$inject=["$routeProvider"],angular.module("app.core",[]),angular.module("app.services",[]),angular.module("app",["ngRoute","ngAnimate","angularMoment","ngMessages","truncate","base64","chart.js","ui.bootstrap","angular.filter","app.routes","app.core","app.services","app.config","app.templates"]),angular.module("app.services").factory("DomoService",domoService),domoService.$inject=["$log","$window","$http","PageData","$q","$rootScope"],angular.module("app.core").value("PageData",{title:null,icon:null,description:null,loading:!1,metricType:"currency",dataGroup:"subcategory",lang:{mom:"MoM",yoy:"YoY",pop:"PoP"},optionBar:{show:!0,timeShow:!0,timeCurrent:{},timeChoices:[{name:"Month to Date",val:"MTD"},{name:"Year to Date",val:"YTD"},{name:"Last 12 Months",val:"TR12"},{name:"Last 3 Years",val:"TR3YR"}],metricShow:!1,metricCurrent:{},metricChoices:[{name:"Revenue",val:"Revenue"}],aggShow:!0,aggCurrent:{},aggChoices:[{name:"Total",val:"Sum"},{name:"Average",val:"Avg"}],viewShow:!0,viewCurrent:{},viewChoices:[{name:"By Group",val:"repGroupDesc"},{name:"By Tier",val:"tier"},{name:"By Product",val:"productType"},{name:"By Account",val:"accountType"}],viewAccountShow:!1,viewAccountCurrent:{},viewAccountChoices:[{name:"By Group",val:"repGroupDesc"},{name:"By Rep",val:"RepName"},{name:"By Trade Status",val:"TradeStatus"}],metricAccountShow:!1,metricAccountCurrent:{},metricAccountChoices:[{name:"Opened",val:"Opened"},{name:"Active",val:"Active"},{name:"Commission",val:"CommAmt"}],backShow:!1},domoData:{},userData:{userEmail:""}}),angular.module("app.core").controller("RevenueController",["$scope","$rootScope","PageData","$log","revenueData","$filter","$location",function(a,e,t,n,o,r,p){function i(){u(),c(),g()}function c(){var a=t.optionBar.aggCurrent.val;m.total=m["get"+a](m.data,"value"),m.prevTotal=m["get"+a](m.data,"prevValue"),m.totalChange=m.getChange(m.total,m.prevTotal),m.changeClass=m.totalChange>=0?"green":"red"}function u(){m.data=l(t.domoData.revenue_volume),m.compStr=v[t.optionBar.timeCurrent.val]}function l(a){var e=[];if(a){{var n=t.optionBar.timeCurrent.val,o=t.optionBar.metricCurrent.val,r=t.optionBar.viewCurrent.val;t.optionBar.aggCurrent.val}e=a.map(function(a){var e={};return e.value=a[n+"_"+o],e.prevValue=a["prevYear_"+n+"_"+o],e.name=a[r]||"Unknown",e.id=a.repGroupID,e.report_date=a.businessDate,e.repId=a.repID,e})}return e}function g(){var a=r("groupBy")(m.data,"name");m.chart.data=[],a&&(angular.forEach(a,function(a,e){var n=t.optionBar.aggCurrent.val,o={subcategory:e||"Unknown",id:a[0].id,value:m["get"+n](a,"value"),prevValue:m["get"+n](a,"prevValue")};m.chart.data.push(o)}),m.chart.data=r("orderBy")(m.chart.data,"value",!0))}function s(a){var t=r("where")(m.data,{name:a.subcategory});e.$broadcast("open-drill",t),p.path("groups/"+a.id)}function d(){m.pageData=t,m.pageData.title="Revenue",m.pageData.optionBar.show=!0,m.pageData.optionBar.aggShow=!0,m.pageData.optionBar.timeShow=!0,m.pageData.optionBar.metricShow=!1,m.pageData.optionBar.viewShow=!0,m.pageData.optionBar.backShow=!1,m.pageData.optionBar.viewAccountShow=!1,m.pageData.optionBar.metricAccountShow=!1,m.pageData.optionBar.metricCurrent={name:"Revenue",val:"Revenue"},m.changeClass="",m.chart={},m.chart.options={responsive:!0},m.openDrill=s,i()}var v={MTD:t.lang.mom,YTD:t.lang.yoy,TR12:t.lang.pop,TR3YR:t.lang.pop},m=this;m.getSum=function(a,e){return a&&a.length>0?+a.map(function(a){return a[e]||0}).reduce(function(a,e){return a+e}).toFixed(2):0},m.getAvg=function(a,e){if(a&&a.length>0){var t=a.length,n=a.map(function(a){return a[e]||0}).reduce(function(a,e){return a+e});return+(n/t).toFixed(2)}return 0},m.getChange=function(a,e){return a-e},a.$on("time-change",function(){i()}),a.$on("metric-change",function(){i()}),a.$on("agg-change",function(){i()}),a.$on("view-change",function(){i()}),a.$on("bar-click",function(a,e){"repGroupDesc"===t.optionBar.viewCurrent.val&&s(e)}),d()}]),angular.module("app.core").controller("GroupsController",["$scope","$rootScope","PageData","$log","groupsData","$filter","$routeParams",function(a,e,t,n,o,r,p){function i(){u(),c(),g()}function c(){var a=t.optionBar.aggCurrent.val;v.total=v["get"+a](v.data,"value"),v.prevTotal=v["get"+a](v.data,"prevValue"),v.totalChange=v.getChange(v.total,v.prevTotal),v.changeClass=v.totalChange>=0?"green":"red"}function u(){v.data=l(t.domoData.revenue_volume),v.compStr=d[t.optionBar.timeCurrent.val]}function l(a){var e=[];if(a){{var n=t.optionBar.timeCurrent.val,o=t.optionBar.metricCurrent.val;t.optionBar.viewCurrent.val,t.optionBar.aggCurrent.val}e=r("where")(a,{repGroupID:v.groupId}),e=e.map(function(a){var e={};return e.value=a[n+"_"+o],e.prevValue=a["prevYear_"+n+"_"+o],e.name=a.repName||"Unknown",e.report_date=a.businessDate,e})}return e}function g(){var a=r("groupBy")(v.data,"name");v.chart.data=[],a&&(angular.forEach(a,function(a,e){var n=t.optionBar.aggCurrent.val,o={subcategory:e,value:v["get"+n](a,"value"),prevValue:v["get"+n](a,"prevValue")};v.chart.data.push(o)}),v.chart.data=r("orderBy")(v.chart.data,"value",!0))}function s(){v.pageData=t,v.pageData.title="Reps",v.pageData.optionBar.show=!0,v.pageData.optionBar.aggShow=!0,v.pageData.optionBar.timeShow=!0,v.pageData.optionBar.metricShow=!1,v.pageData.optionBar.viewShow=!1,v.pageData.optionBar.backShow=!0,v.pageData.optionBar.viewAccountShow=!1,v.pageData.optionBar.metricAccountShow=!1,v.pageData.optionBar.metricCurrent={name:"Revenue",val:"Revenue"},v.changeClass="",v.chart={},v.chart.options={responsive:!0},i()}var d={MTD:t.lang.mom,YTD:t.lang.yoy,TR12:t.lang.pop,TR3YR:t.lang.pop},v=this;v.groupId=p.groupId,v.getSum=function(a,e){return a&&a.length>0?+a.map(function(a){return a[e]||0}).reduce(function(a,e){return a+e}).toFixed(2):0},v.getAvg=function(a,e){if(a&&a.length>0){var t=a.length,n=a.map(function(a){return a[e]||0}).reduce(function(a,e){return a+e});return+(n/t).toFixed(2)}return 0},v.getChange=function(a,e){return a-e},a.$on("time-change",function(){i()}),a.$on("metric-change",function(){i()}),a.$on("agg-change",function(){i()}),a.$on("view-change",function(){i()}),s()}]),angular.module("app.core").controller("VolumeController",["$scope","$rootScope","PageData","$log","volumeData","$filter",function(a,e,t,n,o,r){function p(){c(),i(),l()}function i(){var a=t.optionBar.aggCurrent.val;d.total=d["get"+a](d.data,"value"),d.prevTotal=d["get"+a](d.data,"prevValue"),d.totalChange=d.getChange(d.total,d.prevTotal),d.changeClass=d.totalChange>=0?"green":"red"}function c(){d.data=u(t.domoData.revenue_volume),d.compStr=s[t.optionBar.timeCurrent.val]}function u(a){var e=[];if(a){{var n=t.optionBar.timeCurrent.val,o=t.optionBar.metricCurrent.val,r=t.optionBar.viewCurrent.val;t.optionBar.aggCurrent.val}e=a.map(function(a){var e={};return e.value=a[n+"_"+o],e.prevValue=a["prevYear_"+n+"_"+o],e.name=a[r]||"Unknown",e.report_date=a.businessDate,e})}return e}function l(){var a=r("groupBy")(d.data,"name");d.chart.data=[],a&&(angular.forEach(a,function(a,e){var n=t.optionBar.aggCurrent.val,o={subcategory:e||"None",value:d["get"+n](a,"value"),prevValue:d["get"+n](a,"prevValue")};d.chart.data.push(o)}),d.chart.data=r("orderBy")(d.chart.data,"value",!0))}function g(){d.pageData=t,d.pageData.title="Volume",d.pageData.optionBar.show=!0,d.pageData.optionBar.aggShow=!0,d.pageData.optionBar.timeShow=!0,d.pageData.optionBar.metricShow=!1,d.pageData.optionBar.viewShow=!0,d.pageData.optionBar.backShow=!1,d.pageData.optionBar.viewAccountShow=!1,d.pageData.optionBar.metricAccountShow=!1,d.pageData.optionBar.metricCurrent={name:"Volume",val:"Volume"},d.changeClass="",d.chart={},d.chart.options={responsive:!0},p()}var s={MTD:t.lang.mom,YTD:t.lang.yoy,TR12:t.lang.pop,TR3YR:t.lang.pop},d=this;d.getSum=function(a,e){return a&&a.length>0?+a.map(function(a){return a[e]||0}).reduce(function(a,e){return a+e}).toFixed(2):0},d.getAvg=function(a,e){if(a&&a.length>0){var t=a.length,n=a.map(function(a){return a[e]||0}).reduce(function(a,e){return a+e});return+(n/t).toFixed(2)}return 0},d.getChange=function(a,e){return a-e},a.$on("time-change",function(){p()}),a.$on("metric-change",function(){p()}),a.$on("agg-change",function(){p()}),a.$on("view-change",function(){p()}),a.$on("bar-click",function(){}),g()}]),angular.module("app.core").controller("AccountsController",["$scope","$rootScope","PageData","$log","accountsData","$filter",function(a,e,t,n,o,r){function p(){c(),i(),l()}function i(){var a=t.optionBar.aggCurrent.val;d.total=d["get"+a](d.data,"value"),d.prevTotal=d["get"+a](d.data,"prevValue"),d.totalChange=d.getChange(d.total,d.prevTotal),d.changeClass=d.totalChange>=0?"green":"red"}function c(){d.data=u(t.domoData.accounts),d.compStr=s[t.optionBar.timeCurrent.val]}function u(a){var e=[];if(a){{var n=t.optionBar.timeCurrent.val,o=t.optionBar.metricAccountCurrent.val,r=t.optionBar.viewAccountCurrent.val;t.optionBar.viewAccountCurrent.name,t.optionBar.aggCurrent.val}e=a.map(function(a){var e={},t=a[n+"_"+o],p=a["prevYear_"+n+"_"+o];return angular.isString(t)&&(t="Y"===t?1:0,p="Y"===p?1:0),e.value=t,e.prevValue=p,e.name=a[r]||"Unknown",e.create_date=a.CreateDate,e})}return e}function l(){var a=r("groupBy")(d.data,"name");d.chart.data=[],a&&(angular.forEach(a,function(a,e){var n=t.optionBar.aggCurrent.val,o={subcategory:" "===e?"None":e,value:d["get"+n](a,"value"),prevValue:d["get"+n](a,"prevValue")};d.chart.data.push(o)}),d.chart.data=r("orderBy")(d.chart.data,"value",!0))}function g(){d.pageData=t,d.pageData.title="Accounts",d.pageData.optionBar.show=!0,d.pageData.optionBar.aggShow=!0,d.pageData.optionBar.timeShow=!0,d.pageData.optionBar.metricShow=!1,d.pageData.optionBar.viewShow=!1,d.pageData.optionBar.viewAccountShow=!0,d.pageData.optionBar.metricAccountShow=!0,d.pageData.optionBar.backShow=!1,d.pageData.metricType="number",d.pageData.optionBar.metricAccountCurrent={name:"Opened",val:"Opened"},d.changeClass="",d.chart={},d.chart.options={responsive:!0},p()}var s={MTD:t.lang.mom,YTD:t.lang.yoy,TR12:t.lang.pop,TR3YR:t.lang.pop},d=this;d.getSum=function(a,e){return a&&a.length>0?+a.map(function(a){return a[e]||0}).reduce(function(a,e){return a+e}).toFixed(2):0},d.getAvg=function(a,e){if(a&&a.length>0){var t=a.length,n=a.map(function(a){return a[e]||0}).reduce(function(a,e){return a+e});return+(n/t).toFixed(2)}return 0},d.getChange=function(a,e){return a-e},a.$on("time-change",function(){p()}),a.$on("account-metric-change",function(){p()}),a.$on("agg-change",function(){p()}),a.$on("account-view-change",function(){p()}),a.$on("bar-click",function(){}),g()}]),angular.module("app.core").controller("NavbarController",["$scope","PageData","$rootScope",function(a,e,t){function n(){o.isNavCollapsed=!0}var o=this;o.isNavCollapsed=!0,o.isCollapsed=!1,o.isCollapsedHorizontal=!1,o.pageData=e;t.$on("$routeChangeStart",function(){n()})}]),angular.module("app.core").directive("optionbar",optionbar),angular.module("app.core").directive("graphbar",graphbar),angular.module("app.core").directive("datatable",datatable),angular.module("app.core").directive("ngEnter",ngEnter),angular.module("app.core").filter("useFilter",useFilter),useFilter.$inject=["$filter"],angular.module("app.core").filter("percentage",percentage),percentage.$inject=["$filter"],angular.module("app.core").filter("useSummaryFilter",useSummaryFilter),useSummaryFilter.$inject=["$filter"],function(a){try{a=angular.module("app.templates")}catch(e){a=angular.module("app.templates",[])}a.run(["$templateCache",function(a){a.put("components/datatable/datatable.tpl.html",'\n<script type="text/ng-template" id="datatable-modal.html">\n  <div class="datatable">\n      <div class="modal-header">\n          <h3 class="modal-title">{{title}}</h3>\n          <div class="exit-btn glyphicon glyphicon-remove" ng-click="cancel()" ></div>\n      </div>\n      <div class="modal-body">\n        <table st-table="data" class="table">\n        	<thead>\n            <tr>\n      				<th colspan="{{headings.length}}"><input st-search="" class="form-control" placeholder="Search" type="text"/></th>\n      			</tr>\n          	<tr>\n          		<th st-sort="{{heading.id}}" class="hot-heading" st-class-descent="down-on" st-class-ascent="up-on" data-ng-repeat="heading in headings">{{heading.name | uppercase}}<span class="uparrow glyphicon glyphicon-triangle-top"></span><span class="uparrow glyphicon glyphicon-triangle-top disabled"></span><span class="downarrow glyphicon glyphicon-triangle-bottom"></span></th>\n          	</tr>\n        	</thead>\n        	<tbody>\n          	<tr data-ng-repeat="row in data">\n          		<td data-ng-repeat="head in headings">{{row[head.id] | useFilter:fieldTypes[$index]}}</td>\n          	</tr>\n        	</tbody>\n        </table>\n      </div>\n    </div>\n  </script>\n')}])}(),function(a){try{a=angular.module("app.templates")}catch(e){a=angular.module("app.templates",[])}a.run(["$templateCache",function(a){a.put("components/graphbar/graphbar.tpl.html",'<div class="graphbar-container">\n  <table class="graphbar-table">\n      <tr class="graphbar-row graphbar-link" ng-click="graphbar.barClick(data)" ng-mouseover="hlclass=\'highlight\'" ng-mouseleave="hlclass=\'normal\'" data-ng-repeat="data in graphdata">\n        <td class="graphbar-titles" ng-class="hlclass" ><h4>{{data.subcategory}}</h4></td>\n        <td class="graphbar-bar-col" ng-class="hlclass" ><div class="graphbar-bar bg" ng-style="{\'width\':data.width+\'%\'}" ng-class="data.color"><div class="bar-text">{{data.value | useSummaryFilter:graphbar.pageData.metricType}} {{metric}}</div></div></td>\n        <td class="graphbar-change-col text" ng-class="[data.color,hlclass]" >{{data.change | useSummaryFilter:graphbar.pageData.metricType}}\n          <span class="glyphicon graphbar-arrow" ng-hide="reverse" ng-class="(data.color==\'green\')?\'glyphicon glyphicon-triangle-top\':\'glyphicon-triangle-bottom\'"></span>\n          <span class="glyphicon graphbar-arrow" ng-hide="!reverse" ng-class="(data.color==\'green\')?\'glyphicon glyphicon-triangle-bottom\':\'glyphicon-triangle-top\'"></span></td>\n      </tr>\n  </table>\n</div>\n')}])}(),function(a){try{a=angular.module("app.templates")}catch(e){a=angular.module("app.templates",[])}a.run(["$templateCache",function(a){a.put("components/optionbar/optionbar.tpl.html",'<div id="optionbar-container" data-ng-show="optionbar.pageData.optionBar.show">\n    <div class="optionbar-title" >\n      <h3 data-ng-cloak>{{optionbar.pageData.title}}</h3>\n    </div>\n\n    <div id="optionbar-selects" class="pull-right">\n\n      <div id="backtogroups" class="optionbar-dropdown pull-right" data-ng-show="optionbar.pageData.optionBar.backShow">\n        <div class="btn-group" >\n            <a href="#!/revenue">\n              <button type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">\n                <span class="current-option pull-left">Back to Revenue</span> \n              </button>\n            </a>          \n        </div>\n      </div>\n\n      <div id="viewdropdown" class="optionbar-dropdown pull-right" data-ng-show="optionbar.pageData.optionBar.viewShow">\n        <div class="btn-group dropdown" uib-dropdown >\n          <button type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">\n            <span class="current-option pull-left">{{optionbar.pageData.optionBar.viewCurrent.name}}</span> <span class="caret"></span>\n          </button>\n          <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu role="menu" aria-labelledby="single-button">\n            <li role="menuitem" data-ng-repeat="vchoice in optionbar.pageData.optionBar.viewChoices" ><a ng-click="optionbar.changeView(vchoice)">{{vchoice.name}}</a></li>\n          </ul>\n        </div>\n      </div>\n\n      <div id="viewaccountdropdown" class="optionbar-dropdown pull-right" data-ng-show="optionbar.pageData.optionBar.viewAccountShow">\n          <div class="btn-group dropdown" uib-dropdown >\n            <button type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">\n              <span class="current-option pull-left">{{optionbar.pageData.optionBar.viewAccountCurrent.name}}</span> <span class="caret"></span>\n            </button>\n            <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu role="menu" aria-labelledby="single-button">\n              <li role="menuitem" data-ng-repeat="vchoice in optionbar.pageData.optionBar.viewAccountChoices" ><a ng-click="optionbar.changeAccountView(vchoice)">{{vchoice.name}}</a></li>\n            </ul>\n          </div>\n        </div>\n\n      <div id="metricdropdown" class="optionbar-dropdown pull-right" data-ng-show="optionbar.pageData.optionBar.metricShow">\n        <div class="btn-group dropdown" uib-dropdown >\n          <button type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">\n            <span class="current-option pull-left">{{optionbar.pageData.optionBar.metricCurrent.name}}</span> <span class="caret"></span>\n          </button>\n          <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu role="menu" aria-labelledby="single-button">\n            <li role="menuitem" data-ng-repeat="choice in optionbar.pageData.optionBar.metricChoices" ><a ng-click="optionbar.changeMetric(choice)">{{choice.name}}</a></li>\n          </ul>\n        </div>\n      </div>\n\n      <div id="metricaccountdropdown" class="optionbar-dropdown pull-right" data-ng-show="optionbar.pageData.optionBar.metricAccountShow">\n          <div class="btn-group dropdown" uib-dropdown >\n            <button type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">\n              <span class="current-option pull-left">{{optionbar.pageData.optionBar.metricAccountCurrent.name}}</span> <span class="caret"></span>\n            </button>\n            <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu role="menu" aria-labelledby="single-button">\n              <li role="menuitem" data-ng-repeat="choice in optionbar.pageData.optionBar.metricAccountChoices" ><a ng-click="optionbar.changeAccountMetric(choice)">{{choice.name}}</a></li>\n            </ul>\n          </div>\n        </div>\n\n      <div id="aggdropdown" class="optionbar-dropdown pull-right" data-ng-show="optionbar.pageData.optionBar.aggShow">\n        <div class="btn-group dropdown" uib-dropdown >\n          <button type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">\n            <span class="current-option pull-left">{{optionbar.pageData.optionBar.aggCurrent.name}}</span> <span class="caret"></span>\n          </button>\n          <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu role="menu" aria-labelledby="single-button">\n            <li role="menuitem" data-ng-repeat="choice in optionbar.pageData.optionBar.aggChoices" ><a ng-click="optionbar.changeAgg(choice)">{{choice.name}}</a></li>\n          </ul>\n        </div>\n      </div>\n\n      <div id="timedropdown" class="optionbar-dropdown pull-right" data-ng-show="optionbar.pageData.optionBar.timeShow">\n        <div class="btn-group dropdown" uib-dropdown >\n          <button type="button" class="btn btn-default" uib-dropdown-toggle ng-disabled="disabled">\n            <span class="current-option pull-left">{{optionbar.pageData.optionBar.timeCurrent.name}}</span> <span class="caret"></span>\n          </button>\n          <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu role="menu" aria-labelledby="single-button">\n            <li role="menuitem" data-ng-repeat="tchoice in optionbar.pageData.optionBar.timeChoices" ><a ng-click="optionbar.changeTime(tchoice)">{{tchoice.name}}</a></li>\n          </ul>\n        </div>\n      </div>\n      \n    </div>\n</div>\n')}])}(),function(a){try{a=angular.module("app.templates")}catch(e){a=angular.module("app.templates",[])}a.run(["$templateCache",function(a){a.put("sections/accounts/accounts.tpl.html",'<div class="container">\n    <div class="page-view accounts">\n      <div class="summary-header bg" ng-class="accounts.changeClass">\n        <div><h2>{{accounts.total | useSummaryFilter:accounts.pageData.metricType}} <span popover-class="popover" popover-popup-delay="500" popover-placement="bottom" uib-popover="{{accounts.currentMetricPop}}" popover-trigger="\'mouseenter\'" class="pop" >{{accounts.pageData.optionBar.metricAccountCurrent.name}}</span></h2></div>\n        <div><h4>{{accounts.totalChange | useSummaryFilter:accounts.pageData.metricType}} {{accounts.compStr}} {{accounts.pageData.lang.changeas}} <span popover-class="popover" popover-popup-delay="500" popover-placement="bottom" uib-popover="{{accounts.pageData.lang.datepop}}" popover-trigger="\'mouseenter\'" class="pop" >{{accounts.totalDate}}</span></h4></div>\n      </div>\n      <div class="graph-container accounts" >\n        <graphbar graphdata="accounts.chart.data"></graphbar>\n      </div>\n    </div>\n  </div>\n  ')}])}(),function(a){try{a=angular.module("app.templates")}catch(e){a=angular.module("app.templates",[])}a.run(["$templateCache",function(a){a.put("sections/groups/groups.tpl.html",'<div class="container">\n    <div class="page-view groups">\n      <div class="summary-header bg" ng-class="groups.changeClass">\n        <div><h2>{{groups.total | useSummaryFilter:groups.pageData.metricType}} <span popover-class="popover" popover-popup-delay="500" popover-placement="bottom" uib-popover="{{groups.currentMetricPop}}" popover-trigger="\'mouseenter\'" class="pop" >{{groups.pageData.optionBar.metricCurrent.name}}</span></h2></div>\n        <div><h4>{{groups.totalChange | useSummaryFilter:groups.pageData.metricType}} {{groups.compStr}} {{groups.pageData.lang.changeas}} <span popover-class="popover" popover-popup-delay="500" popover-placement="bottom" uib-popover="{{groups.pageData.lang.datepop}}" popover-trigger="\'mouseenter\'" class="pop" >{{groups.totalDate}}</span></h4></div>\n      </div>\n      <div class="graph-container groups">\n        <graphbar graphdata="groups.chart.data"></graphbar>\n      </div>\n    </div>\n  </div>\n  ')}])}(),function(a){try{a=angular.module("app.templates")}catch(e){a=angular.module("app.templates",[])}a.run(["$templateCache",function(a){a.put("sections/volume/volume.tpl.html",'<div class="container">\n  <div class="page-view volume">\n    <div class="summary-header bg" ng-class="volume.changeClass">\n      <div><h2>{{volume.total | useSummaryFilter:volume.pageData.metricType}} <span popover-class="popover" popover-popup-delay="500" popover-placement="bottom" uib-popover="{{volume.currentMetricPop}}" popover-trigger="\'mouseenter\'" class="pop" >{{volume.pageData.optionBar.metricCurrent.name}}</span></h2></div>\n      <div><h4>{{volume.totalChange | useSummaryFilter:volume.pageData.metricType}} {{volume.compStr}} {{volume.pageData.lang.changeas}} <span popover-class="popover" popover-popup-delay="500" popover-placement="bottom" uib-popover="{{volume.pageData.lang.datepop}}" popover-trigger="\'mouseenter\'" class="pop" >{{volume.totalDate}}</span></h4></div>\n    </div>\n    <div class="graph-container volume" >\n      <graphbar graphdata="volume.chart.data"></graphbar>\n    </div>\n  </div>\n</div>\n')}])}(),function(a){try{a=angular.module("app.templates")}catch(e){a=angular.module("app.templates",[])}a.run(["$templateCache",function(a){a.put("sections/revenue/revenue.tpl.html",'<div class="container">\n  <div class="page-view revenue">\n    <div class="summary-header bg" ng-class="revenue.changeClass">\n      <div><h2>{{revenue.total | useSummaryFilter:revenue.pageData.metricType}} <span popover-class="popover" popover-popup-delay="500" popover-placement="bottom" uib-popover="{{revenue.currentMetricPop}}" popover-trigger="\'mouseenter\'" class="pop" >{{revenue.pageData.optionBar.metricCurrent.name}}</span></h2></div>\n      <div><h4>{{revenue.totalChange | useSummaryFilter:revenue.pageData.metricType}} {{revenue.compStr}} {{revenue.pageData.lang.changeas}} <span popover-class="popover" popover-popup-delay="500" popover-placement="bottom" uib-popover="{{revenue.pageData.lang.datepop}}" popover-trigger="\'mouseenter\'" class="pop" >{{revenue.totalDate}}</span></h4></div>\n    </div>\n    <div class="graph-container revenue">\n      <graphbar graphdata="revenue.chart.data"></graphbar>\n    </div>\n  </div>\n</div>')}])}();