var app = angular.module('todoApp', ['ngResource']);

app.controller("TodoController", function($scope, $http, Item) {

        $scope.tasks = {};

        $scope.editNameEnabled = false;


        $scope.addTask = function(name, description, priority, done, due_date){
            $scope.tasks.push({name: name, description: description, priority: priority, done: done, due_date: due_date});
        };

        $scope.editName = function(){
            this.editNameEnabled = true;
        };

        $scope.saveName = function(id, index, name){
            var item = Item.get({ id: id }, function() {
                item.name = name;
                Item.update({ id:id }, item);

                $scope.tasks[index].name = name;
                $scope.editNameEnabled = false;
            });

        };


        Item.query(function(data) {
            $scope.tasks = data;
        });


    });

app.factory("Item", function($resource) {
    return $resource("/items/:id.json", null, {
        'update': { method: 'PUT' }
    });
});