export interface Emotions {
    "anger": number,
    "contempt": number,
    "disgust": number,
    "fear": number,
    "happiness": number,
    "neutral": number,
    "sadness": number,
    "surprise": number
}


export interface DetectedFace {
    imgUrl: string;
    emotion: Emotions;
    status: string;
  }