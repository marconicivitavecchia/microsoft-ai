import { Component, OnInit } from '@angular/core';
import { FrogFace } from './frog-face';
import { FrogFaceService } from './frog-face.service';
import { DetectedFace } from './detected-face';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-frog';
  previewImg: string;
  primaryFace: FrogFace;
  secondFace: FrogFace;
  thirdFace: FrogFace;
  forthFace: FrogFace;

  primaryHeight = 160;
  secondaryHeight = 100;

  constructor(private frogFaceService: FrogFaceService) { }

  getFrogFace(): void {
    this.frogFaceService.getFrogFace()
      .subscribe((data: DetectedFace) => {
        let detectedFace = { ...data };
        this.previewImg = data.img;
        
        const emotionArr = Object.keys(detectedFace.emotion).map(k => { return { "emotion": k, "value": detectedFace.emotion[k] }; });
        emotionArr.sort(function (a, b) {
          return b.value - a.value;
        });
        this.primaryFace = emotionArr[0];
        this.secondFace =  emotionArr[1];
        this.thirdFace =  emotionArr[2];
        this.forthFace =  emotionArr[3];
      });
  }

  ngOnInit() {
    this.getFrogFace();
  }

}
