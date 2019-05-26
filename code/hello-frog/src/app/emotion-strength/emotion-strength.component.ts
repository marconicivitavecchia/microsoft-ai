import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-emotion-strength',
  templateUrl: './emotion-strength.component.html',
  styleUrls: ['./emotion-strength.component.css']
})
export class EmotionStrengthComponent implements OnInit {

  @Input() value : number;

  constructor() { }

  ngOnInit() {
  }

}
