angular.module("meanhotel").controller("HotelsController", HotelsController);

function HotelsController(hotelDataFactory) {
  var vm = this;
  vm.title = "MEAN Hotel App";
  //console.log("HotelsController invoked for Hotels list");
  hotelDataFactory.hotelList().then(function(response)  {
    vm.hotels = response;
  });
}
