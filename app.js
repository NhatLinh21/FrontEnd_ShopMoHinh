angular.module('myapp', ['ngRoute'])
    .run(function ($rootScope, $timeout) {
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function () {
                $rootScope.loading = false;
            }, 1000);
        });
        $rootScope.$on('$routeChangeError', function () {
            $rootScope.loading = false;
            alert('Lỗi Rồi');
        });
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'homeCtrl'
            })
            .when('/about', {
                templateUrl: 'about.html',
                controller: 'aboutCtrl'
            })
            .when('/cart', {
                templateUrl: 'cart.html',
                controller: 'cartCtrl'
            })
            .when('/huongdanmuahang', {
                templateUrl: 'huongdanmuahang.html',
                controller: 'huongdanmuahangCtrl'
            })
            .when('/mohinhonepiece', {
                templateUrl: 'mohinhonepiece.html',
                controller: 'mohinhonepieceCtrl'
            })
            .when('/mohinhdragonball', {
                templateUrl: 'mohinhdragonball.html',
                controller: 'mohinhdragonballCtrl'
            })
            .when('/mohinhjjks', {
                templateUrl: 'mohinhjjks.html',
                controller: 'mohinhjjksCtrl'
            })
            .when('/mohinhnaruto', {
                templateUrl: 'mohinhnaruto.html',
                controller: 'mohinhnarutoCtrl'
            })
            .when('/mohinhlmht', {
                templateUrl: 'mohinhlmht.html',
                controller: 'mohinhlmhtCtrl'
            })

            .when('/contact', {
                templateUrl: 'contact.html',
                controller: 'contactCtrl',
                controllerAs: 'contact'
            })
            .when('/detail/:masp', {
                templateUrl: 'detail.html',
                controller: 'detailCtrl'
            })
            .otherwise({
                templateUrl: 'home.html'
            })
    })
    .controller("myctrl", function ($scope, $http) {
        $scope.dssp = [];
        $http.get('data.json').then(
            function (res) {//tải thành công
                $scope.dssp = res.data;
            },
            function (res) {//tải thất bại
                alert('lỗi rồi');
            }
        )

    })
    .controller('detailCtrl', function ($scope, $routeParams) {
        $scope.id = $routeParams.masp;
        $scope.sp = {};
        for (var sp of $scope.dssp) {
            if (sp.id == $scope.id) {
                $scope.sp = sp;
                break;
            }
        }
    })

    .controller('cartCtrl', function ($scope, $rootScope) {
        $scope.removeItem = function (index) {
            $rootScope.cart.splice(index, 1);
        };
        $scope.incrementQuantity = function (item) {
            item.quantity++;
            calculateTotal();
        };

        $scope.decrementQuantity = function (item) {
            if (item.quantity > 1) {
                item.quantity--;
                calculateTotal();
            }
        };

        function calculateTotal() {
            $rootScope.totalAmount = 0;
            for (var i = 0; i < $rootScope.cart.length; i++) {
                $rootScope.totalAmount += $rootScope.cart[i].quantity * $rootScope.cart[i].price;
            }
        }
        $scope.removeItem = function (index) {
            $rootScope.cart.splice(index, 1);
            calculateTotal(); // Tính toán lại tổng sau khi loại bỏ một mặt hàng
        }
        $scope.incrementQuantity = function (item) {
            item.quantity++;
            calculateTotal(); // Tính toán lại tổng sau khi tăng số lượng
        }
        $scope.decrementQuantity = function (item) {
            if (item.quantity > 1) {
                item.quantity--;
                calculateTotal(); // Tính toán lại tổng sau khi giảm số lượng
            }
        }
    })

    .controller('homeCtrl', function ($scope, $interval, $rootScope) {
        $interval(function () {
            $scope.now = new Date();
        }, 1000);
        $scope.page = 1;
        $scope.limit = 8;
        // Trang 1: start = 0
        // Trang 2: start = 4
        // Trang 3: start = 8
        // Trang 1: start = (n-1)*4
        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.tongTrang = Math.ceil($scope.dssp.length / $scope.limit);//$scope.dssp:Tổng số sản Phẩm ||  $scope.limit: Số sản phẩm Mỗi Trang
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.tongTrang; i++) {
            $scope.dsTrang.push(i);
        }
        $scope.chontrang = function (trang) {
            $scope.page = trang;
            $scope.start = ($scope.page - 1) * $scope.limit;
        };


        $rootScope.cart = [];
        $rootScope.addToCart = function (sp) {
            var inCart = false;
            //sp đã có trong cart -> tăng số lượng 
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    console.log($rootScope.cart[i].id, sp.id)
                    inCart = true;
                    $rootScope.cart[i].quantity++;
                    break;
                }
            }
            //sp chưa có trong cart -> thêm vào với số lượng là 1
            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);;
            }
            console.log($rootScope.cart);
        }


    })
    .controller('mohinhlmhtCtrl', function ($scope, $interval, $rootScope) {
        $scope.dssp = [
            {
                "id":"Liên Minh Huyền Thoại 01",
                "img": "TaiNguyen/lmht/lmht (1).jpeg",
                "chitietsp":"Mô hình Liên Minh Huyền Thoại ",
                "name":"Jinx Vệ Binh TT",
                "price":3300000
            },
            {
                "id":"Liên Minh Huyền Thoại 02",
                "img": "TaiNguyen/lmht/lmht (2).webp",
                "chitietsp":"Mô hình Liên Minh Huyền Thoại ",
                "name":"Lux Thập Đại NT",
                "price":2200000
            },
            {
                "id":"Liên Minh Huyền Thoại 03",
                "img": "TaiNguyen/lmht/lmht (9).webp",
                "chitietsp":"Mô hình Liên Minh Huyền Thoại ",
                "name":"Ahri Vệ Binh TT",
                "price":6700000
            },
            {
                "id":"Liên Minh Huyền Thoại 04",
                "img": "TaiNguyen/lmht/lmht (1).webp",
                "chitietsp":"Mô hình Liên Minh Huyền Thoại ",
                "name":"Jinx Mặc Đinh",
                "price":4500000
            }
        ];
        $interval(function () {
            $scope.now = new Date();
        }, 1000);
        $scope.page = 1;
        $scope.limit = 8;
        // Trang 1: start = 0
        // Trang 2: start = 4
        // Trang 3: start = 8
        // Trang 1: start = (n-1)*4
        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.tongTrang = Math.ceil($scope.dssp.length / $scope.limit);//$scope.dssp:Tổng số sản Phẩm ||  $scope.limit: Số sản phẩm Mỗi Trang
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.tongTrang; i++) {
            $scope.dsTrang.push(i);
        }
        $scope.chontrang = function (trang) {
            $scope.page = trang;
            $scope.start = ($scope.page - 1) * $scope.limit;
        };


        $rootScope.cart = [];
        $rootScope.addToCart = function (sp) {
            var inCart = false;
            //sp đã có trong cart -> tăng số lượng 
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    console.log($rootScope.cart[i].id, sp.id)
                    inCart = true;
                    $rootScope.cart[i].quantity++;
                    break;
                }
            }
            //sp chưa có trong cart -> thêm vào với số lượng là 1
            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);;
            }
            console.log($rootScope.cart);
        }


    })
    .controller('mohinhonepieceCtrl', function ($scope, $interval, $rootScope) {
        $scope.dssp = [
            {
                "id":"One Piece 01",
                "img": "TaiNguyen/one piece/onepiece (1).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Zoro Đeo Băng",
                "price":2000000
            },
            {
                "id":"One Piece 02",
                "img": "TaiNguyen/one piece/onepiece (2).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Trafalgar D. Water Law",
                "price":3200000
            },
            {
                "id":"One Piece 03",
                "img": "TaiNguyen/one piece/onepiece (3).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Luffy WANO",
                "price":5400000
            },
            {
                "id":"One Piece 04",
                "img": "TaiNguyen/one piece/onepiece (4).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Zoro Stampede",
                "price":7600000
            },
            {
                "id":"One Piece 05",
                "img": "TaiNguyen/one piece/onepiece (5).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Eustass Kid",
                "price":2300000
            },
            {
                "id":"One Piece 06",
                "img": "TaiNguyen/one piece/onepiece (6).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Zoro Stampede",
                "price":4500000
            },
            {
                "id":"One Piece 07",
                "img": "TaiNguyen/one piece/onepiece (7).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Yamato Wano Quốc",
                "price":2300000
            },
            {
                "id":"One Piece 08",
                "img": "TaiNguyen/one piece/onepiece (8).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Luffy Nika",
                "price":5400000
            },
            {
                "id":"One Piece 09",
                "img": "TaiNguyen/one piece/onepiece (9).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Luffy & Ace",
                "price":4500000
            },
            {
                "id":"One Piece 10",
                "img": "TaiNguyen/one piece/onepiece (10).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Luffy & Ace",
                "price":1200000
            }
        ];
        $interval(function () {
            $scope.now = new Date();
        }, 1000);
        $scope.page = 1;
        $scope.limit = 8;
        // Trang 1: start = 0
        // Trang 2: start = 4
        // Trang 3: start = 8
        // Trang 1: start = (n-1)*4
        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.tongTrang = Math.ceil($scope.dssp.length / $scope.limit);//$scope.dssp:Tổng số sản Phẩm ||  $scope.limit: Số sản phẩm Mỗi Trang
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.tongTrang; i++) {
            $scope.dsTrang.push(i);
        }
        $scope.chontrang = function (trang) {
            $scope.page = trang;
            $scope.start = ($scope.page - 1) * $scope.limit;
        };


        $rootScope.cart = [];
        $rootScope.addToCart = function (sp) {
            var inCart = false;
            //sp đã có trong cart -> tăng số lượng 
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    console.log($rootScope.cart[i].id, sp.id)
                    inCart = true;
                    $rootScope.cart[i].quantity++;
                    break;
                }
            }
            //sp chưa có trong cart -> thêm vào với số lượng là 1
            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);;
            }
            console.log($rootScope.cart);
        }


    })
    .controller('mohinhjjksCtrl', function ($scope, $interval, $rootScope) {
        $scope.dssp = [
            {
                "id":"Jujutsu Kaisen 01",
                "img": "TaiNguyen/jjks/jjks (1).webp",
                "chitietsp":"Mô hình Jujutsu Kaisen ",
                "name":"Namikaze Minato V2",
                "price":3300000
            },
            {
                "id":"Jujutsu Kaisen 02",
                "img": "TaiNguyen/jjks/jjks (2).webp",
                "chitietsp":"Mô hình Jujutsu Kaisen ",
                "name":"Gojo Satoru ",
                "price":6700000
            },{
                "id":"Jujutsu Kaisen 03",
                "img": "TaiNguyen/jjks/jjks (3).webp",
                "chitietsp":"Mô hình Jujutsu Kaisen ",
                "name":"Gojo Lục Nhãn",
                "price":1100000
            },{
                "id":"Jujutsu Kaisen 04",
                "img": "TaiNguyen/jjks/jjks (4).webp",
                "chitietsp":"Mô hình Jujutsu Kaisen ",
                "name":"Gojo Lục Nhãn V2",
                "price":3400000
            },{
                "id":"Jujutsu Kaisen 05",
                "img": "TaiNguyen/jjks/jjks (5).webp",
                "chitietsp":"Mô hình Jujutsu Kaisen ",
                "name":"Tojo Zenin",
                "price":1200000
            },{
                "id":"Jujutsu Kaisen 06",
                "img": "TaiNguyen/jjks/jjks (6).webp",
                "chitietsp":"Mô hình Jujutsu Kaisen ",
                "name":"Tojo Zenin V2",
                "price":5400000
            },{
                "id":"Jujutsu Kaisen 07",
                "img": "TaiNguyen/jjks/jjks (7).webp",
                "chitietsp":"Mô hình Jujutsu Kaisen ",
                "name":"Tojo Zenin V3",
                "price":5100000
            },{
                "id":"Jujutsu Kaisen 08",
                "img": "TaiNguyen/jjks/jjks (8).webp",
                "chitietsp":"Mô hình Jujutsu Kaisen ",
                "name":"Megumi Fushiguro",
                "price":4400000
            },{
                "id":"Jujutsu Kaisen 09",
                "img": "TaiNguyen/jjks/jjks (9).webp",
                "chitietsp":"Mô hình Jujutsu Kaisen ",
                "name":"Gojo Thời Niên Thiếu",
                "price":8700000
            },{
                "id":"Jujutsu Kaisen 10",
                "img": "TaiNguyen/jjks/jjks (10).webp",
                "chitietsp":"Mô hình Jujutsu Kaisen ",
                "name":"Geto Suguru",
                "price":2300000
            }
        ];
        $interval(function () {
            $scope.now = new Date();
        }, 1000);
        $scope.page = 1;
        $scope.limit = 8;
        // Trang 1: start = 0
        // Trang 2: start = 4
        // Trang 3: start = 8
        // Trang 1: start = (n-1)*4
        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.tongTrang = Math.ceil($scope.dssp.length / $scope.limit);//$scope.dssp:Tổng số sản Phẩm ||  $scope.limit: Số sản phẩm Mỗi Trang
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.tongTrang; i++) {
            $scope.dsTrang.push(i);
        }
        $scope.chontrang = function (trang) {
            $scope.page = trang;
            $scope.start = ($scope.page - 1) * $scope.limit;
        };


        $rootScope.cart = [];
        $rootScope.addToCart = function (sp) {
            var inCart = false;
            //sp đã có trong cart -> tăng số lượng 
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    console.log($rootScope.cart[i].id, sp.id)
                    inCart = true;
                    $rootScope.cart[i].quantity++;
                    break;
                }
            }
            //sp chưa có trong cart -> thêm vào với số lượng là 1
            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);;
            }
            console.log($rootScope.cart);
        }


    })
    .controller('mohinhnarutoCtrl', function ($scope, $interval, $rootScope) {
        $scope.dssp = [
            {
                "id":"Naruto 01",
                "img": "TaiNguyen/naruto/naruto (1).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Itachi Susano",
                "price":2100000
            },
            {
                "id":"Naruto 02",
                "img": "TaiNguyen/naruto/naruto (2).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Sasuke Saringan",
                "price":3200000
            },
            {
                "id":"Naruto 03",
                "img": "TaiNguyen/naruto/naruto (3).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Minato Rasengan",
                "price":5400000
            },
            {
                "id":"Naruto 04",
                "img": "TaiNguyen/naruto/naruto (4).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Naruto Làng Lá",
                "price":6700000
            },
            {
                "id":"Naruto 05",
                "img": "TaiNguyen/naruto/naruto (5).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Sakura Rìu Chiến",
                "price":6700000
            },
            {
                "id":"Naruto 06",
                "img": "TaiNguyen/naruto/naruto (6).webp",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Deidara Akatsuki",
                "price":7600000
            },
            {
                "id":"Naruto 07",
                "img": "TaiNguyen/naruto/naruto (7).jpg",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Naruto Phân Thân",
                "price":3400000
            },
            {
                "id":"Naruto 08",
                "img": "TaiNguyen/naruto/naruto (8).jpg",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Sakura Rìu Chiến V2",
                "price":2300000
            },
            {
                "id":"Naruto 09",
                "img": "TaiNguyen/naruto/naruto (9).jpg",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Tia Chớp Vàng ",
                "price":2300000
            },
            {
                "id":"Naruto 10",
                "img": "TaiNguyen/naruto/naruto (10).jpg",
                "chitietsp":"Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name":"Namikaze Minato",
                "price":2200000
            }
        ];
        $interval(function () {
            $scope.now = new Date();
        }, 1000);
        $scope.page = 1;
        $scope.limit = 8;
        // Trang 1: start = 0
        // Trang 2: start = 4
        // Trang 3: start = 8
        // Trang 1: start = (n-1)*4
        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.tongTrang = Math.ceil($scope.dssp.length / $scope.limit);//$scope.dssp:Tổng số sản Phẩm ||  $scope.limit: Số sản phẩm Mỗi Trang
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.tongTrang; i++) {
            $scope.dsTrang.push(i);
        }
        $scope.chontrang = function (trang) {
            $scope.page = trang;
            $scope.start = ($scope.page - 1) * $scope.limit;
        };


        $rootScope.cart = [];
        $rootScope.addToCart = function (sp) {
            var inCart = false;
            //sp đã có trong cart -> tăng số lượng 
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    console.log($rootScope.cart[i].id, sp.id)
                    inCart = true;
                    $rootScope.cart[i].quantity++;
                    break;
                }
            }
            //sp chưa có trong cart -> thêm vào với số lượng là 1
            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);;
            }
            console.log($rootScope.cart);
        }


    })
    .controller('mohinhdragonballCtrl', function ($scope, $interval, $rootScope) {
        $scope.dssp = [
            {
                "id":"Dragon Ball 01",
                "img":"TaiNguyen/goku/goku (1).png",
                "name":"GOKU SUPER SAYJA Cấp 2",
                "chitietsp":"Mô hình goku siêu cấp",
                "price":1000000
            },
            {
                "id":"Dragon Ball 02",
                "img":"TaiNguyen/goku/goku (2).webp",
                "name":"GOKU SUPER SAYJA CẤP 8",
                "chitietsp":"Mô hình goku siêu cấp",
                "price":1030000
            },
            {
                "id":"Dragon Ball 03",
                "img":"TaiNguyen/goku/goku (3).webp",
                "name":"GOKU SUPER SAYJA CẤP 8",
                "chitietsp":"Mô hình goku siêu cấp",
                "price":1200000
            },{
                "id":"Dragon Ball 04",
                "img":"TaiNguyen/goku/goku (4).webp",
                "name":"GOKU SUPER SAYJA CẤP 8",
                "chitietsp":"Mô hình goku siêu cấp",
                "price":1400000
            },{
                "id":"Dragon Ball 05",
                "img":"TaiNguyen/goku/goku (5).webp",
                "name":"GOKU SUPER SAYJA CẤP 3",
                "chitietsp":"Mô hình goku siêu cấp",
                "price":2910000
            },{
                "id":"Dragon Ball 06",
                "img":"TaiNguyen/goku/goku (6).webp",
                "name":"BROLi SUPER SAYJA",
                "chitietsp":"Mô hình goku siêu cấp",
                "price":4120000
            },{
                "id":"Dragon Ball 07",
                "img":"TaiNguyen/goku/goku (7).webp",
                "name":"GOKU SUPER SAYJA GOOD",
                "chitietsp":"Mô hình goku siêu cấp",
                "price":8700000
            },{
                "id":"Dragon Ball 08",
                "img":"TaiNguyen/goku/goku (8).webp",
                "name":"GOKU SUPER SAYJA CẤP 1",
                "chitietsp":"Mô hình goku siêu cấp",
                "price":3000000
            },{
                "id":"Dragon Ball 09",
                "img":"TaiNguyen/goku/goku (9).webp",
                "name":"GOKU SUPER SAYJA CẤP 4",
                "chitietsp":"Mô hình goku siêu cấp",
                "price":4300000
            },{
                "id":"Dragon Ball 010",
                "img":"TaiNguyen/goku/goku (10).webp",
                "name":"GOKU HỒI SINH",
                "chitietsp":"Mô hình goku siêu cấp",
                "price":9300000
            }
        ];
        $interval(function () {
            $scope.now = new Date();
        }, 1000);
        $scope.page = 1;
        $scope.limit = 8;
        // Trang 1: start = 0
        // Trang 2: start = 4
        // Trang 3: start = 8
        // Trang 1: start = (n-1)*4
        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.tongTrang = Math.ceil($scope.dssp.length / $scope.limit);//$scope.dssp:Tổng số sản Phẩm ||  $scope.limit: Số sản phẩm Mỗi Trang
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.tongTrang; i++) {
            $scope.dsTrang.push(i);
        }
        $scope.chontrang = function (trang) {
            $scope.page = trang;
            $scope.start = ($scope.page - 1) * $scope.limit;
        };


        $rootScope.cart = [];
        $rootScope.addToCart = function (sp) {
            var inCart = false;
            //sp đã có trong cart -> tăng số lượng 
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    console.log($rootScope.cart[i].id, sp.id)
                    inCart = true;
                    $rootScope.cart[i].quantity++;
                    break;
                }
            }
            //sp chưa có trong cart -> thêm vào với số lượng là 1
            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);;
            }
            console.log($rootScope.cart);
        }


    })





