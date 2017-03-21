
var initMap=function(){};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ksSwiper', 'ngMap'])

    .controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("home"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Home"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.subscribe = function (email) {
            console.log("email", email);
            if (email.email) {
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



    .controller('ProductCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("product"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Product"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.tab = "design";
        $scope.classa = 'active';
        $scope.classb = '';
        $scope.classc = '';


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
    .controller('Google-MapCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("google-map"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Google-Map"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }


function initMap() {
    alert("ghsgajhgas");
    if (typeof google === 'object' && typeof google.maps === 'object') {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 8
        });

       var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
    },
    markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
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
}
setTimeout(function(){
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
    .controller('MycartCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("mycart"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Mycart"); //This is the Title of the Website
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
    .controller('ContactUsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("contactus"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("ContactUs"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;


    })
    .controller('MemberCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        $scope.template = TemplateService.changecontent("member"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Member"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.test = function (size) {

            $scope.testModal = $uibModal.open({
                animation: true,
                templateUrl: 'frontend/views/content/Modal/modsub.html',
                scope: $scope,
                size: size,
                windowClass: "test-modal"

            });
        };
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

    .controller('Blog-IndividualCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("blog-individual"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Blog-Individual"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
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
    .controller('headerctrl', function ($scope, $uibModal, TemplateService) {
        $scope.template = TemplateService;
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $(window).scrollTop(0);
        });
        $.fancybox.close(true);
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
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 100) {
                $(".img-logo").addClass("small-logo");
            } else {
                $(".img-logo").removeClass("small-logo");
            }
        });


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