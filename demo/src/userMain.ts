import $$ = require("jquery");
import underscore = require("underscore");
import Backbone = require("backbone");

import UserListView from './userListView';
import UserView from './userView';
import UserModel from './userModel';
import AddUserView from './addUserView';
import userCollection from './userCollection';
import { userRouter } from './route';

import './styles/userMain.scss';

interface UserMainOptions {
    el: string;
    events: any;
}

class UserMainModel extends Backbone.Model {
}

export default class UserMain extends Backbone.View<UserMainModel> {
    constructor(options: UserMainOptions) {
        super(options);
    }
    addUserView: AddUserView;
    initialize() {
        // 添加用户
        let addUserView = this.addUserView = new AddUserView({
            model: new UserModel({ firstName: '', email: '' }),
            el: '#add-user',
            events: {'click .btn-confirm': 'confirm'}
        });
        // 用户列表
        let userListView = new UserListView({ el: '#user-list' });
        userListView.listenTo(addUserView, 'addUserComplete', userListView.addUser);
        this.listenTo(userRouter, 'route:addUser', this.addUser);
        this.listenTo(userRouter, 'route:index', this.indexView);
        this.$el.append( underscore.template('<a href="#user/add" class="button btn-add">添加用户</a>')() );
        // 路由器监听,这个需要在所以路由注册后再启用
        Backbone.history.start();
    }
    indexView() {
        this.$el.find('#user-list').show();
        this.$el.find('.btn-add').show();
        this.$el.find('#add-user').hide();
        // 隐藏上传
        $$('#fine-uploader-manual-trigger').hide();
    }
    addUser() {
        this.$el.find('#user-list').hide();
        this.$el.find('.btn-add').hide();
        this.$el.find('#add-user').show();
        // 打开上传
        $$('#fine-uploader-manual-trigger').show();
        this.addUserView.render();
    }
}

