/**
 * Created by HZH on 2017-3-22.
 */
'use strict';

(function (angular){


	var module=angular.module('moviecat.movie_detail', ['ngRoute','moviecat.services.http'])

	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/detail/:id', {
			templateUrl: 'movie_detail/view.html',
			controller: 'MovieDetailController'
		});
	}])

	module.controller('MovieDetailController', ['$scope','$route','$routeParams','HttpService','AppConfig',function($scope,$route,$routeParams,HttpService,AppConfig) {
      $scope.movie={};
		var id=$routeParams.id;
		$scope.loading=true;
		var apiaddress=AppConfig.detailApiAddress+id;
		HttpService.jsonp(apiaddress,{},function(data){
			$scope.movie=data;
			$scope.loading=false;
			$scope.$apply();
		});
	}]);


})(angular);
