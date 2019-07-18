import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DayModel } from './day.model';
import { LotteryService } from '../../../shared/services/lottery.service';
import { DateTimeOptions, Language, DefaultLocale } from 'angular-l10n';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  daysModel: DayModel = new DayModel();

  @Language() lang: string;
  @DefaultLocale() defaultLocale: string;
  optionsMonth: DateTimeOptions = { month: 'long' };
  optionsYear: DateTimeOptions = { year: 'numeric' };
  year: string;
  month: string;
  date;

  monthDays = [];
  prevMonth = [];
  nextMonth = [];

  constructor(
    private route: ActivatedRoute,
    private lotteryService: LotteryService
  ) {
    this.year = this.route.snapshot.paramMap.get('year');
    this.month = this.route.snapshot.paramMap.get('month');
  }

  ngOnInit() {
    const lotteryId = this.route.snapshot.paramMap.get('id');
    this.date = new Date(this.year + '-' + this.month + '-' + 1);
    this.lotteryService
      .getArchiveDaysList(lotteryId, this.year, this.month)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        this.lotteryService.setSingleLotteryName(data.name);
        this.daysModel.days = data.date_list;
        this.configureDaysModel();
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  isActiveDay(dayNumb: string) {
    return this.daysModel.days.includes(dayNumb);
  }

  getCountDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  private configureDaysModel() {
    this.daysModel.daysInMonth = this.getCountDaysInMonth(this.year, this.month);
    const prevMonthNumb = (+this.month === 1) ? 12 : +this.month - 1;
    this.daysModel.daysInPrevMonth = this.getCountDaysInMonth(this.year, prevMonthNumb);
    this.daysModel.dayOfWeek = this.date.getDay();
    this.formatDaysArray();
  }

  private formatDaysArray() {
    const daysShowPrevMonth = this.daysModel.dayOfWeek - 1;
    if (daysShowPrevMonth > 0 && daysShowPrevMonth < 7) {
      for (let i = 0; i < daysShowPrevMonth; i++) {
        this.prevMonth.unshift(this.daysModel.daysInPrevMonth - i);
      }
    }
    for (let i = 1; i <= this.daysModel.daysInMonth; i++) {
      this.monthDays.push(i);
    }
    for (let i = 1; ; i++) {
      const checkedValue =
        (this.prevMonth.length +
          this.monthDays.length +
          this.nextMonth.length) %
        7;
      if (checkedValue === 0) {
        break;
      }
      this.nextMonth.push(i);
    }
  }
}
