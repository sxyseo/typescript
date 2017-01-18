import UserMain from './userMain';

import './styles/common.scss';

new UserMain({
    el: '#user-main',
    events: {'click .add': 'addUser'}
});
