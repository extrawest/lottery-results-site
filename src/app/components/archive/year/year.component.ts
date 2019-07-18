import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {LotteryService} from '../../../shared/services/lottery.service';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-year',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit, OnDestroy {
    private unsubscribe: Subject<void> = new Subject();

    archiveYearsList = [];
    decadesList = {};
    years = [];

    constructor(private lotteryService: LotteryService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        const lotteryId = this.activatedRoute.snapshot.paramMap.get('id');
        this.lotteryService
            .getArchiveYearsList(lotteryId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((data: any) => {
                this.years = data.date_list;
                this.lotteryService.setSingleLotteryName(data.name);
                this.sortYearsByDecades();
            });
    }

    private sortYearsByDecades() {
        for (const year of this.years) {
            let decade;
            if (String(year).startsWith("20")) {
                switch (String(year)[2]) {
                    case '1': {
                        decade = "2010";
                        break;
                    }
                    case '0': {
                        decade = "2000";
                        break;
                    }
                }
            } else {
                switch (String(year)[2]) {
                    case '9': {
                        decade = "1990";
                        break;
                    }
                    case '8': {
                        decade = "1980";
                        break;
                    }
                    case '7': {
                        decade = "1970";
                        break;
                    }
                    case '6': {
                        decade = "1970";
                        break;
                    }
                    case '5': {
                        decade = "1970";
                        break;
                    }
                }
            }
            this.addYearToDecade(decade, year);
        }
        this.archiveYearsList = Object.values(this.decadesList).reverse();
    }

    private addYearToDecade(decade: string, year: string) {
        if (this.decadesList[decade] === undefined) {
            this.decadesList[decade] = { decade: decade, years: [year]};
        } else {
            this.decadesList[decade].years.push(year);
        }
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
