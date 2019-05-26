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
  previewImg;
  primaryFace: FrogFace;
  primaryFaceValue = 80;

  constructor(private frogFaceService: FrogFaceService) { }

  getFrogFace(): void {
    this.frogFaceService.getFrogFace()
      .subscribe((data: DetectedFace) => {
        console.log(data);
        let detectedFace = { ...data };
        console.log(detectedFace);
        this.primaryFace = {
          emotion: "neutral",
          value: detectedFace.emotion["neutral"]
        }
      });
  }

  ngOnInit() {
    this.getFrogFace();
    this.primaryFaceValue = 90;
  }

}
