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
            //'<div class="user-item"><em>用户id：</em><span>' + this.cid + '</span></div>',
            '<div class="user-item"><em>用户名：' + '</em>',
            '<span class="first-name">' + this.model.get('firstName') + '</span>',
            '<span class="last-name">' + (this.model.get('lastName') || '--') + '</span>',
            '<p class="error-tip"></p></div>',
            '<div class="user-item"><em>性别：</em>',
            '<span class="sex">' + (this.model.get('sex') || '--') + '</span>',
            '<p class="error-tip"></p></div>',
            '<div class="user-item"><em>生日：</em>',
            '<span class="birthday">' + (this.model.get('birthday') || '--') + '</span>',
            '<p class="error-tip"></p></div>',
            '<div class="user-item"><em>邮箱：</em>',
            '<span class="email">' + (this.model.get('email') || '--') + '</span>', 
            '<p class="error-tip"></p></div>',
            '<div class="user-item oprator"><a class="button edit" href="#">编辑</a><a class="button confirm" style="display:none" href="#">确认</a><a class="button del" href="#">删除</a></div>'
        ];
        this.template = underscore.template(tpl.join(''));
        this.model.on('invalid', (model: UserModel, error: string[]) => {
            this.onValidate(error);
        });
    }
    onValidate(error: string[]) {
        while (error.length) {
            let curMessage: string = error.shift();
            this.onErrorTip(curMessage);
        }
    }
    clearTip() {
        this.$el.find('.error-tip').html('');
        this.$el.find('input').removeClass('error');
    }
    onErrorTip(message: string) {
        if (message.indexOf('first name') > -1) {
            this.$el.find('.first-name').siblings('.error-tip').html(message);
            this.$el.find('.first-name input').addClass('error');
        }
        if (message.indexOf('email') > -1) {
            this.$el.find('.email').siblings('.error-tip').html(message);
            this.$el.find('.email input').addClass('error');
        }
    }
    render() {
        this.trigger('renderUser', this.$el.html(this.template())); // 通知外层view渲染dom
        return this;
    }
    edit() {
        this.$el.addClass('editing');
        this.$el.find('.edit').hide();
        this.$el.find('.confirm').show();
        this.$el.find('.first-name').html('<input type="text" value="' + (this.model.get('firstName') || '') + '">');
        this.$el.find('.last-name').html('<input type="text" value="' + (this.model.get('lastName') || '') + '">');
        this.$el.find('.sex').html('<input type="text" value="' + (this.model.get('sex') || '') + '">');
        this.$el.find('.birthday').html('<input type="text" value="' + (this.model.get('birthday') || '') + '">');
        this.$el.find('.email').html('<input type="text" class="input-email" value="' + (this.model.get('email') || '') + '">');
    }
    confirm() {
        this.clearTip();
        this.model.set({
            firstName: this.$el.find('.first-name input').val(),
            lastName: this.$el.find('.last-name  input').val(),
            sex: this.$el.find('.sex  input').val(),
            birthday: this.$el.find('.birthday  input').val(),
            email: this.$el.find('.email input').val()
        }, { validate: true });
        // 所有验证通过
        if (!!!this.model.validationError) {
            this.$el.find('.first-name').html(this.model.get('firstName')  || '--');
            this.$el.find('.last-name').html(this.model.get('lastName')  || '--');
            this.$el.find('.sex').html(this.model.get('sex')  || '--');
            this.$el.find('.birthday').html(this.model.get('birthday') || '--');
            this.$el.find('.email').html(this.model.get('email')  || '--');
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