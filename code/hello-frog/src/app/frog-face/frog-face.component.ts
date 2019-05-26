import { Component, OnInit, Input } from '@angular/core';
import { FrogFace } from '../frog-face';

@Component({
  selector: 'app-frog-face',
  templateUrl: './frog-face.component.html',
  styleUrls: ['./frog-face.component.css']
})
export class FrogFaceComponent implements OnInit {
  private _face: FrogFace;
  frogFaceUrl: string;
  @Input()
  set face(face: FrogFace) {
    if (face) {
      this.frogFaceUrl = `assets/faces/${face.emotion}.png`;
      console.log(this.frogFaceUrl);
    }
    this._face = face;
  };
  get face(): FrogFace {
    return this._face;
  }

  constructor() { }

  ngOnInit() {
  }

}
