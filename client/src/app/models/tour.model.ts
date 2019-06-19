export class Tour {
    public _id: string;
    public user_id: string;
    public tour_id: string;
    public title: string;
    public tour_title: String;
    public duration: number;
    public description: string;
    public city: string;
    public address: string;
    public price_adult: number;
    public price_child: number;
    public program: [];
    public tour_image: string;
    public dp: [];
    public children: number;
    public adults: number;
    public price: number;

    constructor(_id: string, user_id: string, tour_id: string, title: string, tour_title: string, duration: number, description: string, city: string, address: string, price_adult: number, price_child: number, program: [], tour_image: string, dp: [], children: number, adults: number, price:number) {
        this._id = _id;
        this.user_id = user_id;
        this.tour_id = tour_id;
        this.title = title;
        this.tour_title = tour_title;
        this.duration = duration;
        this.description = description;
        this.city = city;
        this.address = address;
        this.price_adult = price_adult;
        this.price_child = price_child;
        this.program = program;
        this.tour_image = tour_image;
        this.dp = dp;
        this.children = children;
        this.adults = adults;
        this.price = price;
    }
}