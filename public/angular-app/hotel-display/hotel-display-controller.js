angular.module("meanhotel").controller("HotelController", HotelController);

function HotelController(hotelDataFactory, $routeParams, $route, AuthFactory, jwtHelper, $window) {
  var vm = this;
  var id = $routeParams.id;
  hotelDataFactory.hotelDisplay(id).then(function(response)  {
      vm.hotel = response;
      vm.stars = _getStarRatings(response.stars);
  });

  function _getStarRatings(stars) {
    return new Array(stars);
  }

 vm.isLoggedIn = function() {
   if(AuthFactory.isLoggedIn)  {
     return true;
   }
   else {
     return false;
   }
 }

  vm.addReview = function()  {

    var token = jwtHelper.decodeToken($window.sessionStorage.token);
    var username = token.username;

     var postData = {
       name: username,
       rating: vm.rating,
       review: vm.review
     };

     if(vm.reviewForm.$valid) {
        hotelDataFactory.postReview(id, postData).then(function(response) {
          console.log(response);
            if(response)  {
                $route.reload();
            }
        }).catch(function(err)  {
            console.log("error");
        });
     }
     else {
        vm.isSubmitted = true;
     }
  }
}
