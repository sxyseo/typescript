import Backbone = require('backbone');

interface RouterOptions {
    routes: any;
}

class UserRouter extends Backbone.Router {
    operator(action: string, id: number) {
        if (null === action) this.trigger('route:index');
        if ('add' === action) this.trigger('route:addUser');
        if ('detail' === action && id) this.trigger('route:userDetail');
    }
    constructor(options: RouterOptions) {
        super(options);
    }
}

export let userRouter = <Backbone.Router>new UserRouter({
    // 路由配置
    routes: {
        '': 'operator',
        'user/:action': 'operator',
        'user/:action/:id': 'operator'
    }
});
