import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() faceImg: any;

  //imgUrl = 'data:image/jpeg;base64,' + this.faceImg.toString('base64');

  constructor() { }

  ngOnInit() {
  }

}
