import { UserModelOptions } from './userModel';

interface UserModelInterface {
    is_ok: boolean;
    data: UserModelOptions[]
}

export let mock_json: UserModelInterface = {
    is_ok: true,
    data: [
        {firstName: 'AR', lastName: 'Insect', email: 'ar.insect@gmail.com', sex: '男'},
        {firstName: 'JSON.~', email: 'JSON1988@gmail.com', sex: '女'}
    ]
};
