angular.module('hiveup-main')
.factory('UserService', function ($http, ErrorService, $location) {
	var	isLogged = false;
	var state = {
		_id: '',
		local: {
			email: '',
			username: '',
			name: ''
		}
	};

  return {
    login: function (credentials) {
      return $http
        .post('/users/login', credentials)
        .success(function (res) {
			isLogged = true;
			state._id = res._id;
			state.local.email = res.local.email;
			state.local.username = res.local.username;
			state.local.name = res.local.name;
			first_login = false;
        });
    },
    logout: function () {
      return $http
        .post('/users/logout')
        .success(function (res) {
			isLogged = false;
			state = {
				_id: '',
				local: {
					email: ''
				}
			};
			ErrorService.addAlert("Bye, hope to see you soon!");
        });
    },
    signup: function (credentials) {
      return $http
        .post('/users/signup', credentials)
        .success(function (res) {
	    	console.log(res);
			isLogged = false;
			if (res.err !== undefined) {
				ErrorService.addAlert(res.err, 'danger');
				return;
			}
			isLogged = true;
			state._id = res._id;
			state.local.email = res.local.email;
			state.local.username = res.local.username;
			state.local.name = res.local.name;
	    	ErrorService.addAlert("Excellent, you're now registered!");
	    	first_login = true;
	    	$location.path("/");
        })
	    .error(function(err){
	    	ErrorService.addAlert("There's an error! The server may not be reachable... Please try again later!", 'danger');
		});
    },
    isAuthenticated: function () {
		if(isLogged){
			return true;
		} else {
			return $http.get('/users/is_authenticated', {cache : true})
			.success(function(res){
				if( res == ""){
					//no user connected
				} else {
					isLogged = true;
					state._id = res._id;
					state.local.email = res.local.email;
			        state.local.username = res.local.username;
			        state.local.name = res.local.name;
				}
			})
			.error(function (err){
				isLogged = false;
			});
    	}
    },
    edit: function(credent) {
        return $http
            .post('/users/edit', credent)
            .success(function(data) {
                console.log('success edit', data);
	            data.user.local.password = undefined;
	            for (var param in data.user.local) {
	                state.local[param] = data.user.local[param];
	            }
            })
            .error(function() {
                console.log('fail edit');
            });
    }
    getUser: function () {
    	return state;
    }
  };
});
