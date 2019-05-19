export class Message {
    public firstname: string;
    public lastname: string;
    public email: string;
    public telephone: number;
    public message: string;

    constructor(firstname: string, lastname: string, email: string, telephone: number, message: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.telephone = telephone;
        this.message = message;
    }
}