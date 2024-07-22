angular.module('myapp',['ngRoute'])
.run(function($rootScope, $timeout){
    $rootScope.$on('routeChangeStart',function(){
        $rootScope.loading=true;
    });
    $rootScope.$on('routeChangeSuccess',function(){
            $timeout(function(){
                $rootScope.loading=false;
            },1000);
    });
    $rootScope.$on('routeChangeError',function(){
        $rootScope.loading=false;
        alert('Lỗi Rồi');
    });
})
.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'home.html',
        controller:'homeCtrl'
    })
    .when('/about',{
        templateUrl: 'about.html',
        controller:'aboutCtrl'
    })
    .when('/contact',{
        templateUrl: 'contact.html',
        controller:'contactCtrl',
        controllerAs:'contact'//bí danh
    })
    .when('/detail/:masp',{
        templateUrl: 'detail.html',
        controller:'detailCtrl'
    })
    .otherwise({
        templateUrl: 'home.html'
    })
})
.controller("myctrl",function ($scope){
    $scope.masterInfo = 'Ní hạo ma!';
    $scope.info = 'Xa qua ní Khạp';
    $scope.dssp = [
        {
            id:1,
            name:'táo',
            price:10000
        },
        {
            id:2,
            name:'Ổi',
            price:20000
        },
        {
            id:3,
            name:'Xoài',
            price:30000
        },
        {
            id:4,
            name:'đào',
            price:30000
        },
        {
            id:5,
            name:'cam',
            price:30000
        },
        {
            id:6,
            name:'chanh',
            price:30000
        },
        {
            id:7,
            name:'cam',
            price:30000
        },
        {
            id:8,
            name:'quýt',
            price:30000
        }
    ]
})
.controller('detailCtrl',function($scope, $routeParams){ //Chỉ áp dụng cho địa chỉ có controller này
    $scope.id = $routeParams.masp;
    $scope.sp= {};
    for(var sp of $scope.dssp){
        if( sp.id == $scope.id ){
            $scope.sp = sp;
            break;
        }
    }
})
.controller('aboutCtrl',function($scope){ //Chỉ áp dụng cho địa chỉ có controller này
    $scope.info='Xin Chào';
})
.controller('contactCtrl',function($scope){ //Chỉ áp dụng cho địa chỉ có controller này
    this.info='Hello every body';//khi đặt bí danh thì dùng this
})
.controller('homeCtrl',function($scope, $interval){ //Chỉ áp dụng cho địa chỉ có controller này
    $interval(function(){
        $scope.now = new Date();
    },1000);
    $scope.page= 2;
    $scope.limit = 4;
    // Trang 1: start = 0
    // Trang 2: start = 4
    // Trang 3: start = 8
    // Trang 1: start = (n-1)*4
    $scope.start = ($scope.page - 1) * $scope.limit;
    $scope.tongTrang  = Math.ceil($scope.dssp.length/ $scope.limit);//$scope.dssp:Tổng số sản Phẩm ||  $scope.limit: Số sản phẩm Mỗi Trang
    $scope.chontrang = function(trang){
        $scope.page = trang;
        $scope.start = ($scope.page - 1)  * $scope.limit;
    };
    
})

