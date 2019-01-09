app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'public/landing-page.html',
            controller: 'landingPageCtrl'
        })
        .state('order', {
            url: '/order',
            templateUrl: 'public/order-page.html',
            controller: 'orderCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'public/login-page.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'public/register-page.html'
        });

    $locationProvider.html5Mode(true);

}]);