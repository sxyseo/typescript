//import $$ = require('jquery');
import underscore = require('underscore');
import Backbone = require('backbone');

import UserView from './userView';
import UserModel from './userModel';
import { UserModelOptions } from './userModel';
import * as Mock from './mockData';
import userCollection from './userCollection';
import { userRouter } from './route';

import './styles/userListView.scss';

interface UserListViewInterface {
    render(): Backbone.View<UserModel>;
}

interface UserListViewOptions<T> {
    el: string;
}

let json = Mock.mock_json;

export default class UserListView extends Backbone.View<Backbone.Model> implements UserListViewInterface {
   // el: HTMLElement;
    //$el: JQuery;
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
        let view: UserView = new UserView({ 
            model: model, 
            tagName: 'li', className: 'user', 
            events: { 'click .edit': 'edit', 'click .del': 'delete', 'click .confirm': 'confirm' }
        });
        view.render(this.$el);
        userCollection.add(model);
        return view;
    }
    addUser(model: any) {
        // console.log(model);
        let userView: UserView = new UserView({
            model: model, 
            tagName: 'li', 
            className: 'user', 
            events: { 'click .edit': 'edit', 'click .del': 'delete', 'click .confirm': 'confirm' }
        });
        userView.render(this.$el);
        userCollection.add(model);
    }
    render() {
        return this;
    }
}