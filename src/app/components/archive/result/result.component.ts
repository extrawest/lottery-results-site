import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ArchiveLotteryResultModel } from './archive.lottery.result.model';
import { LotteryService } from '../../../shared/services/lottery.service';
import { Language, DefaultLocale, DateTimeOptions } from 'angular-l10n';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();

  lotteryId: string;
  date: Date;
  year: string;
  month: string;
  day: string;
  lotteryName: string;
  errorMessage: boolean = false;
  lottery: ArchiveLotteryResultModel = new ArchiveLotteryResultModel();

  @Language() lang: string;
  @DefaultLocale() defaultLocale: string;
  optionsDay: DateTimeOptions = { day: 'numeric' };
  optionsMonth: DateTimeOptions = { month: 'long' };
  optionsYear: DateTimeOptions = { year: 'numeric' };

  constructor(
    private lotteryService: LotteryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.extractDate();
    this.lotteryName = this.lotteryService.getSingleLotteryName();
    this.lotteryId = this.route.snapshot.paramMap.get('id');
    this.handleLotteryName();
    this.lotteryService
      .getArchiveResults(this.lotteryId, this.year, this.month, this.day)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        data => {
          if (data.id === undefined) {
            this.errorMessage = true;
          } else {
            this.errorMessage = false;
            this.lottery = data;
            this.lotteryService.setSingleLotteryName(this.lottery.name);
          }
        },
        error => {
          this.errorMessage = true;
        }
      );
  }

  private extractDate() {
    this.year = this.route.snapshot.paramMap.get('year');
    this.day = this.route.snapshot.paramMap.get('day');
    this.month = this.route.snapshot.paramMap.get('month');
    this.date = new Date( this.year + '-' + this.month + '-' + this.day);
  }

  private handleLotteryName() {
    this.lotteryService.updateLotteryName
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
        (data: any) => {
          if (this.lotteryName !== data) {
            this.lotteryName = data;
          }
        });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.clear();
  }

  clear() {
    this.date = null;
    this.errorMessage = false;
  }
}
