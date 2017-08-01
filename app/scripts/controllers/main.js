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
    $scope.selectShow = selectShow;
    $scope.close = close;
    $scope.sendRequest = sendRequest;
    $scope.search = search;
    $scope.searchTV = searchTV;
    $scope.backToHome = backToHome;
    $scope.backToTVHome = backToTVHome;

    //Variables
    $scope.addedMovies = [];
    $rootScope.addedMovies = [];
    $scope.searching = false;
    $scope.tvSearching = false;
    $scope.showMovies = true;
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    function backToHome() {
      $scope.searching = !$scope.searching;
    }

    function backToTVHome() {
      $scope.tvSearching = !$scope.tvSearching;
    }

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

    function selectShow(show) {
      show.selected = !show.selected
      if(show.selected) {
        if($scope.addedMovies.indexOf(show.name) === -1){
          $scope.addedMovies.push(show.name)
        }
      } else {
        if($scope.addedMovies.indexOf(show.name) !== -1){
          var index = $scope.addedMovies.indexOf(show.name);
          $scope.addedMovies.splice(index, 1);
        }
      }
    }

    function sendRequest() {
      var email = "sbframp@gmail.com";
      var subject = "Plex Request";
      var body = "";

      for(var i = 0; i < $scope.addedMovies.length; i++) {
        var movie = $scope.addedMovies[i];
        body += movie + ", "
      }

      window.location.href = "mailto:" + email + "?subject=" + subject + "&body=" + body;
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

    function search(string) {
      var query = encodeURI(string);
      // Search
      $.ajax({
					url : "https://api.themoviedb.org/3/search/movie?api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99&query=" + query,
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
              $scope.searchMovies = parsed_json.results;
						});
					}
        });
        
        $scope.searching = true;
    }

    function searchTV(string) {
      var query = encodeURI(string);
      // Search
      $.ajax({
					url : "https://api.themoviedb.org/3/search/tv?api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99&query=" + query,
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
              $scope.searchShows = parsed_json.results;
						});
					}
        });
        
        $scope.tvSearching = true;
    }

    function init() {

      //Popular movies call
      $.ajax({
					url : "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99",
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
              $scope.popularMovies = parsed_json.results;
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
						});
					}
        });
        
      //Best Action call
      $.ajax({
					url : "https://api.themoviedb.org/3/discover/movie?certification_country=US&with_genres=28&sort_by=popularity.desc&api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99",
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
              $scope.actionMovies = parsed_json.results;
						});
					}
        });
        
      //Best Adventure call
      $.ajax({
					url : "https://api.themoviedb.org/3/discover/movie?certification_country=US&with_genres=12&sort_by=popularity.desc&api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99",
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
              $scope.adventureMovies = parsed_json.results;
						});
					}
        });
        
      //Best Comedy call
      $.ajax({
					url : "https://api.themoviedb.org/3/discover/movie?certification_country=US&with_genres=35&sort_by=popularity.desc&api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99",
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
              $scope.comedyMovies = parsed_json.results;
						});
					}
        });

      //Popular shows call
      $.ajax({
					url : "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99",
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
              $scope.popularShows = parsed_json.results;
						});
					}
        });
        
      //Best Drama shows call
      $.ajax({
					url : "https://api.themoviedb.org/3/discover/tv?certification_country=US&with_genres=18&sort_by=popularity.desc&api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99",
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
              $scope.dramaShows = parsed_json.results;
						});
					}
        });
        
      //Best Action shows call
      $.ajax({
					url : "https://api.themoviedb.org/3/discover/tv?certification_country=US&with_genres=28&sort_by=popularity.desc&api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99",
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
              $scope.actionShows = parsed_json.results;
						});
					}
        });
        
      //Best Adventure call
      $.ajax({
					url : "https://api.themoviedb.org/3/discover/tv?certification_country=US&with_genres=12&sort_by=popularity.desc&api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99",
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
              $scope.adventureShows = parsed_json.results;
						});
					}
        });
        
      //Best Comedy call
      $.ajax({
					url : "https://api.themoviedb.org/3/discover/tv?certification_country=US&with_genres=35&sort_by=popularity.desc&api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99",
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
              $scope.comedyShows = parsed_json.results;
						});
					}
        });
        
      //Genres
      // $.ajax({
			// 		url : "https://api.themoviedb.org/3/genre/movie/list?api_key=7f5c7cfc2f811e4c7c6c6e5ee73bba99",
			// 		dataType : "jsonp",
			// 		success : function(parsed_json) {
			// 			$scope.$apply(function() { // put $scope var that needs to be updated
      //         console.log(parsed_json);
			// 			});
			// 		}
      // 	});

    }

    $scope.init();
  });
