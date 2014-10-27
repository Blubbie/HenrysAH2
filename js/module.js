/**
 * Created by Blubbie on 25.10.2014.
 */

/** Main App/Module for auction house, dependencies ngRoute, timer **/
var henrysAuctionHouseApp = angular.module('henrysAuctionHouseApp', ['ngRoute','timer']);
henrysAuctionHouseApp.config(function ($routeProvider){
    /*  defines routes to navigate, could be extended for checkout navigation etc.  */
    $routeProvider
        .when('/auction',
        {
                controller: 'ahController',
                templateUrl: 'partials/auctionRoom.html'
        })
        .otherwise({redirectTo:  '/auction'});
});

