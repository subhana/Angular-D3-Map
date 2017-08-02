directivesModule.directive('uploadFile', function() {
    return function( scope, elm, attrs ) {

        elm.bind('change', function( evt ) {
            var reader = new FileReader();
            reader.onload = function(evnt) {
                scope.$apply(function() {
                    scope.logo.src = evnt.target.result;
                });
            }
            reader.readAsDataURL(evt.target.files[0]);
        });
    };
});
