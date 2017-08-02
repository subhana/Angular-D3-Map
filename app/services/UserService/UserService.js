(function() {
	'use strict';

	serviceModule.service('UserService', function() {

		this.getUserRole = function() {
            return this.userRole;
        };

		this.setUserRole = function(userRole) {
			this.userRole = userRole;
		};

        this.getUser = function() {
            return this.user;
        };

		this.setUser = function(user) {
			this.user = user;
		};

		this.getClientSetup = function() {
            return this.isClientSet;
        };

		this.setClientSetup = function(isClientSet) {
			this.isClientSet = isClientSet;
		};

        this.getReferralSetup = function() {
            return this.isReferralSet;
        };

		this.setReferralSetup = function(isReferralSet) {
			this.isReferralSet = isReferralSet;
		};
	});
})();
