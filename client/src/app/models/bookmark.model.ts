export class Bookmark {
    public _id: string;
    public user_id: string;
    public tour_id: string;
    public tour_title: String;
    public tour_duration: String;
    public tour_price_adult: number;
    public tour_price_child: number;

    constructor(_id: string, user_id: string, tour_id: string, tour_title: string, tour_duration: string, tour_price_adult: number, tour_price_child: number) {
        this._id = _id;
        this.user_id = user_id;
        this.tour_id = tour_id;
        this.tour_title = tour_title;
        this.tour_duration = tour_duration;
        this.tour_price_adult = tour_price_adult;
        this.tour_price_child = tour_price_child;
    }
}