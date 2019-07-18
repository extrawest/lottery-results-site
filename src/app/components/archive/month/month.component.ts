import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { LotteryService } from '../../../shared/services/lottery.service';
import { takeUntil } from 'rxjs/operators';
import { Language, DefaultLocale, DateTimeOptions } from 'angular-l10n';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  @Language() lang: string;
  @DefaultLocale() defaultLocale: string;
  options: DateTimeOptions = { month: 'long' };

  year;
  monthsNumbers = [];
  monthDates = [];

  constructor(
    private route: ActivatedRoute,
    private lotteryService: LotteryService
  ) {}

  ngOnInit() {
    const lotteryId = this.route.snapshot.paramMap.get('id');
    this.year = this.route.snapshot.paramMap.get('year');
    this.lotteryService
      .getArchiveMonthList(lotteryId, this.year)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        this.lotteryService.setSingleLotteryName(data.name);
        this.monthsNumbers = data.date_list.reverse();
        for (const num of this.monthsNumbers) {
          this.monthDates.push(new Date(this.year + '-' + num + '-' + 1));
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
