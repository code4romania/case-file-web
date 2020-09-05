import { UserInfo } from "./user-info.model";

export class User extends UserInfo {
    birthDate: Date;
    phone: string;
    types: any[];

    birthDateString: string;
}