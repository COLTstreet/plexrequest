'use strict';

/**
 * @ngdoc function
 * @name plexrequestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the plexrequestApp
 */
angular.module('plexrequestApp')
  .controller('MainCtrl', function ($scope, $rootScope, $timeout, $mdSidenav, $log) {

    //Functions
    $scope.init = init;
    $scope.select = select;
    $scope.close = close;

    //Variables
    $scope.addedMovies = [];
    $rootScope.addedMovies = [];
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    function close() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    }

    function select(movie) {
      movie.selected = !movie.selected
      if(movie.selected) {
        if($scope.addedMovies.indexOf(movie.title) === -1){
          $scope.addedMovies.push(movie.title)
        }
      } else {
        if($scope.addedMovies.indexOf(movie.title) !== -1){
          var index = $scope.addedMovies.indexOf(movie.title);
          $scope.addedMovies.splice(index, 1);
        }
      }
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $rootScope.addedMovies = $scope.addedMovies;
            $log.debug("toggle " + navID + " is done");
          });
      };
    }

    function init() {

      //Popular movies call
      $.ajax({
					url : "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99",
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
              $scope.popularMovies = parsed_json.results;
              console.log($scope.popularMovies);
						});
					}
        });
        
      //Popular kids movies call
      $.ajax({
					url : "https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99",
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
              $scope.popularKidsMovies = parsed_json.results;
              console.log($scope.popularKidsMovies);
						});
					}
        });
        
      //Best Dramas call
      $.ajax({
					url : "https://api.themoviedb.org/3/discover/movie?certification_country=US&with_genres=18&sort_by=popularity.desc&api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99",
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
              $scope.dramaMovies = parsed_json.results;
              console.log($scope.dramaMovies);
						});
					}
				});
    }

    $scope.init();
  });
