import $$ = require('jquery');
import underscore = require('underscore');
import Backbone = require('backbone');

import UserModel from './userModel';
import userCollection from './userCollection';

import './styles/addUserView.scss';

interface AddUserViewInterface {
    render(): Backbone.View<UserModel>;
    confirm(): void;
}

interface AddUserViewOptions<UM> {
    model: UM;
    el: string;
    events: any;
}

class AddUserView extends Backbone.View<UserModel> implements AddUserViewInterface {
    model: UserModel;
    template: any;
    constructor(options: AddUserViewOptions<UserModel>) {
        super(options);
    }
    initialize() {
        let tpl: string[] = [
            '<div class="user-item">',
                '<em>用户名：' + '</em>',
                '<span class="first-name"><input type="text" /></span>',
                '<span class="last-name"><input type="text" /></span>',
                '<p class="error-tip"></p>',
            '</div>',
            '<div class="user-item">',
                '<em>性别：</em>',
                '<span class="sex"><input type="text" /></span>',
                '<p class="error-tip"></p>', 
            '</div>',
            '<div class="user-item">',
                '<em>生日：</em>',
                '<span class="birthday"><input type="text" /></span>',
                '<p class="error-tip"></p>', 
            '</div>',
            '<div class="user-item">', 
                '<em>邮箱：</em>',
                '<span class="email"><input class="input-email" type="text" /></span>', 
                '<p class="error-tip"></p>', 
            '</div>',
            '<div class="user-item oprator">', 
                '<button class="button btn-confirm">确认添加</button>',
                '<a href="#" class="button btn-back">返回用户列表</a>',
            '</div>'
        ];
        // 初始化先定义好模板对象
        this.template = underscore.template(tpl.join(''));
        // 用户模型需要绑定数据验证，保证在set之前调用
        this.model.on('invalid', (model: UserModel, error: string[]) => {
            this.onValidate(error);
        });
    }
    onValidate(error: string[]) {
        
    }
    clearTip() {
        
    }
    onErrorTip(message: string) {
        
    }
    render() {
        this.$el.html(this.template());
        return this;
    }
    confirm() {
        
    }
    goback() {

    }
}

export default new AddUserView({
    model: new UserModel({ firstName: '', email: '' }),
    el: '#add-user',
    events: {}
});