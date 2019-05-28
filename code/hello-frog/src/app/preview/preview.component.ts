import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit, OnChanges {

  @Input() img: string;
  imgSrc: string = '';
  
  constructor() { }

  ngOnChanges() {
    this.imgSrc = `data:image/png;base64,${this.img}`;
  }

  ngOnInit() {
  }

}
