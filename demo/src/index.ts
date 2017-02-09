
import UserMain from './userMain';

import './styles/common.scss';

new UserMain({
    el: '#user-main',
    events: {'click .add': 'addUser'}
});

import MY = require('./import');


console.log(MY.Greate);
class Main {
    test: MY.Greate;
    apply(){
        console.log( 0 );
    }
}
let main = new Main();
main.apply();

