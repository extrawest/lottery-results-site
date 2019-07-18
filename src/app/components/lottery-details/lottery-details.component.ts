import { Component, OnDestroy, OnInit } from '@angular/core';
import { LotteryService } from '../../shared/services/lottery.service';
import { Subject } from 'rxjs';
import { TranslationService } from 'angular-l10n';
import { takeUntil } from 'rxjs/operators';
import { LotteryDetail } from './lottery-details.modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lottery-details',
  templateUrl: './lottery-details.component.html',
  styleUrls: ['./lottery-details.component.scss']
})
export class LotteryDetailsComponent implements OnInit, OnDestroy {
  private isTruncatingText: boolean = true;
  private unsubscribe: Subject<void> = new Subject();
  private id;

  lottery: LotteryDetail;
  buttonLabels;

  constructor(
    private lotteryService: LotteryService,
    private translation: TranslationService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.lotteryService
      .getSingleLottery(this.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: LotteryDetail) => {
        this.lottery = res;
        this.lotteryService.setSingleLotteryName(res.name);
      });

    this.translation
      .translationChanged()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.buttonLabels = this.translation.translate([
          'details.more',
          'details.show',
          'details.hide'
        ]);
      });
  }

  onShowDescription() {
    this.isTruncatingText = !this.isTruncatingText;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
