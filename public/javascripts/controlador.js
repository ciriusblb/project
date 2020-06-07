
var app = angular.module('main',['ui.router']);
app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/admin');

    $stateProvider
    .state('admin',{
        url:'/admin',
        templateUrl: '../controllers/home.html',
        controller: 'homeController'
    })
    .state('login',{
        url:'/login',
        templateUrl: '../controllers/login.html',
        controller: 'loginController'
    })
     .state('registro',{
        url:'/registro',
        templateUrl: '../controllers/registro.html',
        // controller: 'registroController'
    });

});

app.service('user',function(){
    var username;
    var loggedin = false;
    var id;

    this.setName = function(name){
        username = name;
    };
    this.getName = function(){
        return username;
    };
    this.setID = function(userID){
        id = userID;
    };
    this.getID = function(){
        return id;
    };
    this.isUserLoggedIn = function(){
        return loggedin;
    };
    this.userLoggedIn = function(){
        loggedin = true;
    };
})

app.controller('homeController',['$scope','$location',function($scope,$location){
	$scope.login = function(){
		$location.path('/login');
	};
	$scope.register = function(){
		$location.path('/registro')
	}
}]);

// app.controller('registroController',['$scope','$http','$location',function($scope,$http,$location,$modal){
   
//    $scope.showModal = function(){
  
//      var modalInstance = $modal.open({
//         templateUrl: '../controllers/confirmacion.html'
//      })
//    }
// }]);


app.controller('loginController',['$scope','$http','$location','user',function($scope,$http,$location,user){
	$scope.Login = function(){
		var username = $scope.username;
		var password = $scope.password;
		$http({
			url: 'http://localhost/server.php',
			method: 'POST',
			headers: {
				'Content-Type':'application/x-www-form-urlencoded'
			},
			data: 'username='+username+'&password='+password
		}).then(function(response){
			if(response.data.status == 'loggedin'){
				user.userLoggedIn();
				 // loggedin = true;
				user.setName(response.data.user);
				 // username = name;
				location.href ='../controllers/sistema.html';
			}else{
				alert('usuario invalido');
			}
		})
	}
}]);



// var app = angular.module('main',['ui.router']);
// app.config(function($stateProvider,$urlRouterProvider){

// 	$stateProvider
// 	.state('admin ',{
// 		url:'/home',
// 		templateUrl: './controllers/home.html',
// 		// controller: 'homecontroller'
// 	})
// });