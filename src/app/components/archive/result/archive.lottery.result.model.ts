export class ArchiveLotteryResultModel {
  id: string;
  name: string;
  results: [
    {
      type: string;
      value: [string];
    }
  ];
  date: string;
}
