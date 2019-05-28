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
        this.previewImg = data.img; //'assets/cropped-face.jpg';
        this.primaryFace = {
          emotion: "neutral",
          value: detectedFace.emotion["neutral"]
        }
        this.secondFace = {
          emotion: "sadness",
          value: detectedFace.emotion["sadness"]
        }
        this.thirdFace = {
          emotion: "happiness",
          value: detectedFace.emotion["happiness"]
        }
        this.forthFace = {
          emotion: "fear",
          value: detectedFace.emotion["fear"]
        }
      });
  }

  ngOnInit() {
    this.getFrogFace();
  }

}
