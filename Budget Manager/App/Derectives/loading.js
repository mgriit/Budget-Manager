/**
 * Loading Directive
 * @see http://tobiasahlin.com/spinkit/
 */

app.directive('rdLoading', rdLoading);

function rdLoading($compile) {
    var loadingSpinner = '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>';
    var directive = {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var originalContent = element.html();
            scope.$watch(attrs.rdLoading, function (condition) {
                if (!condition) {
                    element.html(originalContent);
                    $compile(element.contents())(scope);
                }
                else {
                    element.html(loadingSpinner);
                };
            });
        }
    };
    return directive;
};