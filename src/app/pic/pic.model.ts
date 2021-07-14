import { SafeUrl } from "@angular/platform-browser";

export class Pic {

  constructor(public id?: number, 
              public entityId?: number, 
              public entityType?: string,
              public title?: string,
              public view?: string,
              public dimX?: number, 
              public dimY?: number,
              public dimXthumb?: number, 
              public dimYthumb?: number,
              public imageURL?: string, 
              public thumbURL?: string,
              public imgThumb?: string, 
              public imgFull?: string) {
  }
}
