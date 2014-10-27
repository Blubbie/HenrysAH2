/**
 * Created by Blubbie on 25.10.2014.
 */


/** ng-app controllers */
var controllers = {};

/**ahController, used to init auction room with user and auction data delivered by factories
 * @param $scope - scope itself..
 * @param $http - used to access remote http server with XMLHttpRequests
 * @param auctionDataFactory - factory to get auction data from server
 * @param userDataFactory - factory to get user data from server
 * */
controllers.ahController = function ($scope, $http, auctionDataFactory,userDataFactory) {
    init();
    var otherUserCounter = 1; //TODO, remove later only for scenario 4, for demonstration
    /* init
     * inits the auction with auction and current user data from server
     */
    function init(){
        //get data belonging to the auction itself
        $scope.auction = auctionDataFactory.getAuctionData();

        //get user data for current logged in user
        $scope.auction.currentUser = userDataFactory.getUserData();

        //TODO: multiple dummy users, only for testing, debugging
        $scope.auction.users = userDataFactory.getUsersData();

        // initialize nextBid with startingPrice if no highestBid
        if($scope.auction.highestBid === null)
            $scope.auction.nextBid =  $scope.auction.auctionItem.startingPrice;
        else
            $scope.auction.nextBid =  $scope.getNextBid();
    }

    /** commitBid
     *  TODO: post bid and user data to server, server
     *  must store bids and send response if bid was successful
     * @param bidValue
     * @param userID
     * returns {{highestBidder: true/false}}  if bid was placed first, I am the highest bidder
     */

    $scope.commitBid= function() {
        $http.post('data/postBid',
            {
                bidValue: $scope.auction.nextBid,
                userId: $scope.auction.currentUser
            })
            .success(function(data, status, headers, config) {
                $scope.auction.iAmHighestBidder = true;
                $scope.auction.currentBidder = $scope.auction.currentUser;
                $scope.auction.highestBid= $scope.auction.nextBid;
                $scope.getNextBid();
            }).
            error(function(data, status, headers, config) {
                // TODO: Error handling on frontend and backend
                // TODO: Also handling of bid was NOT placed first... -> just update current bid
            });

    };

    /** getNextBid
     *  increases the current / highest bid by 10k
     */
    $scope.getNextBid = function()
    {
        if($scope.auction.highestBid === null)
            $scope.auction.nextBid = $scope.auction.auctionItem.startingPrice;
        else
            $scope.auction.nextBid = $scope.auction.highestBid + 10000; //TODO: 10k should by an auction parameter
    };

    /** endAuction
     *  ends auction by setting auction.hasEnded, currently on disables UI elements with ng-hide
     *  TODO: not yet implemented
     */
    $scope.endAuction = function ()
    {
        $scope.auction.hasEnded = true;
    };

    /** checkout
     *  proceed to checkout page after auction has ended and i am the highest bidder
     *  TODO: not yet implemented
     */
    $scope.checkout= function()
    {

    };

    /** expandUserOptions
     *  displays user options for login/logout, change user data
     *  TODO: not yet implemented
     */
    $scope.expandUserOptions = function()
    {
        $scope.showError = true;
    };

    /** commitBidNotPlacedFirst
     *  this is kind of a fake function to simulate a
     *  bid that was not placed first resulting in not
     *  becoming the highest bidder
     */
    $scope.commitBidNotPlacedFirst= function() {
        if($scope.auction.hasEnded === true)return;

        $http.post('data/postBidNotPlacedFirst',
            {
                bidValue: $scope.auction.nextBid,
                userId: $scope.auction.currentUser
            })
            .success(function(data, status, headers, config) {
                //just fake my bid was not placed first and another bidder is now current highest bidder
                $scope.auction.iAmHighestBidder = false;
                $scope.auction.currentBidder = $scope.auction.users[otherUserCounter];
                $scope.auction.highestBid= $scope.auction.nextBid;
                $scope.getNextBid();
                if(otherUserCounter<4)otherUserCounter++;if(otherUserCounter>3)otherUserCounter=1;
            }).
            error(function(data, status, headers, config) {
                // TODO: Error handling on frontend and backend
            });
    };

    /** changeUser
     *  Only for testing, debugging purpose, changing to fake multiple users
     * @param userNumber
     */
    $scope.changeUser= function(userNumber)
    {
        userDataFactory.changeUserData(userNumber);
        $scope.auction.currentUser = userDataFactory.getUserData();
    };

    /* add callbackTimer for auction countdown */
    $scope.callbackTimer={};
    $scope.callbackTimer.status='auctionTimerRunning';
    $scope.callbackTimer.finished=function(){
        $scope.callbackTimer.status='auctionTimerEnded';
        $scope.endAuction();
        $scope.$apply();
    };
};

henrysAuctionHouseApp.controller(controllers);
