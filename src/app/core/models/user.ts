import { UserI } from "../interfaces/user-i";

export class User implements UserI {
    id!: number;
    username!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    token!: string;
}
