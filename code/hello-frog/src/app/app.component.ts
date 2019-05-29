import { Component, OnInit } from '@angular/core';
import { FrogFace } from './frog-face';
import { FrogFaceService } from './frog-face.service';
import { DetectedFace } from './detected-face';
import { IDLE_FACE } from './idle-face';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-frog';
  showSplash: boolean = true;
  previewImg: string;
  primaryFace: FrogFace;
  secondFace: FrogFace;
  thirdFace: FrogFace;
  forthFace: FrogFace;

  primaryHeight = 160;
  secondaryHeight = 100;

  constructor(private frogFaceService: FrogFaceService) { }

  assignFace(face:DetectedFace) {
    this.previewImg = face.img;

    const emotionArr = Object.keys(face.emotion).map(k => { return { "emotion": k, "value": face.emotion[k] }; });
    emotionArr.sort(function (a, b) {
      return b.value - a.value;
    });
    this.primaryFace = emotionArr[0];
    this.secondFace = emotionArr[1];
    this.thirdFace = emotionArr[2];
    this.forthFace = emotionArr[3];
    this.showSplash = false;
  }
  getFrogFace(): void {
    this.frogFaceService.getFrogFace()
      .subscribe((data: DetectedFace) => {
        let detectedFace = { ...data };
        if (detectedFace.status === "OK") {
          console.log("face detected!!!")
          this.assignFace(detectedFace);
        } else {
          console.log("no face detected, using placeholder")
          this.assignFace(IDLE_FACE);
        }
      });
  }

  ngOnInit() {
    
  }

  onClick() {
    console.log("getting a new face...")
    this.getFrogFace();
  }

}
