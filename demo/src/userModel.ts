import Backbone = require('backbone');

interface UserModelOptions {
    firstName: string;
    lastName?: string;
    sex?: number;
    birthday?: string;
    email: string;
}

export default class UserModel extends Backbone.Model {
    constructor(options: UserModelOptions) {
        super(options);
    }
}