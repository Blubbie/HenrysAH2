/**
 * Created by Blubbie on 25.10.2014.
 */

/** factories, get and sets data */
var factories = {};

/** auctionDataFactory
 *  used to get data for current auction from server
 * @param $http - used to access remote http server with XMLHttpRequests
 * @returns {{auctionDataFactory}}
 */
factories.auctionDataFactory= function ($http) {
    var auction = {};
    /* TODO: backend implementation
        currently all data is stored local in frontend
        later on auction data must be read and updated(!!!) from server
     */
    /* the following data should be read and updated from server */
    auction = {
        hasEnded: false,
        name:"My only one auction title",
        number: 123,
        startTime:'7:20 PM',
        time: 20, //countdown time for auction
        auctionItem: {
            title:'Ancient Gold Watch',
            description: 'Watch with lots of diamonds. And here comes some more text and information.',
            startingPrice: 180000,
            estimatePrice: 360000,
            mediaData: {
                /* could be changed to an array to get more than one picture */
                imageUrl: 'media/images/watch.jpg', //dummy image from Wikimedia Commons
                /* could be changed to an array to get different video types*/
                videoUrl: 'media/videos/2012-07-18_Market_Street_-_San_Francisco.webm.480p.webm'//dummy video from Wikimedia Commons
            }
        },
        nextBid: null,
        highestBid: null,
        currentBidder: null,
        iAmHighestBidder: false,
        currentUser: null
    };
    var factory = {};
    /** GETTER function to retrieve da from server
     */
    $http.get('data/auctionData.json')
        .success(function(data) {
            auction = data;
        })
        .error(function (data, status, headers, config) {
            //something went wrong, or no database connection available
            // TODO: frontend error handling
        });
    /** getAuctionData
     *  returns auction object from factory
     * @returns {{action}}
     */
    factory.getAuctionData = function() {
        return auction;
    };
    return factory;
};


/** userDataFactory
 *  used to get data for current user from server
 * @param $http - used to access remote http server with XMLHttpRequests
 * @returns {{userDataFactory}}
 */
factories.userDataFactory= function ($http) {
    var user = {};
    var users = []; //TODO: this is only for testing, developing
    var factory = {};
    /* TODO: backend implementation
     currently all data is stored local in frontend
     later on current user data must be read from server
     */
    /* the following data should be read and updated from server */
    /* For this prototype iam using an array of 3 users, they can be accessed by changeUser btn in debugging controls */
    users = [
        {
            lastName: "Münster",
            firstName: "Henry",
            country: "Germany",
            countryFlag: "media/images/flags/de.png",
            id:"1234",
            currentAuctionId: null
        },
        {
            lastName: "Doe",
            firstName: "Jon",
            country: "United States",
            countryFlag: "media/images/flags/usa.png",
            id:"4567",
            currentAuctionId: null
        },
        {
            lastName: "Panini",
            firstName: "Marcello",
            country: "Italy",
            countryFlag: "media/images/flags/it.png",
            id:"8901",
            currentAuctionId: null
        },
        {
            "lastName": "McDonald",
            "firstName": "Chris",
            "country": "Great Britain",
            "countryFlag": "media/images/flags/gb.png",
            "id":"2344",
            "currentAuctionId": null
        }

    ];
    user = users[0]; //sets the default user

    /** GETTER function to retrieve da from server
     */
    $http.get('data/userData.json')
        .success(function(data) {
            user= data[0];
        })
        .error(function (data, status, headers, config) {
            //something went wrong, or no database connection available
            // TODO: frontend error handling
        });

    /** getUserData
     *  returns user object from factory
     * @returns {{user}}
     */
    factory.getUserData = function() {
        return user;
    };
    /** getUsersData
     *  Only for testing, debugging purpose
     *  returns all users from factory
     * @returns {Array}
     */
    factory.getUsersData = function() {
        return users;
    };

    /** changeUserData
     * Only for testing, debugging purpose
     * @param userNumber
     */
    factory.changeUserData= function(userNumber) {
        user = users[userNumber];
    };
    return factory;
};

henrysAuctionHouseApp.factory(factories);
