import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  lotteryName: string;
  updateLotteryName: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  getLotteryList() {
    return this.http.get(`${environment.apiUrl}/api/v1/list`);
  }

  setSingleLotteryName(name: string) {
    this.updateLotteryName.emit(name);
    this.lotteryName = name;
  }

  getSingleLotteryName() {
   return this.lotteryName;
  }

  getSingleLottery(id: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/lottery/${id}`);
  }

  getArchiveYearsList(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/lottery/${id}/archive`);
  }

  getArchiveMonthList(id: string, year: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/lottery/${id}/archive/${year}`);
  }

  getArchiveDaysList(id: string, year: string, month: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/lottery/${id}/archive/${year}/${month}`);
  }

  getArchiveResults(id: string, year: string, month: string, day: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/lottery/${id}/archive/${year}/${month}/${day}`);
  }
}
