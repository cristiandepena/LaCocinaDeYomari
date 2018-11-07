app.controller('orderCtrl', ['$scope', '$http', function($scope, $http) {

    console.log("heya");

    $scope.amount = 0;
    $scope.productList = [];
    $scope.picaderasDept = [];
    $scope.aperitivosDept = [];
    $scope.productsInCart = [];

    $http.get("/products.json").then(
        function success(products) {
            console.log("entro");
            $scope.productList = products.data.map((e) => {
                e.quantity = 0;

                return e;
            });
            // Adding to their depts
            $scope.aperitivosDept = _.where($scope.productList, { dept: 1 });
            $scope.picaderasDept = _.where($scope.productList, { dept: 2 });

            console.log($scope.aperitivosDept);
            console.log($scope.picaderasDept);
        },
        function error(err) {
            console.log(err);
        }

    );

    $scope.productAdd = function(product) {
        if (product.quantity >= 0) {
            product.quantity += 1;

            //TODO: Verificar si existe y solo cambiar la cantidad de ese producto en especifico
            var index = $scope.productsInCart.indexOf(product);
            if (index >= 0) {
                $scope.productsInCart[index].quantity = product.quantity;
            } else {
                $scope.productsInCart.push(product);

            }
        }
        $scope.calculateAmount();

    };

    $scope.productRemove = function(product) {
        if (product.quantity > 0) {
            product.quantity -= 1;

            var index = $scope.productsInCart.indexOf(product);

            if (index >= 0) {
                $scope.productsInCart[index].quantity = product.quantity;
                if ($scope.productsInCart[index].quantity <= 0) {
                    $scope.productsInCart.pop(product);
                }
            }
        }
        $scope.calculateAmount();

    };

    $scope.calculateAmount = function() {
        //Always initialize in 0 before recalculate
        $scope.amount = 0;

        $scope.productsInCart.forEach((element) => {
            $scope.amount += element.price * element.quantity;
        });
    };

}]);