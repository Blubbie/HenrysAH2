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
    function init(){
        //get data belonging to the auction itself
        $scope.auction = auctionDataFactory.getAuctionData();
        //get user data for current logged in user
        $scope.auction.currentUser = userDataFactory.getUserData();
        $scope.auction.users = userDataFactory.getUsersData();
        if($scope.auction.highestBid.length === 0)
            $scope.auction.highestBid.push($scope.auction.auctionItem.startingPrice);
    }

    /** Commit a bid
     * TODO: send bid with timestamp and user data to server, server must store bids according to timestamp
     */
    $scope.commitBid= function() {
        $scope.auction.iAmHighestBidder = true;
        $scope.auction.currentBidder.push($scope.auction.currentUser);
        $scope.auction.highestBid.push($scope.auction.highestBid[$scope.auction.highestBid.length-1] );
    };

    /** getNextBid
     *  increases the highest bid by 10k (TODO: 10k should by an auction parameter!)
     */
    $scope.getNextBid = function()
    {
        if($scope.auction.highestBid.length === 1)
        {
            console.log("start")
            $scope.auction.highestBid.push($scope.auction.auctionItem.startingPrice);
        }
        else {
            $scope.auction.highestBid.push($scope.auction.highestBid[$scope.auction.highestBid.length - 1] + 10000);
            console.log("higher")
        }
    };

    /** endAuction
     *  ends auction by setting auction.hasEnded, UI elements with ng-hide will be hidden
     */
    $scope.endAuction = function ()
    {
        $scope.auction.hasEnded = true;
        console.log($scope.auction.currentBidder);

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

    /** changeUser
     *  Only for testing, debugging purpose
     * @param userNumber
     */
    $scope.changeUser= function(userNumber)
    {
        userDataFactory.changeUserData(userNumber);
        $scope.auction.currentUser = userDataFactory.getUserData();
    };
    /** otherUserCommitBid
     *  Only for testing, debugging purpose
     * @param userNumber
     */
    $scope.otherUserCommitBid= function(userNumber)
    {
        $scope.auction.iAmHighestBidder = false;
        $scope.auction.currentBidder.push($scope.auction.users[userNumber]);
        $scope.getNextBid();

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
