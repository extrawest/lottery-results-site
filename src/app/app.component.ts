import { Component, OnInit } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';

import { LocaleService, TranslationService, SearchService } from 'angular-l10n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  dir: Direction;

  get currentCountry(): string {
    return this.locale.getCurrentCountry();
  }

  get currentNumberingSystem(): string {
    return this.locale.getCurrentNumberingSystem();
  }

  constructor(
    private locale: LocaleService,
    private translation: TranslationService,
    private search: SearchService
  ) {}

  ngOnInit() {
    this.search.updateHead('app');

    this.translation.translationChanged().subscribe(() => {
      this.dir = this.locale.getLanguageDirection() as Direction;
    });
  }
}
