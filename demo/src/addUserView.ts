import $$ = require('jquery');
import underscore = require('underscore');
import Backbone = require('backbone');

import UserModel from './userModel';
import userCollection from './userCollection';
let QQUploaderFile = require('fine-uploader');
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

var manualUploader = new QQUploaderFile.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: 'http://localhost:3300/upload',
        accessKey: "AKIAJB6BSMFWTAXC5M2Q"
    },
    uploadSuccess: {
        endpoint: "http://localhost:3300/uploadDelete?success",
        params: {
            isBrowserPreviewCapable: QQUploaderFile.supportedFeatures.imagePreviews
        }
    },

    deleteFile: {
        enabled: true,
        method: "POST",
        endpoint: "http://localhost:3300/uploadDelete"
    },
    thumbnails: {
        placeholders: {
           // waitingPath: '/source/placeholders/waiting-generic.png',
           // notAvailablePath: '/source/placeholders/not_available-generic.png'
        }
    },
    validation: {
        itemLimit: 5,
        sizeLimit: 15000000,
        allowedExtensions: ['jpeg', 'jpg', 'gif', 'png', 'zip']
    },
    autoUpload: false,
    debug: true
});

QQUploaderFile(document.getElementById("trigger-upload")).attach("click", function() {
    manualUploader.uploadStoredFiles();
});

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
    render() {
        this.$el.html(this.template());
        return this;
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
            this.trigger('addUserComplete', this.model);
            window.location.hash = '#';
        }
    }
}
