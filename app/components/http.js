/**
 * Created by HZH on 2017-3-21.
 */
(function (angular){
	var http=angular.module('moviecat.services.http',[]);
	http.service('HttpService',['$document','$window',function($document,$window){
        this.jsonp=function(url, data, callback) {
			'use strict';

				var fnSuffix = Math.random().toString().replace('.', '');
				var cbFuncName = 'my_json_cb_' + fnSuffix;
				// 不推荐

				var querystring = url.indexOf('?') == -1 ? '?' : '&';
				for (var key in data) {
					querystring += key + '=' + data[key] + '&';
				}
				querystring += 'callback=' + cbFuncName;
				var scriptElement = $document[0].createElement('script');
				scriptElement.src = url + querystring;
                 $window[cbFuncName] = function(data){
					 callback(data);
					 $document[0].body.removeChild(scriptElement);
				 };
				$document[0].body.appendChild(scriptElement);
			};
		//	window.$jsonp = jsonp;
		//})(window, document);

	}]);


})(angular);
