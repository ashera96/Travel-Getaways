export class Tour {
    public _id: string;
    public title: string;
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

    constructor(_id: string,title: string, duration: number, description: string, city: string, address: string, price_adult: number, price_child: number, program: [], tour_image: string, dp: [], children: number, adults: number) {
        this._id = _id;
        this.title = title;
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
    }
}