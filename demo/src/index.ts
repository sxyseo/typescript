import $$ = require("jquery");
import underscore = require("underscore");
import Backbone = require("backbone");

import UserListView from './userListView';
import UserView from './userView';
import UserModel from './userModel';
import userCollection from './userCollection';

import './styles/common.scss';

import './styles/userMain.scss';

interface UserMainOptions {
    el: string;
    events: any;
}

class UserMainModel extends Backbone.Model {
}

class UserMain extends Backbone.View<UserMainModel> {
    constructor(options: UserMainOptions) {
        super(options);
    }
    initialize() {
        let userListView = new UserListView({ el: '#user-list' }); // 用户列表
        this.$el.append( underscore.template('<a href="#user/add" class="button btn-add">添加用户</a><a href="#" class="button btn-confirm">确认添加</a><a href="#" class="button btn-back">返回用户列表</a>')() );
    }
    addUser() {
        console.log('add user...');
    }
}

new UserMain({
    el: '#user-main',
    events: {'click .add': 'addUser'}
});
