import { Component, OnInit, Input } from '@angular/core';
import { FrogFace } from '../frog-face';

@Component({
  selector: 'app-frog-face',
  templateUrl: './frog-face.component.html',
  styleUrls: ['./frog-face.component.css']
})
export class FrogFaceComponent implements OnInit {
  @Input() face: FrogFace;

  constructor() { }

  ngOnInit() {
  }

}
