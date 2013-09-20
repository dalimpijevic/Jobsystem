(function() {
  window.app.controller('CategoryController', [
    '$scope', '$http', '$routeParams', 'Base64Service', 'CategoryService', 'Mission', 'MissionService', 'Category', 'CustomerService', 'PrivateCustomer', 'CompanyCustomer', 'GoogleMapsService', 'TextMessage', function($scope, $http, $routeParams, Base64Service, CategoryService, Mission, MissionService, Category, CustomerService, PrivateCustomer, CompanyCustomer, GoogleMapsService, TextMessage) {
      var autocomplete, google_address_search;

      $scope.getCustomer = function() {
        return CustomerService.getCustomer($scope.input.customer.email, $scope.input.customer.password).success(function(data, status, headers, config) {
          return $scope.input.customer = data;
        }).error(function(data, status, headers, config) {
          return console.log(status);
        });
      };
      $scope.isCompanyCustomer = function() {
        return $scope.input.customer.type === 'company';
      };
      $scope.saveMission = function() {
        var mission;

        $scope.input.mission.date = $scope.input.selectedEvent.start;
        $scope.input.mission.extras = angular.toJson(_.map($scope.output.inputs, function(input) {
          return {
            'id': input.id,
            'value': input.value
          };
        }));
        mission = new Mission($scope.input.mission);
        return mission.$save(function(data) {
          return console.log(data);
        }, function(error) {
          return console.log(error);
        });
      };
      $scope.getInputs = function() {
        return CategoryService.getCategoryInputs($scope.category1.data.id).success(function(data, status, headers, config) {
          return $scope.output.inputs = data;
        }).error(function(data, status, headers, config) {
          return console.log(status);
        });
      };
      $scope.order = function() {
        var customer;

        customer = null;
        if ($scope.isCompanyCustomer()) {
          customer = new ComapnyCustomer($scope.input.customer);
        } else {
          customer = new PrivateCustomer($scope.input.customer);
        }
        return customer.$save(function(data) {
          return $scope.input.mission.customerId = data.id;
        }, function(error) {
          return console.log(error);
        });
      };
      $scope.output = {};
      $scope.input = {};
      $scope.input.customer = {};
      $scope.input.mission = {};
      $scope.input.mission.address = {};
      $scope.input.mission.description = "";
      $scope.input.customer.type = "private";
      $scope.loadEvents = function() {
        var result, startDate, startMonth, todayDate;

        todayDate = new Date();
        startDate = $scope.myCalendar.fullCalendar('getDate');
        startMonth = startDate.getMonth();
        result = [];
        while (startDate.getMonth() === startMonth) {
          if (startDate > todayDate) {
            result.push({
              title: '08:00',
              start: startDate.toLocaleDateString() + " 08:00:00"
            });
            result.push({
              title: '12:00',
              start: startDate.toLocaleDateString() + " 12:00:00"
            });
            result.push({
              title: '17:00',
              start: startDate.toLocaleDateString() + " 17:00:00"
            });
          }
          startDate.setDate(startDate.getDate() + 1);
        }
        return $scope.eventSources[0].events = result;
      };
      $scope.uiConfig = {
        calendar: {
          height: 250,
          editable: true,
          header: {
            left: '',
            center: 'title',
            right: 'today prev,next'
          },
          viewRender: function() {
            return $scope.loadEvents();
          },
          eventClick: function(event) {
            $scope.input.selectedEvent = event;
            return $scope.$apply();
          }
        }
      };
      $scope.eventSources = [
        {
          events: [],
          color: '#0CB45D',
          textColor: 'white'
        }
      ];
      CategoryService.getTree().success(function(data, status, headers, config) {
        $scope.categories = data;
        $scope.category1 = _.find($scope.categories.children, function(child) {
          return child.data.id = $routeParams.categoryId;
        });
        return $scope.getInputs();
      }).error(function(data, status, headers, config) {
        return console.log(status);
      });
      google_address_search = document.getElementById('google-address-search');
      autocomplete = new google.maps.places.Autocomplete(google_address_search);
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place;

        place = autocomplete.getPlace();
        $scope.input.mission.address.latitude = place.geometry.location.lat();
        $scope.input.mission.address.longitude = place.geometry.location.lng();
        $scope.input.mission.address.streetNumber = GoogleMapsService.getAddressType(place.address_components, 'street_number');
        $scope.input.mission.address.street = GoogleMapsService.getAddressType(place.address_components, 'route');
        $scope.input.mission.address.postalCode = GoogleMapsService.getAddressType(place.address_components, 'postal_code');
        $scope.input.mission.address.postalTown = GoogleMapsService.getAddressType(place.address_components, 'postal_town');
        $scope.input.mission.address.country = GoogleMapsService.getAddressType(place.address_components, 'country');
        return $scope.input.mission.address.area = GoogleMapsService.getAddressType(place.address_components, 'administrative_area_level_1');
      });
      $scope.dibs = function() {
        $scope.dibsInput = {};
        $scope.dibsInput.merchant = 90151568;
        $scope.dibsInput.currency = "SEK";
        $scope.dibsInput.orderId = 20;
        $scope.dibsInput.amount = 375;
        $scope.dibsInput.language = "en_GB";
        $scope.dibsInput.billingFirstName = "Misael";
        $scope.dibsInput.billingLastName = "Berrios Salas";
        $scope.dibsInput.billingAddress = "Testgata 36";
        $scope.dibsInput.billingPostalCode = "123 12";
        $scope.dibsInput.billingPostalPlace = "Stockholm";
        $scope.dibsInput.billingEmail = "misael@jobsystems.se";
        $scope.dibsInput.billingMobile = "+46 12 34 567";
        $scope.dibsInput.oiTypes = "QUANTITY;DESCRIPTION;AMOUNT;ITEMID";
        $scope.dibsInput.oiRow1 = "1;Testar lite;2;250";
        $scope.dibsInput.acceptReturnUrl = "http://www.googl.com";
        $scope.dibsInput.cancelReturnUrl = "http://www.facebook.com";
        $scope.dibsInput.callbackUrl = "http://www.expressen.se";
        console.log(angular.toJson($scope.dibsInput));
        delete $http.defaults.headers.common['X-Requested-With'];
        $http.defaults.headers.common = {
          "Access-Control-Request-Headers": "accept, origin, authorization"
        };
        $http({
          url: "https://sat1.dibspayment.com/dibspaymentwindow/entrypoint",
          method: "POST",
          data: $scope.dibsInput
        }).success(function(data, status, headers, config) {
          return console.log("yay", data, status, headers, config);
        }).error(function(data, status, headers, config) {
          return console.log("nay", data, status, headers, config);
        });
        return $http({
          url: "https://sat1.dibspayment.com/dibspaymentwindow/entrypoint",
          method: "JSONP",
          data: $scope.dibsInput
        }).success(function(data, status, headers, config) {
          return console.log("yay", data, status, headers, config);
        }).error(function(data, status, headers, config) {
          return console.log("nay", data, status, headers, config);
        });
      };
      return $scope.sendSMS = function() {
        $scope.sms = {};
        $scope.sms.from = '+46704333005';
        $scope.sms.to = '+46704333005';
        $scope.sms.message = 'Tjaba Richard! Du ska ut o skotta gödsel i Södertälje idag kl 19! Kan du ta det?';
        return $http({
          url: "/api/textmessage/postelk",
          data: $scope.sms,
          method: "POST"
        }).success(function(data, status, headers, config) {
          return console.log("yay", data, status, headers, config);
        }).error(function(data, status, headers, config) {
          return console.log("nay", data, status, headers, config);
        });
      };
    }
  ]);

}).call(this);
