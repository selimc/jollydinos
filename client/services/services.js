angular.module('gitHired.services',['gitHired.listing'])

.factory('Jobs', function($http, $window) {
  var getAll = function (archive) {
    console.log("before the if in servise", archive)
    if (archive){
      console.log("in get all in services")
      return $http({
        method: 'GET',
        url: '/api/archive'
      });
    } else {
      return $http({
        method: 'GET',
        url: '/api/listing'
      });
    }
  };

  var postOne = function(job) {
    return $http({
      method: 'POST',
      url: '/api/listing',
      data: job
    });
  };

  var delOne = function(job) {
    return $http({
      method: 'DELETE',
      url: '/api/listing',
      data: job,
      headers: {'Content-Type': 'application/json'}
    })
  };

  var editOne = function(job) {
    //PLACEHOLDER
    // job.company = prompt('Please enter a new company name.', job.company);
    job.modifiedAt = new Date();
    var id = job._id;
    return $http({
      method: 'PUT',
      url: '/api/listing',
      data: job,
      headers: {'Content-Type': 'application/json'}
    })
  };

  var archiveOne = function(job) {
    return $http({
      method: 'POST',
      url: '/api/archive',
      data: job
    });
  };

  return {
    getAll: getAll,
    postOne: postOne,
    delOne: delOne,
    editOne: editOne,
    archiveOne: archiveOne
  };
})
.factory('Auth', function ($http, $location, $window) {
  var isLoggedIn = false;

  var login = function (user) {
    return $http({
      method: 'POST',
      url: '/login',
      data: user
    })
    .then(function (resp) {
      isLoggedIn =  true;
      $location.path('/listing')
    })
    .catch(function (err){
      isLoggedIn = false;
      $location.path('/login')
    });
  };

  // NOTE: This is not an ideal scenario,
  // However, the server doesn't autmatically log new users in.
  // Therefore, the user must signup and then login.
  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function (resp) {
      $location.path('/login')
    });
  };

  // Helper function to read the private variable above.
  var isAuth = function () {
    return isLoggedIn;
  };

  // Server detroy's the session and refreshes the page anyway.
  var logout = function () {
    console.log("logoutCalled");
    return $http({
      method: 'POST',
      url: '/logout'
    })
    .then(function(){
      isLoggedIn = false;
      $location.path('/login');
    })
  };

  // Return Factory API
  return {
    login: login,
    signup: signup,
    isAuth: isAuth,
    logout: logout
  };
});
