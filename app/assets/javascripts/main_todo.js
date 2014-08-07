angular.module("todoApp", [])
    .controller("TodoController", function($scope, $http) {
        $scope.myData = {};

        var resp = $http.get("/items.json");
        resp.success(function(data, status, headers, config) {
            alert(data);
            $scope.myData.items = data;
        });

        resp.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });

    });

