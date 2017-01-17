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
    tagName: string;
    className: string;
    events: any;
}

export default class AddUserView extends Backbone.View<UserModel> implements AddUserViewInterface {
    model: UserModel;
    template: any;
    constructor(options: AddUserViewOptions<UserModel>) {
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
        
    }
    onValidate(error: string[]) {
        
    }
    clearTip() {
        
    }
    onErrorTip(message: string) {
        
    }
    render(userList?: any) {
        
        return this;
    }
    confirm() {
        
    }
}