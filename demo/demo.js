(function() {

var demoApp = angular.module('glowythingsDemoApp', ['vr.directives.slider']);

function setAndUpdate($scope, $http, ledIdent, brightness) {
	$http.post('/' + ledIdent + '?brightness=' + brightness)
		.success(function(data) {
			for(var l in data) {
				$scope.data[l] = data[l];
			}
		})
		.error(function(data, status) {
			$scope.error = "Failed to POST to /' + ledIdent + '?brightness=' + brightness + ' : ' + status";
		});
}

demoApp.controller('glowythingsController', function($scope, $http) {

	$scope.data = {
		'l_0_0' : 0,
		'l_0_1' : 0,
		'l_0_2' : 0,
		'l_0_3' : 0,
		'l_0_4' : 0,
		'l_0_5' : 0,
		'l_1_0' : 0,
		'l_1_1' : 0,
		'l_1_2' : 0,
		'l_1_3' : 0,
		'l_1_4' : 0,
		'l_1_5' : 0,
		'l_2_0' : 0,
		'l_2_1' : 0,
		'l_2_2' : 0,
		'l_2_3' : 0,
		'l_2_4' : 0,
		'l_1_5' : 0,
		'leg_0' : 0,
		'leg_1' : 0,
		'leg_2' : 0,
		'red' : 0,
		'orange' : 0,
		'yellow' : 0,
		'green' : 0,
		'blue' : 0,
		'white' : 0
	}

	$scope.error = "";

	setAndUpdate($scope, $http, 'all', 0);


	$scope.update = function(ledIdent) {
		setAndUpdate($scope, $http, ledIdent, $scope.data[ledIdent]);
	}


});


})();
