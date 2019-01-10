app.factory('loginService', ['$http','$sce', function($http, $sce){
    var self = {};
    var url = "http://www.json-generator.com/api/json/get/ceUzhPIcqG";
    var trustedUrl = $sce.trustAsResourceUrl(url);

    $sce.trustAsResourceUrl(url)
    self.isLoggedIn = function() {
        self.loading = true;

        $http.jsonp(trustedUrl,  {jsonpCallbackParam: 'callback'}).then(
            function sucess(data){
                console.log("EXITO");
                console.log(data);
            }, function error(err){
                console.log(err);
            });
    }

    self.isLoggedIn();

    return self;
}]);