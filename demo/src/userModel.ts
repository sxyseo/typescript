import Backbone = require('backbone');

interface UserModelOptions {
    firstName: string;
    lastName?: string;
    sex?: string;
    birthday?: string;
    email: string;
}

export default class UserModel extends Backbone.Model {
    constructor(options: UserModelOptions) {
        super(options);
    }
    validate(attrs: any) {
        let err: string[] = [];
        let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ('' === attrs.firstName) {
            err.push('first name is not empty!');
        }
        if ('' === attrs.email) {
            err.push('email is not empty!');
        } else {
            if (!reg.test(attrs.email)) {
                err.push('email is invalid format!');
            }
        }
        if (err.length) return err;
    }
}
