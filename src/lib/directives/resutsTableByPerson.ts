module App.Directives {

    export function ResutsTableByPerson (){
return {
        templateUrl : 'templates/resutsTableByPerson.html',
        restrict : 'E',
        scope: {
            "results": "="
        },
        transclude: true,
        link : function($scope, element: JQuery, attrs: ng.IAttributes) {
            $scope.sortField = "date";

            $scope.resultUrl = function(result) {
                return result.event.url ? result.event.url : 'http://www.o-l.ch/cgi-bin/results?type=rang&rl_id=' + result.event.id + '&kat=' + result.category
            }

            $scope.sort = function (field) {
                $scope.sortField = $scope.sortField == field ? "-" + $scope.sortField : field;
            }
        }
    }
    }
}


App.registerDirective('ResutsTableByPerson', []);
