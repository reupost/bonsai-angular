import { Component, NgZone } from '@angular/core';
import { PicRepository } from './picRepository.model';
import { Pic } from './pic.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pic-list',
  templateUrl: 'picList.html',
  styleUrls: ['./pic.component.css']
})
export class PicListComponent {
  constructor(private model: PicRepository, private sanitizer: DomSanitizer) { }
  stylingBy = 'entityType';
  selectedPic: Pic = null;
  selectedPicThumb: SafeUrl;
  mouseoverPicID = 0;

  sortListBy = 'entityId';
  sortListOrder = 'ASC';
  picsPerPage = 20;
  selectedPage = 1;

  newPic: Pic = new Pic();

  // TODO
  getPicByPosition(position: number): Pic {
    return this.model.getPicsPage()[position];
  }

  public getPicImg(pic: Pic, thumbNotFull: boolean = false): SafeUrl {
    var toGet = false;
    if (thumbNotFull) {
      toGet = (pic.imgThumb == undefined || pic.imgThumb == null);
    } else {
      toGet = (pic.imgFull == undefined || pic.imgFull == null);
    }
    if (toGet) {
      // console.log(pic.id + ': pic needed - ' + (thumbNotFull? 'thumb' : ' full'));
      // console.log(pic);
      // HACK to prevent repeated calls while the image is being loaded
      if (thumbNotFull) {
        pic.imgThumb = '';
      } else {
        pic.imgFull = '';
      }

      this.model.getImgObservable(pic.id, thumbNotFull).subscribe((data) => {
        // console.log(pic.id + ': got data from getImgObservable');
        var reader = new FileReader();
        reader.readAsDataURL(data); 

        reader.onloadend = (e) => {
          let img = reader.result.toString();   
          // console.log(pic.id + ': got img');
          if (thumbNotFull) {
            pic.imgThumb = img;
          } else {
            pic.imgFull = img;
          }
        }
      });
     
    } else {
      if (thumbNotFull) {
        if (pic.imgThumb != '') {
          return this.sanitizer.bypassSecurityTrustUrl(pic.imgThumb); 
        } 
      } else {
        if (pic.imgFull != '') {
          return this.sanitizer.bypassSecurityTrustUrl(pic.imgFull); 
        } 
      }
    }
  }

  

  getPicsPage(): Pic[] {
    return this.model.getPicsPage();
  }

  private opGt = (a, b) => a > b;
  private opLt = (a, b) => a < b;


  setSortListBy(sortBy: string) {
      if (this.sortListBy === sortBy) {
        this.sortListOrder = (this.sortListOrder === 'ASC' ? 'DESC' : 'ASC');
      } else {
        this.sortListOrder = 'ASC';
      }
      this.sortListBy = sortBy;
      this.model.setSort(this.sortListBy, this.sortListOrder);

  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
    this.model.setPageNo(this.selectedPage);
  }

  changePageSize(newSize: number) {
    this.picsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number {
    return this.model.getPageCount();
  }

  getPicsCount(): number {
    return this.model.getPicsCount();
  }

  getSelected(p: Pic): boolean {
    return p === this.selectedPic;
  }

  getMouseOvered(p: Pic): {} {
    return p.id === this.mouseoverPicID;
  }

  getPicClass(p: Pic): string {
    switch (p.entityType) {
      case 'bonsai' : return 'bg-info';
      default: return '';
    }
  }

  setStylingBy(style: string) {
    this.stylingBy = style;
  }

  getPicRowStyle(s: Pic): {} {
    let bgColor = '';
    if (this.stylingBy === 'entityType') {
      switch (s.entityType) {
        case 'bonsai' :
          bgColor = '#006600';
          break;
        case 'plant' :
          bgColor = '#996633';
          break;
      }
    }
    return {
      backgroundColor: bgColor
    };
  }

  getID(index: number,pic: Pic) {
    return pic.id;
  }

  addPic() {
    if (this.newPic.entityId) {
      this.model.savePic(this.newPic);
      this.newPic = new Pic();
    }
  }

  delPic() {
    this.model.deletePic(this.selectedPic);
  }


}
