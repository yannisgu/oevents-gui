module App.Controllers{
    export class PersonCtrl {
        constructor($scope, $location, $http) {

            $scope.results = [];

            if($location.search().person){
                $scope.personId = $location.search().person;
                $scope.loading = true;
                renderPerson($scope.personId)
            }

            $scope.personChanged = function(val) {
                $scope.loading = true;
                $scope.$apply();
                $location.search({person: val});
                renderPerson(val)
            }

            $scope.sortCategory = function(field){
                $scope.sortFieldCategory = $scope.sortFieldCategory == field ? "-" + field : field;
            }

            $scope.sortYear = function(field){
                $scope.sortFieldYear = $scope.sortFieldYear == field ? "-" + field : field;

            }

            $scope.resultUrl = function(result) {
                return result.event.url ? result.event.url : 'http://www.o-l.ch/cgi-bin/results?type=rang&rl_id=' + result.event.id + '&kat=' + result.category
            }

            function renderPerson(id) {
                $http({url :'/api/results', method: 'GET',
                    params: {query: JSON.stringify({"personId": id})}})
                    .then(function (response, err) {
                    var res = response.data;
                    $scope.loading = false;

                    res = _.map(res, function (result : any) {
                        if (result.event && result.event.date) {
                            result.event.date = new Date(result.event.date);
                        }
                        if (result.event && result.event.urlSource) {
                            result.event.url = result.event.urlSource.replace("kind=all", "kat=" + result.category)

                        }
                        return result;
                    });

                    $scope.yearGroups = groupResultyBy(res, function (result) {
                        if(!result.event.date) {
                            return "(unknown)"
                        }
                        return result.event.date.getFullYear();
                    })


                    $scope.categoryGroups = groupResultyBy(res, function (result) {
                        return result.category;
                    })


                    $scope.results = res;
                    $scope.$apply();
                })
            }

        }

    }

    function groupResultyBy(results, groupFunction){
        var groupsObj = _.reduce(results, function (merged, object : any, index2) {
            var index = groupFunction(object)
            merged[index] = merged[index] || {
                title: index,
                victories: 0,
                counts: 0,
                podiums: 0,
                results: []

            }
            if (object.rank == 1) merged[index].victories++;
            if (_.indexOf([1, 2, 3], object.rank, true) > -1) merged[index].podiums++;
            merged[index].counts++;
            merged[index].results.push(object)
            return merged;
        }, {});

        var groups = [];
        for (var i in groupsObj) {
            groups.push({
                title: i,
                data: groupsObj[i],
                isOpen: true
            })
        }

        groups = _.sortBy(groups, "title");
        return groups;
    }
}

App.registerController("PersonCtrl", ["$scope","$location", "$http"]);
