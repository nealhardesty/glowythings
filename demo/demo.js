(function() {

var demoApp = angular.module('glowythingsDemoApp', []);

function setAndUpdate($scope, $http, ledIdent, brightness) {
	$http.post('/' + ledIdent + '?brightness=' + brightness)
		.success(function(data) {
			for(var l in data) {
				$scope.data[l] = data[l];
			}
			// This is just the average of the 3 leg's LEDs (hacky)
			$scope.data.red = (parseInt(data.l_0_0) + parseInt(data.l_1_0) + parseInt(data.l_2_0)) / 3;
			$scope.data.orange = (parseInt(data.l_0_1) + parseInt(data.l_1_1) + parseInt(data.l_2_1)) / 3;
			$scope.data.yellow = (parseInt(data.l_0_2) + parseInt(data.l_1_2) + parseInt(data.l_2_3)) / 3;
			$scope.data.green = (parseInt(data.l_0_3) + parseInt(data.l_1_3) + parseInt(data.l_2_4)) / 3;
			$scope.data.blue = (parseInt(data.l_0_4) + parseInt(data.l_1_4) + parseInt(data.l_2_4)) / 3;
			$scope.data.white = (parseInt(data.l_0_5) + parseInt(data.l_1_5) + parseInt(data.l_2_5)) / 3;
		})
		.error(function(data, status) {
			$scope.error = 'Failed to POST to /' + ledIdent + '?brightness=' + brightness + ' : ' + status;
		});
}

demoApp.controller('glowythingsController', function($scope, $http) {

	$scope.data = {
		'l_0_0' : 0, 'l_0_1' : 0, 'l_0_2' : 0, 'l_0_3' : 0, 'l_0_4' : 0, 'l_0_5' : 0,
		'l_1_0' : 0, 'l_1_1' : 0, 'l_1_2' : 0, 'l_1_3' : 0, 'l_1_4' : 0, 'l_1_5' : 0,
		'l_2_0' : 0, 'l_2_1' : 0, 'l_2_2' : 0, 'l_2_3' : 0, 'l_2_4' : 0, 'l_1_5' : 0,
		'leg_0' : 0, 'leg_1' : 0, 'leg_2' : 0, 
		'red' : 0, 'orange' : 0, 'yellow' : 0, 'green' : 0, 'blue' : 0, 'white' : 0,
		'all' : 0
	}

	$scope.error = "";

	setAndUpdate($scope, $http, 'all', 0);

	$scope.update = function(ledIdent) {
		setAndUpdate($scope, $http, ledIdent, $scope.data[ledIdent]);
	}


});


})();
