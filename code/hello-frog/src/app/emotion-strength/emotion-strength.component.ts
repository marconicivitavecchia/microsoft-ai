import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-emotion-strength',
  templateUrl: './emotion-strength.component.html',
  styleUrls: ['./emotion-strength.component.css']
})
export class EmotionStrengthComponent implements OnChanges {

  @Input() value: number;
    valueWidth: number;
    
    ngOnChanges(): void {
        this.valueWidth = this.value * 80;
    }

}
