var initMap = function () {};
var codeAddress = function () {};
//var deleteMarkers=function(){};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', , 'ngSanitize', 'angular-flexslider', 'ksSwiper', 'ngMap'])

    .controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        $scope.template = TemplateService.changecontent("home"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Home"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.subscribe = function (formData) {
            console.log("email", formData);
            if (formData.email) {
                NavigationService.apiCallWithData("NewsLetter/save", formData, function (data) {
                    if (data.value === true) {
                        console.log("data saved successfully", data)
                        $state.go('home');
                    } else {
                        //  toastr.warning('Error submitting the form', 'Please try again');
                    }
                });
                $scope.show = true;
                $timeout(function () {
                    $scope.show = false;
                    $scope.subscribeForm = {};
                }, 2000);
            }
        }

        // $scope.mySlides = [
        //     'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
        //     'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
        //     'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
        //     'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
        // ];
        $scope.section = {
            one: "frontend/views/content/section/section1.html",
            two: "frontend/views/content/section/section2.html",
            three: "frontend/views/content/section/section3.html",
            four: "frontend/views/content/section/section4.html",
            five: "frontend/views/content/section/section5.html",
            six: "frontend/views/content/section/section6.html"
        };

    })

    .controller('headerctrl', function ($scope, $uibModal, $state, $window, TemplateService, NavigationService) {
        $scope.template = TemplateService;
        $scope.profile = {};
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $(window).scrollTop(0);
        });
        $scope.showMenu = false;
        $scope.getMenu = function () {
            console.log('amit');
            if ($scope.showMenu == false) {
                // alert('test');
                $scope.showMenu = true;
                $('.repeated-item').addClass('no-menu-scroll');
            } else {
                $scope.showMenu = false;
                $('.repeated-item').removeClass('no-menu-scroll');
            }
        }
        $.fancybox.close(true);
        $scope.login = function () {
            $scope.loginModal = $uibModal.open({
                animation: true,
                templateUrl: 'frontend/views/content/Modal/login.html',
                scope: $scope,
                windowClass: "login-modal"

            });
        };




        $scope.loginclose = function (formData) {
            console.log(formData);
            if (formData) {
                NavigationService.profile("User/login", formData, function (data) {
                    if (data.value === true) {
                        console.log("login", data.data)
                        $scope.loginModal.close();
                        $.jStorage.set("user", data.data);
                        $scope.template.userProfile = data.data;
                        // toastr.success('You have been successfully logged in', 'Login Success';

                    } else if (data.value === false) {
                        // toastr.warning(data.error.message, 'Login Failure');
                    } else {
                        // toastr.warning('Something went wrong', 'Please try again');
                    }
                });
            }
        };
        $scope.accessToken = $.jStorage.get("accessToken");
        if ($.jStorage.get('user')) {
            $scope.template.userProfile = $.jStorage.get('user');
        }
        $scope.logout = function () {
            $.jStorage.flush();
            $scope.template.userProfile = null;
        };

        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 100) {
                $(".img-logo").addClass("small-logo");
            } else {
                $(".img-logo").removeClass("small-logo");
            }
        });


    })
    .controller('FormCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("form"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Form"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })



    .controller('ProductCtrl', function ($scope, TemplateService, $state, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("product"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Product"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.tab = "design";
        $scope.classa = 'active';
        $scope.classb = '';
        $scope.classc = '';

        NavigationService.callApi("Products/search", function (data) {
            if (data.value === true) {
                $scope.productData = data.data.results;
                $scope.productData = _.chunk($scope.productData, 3)
                console.log("data found successfully")
            } else {
                //  toastr.warning('Error submitting the form', 'Please try again');
            }
        });
        $scope.viewDetail = 1;
        $scope.showDetails = function (data) {
            $scope.viewDetail = data;
            console.log($scope.viewDetail);
        }

        $scope.addToCart = function (data) {
            var formdata = {};
            formdata = $.jStorage.get('user')
            console.log(formdata);
            formdata.cartProducts.push($scope.productData[0][data - 1]._id);
            if (formdata.cart) {
                console.log("formdata.cart", formdata.cart);
                formdata.cart.totalAmount = Number(formdata.cart.totalAmount) + Number($scope.productData[0][data - 1].price);

            } else {
                formdata.cart = {};
                formdata.cart.totalAmount = Number($scope.productData[0][data - 1].price);
            }
            NavigationService.apiCallWithData("User/save", formdata, function (data) {
                if (data.value === true) {
                    NavigationService.apiCallWithData("User/getOne", formdata, function (data) {
                        if (data.value === true) {
                            console.log("data saved successfully", data)
                            $.jStorage.set("user", data.data);
                            $scope.template.userProfile = data.data;
                            //  $state.go('mycart');
                        }
                    });

                    $state.go('mycart');
                } else {
                    //  toastr.warning('Error submitting the form', 'Please try again');
                }
            });
        }
        $scope.tabchange = function (tab, a) {
            $scope.tab = tab;
            if (a == 1) {
                $scope.classa = 'active-tab';
                $scope.classb = '';
                $scope.classc = '';


            }
            if (a == 2) {
                $scope.classb = 'active-tab';
                $scope.classa = '';
                $scope.classc = '';


            }
            if (a == 3) {
                $scope.classc = 'active-tab';
                $scope.classb = '';
                $scope.classa = '';
            }
        };
    })

    .controller('AboutCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("about"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("About"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }


    })
    .controller('AboutusCtrl', function ($scope, TemplateService, NavigationService, $timeout, $anchorScroll, $location) {
        $scope.template = TemplateService.changecontent("aboutus"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Aboutus"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.gotoBottom = function () {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash('at-footer');
            // call $anchorScroll() 
            $anchorScroll();
        };
        $timeout(function () {
            $scope.gotoBottom();
        }, 100);

    })

    .controller('Google-Map-2Ctrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("google-map-2"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Google-Map-2"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })
    .controller('Google-MapCtrl', function ($scope, TemplateService, $state, $uibModal, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("google-map"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Google-Map"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;
        $scope.mapData = {};
        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
        $scope.login = function (formData) {
            $scope.mapData = formData;
            $scope.loginModal = $uibModal.open({
                animation: true,
                templateUrl: 'frontend/views/content/Modal/login.html',
                scope: $scope,
                windowClass: "login-modal"

            });
        };
        $scope.submitMapCalc = function (formData) {
            console.log(formData);
            if (formData) {
                formData.points = [];
                for (var i = 0; i < $scope.vertices.getLength(); i++) {
                    var xy = $scope.vertices.getAt(i);
                    console.log("xy", xy);
                    formData.points.push(xy);
                }
                NavigationService.profile("CadLineWork/save", formData, function (data) {
                    if (data.value === true) {
                        console.log("CadLineWork saved successfully");
                        // $state.go("home");
                        // toastr.success('You have been successfully logged in', 'Login Success';
                    } else {
                        // toastr.warning('Something went wrong', 'Please try again');
                    }
                });
            }

        }
        $scope.loginclose = function (formData) {
            console.log(formData);
            if (formData) {
                NavigationService.profile("User/login", formData, function (data) {
                    if (data.value === true) {
                        console.log("login", data.data)
                        $scope.loginModal.close();
                        $.jStorage.set("user", data.data);
                        $scope.template.userProfile = data.data;
                        // toastr.success('You have been successfully logged in', 'Login Success';
                    } else if (data.value === false) {
                        // toastr.warning(data.error.message, 'Login Failure');
                    } else {
                        // toastr.warning('Something went wrong', 'Please try again');
                    }
                });
            }
        };
        if ($.jStorage.get('user')) {
            $scope.template.userProfile = $.jStorage.get('user');
        }


        var geocoder;
        var map
        var markers = [];

        function initMap() {
            if (typeof google === 'object' && typeof google.maps === 'object') {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: {
                        lat: -34.397,
                        lng: 150.644
                    },
                    zoom: 8
                });
                geocoder = new google.maps.Geocoder();
                var drawingManager = new google.maps.drawing.DrawingManager({
                    drawingMode: google.maps.drawing.OverlayType.MARKER,
                    drawingControl: true,
                    drawingControlOptions: {
                        position: google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
                    },
                    markerOptions: {
                        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                    },
                    circleOptions: {
                        fillColor: '#ffff00',
                        fillOpacity: 1,
                        strokeWeight: 5,
                        clickable: false,
                        editable: true,
                        zIndex: 1
                    }
                });
                drawingManager.setMap(map);
            }
            google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
                var coordinates = (polygon.getPath().getArray());
                var z = google.maps.geometry.spherical.computeArea(polygon.getPath().getArray());
                var area = google.maps.geometry.spherical.computeArea(polygon.getPath());
                console.log("area", area);
                $scope.mapData.sqft = Number(area) * Number(10.763910417);
                $scope.mapData.acreage = Number(area) * Number(0.00024711);
                console.log("area", $scope.mapData.sqft);
                $scope.vertices = polygon.getPath();
                var contentString;
                for (var i = 0; i < $scope.vertices.getLength(); i++) {
                    var xy = $scope.vertices.getAt(i);
                    contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
                        xy.lng();
                }
                console.log("contentString", contentString)
            });
            /////////////////////////////////////////////////////////////////////////
            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function () {
                searchBox.setBounds(map.getBounds());
            });


            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function () {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers.forEach(function (marker) {
                    marker.setMap(null);
                });
                markers = [];

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function (place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    markers.push(new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }));

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });
        }

        // function deleteMarkers() {
        //     markers = [];
        // }
        // $scope.codeAddress = function () {
        //     console.log("hey m in codeAddress()");
        //     var address = document.getElementById('address').value;
        //     geocoder.geocode({
        //         'address': address
        //     }, function (results, status) {
        //         if (status == 'OK') {
        //             map.setCenter(results[0].geometry.location);
        //             var marker = new google.maps.Marker({
        //                 map: map,
        //                 position: results[0].geometry.location
        //             });
        //         } else {
        //             alert('Geocode was not successful for the following reason: ' + status);
        //         }
        //     });
        // }
        setTimeout(function () {
            initMap();
        }, 1000);


        $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCGSUwk7KdhoDlwzq7CSpeJDcOjKzu-xRA";
        var vm = this;
        vm.onMapOverlayCompleted = function (e) {
            console.log("hey")
            console.log(e.type);
        };

    })

    .controller('Support-DfmCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        $scope.template = TemplateService.changecontent("support-dfm"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Support-Dfm"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }

        $scope.login = function () {
            $scope.loginModal = $uibModal.open({
                animation: true,
                templateUrl: 'frontend/views/content/Modal/login.html',
                scope: $scope,
                windowClass: "login-modal"

            });
        };
        $scope.loginclose = function () {
            $scope.loginModal.close();
        };
    })
    .controller('supportDfm2Ctrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("support-dfm-2"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Support Dfm 2"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })
    .controller('ServiceCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("service"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Service"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })
    .controller('How-We-WorkCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("how-we-work"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("How-We-Work"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })
    .controller('MycartCtrl', function ($scope, TemplateService, $filter, $state, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("mycart"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Mycart"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
        var formdata = {};
        $scope.myCart = {}
        formdata._id = $.jStorage.get('user')._id;
        NavigationService.apiCallWithData("User/getcart", formdata, function (data) {
            if (data.value === true) {
                console.log("data saved successfully", data)
                $scope.myCart = data.data;

                //  $state.go('mycart');
            }
        });
        $scope.addQuantity = function (data) {
            $scope.myCart.cartProducts[data].quantity++;
            // console.log("myCart.cartProducts", $scope.myCart.cartProducts[data]);
        }
        $scope.reduceQuantity = function (data) {
            if ($scope.myCart.cartProducts[data].quantity > 1) {
                $scope.myCart.cartProducts[data].quantity--;
            }
            // console.log("myCart.cartProducts", $scope.myCart.cartProducts[data])
        }
        $scope.checkout = function (formdata) {
            formdata.cart.totalAmount = $filter('sumFilter')(formdata.cartProducts)
            NavigationService.apiCallWithData("User/save", formdata, function (data) {
                if (data.value === true) {
                    NavigationService.apiCallWithData("User/getOne", formdata, function (data) {
                        if (data.value === true) {
                            console.log("data saved successfully", data)
                            $.jStorage.set("user", data.data);
                            $scope.template.userProfile = data.data;
                            //  $state.go('mycart');
                        }
                    });
                    $state.go('checkout');
                } else {
                    //  toastr.warning('Error submitting the form', 'Please try again');
                }
            });
        }

    })
    .controller('CheckoutCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("checkout"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Checkout"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formdata = {};
        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
        $scope.sameAsBil = function (data) {
            if (document.getElementById("agree").checked) {
                $scope.formdata.shippingAddress = data;
            } else {
                $scope.formdata.shippingAddress = {};
            }
        }
        var formdata = {};
        $scope.myCart = {}
        $scope.myCart = $.jStorage.get('user');
        $scope.saveOrder = function (formdata) {
            formdata.products = $scope.myCart.cartProducts;
            formdata.user = $scope.myCart._id;
            formdata.totalAmount = $scope.myCart.cart.totalAmount;
            if ($scope.myCart.cart.discountCoupon) {
                formdata.discountCoupon = $scope.myCart.cart.discountCoupon;
            }
            if ($scope.myCart.cart.discountAmount) {
                formdata.discountAmount = $scope.myCart.cart.discountAmount;
            }
            NavigationService.apiCallWithData("ProductOrders/save", formdata, function (data) {
                if (data.value === true) {
                    console.log("data saved successfully")
                }
            });
        }
    })
    .controller('ContinueCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("continue"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("continue"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })
    .controller('PrivacyPolicyCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("privacypolicy"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("PrivacyPolicy"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })
    .controller('TermsandConditionsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("terms"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("TermsandConditions"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })

    .controller('MemberPageCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("member-page"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("MemberPage"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }

    })
    .controller('ContactUsCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("contactus"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("ContactUs"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;
        $scope.saveContact = function (formData) {
            NavigationService.apiCallWithData("ContactUs/save", formData, function (data) {
                if (data.value === true) {
                    console.log("data saved successfully", data)
                    $state.go('home');
                } else {
                    //  toastr.warning('Error submitting the form', 'Please try again');
                }
            });
        }


    })
    .controller('MemberCtrl', function ($scope, TemplateService, $state, NavigationService, $timeout, $stateParams, $uibModal) {
        $scope.template = TemplateService.changecontent("member"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Member"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.id = $stateParams.id;
        console.log($scope.id);
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.test = function (size, formData) {
            NavigationService.apiCallWithData("User/registerUser", formData, function (data) {
                if (data.value === true) {
                    console.log("data saved successfully", data)
                    $scope.formData = {};
                    $scope.testModal = $uibModal.open({
                        animation: true,
                        templateUrl: 'frontend/views/content/Modal/modsub.html',
                        scope: $scope,
                        size: size,
                        windowClass: "test-modal"

                    });
                } else {
                    //  toastr.warning('Error submitting the form', 'Please try again');
                }
            })
        };
        $scope.getCity = function () {
            console.log("hiiiiiiiiiiiiiiiiiiiiiii");
            var input = document.getElementById('locationCity');
            var autocomplete = new google.maps.places.Autocomplete(input);
            // google.maps.event.addListener(autocomplete, 'click', function () {
            //     alert('CLicked');
            // // });
            autocomplete.addListener('place_changed', function () {
                $scope.addLocation();


            });

        }
        $scope.dummy = {}
        $scope.addLocation = function () {

            if (!_.isEmpty(document.getElementById("locationCity").value)) {
                var valText = document.getElementById("locationCity").value;
                console.log(valText)
                var valArr = [];
                //console.log(!/\d/.test(valText)); //returns true if contains numbers
                if (!/\d/.test(valText)) {
                    valArr = valText.split(",");
                    if (!/\d/.test(valArr[0])) {
                        console.log("******lenght******", valArr.length)
                        if (valArr.length == 3) {
                            // $scope.arrLocation.push(valArr[0]);
                            document.getElementById("locationCity").value = null;
                            $scope.formData.city = valArr[0];
                            $scope.formData.state = valArr[1];
                            $scope.formData.country = valArr[2];
                            console.log("country is:", $scope.formData.country)
                            $scope.$digest();

                        } else {
                            if (valArr.length == 2) {
                                console.log("*******inside else***", valArr.length);
                                console.log("valArr[0]", valArr[0]);
                                console.log("valArr[1]", valArr[1]);
                                // document.getElementById("locationCity").value = null;
                                $scope.formData.city = valArr[0];
                                $scope.formData.state = "";
                                $scope.$digest();
                            }
                        }
                    }
                    // document.getElementById("locationCity").value = null
                }
            } else {
                // alert('Please enter the location');
                toastr.error('Please enter the location');
            }
        }



        //         $scope.dropdownList=[{
        //             plan:'Trial'
        //         },{
        //             plan:'premium'
        //         }, {
        //             plan:'standard'
        //         }]
        //         $scope.checkselection = function () {
        // if ($scope.userSelect != "" && $scope.userSelect != undefined)
        // $scope.msg = 'Selected Value: '+$scope.userSelect;
        // else
        // $scope.msg = 'Please Select Dropdown Value';
        // }

    })
    .controller('ShippingCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("shipping"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Shipping"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.header = "";
        $scope.formSubmitted = false;
        $scope.formData = {};
        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        };
         $scope.saveData = function (data) {
             console.log("$$$$data is:",data);
         }
        $scope.setShippingAddress = function (data) {
            if (!$scope.formData.shippingAddress) {
                $scope.formData.shippingAddress = {};
            }
            console.log("formddta", $scope.formData, "data", data);
            if (document.getElementById("agree").checked) {
                $scope.formData.shippingAddress.name = $scope.formData.address.name;
                $scope.formData.shippingAddress.lname = $scope.formData.address.lname;
                $scope.formData.shippingAddress.company = $scope.formData.address.company;
                $scope.formData.shippingAddress.address1 = $scope.formData.address.address1;
                $scope.formData.shippingAddress.apartment = $scope.formData.address.apartment;
                $scope.formData.shippingAddress.city = $scope.formData.address.city;
                $scope.formData.shippingAddress.state = $scope.formData.address.state;
                $scope.formData.shippingAddress.country = $scope.formData.address.country;
                $scope.formData.shippingAddress.phonenumber = $scope.formData.address.phonenumber;
                $scope.formData.shippingAddress.zipCode = $scope.formData.address.zipcode;

                console.log("formdafterdta", $scope.formData, "data", data);
            } else {
                $scope.formdata.shippingAddress = {};
            }
        };

        if ($.jStorage.get("user")) {
            formdata = {};
            formdata._id = $.jStorage.get("user")._id;
            NavigationService.apiCallWithData("User/getOne", $.jStorage.get("user"), function (data) {
                if (data.value === true) {
                    $scope.userData = data.data.results;
                    $scope.formData.address = {};
                    $scope.formData.address.name = data.data.name;
                    $scope.formData.address.city = data.data.city;
                    $scope.formData.address.address1 = data.data.address;
                    $scope.formData.address.state = data.data.state;
                    $scope.formData.address.phonenumber = data.data.mobile;
                    $scope.formData.address.company = data.data.organization;
                    $scope.formData.address.country = data.data.country;
                    console.log("data found successfully")
                } else {
                    //  toastr.warning('Error submitting the form', 'Please try again');
                }
            });
        }
        $scope.autoLocation = function () {
                var input = document.getElementById('locationCity');
                var autocomplete = new google.maps.places.Autocomplete(input);
                // google.maps.event.addListener(autocomplete, 'click', function () {
                //     alert('CLicked');
                // // });
                autocomplete.addListener('place_changed', function () {
                    $scope.addLocation();


                });

            },

            $scope.addLocation = function () {

                if (!_.isEmpty(document.getElementById("locationCity").value)) {
                    var valText = document.getElementById("locationCity").value;
                    console.log(valText)
                    var valArr = [];
                    //console.log(!/\d/.test(valText)); //returns true if contains numbers
                    if (!/\d/.test(valText)) {
                        valArr = valText.split(",");
                        if (!/\d/.test(valArr[0])) {
                            console.log("******lenght******", valArr.length)
                            if (valArr.length == 3) {
                                // $scope.arrLocation.push(valArr[0]);
                                document.getElementById("locationCity").value = null;
                                $scope.formData.address.city = valArr[0];
                                $scope.formData.address.state = valArr[1];
                                $scope.formData.address.country = valArr[2];
                                $scope.$digest();
                                console.log($scope.formData.address.city);
                            } else {
                                if (valArr.length == 2) {
                                    console.log("*******inside else***", valArr.length);
                                    console.log("valArr[0]", valArr[0]);
                                    console.log("valArr[1]", valArr[1]);
                                    // document.getElementById("locationCity").value = null;
                                    $scope.formData.address.city = valArr[0];
                                    $scope.formData.address.country = valArr[1];
                                    $scope.formData.address.state = "";
                                    $scope.$digest();
                                }
                            }
                        }
                        // document.getElementById("locationCity").value = null
                    }
                } else {
                    // alert('Please enter the location');
                    toastr.error('Please enter the location');
                }
            }
    })

    .controller('Blog-IndividualCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        $scope.template = TemplateService.changecontent("blog-individual"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Blog-Individual"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        };
        $scope.stateId = $stateParams.id;
        if ($stateParams.id) {
            switch ($stateParams.id) {
                case '1':
                    $scope.blogShow = false;
                    console.log("im in case1");
                    $scope.blogDetail = {
                        "image": "frontend/img/new/7.jpg",
                        "title": "AN ASSORTMENT OF APPLICATION",
                        "date": " ",
                        "desc1": "Need an orthomosaic to be created from your high qulity dron images?",
                        "desc2": "or would you prefer to organize and analyze your dron data through Drone File Management Systems? UNIFLI lets you handle it all with a single click.",
                        "desc3": "Get one-click applications that are intelligently design to decipher and deliver the data that you need, in a formaat you prefer. That means you can create complex databases,generate orthorectified and georeferenced maps, and seamlessly share this multiple platforms. ",
                        "desc4": "Finding experts to help you create 3D elevation models and study topographic information can be a tricky task, in a highly competitive market. Our in-house applications also let you visualize topographic information and create elevation extractions without any hassles, so you can generate detailed reports in any format that you need."
                    }

                    break;
                case '2':
                    $scope.blogShow = false;
                    console.log("im in case2");
                    $scope.blogDetail = {
                        "id": '2',
                        "image": "frontend/img/new/13.jpg",
                        "title": "COMPLETE THE CIRCLE WITH CAD LINEWORK",

                        // "desc4":"Need an orthomosaic to be created from your high qulity dron images?",
                        "desc1": "When we say comprehensive, we mean it.",
                        "desc2": "We’ve integrated our premium CAD drafting service as part of the options available at UNIFLI, so you don’t have to find new vendors for any of your CAD requirements.",
                        "desc3": "Armed with our Google Maps Area Calculator, sending a CAD request in UNIFLI is now super simple. Just select the area of land for CAD linework through the application, and send a quick request for CAD drafting - that’s all it takes. You’ll receive your CAD files in 48 hours or less, helping you dedicate more time to your projects and less time running around.",
                        "desc5": "UNIFLI is the future - a winning solution that keeps your business running, anytime, anywhere.",
                        "desc6": "With a global presence and competitive teams of highly qualified engineers, analysts and support executives, we’re in the process of ushering a new age of technological excellence in the surveying industry.",
                        "desc7": "Need more details? Send us an email!"
                    }

                    break;
                case '3':
                    $scope.blogShow = false;
                    console.log("im in case3");
                    $scope.blogDetail = {
                        "image": "frontend/img/new/58.jpg",
                        "title": "THIS ONE STOP SHOP IS THE SOLUTION<br> TO ALL YOUR DRONE SURVEYING PROBLEMS!",

                        "desc1": "The World of land surveying has changed, and how!",
                        "desc2": "Thanks to newer and more efficient technologies like drones and data capturing, it's much easier land and collate, analyze and curate data in highly effective ways like never before.",
                        "desc3": "But regardless of all these developments, there's still a major problem that surveyors and engineers have to deal with-time.",
                        "desc4": "With tens and hundreds of vendor handling individual parts of surveying life cycle, it becomes highly cumebersome for any surveyor to manage multiple work processes and deliverables.Add training quality control and feedback to the mix, and you have a cocktail that's an operational nightmare.",
                        "desc5": "wouldn't it be simpler to have one-stop-shop that can help you, end to end?",
                        "desc6": "That's what we do at UNIFLI."
                    }

                    break;
                case '4':
                    console.log("im in case3");
                    $scope.blogShow = true;
                    $scope.blogDetail = [{
                            "image": "frontend/img/new/copy.jpg",
                            "title": "HOW PART 107 IS PAYING THE WAY<br>FOR COMMERCIAL DRONE OPERTORS",
                            "title2": "For Starters, What’s Part 107?",
                            "title3": "What Does Part 107 Cover?",
                            // "date":"September 22,",
                            "desc1": "If you’re an aspiring drone pilot, the time is right for you to fly high. ",
                            "desc2": "Last year, in June 2016, FAA published it’s regulations (Part 107) for small unmanned aircraft systems, setting the playing field for greater and widespread use of drones in commercial and hobbyist projects.",
                            "desc3": "What this means is that the days of complex restrictions on the commercial use of drones are officially numbered, and industries are poised to embrace this massive technological advantage in multiple ways.",
                            "desc4": "Here’s a quick breakdown of what Part 107 covers, and what it means for commercial drone pilots.",

                            "desc5": "Part 107 is a section from the Code of Federal Regulations, and is outlined in Chapter 14 where it defines FAA’s UAS rules for the usage of commercial small aircraft (read: drones). It was officially brought into effect last year, in 2016.",
                            "desc6": "It reduces the restrictions on commercial drone pilots, making it easy for enthusiasts and beginners to get started with becoming expert drone operators.",
                            "desc7": "Let’s get down to the specifics of what Part 107 covers.",
                            "desc8": "It’s easier to be an operator now",
                            "desc9": "Operators and drone pilots need to be at least 16 years of age, and should be proficient in English. They need to obtain a Remote Pilot Airman Certificate<br> (with sUAS rating) to validate that they’re mentally and physically capable of operating the drone. "

                        },
                        {
                            "image": "frontend/img/new/10.jpg",
                            "title4": "All aircraft must be registered",
                            "title5": "There are defined operational guidelines (and limitations)",
                            "desc1": "Unlike the previous restrictions, operators just need to pass an FAA approved test on aeronautical knowledge to officially become drone pilots. This doesn’t apply to people who already hold a Part 61 certification. ",
                            "desc2": "All documents related to the aircraft need to be provided to the FAA on request., and operators should run a preliminary check on their aircraft before flight. ",
                            "desc3": "Any unmanned aerial vehicle or drone must be registered with the FAA, with aircraft markings in place. FAA has removed the need for an airworthiness certificate, making it easier and simpler for pilots and operators to register their UAVs.",
                            "desc4": "The sUAS needs a waiver if it weights more than 55 lbs.",
                            "desc5": "There are clearly defined operational guidelines under Part 107, making it easier for pilots to understand their limitations and avoid damage to their equipment or injury.",
                            "desc6": "- All operators need to maintain their sUAS and UAVs within their visual line of sight- Aircraft should be operated only during daylight hours<br>- UAVs and sUAS should not be operated over people not involved in the exercise<br>- Operations should be held within a maximum allowed altitude of 400 feet<br>- Air speed should not exceed a maximum of 100mph<br>- All aircraft must yield right of way to other manned or unmanned vehicles<br>- Any activities in Class A airspace is strictly forbidden<br>- With prior approval from ATC, operations in Class B, C, D, E airspaces will be allowed<br>- Visual observers aren’t mandatorily required",
                            "desc7": "This officially paves the way for exciting applications across multiple industries, increasing the scope of drone usages in the coming future. ",
                        },
                        {
                            "image": "frontend/img/new/img.jpg",
                            "title6": "Here's the good part.",
                            "desc1": "- Operators need not file a NOTAM(Notice to Aiemen)befire commencing work<br>- Liability insurance isn't mandatory for carrying out operations<br>- The extensive license process has been replaced with a simple FAA aeronautical test<br>- The regulations make crisis management and industrial inspection easier<br>- Part 107 allows drones to carry loads that don't cross 55 ibs overall (BIG NEWS!)<br>- The regulations make drone accessible to a bigger audience, for educational purpose   ",
                            "desc2": "This is the first step towards a new technological revolution, one that holds limitless scope for applications accorss different verticals and industries.",
                            "desc3": "Really, if you've always wanted to be a professional drone operator, now's the time.",
                            "desc4": "Here’s a link that comprehensively covers the specifics of what you need to know. "
                        }

                    ]

                    break;


                default:
                    break;
            }
        };
        $scope.alsodata = [{
                "id": "4",
                "image": "frontend/img/new/1.jpg",
                "title": "How Part 107 Is Paying The Way For Commercial Drone Operators",
                // "date":"September 22,",
            },
            {
                "id": "1",
                "image": "frontend/img/new/2.jpg",
                "title": "An Assortment Of Applications",
                // "date":"September 22,",
            },
            {
                "id": "2",
                "image": "frontend/img/new/ssss.jpg",
                "title": "Complete The Circle With CAD Linework",
                // "date":"September 22,",
            },
            {
                "id": "3",
                "image": "frontend/img/new/42.jpg",
                "title": "This One Stop Shop Is The Solution To All Your Drone Surveying Problems!",
                // "date":"September 22,",
            }

        ]

    })

    .controller('BlogCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("blog"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Blog"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })


    .controller('languageCtrl', function ($scope, TemplateService, $translate, $rootScope) {

        $scope.changeLanguage = function () {
            console.log("Language CLicked");

            if (!$.jStorage.get("language")) {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                if ($.jStorage.get("language") == "en") {
                    $translate.use("hi");
                    $.jStorage.set("language", "hi");
                } else {
                    $translate.use("en");
                    $.jStorage.set("language", "en");
                }
            }
            //  $rootScope.$apply();
        };


    })

;