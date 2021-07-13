import {createAction, props} from "@ngrx/store";
import {Authentication} from "../../entities/authentication";

export namespace AuthenticationAction {

    export const newAuthentication = createAction(
        '[Authentication] New Authentication',
        props<{ username: string, password: string }>()
    );

    export const refreshAuthentication = createAction(
        '[Authentication] Refresh Authentication'
    );

    export const newAuthenticationSuccess = createAction(
        '[Authentication] New Authentication Success',
        props<{ auth: Authentication }>()
    );

    export const newAuthenticationError = createAction(
        '[Authentication] New Authentication Error',
        props<{ errorText: string }>()
    );

    export const closeAuthentication = createAction(
        '[Authentication] Close Authentication'
    );
}
