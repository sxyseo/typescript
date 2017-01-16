//import $$ = require('jquery');
import underscore = require('underscore');
import Backbone = require('backbone');
import UserModel from './userModel';
import { UserModelOptions } from './userModel';
import UserView from './userView';
import userCollection from './userCollection';
import * as Mock from './mockData';

import './styles/userListView.scss';

interface UserListViewInterface {
    addUser(): void;
    render(): Backbone.View<UserModel>;
}

interface UserListViewOptions<T> {
    el: string;
    events: any;
}

let json = Mock.mock_json;

export default class UserListView extends Backbone.View<Backbone.Model> implements UserListViewInterface {
    el: any;
    $el: any;
    constructor(options: UserListViewOptions<UserModel>) {
        super(options);
    }
    initialize() {
        if (json.is_ok === true) {
            for (let item of json.data) {
                this.createUserView(item);
            }
        }
        this.render();
    }
    createUserView(data: UserModelOptions): UserView {
        let model: UserModel = new UserModel(data);
        let view: UserView = new UserView({ model: model, tagName: 'li', className: 'user', events: { 'click .edit': 'edit', 'click .del': 'delete', 'click .confirm': 'confirm' }});
        view.render(this.$el.find('ul'));
        userCollection.add(model);
        return view;
    }
    addUser() {
        let userModel: UserModel = new UserModel({firstName: 'Daisy', email: 'Daisy@163.com'});
        let userView: UserView = new UserView({ 
            model: userModel, 
            tagName: 'li', 
            className: 'user', 
            events: { 'click .edit': 'edit', 'click .del': 'delete', 'click .confirm': 'confirm' }
        });
        userView.render(this.$el.find('ul'));
        userCollection.push(userView.model);
    }
    render() {
        this.$el.append( underscore.template('<a href="#" class="add">添加用户</a>')() );
        return this;
    }
}