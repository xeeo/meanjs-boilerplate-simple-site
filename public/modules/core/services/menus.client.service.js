'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', ['$state',

    function ($state) {
        // Define a set of default roles
        this.defaultRoles = ['*'];

        // Define the menus object
        this.menus = {};

        // Validate menu existance
        this.validateMenuExistance = function (menuId) {
            if (menuId && menuId.length) {
                if (this.menus[menuId]) {
                    return true;
                } else {
                    throw new Error('Menu does not exists');
                }
            } else {
                throw new Error('MenuId was not provided');
            }

            return false;
        };

        // Get the menu object by menu id
        this.getMenu = function (menuId) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Return the menu object
            return this.menus[menuId];
        };

        // Add new menu object by menu id
        this.addMenu = function (menuId, isPublic, roles) {
            // Create the new menu
            this.menus[menuId] = {
                items: []
            };

            // Return the menu object
            return this.menus[menuId];
        };

        // Remove existing menu object by menu id
        this.removeMenu = function (menuId) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Return the menu object
            delete this.menus[menuId];
        };

        // Add menu item object
        this.addMenuItem = function (menuId, title, state, classes, externalUrl, position) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);
            var url = externalUrl || '/';

            if (state) {
                var stateObj = $state.get(state);
                url          = '/#!' + stateObj.url;
            }

            // Push new menu item
            this.menus[menuId].items.push({
                title:    title,
                url:      url,
                state:    state,
                classes:  classes || {'item':true},
                position: position || 0,
                items:    []
            });

            // Return the menu object
            return this.menus[menuId];
        };

        // Add submenu item object
        this.addSubMenuItem = function (menuId, title, rootState, state, classes, externalUrl, position) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            var url = externalUrl || '/';

            if (state) {
                var stateObj = $state.get(state);
                url          = '/#!' + stateObj.url;
            }

            // Search for menu item
            for (var itemIndex in this.menus[menuId].items) {
                if (this.menus[menuId].items[itemIndex].state === rootState) {
                    // Push new submenu item
                    this.menus[menuId].items[itemIndex].items.push({
                        title:    title,
                        url:      url,
                        state:    state,
                        classes:  classes || {'item':true},
                        position: position || 0
                    });
                }
            }

            // Return the menu object
            return this.menus[menuId];
        };

        // Remove existing menu object by menu id
        this.removeMenuItem = function (menuId, menuItemURL) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Search for menu item to remove
            for (var itemIndex in this.menus[menuId].items) {
                if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
                    this.menus[menuId].items.splice(itemIndex, 1);
                }
            }

            // Return the menu object
            return this.menus[menuId];
        };

        // Remove existing menu object by menu id
        this.removeSubMenuItem = function (menuId, submenuItemURL) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Search for menu item to remove
            for (var itemIndex in this.menus[menuId].items) {
                for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
                    if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
                        this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
                    }
                }
            }

            // Return the menu object
            return this.menus[menuId];
        };

        //Adding menus
        this.addMenu('header', true);
        this.addMenu('footer', true);

    }
]);
