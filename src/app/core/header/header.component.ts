import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { L10N_CONFIG, L10nConfigRef, LocaleService } from 'angular-l10n';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  countryMenuItems: any[] = [];
  defaultLocale: string;
  isHomePage: boolean;

  constructor(
    @Inject(L10N_CONFIG) private configuration: L10nConfigRef,
    private locale: LocaleService,
    private location: Location,
    private router: Router
  ) {
    this.countryMenuItems = this.configuration.localizedRouting.schema;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = event.url === '/';
      }
    });

    this.defaultLocale = this.locale.getCurrentLanguage();
  }

  selectLocale(
    language: string,
    country: string,
    numberingSystem: string,
    currency: string
  ): void {
    this.locale.setDefaultLocale(language, country, '', numberingSystem);
    this.defaultLocale = language;
    this.locale.setCurrentCurrency(currency);
  }

  onPageBack() {
    this.location.back();
  }

  ngOnDestroy(): void {}
}
