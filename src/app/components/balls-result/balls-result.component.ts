import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-balls-result',
    templateUrl: './balls-result.component.html',
    styleUrls: ['./balls-result.component.scss']
})
export class BallsResultComponent implements OnInit {
    @Input() results: [];

  constructor() { }

  ngOnInit() {
  }

}
