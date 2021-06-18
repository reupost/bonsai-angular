import { Injectable } from "@angular/core";
import { Pic } from "./pic.model";
import { RestDataSource } from "../rest.datasource";
import { Observable } from "rxjs";

declare const Buffer;

@Injectable()
export class PicRepository {
  private picsPage: Pic[];
  private picsCount = 0;
  private picsPerPage = 20;
  private sortBy = "";
  private sortDir = "";
  private filterBy = "";
  private pageNo = 0;
  private pageCount = 0;
  private locator = (p: Pic, id: number) => p.id == id;

  constructor(private dataSource: RestDataSource) {
    this.dataSource
      .getPicsPage(
        this.filterBy,
        this.sortBy,
        this.sortDir,
        this.pageNo,
        this.picsPerPage
      )
      .subscribe((data) => {
        // console.log(data);
        this.picsPage = data["content"];
        this.picsCount = data["totalElements"];
        this.pageCount = Math.ceil(this.picsCount / this.picsPerPage);
        console.log(this.picsPage);
      });
  }

  getPicsPage(): Pic[] {
    return this.picsPage;
  }

  getPicWithThumb(id: number): Pic {
    // might need to call repository
    let p: Pic = this.picsPage.find((t) => this.locator(t, id));
    console.log('has thumb?');
    console.log(p);
    if (p.thumb == null || p.thumb == undefined) {
      console.log('retrieving thumbnail');
      this.dataSource.getPicImage(p.id, true).subscribe((data) => {
        console.log('data: ' + data);
        var reader = new FileReader();
        reader.readAsDataURL(data); 
        reader.onloadend = function() {
          let thumb = reader.result;   
          console.log(thumb);
          p.thumb = thumb.toString();
        }
        console.log('got thumbnail');
        return p;
      });
    } else {
      return p;
    }
  }

  getThumb(id: number): string {
    var thumb: string;
    this.dataSource.getPicImage(id, true).subscribe((data) => {
      console.log('data: ' + data);
      var reader = new FileReader();
      reader.readAsDataURL(data); 
      reader.onloadend = function() {
        let thumb = reader.result;   
        console.log('got thumbnail');
        console.log(thumb);
        return thumb;
      }
    });
    console.log('returning empty thumb...');
    return '';
  }

  getThumbObservable(id: number): Observable<Blob> {
    return this.dataSource.getPicImage(id, true);
  }

  getPicsCount(): number {
    return this.picsCount;
  }

  getPageCount(): number {
    return this.pageCount;
  }

  setPageNo(page: number) {
    if (page > 0 && page <= this.pageCount) {
      this.pageNo = page - 1; //TODO: this is clumsy
      this.setPicsPage();
    }
  }

  setSort(sortBy: string, sortDir: string) {
    this.sortBy = sortBy;
    this.sortDir = sortDir.toLowerCase() == "desc" ? "DESC" : "ASC";
    this.setPicsPage();
  }

  setFilter(filter: string) {
    this.filterBy = filter;
    this.pageNo = 0;
    this.setPicsPage();
  }

  private setPicsPage() {
    this.dataSource
      .getPicsPage(
        this.filterBy,
        this.sortBy,
        this.sortDir,
        this.pageNo,
        this.picsPerPage
      )
      .subscribe((data) => {
        this.picsPage = data["content"];
        this.picsCount = data["totalElements"];
        this.pageCount = Math.ceil(this.picsCount / this.picsPerPage);
      });
  }

  savePic(pic: Pic) {
    if (pic.id == 0 || pic.id == null) {
      this.dataSource.savePic(pic).subscribe((s) => {
        // this.speciesAll.push(s);
        this.setPicsPage();
      });
    } else {
      this.dataSource.updatePic(pic).subscribe((s) => {
        this.setPicsPage();
      });
    }
  }

  deletePic(pic: Pic) {
    const index = this.picsPage.findIndex((p) => this.locator(p, pic.id));
    if (pic != null && index >= 0) {
      this.dataSource.deletePic(pic).subscribe((s) => {
        this.setPicsPage();
      });
    }
  }
}
