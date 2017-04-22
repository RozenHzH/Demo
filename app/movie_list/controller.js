'use strict';

(function (angular){


	var module=angular.module('moviecat.movie_list', ['ngRoute','moviecat.services.http'])

	module.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/:category/:page', {
				templateUrl: 'movie_list/view.html',
				controller: 'MovieListController'
			});
		}])

	module.controller('MovieListController', ['$scope','$route','$routeParams','HttpService','AppConfig',function($scope,$route,$routeParams,HttpService,AppConfig) {
			var page=parseInt($routeParams.page);
			var count=AppConfig.pageSize;
			var start=(page-1)*count;
			$scope.loading=true;
			$scope.subjects=[];
			$scope.title='Loading...';
			$scope.totalacont=0;
			$scope.totalPages=0;
			$scope.currentPage=page;

			HttpService.jsonp(AppConfig.listApiAddress+$routeParams.category,{start:start,count:count,q:$routeParams.q},function(data){
				$scope.title=data.title;
				$scope.totalacont=data.total;
				$scope.subjects=data.subjects;
				$scope.totalPages=Math.ceil($scope.totalacont/count);
				$scope.loading=false;
				$scope.$apply();

			});

			$scope.go=function(page){
				if(page>=1&&page<=$scope.totalPages){
					$route.updateParams({page:page});
				}

			};
		}]);


})(angular);
