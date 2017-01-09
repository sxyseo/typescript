import $$ = require('jquery');
import underscore = require('underscore');
import Backbone = require('backbone');
import UserModel from './userModel';
import userCollection from './userCollection';
import './styles/userView.scss';

interface UserViewInterface {
    render(): Backbone.View<UserModel>;
    edit(): void;
    delete(): void;
    confirm(): void;
}

interface UserViewOptions<UM> {
    model: UM;
    tagName: string;
    className: string;
    events: any;
}

export default class UserView extends Backbone.View<UserModel> implements UserViewInterface {
    model: UserModel;
    template: any;
    constructor(options: UserViewOptions<UserModel>) {
        super(options);
    }
    initialize() {
        let tpl: string[] = [
            '<div class="user-item">用户id: <span>' + this.cid + ':</span></div>',
            '<div class="user-item">用户名：' + '<span class="first-name">' + this.model.get('firstName') + '</span> ' +
            (function(lastName: string) {return lastName ? '<span class="last-name">' + lastName + '</span>' : ''})(this.model.get('lastName')) + 
            '</div>',
            '<div class="user-item">生日：' +
            (function(birthday: string) {return birthday ? '<span class="birthday">' + birthday + '</span>' : '--'})(this.model.get('birthday')) + 
            '</div>',
            '<div class="user-item">邮箱：' +
            (function(email: string) {return email ? '<span class="email">' + email + '</span>' : '--'})(this.model.get('email')) + 
            '</div>',
            '<div class="user-item oprator"><a class="button edit" href="#">编辑</a><a class="button confirm" style="display:none" href="#">确认</a><a class="button del" href="#">删除</a></div>'
        ];
        this.template = underscore.template(tpl.join(''));
    }
    render() {
        this.trigger('renderUser', this.$el.html(this.template())); // 通知外层view渲染dom
        return this;
    }
    edit() {
        this.$el.addClass('editing');
        this.$el.find('.edit').hide();
        this.$el.find('.confirm').show();
        this.$el.find('.first-name').html('<input type="text" value="' + this.model.get('firstName') + '">');
    }
    confirm() {
        let val: string = this.$el.find('input').val();
        if ('' === val.trim()) {
            this.$el.find('input').css('border', '2px solid red');
        } else {
            this.model.set('firstName', val);
            this.$el.find('.first-name').html(val);
            this.$el.removeClass('editing');
            this.$el.find('.edit').show();
            this.$el.find('.confirm').hide();
        }
    }
    delete() {
        userCollection.remove(userCollection.get(this.model.cid));
        this.el.parentNode.removeChild(this.el);
    }
}