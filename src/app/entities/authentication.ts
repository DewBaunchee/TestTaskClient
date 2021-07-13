export interface Authentication {
    username: string;
    password: string;
    token: string;
    canModify: boolean;
    expiredDate: number;
}
