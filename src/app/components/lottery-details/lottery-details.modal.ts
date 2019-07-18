export class LotteryDetail {
    public id: string;
    public name: string;
    public results: [];
    public date: {};
    public description: string;
    public schedule: [];

    constructor(
        id: string,
        name: string,
        results: [],
        date: {},
        description: string,
        schedule: []
    ) {
        this.id = id;
        this.name = name;
        this.results = results;
        this.date = date;
        this.description = description;
        this.schedule = schedule;
    }
}
