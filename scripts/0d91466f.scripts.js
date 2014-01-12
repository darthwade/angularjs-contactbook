angular.module("ui.templates",["template/modal/backdrop.html","template/modal/window.html"]),angular.module("template/modal/backdrop.html",[]).run(["$templateCache",function(a){a.put("template/modal/backdrop.html",'<div class="modal-backdrop fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1040 + index*10}"></div>')}]),angular.module("template/modal/window.html",[]).run(["$templateCache",function(a){a.put("template/modal/window.html",'<div tabindex="-1" class="modal fade {{ windowClass }}" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog"><div class="modal-content" ng-transclude></div></div>\n</div>')}]),angular.module("ui.bootstrap.modal",[]).factory("$$stackedMap",function(){return{createNew:function(){var a=[];return{add:function(b,c){a.push({key:b,value:c})},get:function(b){for(var c=0;c<a.length;c++)if(b==a[c].key)return a[c]},keys:function(){for(var b=[],c=0;c<a.length;c++)b.push(a[c].key);return b},top:function(){return a[a.length-1]},remove:function(b){for(var c=-1,d=0;d<a.length;d++)if(b==a[d].key){c=d;break}return a.splice(c,1)[0]},removeTop:function(){return a.splice(a.length-1,1)[0]},length:function(){return a.length}}}}}).directive("modalBackdrop",["$timeout",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/modal/backdrop.html",link:function(b){b.animate=!1,a(function(){b.animate=!0})}}}]).directive("modalWindow",["$modalStack","$timeout",function(a,b){return{restrict:"EA",scope:{index:"@"},replace:!0,transclude:!0,templateUrl:"template/modal/window.html",link:function(c,d,e){c.windowClass=e.windowClass||"",b(function(){c.animate=!0,d[0].focus()}),c.close=function(b){var c=a.getTop();c&&c.value.backdrop&&"static"!=c.value.backdrop&&b.target===b.currentTarget&&(b.preventDefault(),b.stopPropagation(),a.dismiss(c.key,"backdrop click"))}}}}]).factory("$modalStack",["$document","$compile","$rootScope","$$stackedMap",function(a,b,c,d){function e(){for(var a=-1,b=k.keys(),c=0;c<b.length;c++)k.get(b[c]).value.backdrop&&(a=c);return a}function f(b){var c=a.find("body").eq(0),d=k.get(b).value;k.remove(b),d.modalDomEl.remove(),c.toggleClass(i,k.length()>0),h&&-1==e()&&(h.remove(),h=void 0),d.modalScope.$destroy()}var g,h,i="modal-open",j=c.$new(!0),k=d.createNew(),l={};return c.$watch(e,function(a){j.index=a}),a.bind("keydown",function(a){var b;27===a.which&&(b=k.top(),b&&b.value.keyboard&&c.$apply(function(){l.dismiss(b.key)}))}),l.open=function(c,d){k.add(c,{deferred:d.deferred,modalScope:d.scope,backdrop:d.backdrop,keyboard:d.keyboard});var f=a.find("body").eq(0);e()>=0&&!h&&(g=angular.element("<div modal-backdrop></div>"),h=b(g)(j),f.append(h));var l=angular.element("<div modal-window></div>");l.attr("window-class",d.windowClass),l.attr("index",k.length()-1),l.html(d.content);var m=b(l)(d.scope);k.top().value.modalDomEl=m,f.append(m),f.addClass(i)},l.close=function(a,b){var c=k.get(a).value;c&&(c.deferred.resolve(b),f(a))},l.dismiss=function(a,b){var c=k.get(a).value;c&&(c.deferred.reject(b),f(a))},l.getTop=function(){return k.top()},l}]).provider("$modal",function(){var a={options:{backdrop:!0,keyboard:!0},$get:["$injector","$rootScope","$q","$http","$templateCache","$controller","$modalStack",function(b,c,d,e,f,g,h){function i(a){return a.template?d.when(a.template):e.get(a.templateUrl,{cache:f}).then(function(a){return a.data})}function j(a){var c=[];return angular.forEach(a,function(a){(angular.isFunction(a)||angular.isArray(a))&&c.push(d.when(b.invoke(a)))}),c}var k={};return k.open=function(b){var e=d.defer(),f=d.defer(),k={result:e.promise,opened:f.promise,close:function(a){h.close(k,a)},dismiss:function(a){h.dismiss(k,a)}};if(b=angular.extend({},a.options,b),b.resolve=b.resolve||{},!b.template&&!b.templateUrl)throw new Error("One of template or templateUrl options is required.");var l=d.all([i(b)].concat(j(b.resolve)));return l.then(function(a){var d=(b.scope||c).$new();d.$close=k.close,d.$dismiss=k.dismiss;var f,i={},j=1;b.controller&&(i.$scope=d,i.$modalInstance=k,angular.forEach(b.resolve,function(b,c){i[c]=a[j++]}),f=g(b.controller,i)),h.open(k,{scope:d,deferred:e,content:a[0],backdrop:b.backdrop,keyboard:b.keyboard,windowClass:b.windowClass})},function(a){e.reject(a)}),l.then(function(){f.resolve(!0)},function(){f.reject(!1)}),k},k}]};return a}),function(){"use strict";var a=angular.module("contactBookApp",["ui.router","ui.bootstrap.modal","ui.templates"]);a.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){c.html5Mode(!0).hashPrefix("!"),b.otherwise("/"),a.state("home",{url:"/",templateUrl:"/views/contacts.html",controller:"ContactsCtrl"}),a.state("home",{url:"/angularjs-contactbook",templateUrl:"/views/contacts.html",controller:"ContactsCtrl"})}])}(),function(a){"use strict";var b=angular.module("contactBookApp");b.service("contactsService",function(){var b=this;this.getContacts=function(){var b=localStorage.getItem("contacts");return b!=a?angular.fromJson(b):[]},this.getContactById=function(a){for(var c=b.getContacts(),d=0;d<c.length;d++){var e=c[d];if(e.id==a)return e}return null},this.insertContact=function(a){var d=b.getContacts();return a.id=d.length,d.push(a),c(d),a},this.updateContact=function(a,d){for(var e,f=b.getContacts(),g=0;g<f.length;g++)if(f[g].id==a){e=f[g];break}if(!e)return null;for(var h in d)e[h]=d[h];return c(f),e};var c=function(a){localStorage.setItem("contacts",angular.toJson(a))}})}(),function(){"use strict";var a=angular.module("contactBookApp");a.controller("ContactsCtrl",["$scope","$modal","contactsService","orderByFilter",function(a,b,c,d){a.$watchCollection("contacts",function(){a.orderedContacts=d(a.contacts,"group")}),a.contacts=c.getContacts(),a.addContact=function(){var b=e({});b.result.then(function(b){b=c.insertContact(b),a.contacts.push(b)})},a.editContact=function(b){var d=e(b);d.result.then(function(d){d=c.updateContact(b.id,d);for(var e=0,f=a.contacts.length;f>e;e++)if(d.id==a.contacts[e].id){a.contacts[e]=d;break}})};var e=function(a){var c=b.open({templateUrl:"/views/partials/modals/contact-modal-form.html",controller:"ContactModalFormCtrl",resolve:{contact:function(){return a}}});return c}}])}(),function(){"use strict";var a=angular.module("contactBookApp");a.controller("ContactModalFormCtrl",["$scope","$modalInstance","contact",function(a,b,c){a.initialData=c,a.contact=angular.copy(c),a.edition=0!==Object.keys(c).length,a.isUnchanged=function(b){return angular.equals(b,a.initialData)},a.saveContact=function(){b.close(a.contact)},a.cancel=function(){b.dismiss("cancel")}}])}();