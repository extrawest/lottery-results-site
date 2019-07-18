import { Component, OnInit, OnDestroy } from '@angular/core';

import { IntlAPI } from 'angular-l10n';
import { LotteryService } from '../../shared/services/lottery.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  intlAPI: boolean;
  today: number;
  lotteryList: any[] = [];

  constructor(private lotteryService: LotteryService) {}

  ngOnInit() {
    this.lotteryService.getLotteryList().subscribe((res: any) => {
      this.lotteryList = res.filter(item => {
        return item !== null;
      });
    });

    this.today = Date.now();
    this.intlAPI =
      IntlAPI.hasDateTimeFormat() &&
      IntlAPI.hasNumberFormat() &&
      IntlAPI.hasCollator();
  }

  ngOnDestroy() {}
}
