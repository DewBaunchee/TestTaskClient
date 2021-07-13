import {Authentication} from '../../entities/authentication';

export interface AuthenticationState {
    currentAuth: Authentication;
    lastError?: string;
}

export const initialAuthState: AuthenticationState = {
    currentAuth: {
        username: '',
        password: '',
        token: '',
        canModify: false,
        expiredDate: 0
    }
}
