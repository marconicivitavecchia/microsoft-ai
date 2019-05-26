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
  previewImgUrl: string;
  primaryFace: FrogFace;
  secondFace: FrogFace;
  thirdFace: FrogFace;

  constructor(private frogFaceService: FrogFaceService) { }

  getFrogFace(): void {
    this.frogFaceService.getFrogFace()
      .subscribe((data: DetectedFace) => {
        let detectedFace = { ...data };
        this.previewImgUrl = 'assets/cropped-face.jpg'; //data.imgUrl;
        this.primaryFace = {
          emotion: "neutral",
          value: detectedFace.emotion["neutral"]
        }
        this.secondFace = {
          emotion: "sadness",
          value: detectedFace.emotion["sadness"]
        }
        this.thirdFace = null;
      });
  }

  ngOnInit() {
    this.getFrogFace();
  }

}
