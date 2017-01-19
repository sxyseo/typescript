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
            '<div class="user-item">',
                '<em>用户名：' + '</em>',
                '<span class="first-name"><%=firstName%></span>',
                '<span class="last-name"><%=lastName%></span>',
                '<p class="error-tip"></p>',
            '</div>',
            '<div class="user-item">',
                '<em>性别：</em>',
                '<span class="sex"><%=sex%></span>',
                '<p class="error-tip"></p>', 
            '</div>',
            '<div class="user-item">',
                '<em>生日：</em>',
                '<span class="birthday"><%=birthday%></span>',
                '<p class="error-tip"></p>', 
            '</div>',
            '<div class="user-item">', 
                '<em>邮箱：</em>',
                '<span class="email"><%=email%></span>', 
                '<p class="error-tip"></p>', 
            '</div>',
            '<div class="user-item oprator">', 
                '<a class="button edit" href="#">编辑</a>',
                '<a class="button confirm" style="display:none" href="#">确认</a>',
                '<a class="button del" href="#">删除</a>', 
            '</div>'
        ];
        // 初始化先定义好模板对象
        this.template = underscore.template(tpl.join(''));
        this.on('editing', this.editing);
        // 用户模型需要绑定数据验证，保证在set之前调用
        this.model.on('invalid', (model: UserModel, error: string[]) => {
            this.onValidate(error);
        });
    }
    onValidate(error: string[]) {
        while (error.length) {
            let curMessage: string | null = <string>error.shift();
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
    render(userList?: any) {
        let data = {
            firstName: this.model.get('firstName') || '--',
            lastName: this.model.get('lastName') || '--',
            sex: this.model.get('sex') || '--',
            birthday: this.model.get('birthday') || '--',
            email: this.model.get('email') || '--'
        };
        userList.append(this.$el.html(this.template(data)));
        return this;
    }
    editing(status: boolean) {
        if (status) {
            this.$el.addClass('editing');
            this.$el.find('.edit').hide();
            this.$el.find('.confirm').show();
            this.$el.find('.first-name').html('<input type="text" value="' + (this.model.get('firstName') || '') + '">');
            this.$el.find('.last-name').html('<input type="text" value="' + (this.model.get('lastName') || '') + '">');
            this.$el.find('.sex').html('<input type="text" value="' + (this.model.get('sex') || '') + '">');
            this.$el.find('.birthday').html('<input type="text" value="' + (this.model.get('birthday') || '') + '">');
            this.$el.find('.email').html('<input type="text" class="input-email" value="' + (this.model.get('email') || '') + '">');
        } else {
            this.$el.removeClass('editing');
            this.$el.find('.edit').show();
            this.$el.find('.confirm').hide();
            this.$el.find('.first-name').html(this.model.get('firstName')  || '--');
            this.$el.find('.last-name').html(this.model.get('lastName')  || '--');
            this.$el.find('.sex').html(this.model.get('sex')  || '--');
            this.$el.find('.birthday').html(this.model.get('birthday') || '--');
            this.$el.find('.email').html(this.model.get('email')  || '--');
        }
    }
    edit() {
        this.trigger('editing', true);
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
            this.trigger('editing', false);
        }
    }
    delete() {
        let model: UserModel = userCollection.get(this.model.cid);
        userCollection.remove(model);
        this.remove();
    }
}