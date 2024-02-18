export class User {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    is_verified: boolean;
    password: string;
    photo: string;
    is_online: boolean;

    constructor(obj?: any) {
        this.id = obj ? obj.id : null;
        this.first_name = obj ? obj.first_name : '';
        this.last_name = obj ? obj.last_name : '';
        this.email = obj ? obj.email : '';
        this.is_verified = obj ? obj.ist_verified : '';
        this.password = obj ? obj.password : '';
        this.photo = obj ? obj?.photo : '';
        this.is_online = obj ? obj.is_online : '';
    }

    public toJSON() {
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            ist_verified: this.is_verified,
            password: this.password,
            photo: this.photo,
            is_online: this.is_online
        }
    }
}