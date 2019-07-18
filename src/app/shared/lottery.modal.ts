export class Lottery {
  public id: string;
  public name: string;
  public results: [
    {
      type: string;
      value: number;
    }
  ];
  public date: {
    date: string;
    time: string;
  };

  constructor(
    id: string,
    name: string,
    results: [{ type; value }],
    date: { date; time }
  ) {
    this.id = id;
    this.name = name;
    this.results = results;
    this.date = date;
  }
}
