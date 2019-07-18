import {Component, OnDestroy, OnInit} from '@angular/core';
import { Language } from 'angular-l10n';
import { LotteryService } from "../../../shared/services/lottery.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-archive-holder',
    templateUrl: './archive-holder.component.html',
    styleUrls: ['./archive-holder.component.scss']
})
export class ArchiveHolderComponent implements OnInit, OnDestroy {
    @Language() lang: string;
    subscription: Subscription;
    lotteryName: string;

    constructor(private lotteryService: LotteryService) {}

    ngOnInit() {
        this.handleLotteryName();
        this.lotteryName = this.lotteryService.getSingleLotteryName();
    }

    private handleLotteryName() {
        this.subscription = this.lotteryService.updateLotteryName.subscribe(
            (data: any) => {
                if (this.lotteryName !== data) {
                    this.lotteryName = data;
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
