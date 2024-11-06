import { User } from "./User";

export class UserDTO {
    username: string;
    password: string;
    roles: string;

    constructor(username: string, password: string, roles: string) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    fromUser(user: User) {
        this.username = user.username;
        this.password = user.password;
        this.roles = JSON.stringify(user.roles);
    } 

    toUser() {
        const user = {
            username: this.username,
            password: this.password,
            roles: JSON.parse(this.roles),
        } as User
        return user;
    }
}