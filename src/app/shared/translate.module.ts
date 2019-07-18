import { NgModule } from '@angular/core';

import {
  ISOCode,
  L10nLoader,
  L10nConfig,
  LocaleInterceptorModule,
  LocaleSeoModule,
  LocaleValidationModule,
  LogLevel,
  ProviderType,
  StorageStrategy,
  TranslationModule
} from 'angular-l10n';

const l10nConfig: L10nConfig = {
  locale: {
    languages: [
      { code: 'en', dir: 'ltr' },
      { code: 'de', dir: 'ltr' },
      { code: 'jv', dir: 'ltr' },
      { code: 'ua', dir: 'ltr' },
      { code: 'pt', dir: 'ltr' }
    ],
    defaultLocale: {
      languageCode: 'en',
      countryCode: 'US',
      numberingSystem: 'latn'
    },
    currency: 'USD',
    storage: StorageStrategy.Cookie,
    cookieExpiration: 30
  },
  translation: {
    providers: [{ type: ProviderType.Static, prefix: './assets/locale-' }],
    caching: true,
    rollbackOnError: true,
    composedKeySeparator: '.',
    missingValue: ' ',
    i18nPlural: true
  },
  localizedRouting: {
    format: [ISOCode.Language, ISOCode.Country],
    defaultRouting: false,
    schema: [
      {
        text: 'English',
        languageCode: 'en',
        countryCode: 'US',
        numberingSystem: 'latn',
        currency: 'USD'
      },
      {
        text: '日本',
        languageCode: 'jv',
        countryCode: 'JV',
        numberingSystem: 'latn',
        currency: 'JPY'
      },
      {
        text: 'Deutsch',
        languageCode: 'de',
        countryCode: 'DE',
        numberingSystem: 'latn',
        currency: 'EUR'
      },
      {
        text: 'Português',
        languageCode: 'pt',
        countryCode: 'PT',
        numberingSystem: 'latn',
        currency: 'PTE'
      },
      {
        text: 'Українська',
        languageCode: 'ukr',
        countryCode: 'UKR',
        numberingSystem: 'latn',
        currency: 'UAH'
      }
    ]
  },
  localeInterceptor: {
    format: [ISOCode.Language, ISOCode.Country]
  }
};

@NgModule({
  imports: [
    LocaleInterceptorModule,
    TranslationModule.forRoot(l10nConfig),
    LocaleSeoModule.forRoot(),
    LocaleValidationModule.forRoot()
  ]
})
export class TranslateModule {
  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load().catch(err => {
      return err;
    });
  }
}
