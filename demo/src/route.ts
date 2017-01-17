import Backbone = require('backbone');

interface RouterOptions {
    routes: any;
}

class UserRouter extends Backbone.Router {
    operator(action: string) {
        console.log(action);
    }
    addUser() {
        console.log('dffsfsddfs');
        this.trigger('route:addUser');
    }
    userDetail(id: number) {
        console.log(id);
        this.trigger('route:userDetail');
    }
    constructor(options: RouterOptions) {
        super(options);
    }
}

// 路由器监听
Backbone.history.start({
    //silent: true // 初始化不监听路由
});

export let userRouter = <Backbone.Router>new UserRouter({
    // 路由配置
    routes: {
        'user/:action': 'operator',
        'user/detail/:id': 'userDetail'
    }
});

