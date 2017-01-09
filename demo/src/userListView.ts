//import $$ = require('jquery');
import underscore = require('underscore');
import Backbone = require('backbone');
import UserModel from './userModel';
import UserView from './userView';
import userCollection from './userCollection';
import './styles/userListView.scss';

interface UserListViewInterface {
    addUser(): void;
    render(): Backbone.View<UserModel>;
    renderUser(item: any): void;
}

interface UserListViewOptions<T> {
    el: string;
    events: any;
}

export default class UserListView extends Backbone.View<Backbone.Model> implements UserListViewInterface {
    el: any;
    $el: any;
    viewItems: UserView[];
    constructor(options: UserListViewOptions<UserModel>) {
        super(options);
    }
    initialize() {
        this.$el.append( underscore.template('<a href="#" class="add">添加用户</a>')() );
        this.viewItems = [
            new UserView({ model: new UserModel({firstName: 'AR', lastName: 'Insect', email: 'ar.insect@gmail.com'}), tagName: 'li', className: 'user', events: { 'click .edit': 'edit', 'click .del': 'delete', 'click .confirm': 'confirm' }}),
            new UserView({ model: new UserModel({firstName: 'JSON.~', email: 'JSON1988@gmail.com'}), tagName: 'li', className: 'user', events: { 'click .edit': 'edit', 'click .del': 'delete', 'click .confirm': 'confirm' }})
        ];
        for (let item of this.viewItems) {
            this.listenTo(item, 'renderUser', this.renderUser);
            item.render();
            userCollection.add(item.model);
        }
    }
    addUser() {
        let view:UserView = new UserView({ model: new UserModel({firstName: 'Daisy', email: 'Daisy@163.com'}), tagName: 'li', className: 'user', events: { 'click .edit': 'edit', 'click .del': 'delete', 'click .confirm': 'confirm' }});
        this.listenTo(view.model, 'change:firstName', this.render);
        this.listenTo(view, 'renderUser', this.renderUser);
        view.render();
        userCollection.push(view.model);
    }
    render() {
        return this;
    }
    renderUser(item: any) {
        this.$el.find('ul').append(item);
    }
}