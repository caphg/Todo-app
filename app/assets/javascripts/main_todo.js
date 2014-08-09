var app = angular.module('todoApp', ['ngResource']);

app.controller("TodoController", function($scope, $http, Item) {

        $scope.tasks = {};

        $scope.editNameEnabled = false;
        $scope.editDueDateEnabled = false;
        $scope.editPriorityEnabled = false;
        $scope.editDescriptionEnabled = false;


        $scope.addTask = function(name, description, priority, done, due_date){
            if($scope.newItemForm.$valid){
                var task = new Item();
                task.name = name;
                task.description = description;
                task.priority = priority;
                task.done = done;
                task.due_date = due_date;
              //  task.$save();

                var responsePromise = $http.post("/items.json", task, {});
                responsePromise.success(function(dataFromServer, status, headers, config) {
                    $scope.tasks.push({name: name, description: description, priority: priority, done: done, due_date: due_date});
                });
                responsePromise.error(function(data, status, headers, config) {
                    $.each(data, function(k, v) {
                        //display the key and value pair
                        alert(k + '  ' + v);
                    });
                });

            } else {
                alert("invalid form");
            }
        };

        $scope.editName = function(){
            this.editNameEnabled = true;
        };

        $scope.editDueDate = function(){
            this.editDueDateEnabled = true;
        };

        $scope.editPriority = function(){
            this.editPriorityEnabled = true;
        };

        $scope.editDescription = function(){
            this.editDescriptionEnabled = true;
        };


        $scope.saveName = function(id, index, name){
            var task = Item.get({id:id});
            task.name = name;
            var responsePromise = $http.put("/items/"+id+".json", task, {});
            responsePromise.success(function(dataFromServer, status, headers, config) {

            });
            responsePromise.error(function(data, status, headers, config) {
                $.each(data, function(k, v) {
                    alert(k + '  ' + v);
                });
            });
            this.tasks[index].name = name;
            this.editNameEnabled = false;

        };

        $scope.saveDueDate = function(id, index, date){
            var task = Item.get({id:id});
            task.due_date = date;
            var responsePromise = $http.put("/items/"+id+".json", task, {});
            responsePromise.success(function(dataFromServer, status, headers, config) {

            });
            responsePromise.error(function(data, status, headers, config) {
                $.each(data, function(k, v) {
                    alert(k + '  ' + v);
                });
            });
            this.tasks[index].due_date = date;
            this.editDueDateEnabled = false;
        };

        $scope.savePriority = function(id, index, priority){
            var task = Item.get({id:id});
            task.priority = priority;
            var responsePromise = $http.put("/items/"+id+".json", task, {});
            responsePromise.success(function(dataFromServer, status, headers, config) {

            });
            responsePromise.error(function(data, status, headers, config) {
                $.each(data, function(k, v) {
                    //display the key and value pair
                    alert(k + '  ' + v);
                });
            });

            this.tasks[index].priority = priority;
            this.editPriorityEnabled = false;
            /*
            var item = Item.get({id:id}, function(){
                item.priority = priority;
                Item.update({id:id}, item);
            });*/

        };

        $scope.saveDescription = function(id, index, description){
            var task = Item.get({id:id});
            task.description = description;
            var responsePromise = $http.put("/items/"+id+".json", task, {});
            responsePromise.success(function(dataFromServer, status, headers, config) {

            });
            responsePromise.error(function(data, status, headers, config) {
                $.each(data, function(k, v) {
                    //display the key and value pair
                    alert(k + '  ' + v);
                });
            });
            this.tasks[index].description = description;
            this.editDescriptionEnabled = false;
        };

        $scope.toggleDone = function(id, index, done){
            var item = Item.get({id:id}, function(){
                item.done = !item.done;
                Item.update({id:id}, item);
            });
            this.tasks[index].done = !done;
        };

        $scope.deleteItem = function(id, index){
            var responsePromise = $http.delete("/items/"+id+".json");
            responsePromise.success(function(dataFromServer, status, headers, config) {
                $scope.tasks.splice(index, 1);
            });
            responsePromise.error(function(data, status, headers, config) {
                if(status==404){
                    $scope.tasks.splice(index, 1);
                } else {
                    $.each(data, function(k, v) {
                        //display the key and value pair
                        alert(k + '  ' + v);
                    });
                }

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