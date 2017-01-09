import Backbone = require('backbone');
import UserModel from './userModel';

class UserCollection extends Backbone.Collection<UserModel> {
    constructor(options: any) {
        super(options);
    }
}

let Collection = new UserCollection({model: UserModel});

export default Collection;