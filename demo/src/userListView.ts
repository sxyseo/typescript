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
}

interface UserListViewOptions<T> {
    el: string;
    events: any;
}

export default class UserListView extends Backbone.View<Backbone.Model> implements UserListViewInterface {
    el: any;
    $el: any;
    userViewItems: UserView[];
    constructor(options: UserListViewOptions<UserModel>) {
        super(options);
    }
    initialize() {
        this.$el.append( underscore.template('<a href="#" class="add">添加用户</a>')() );
        this.userViewItems = [
            new UserView({ model: new UserModel({firstName: 'AR', lastName: 'Insect', email: 'ar.insect@gmail.com', sex: '男'}), tagName: 'li', className: 'user', events: { 'click .edit': 'edit', 'click .del': 'delete', 'click .confirm': 'confirm' }}),
            new UserView({ model: new UserModel({firstName: 'JSON.~', email: 'JSON1988@gmail.com', sex: '女'}), tagName: 'li', className: 'user', events: { 'click .edit': 'edit', 'click .del': 'delete', 'click .confirm': 'confirm' }})
        ];
        for (let item of this.userViewItems) {
            item.render(this.$el.find('ul'));
            userCollection.add(item.model);
        }
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
        return this;
    }
}