
// import $$ = require("jquery");
// import underscore = require("underscore");
import Backbone = require("backbone");
import UserListView from './userListView';
import './styles/common.scss';

let userListView = 
                    new UserListView({
                        el: '#user-list', 
                        events: {'click .add': 'addUser'}
                    });
