import { Component, Input, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { PicRepository } from './picRepository.model';
import { Pic } from './pic.model';

@Component({
  selector: 'app-pic-select',
  templateUrl: 'picSelect.html',
  styleUrls: ['./pic.component.css']
})
export class PicSelectComponent implements OnChanges {

  constructor(private model: PicRepository) { }

  selectedPic: Pic = null;
  //TODO rather have filter as input property
  @Input()
  selectedPicId: number;

  sortListBy = 'title';
  sortListOrder = 'ASC';
  picsPerPage = 20;
  selectedPage = 1;

  @Output()
  selectedPicChanged: EventEmitter<Pic> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {

    for (let property in changes) {
      if (property === 'selectedPicId') {
        console.log('Previous:', changes[property].previousValue);
        console.log('Current:', changes[property].currentValue);
        console.log('firstChange:', changes[property].firstChange);
      }
    }
  }


  onChange() {
    this.selectedPic = this.model.getPicWithThumb(this.selectedPicId);
    this.selectedPicChanged.emit(this.selectedPic);
  }

  getSelectedPic(): Pic {
    return this.selectedPic;
  }

  // TODO
  getPicByPosition(position: number): Pic {
    return this.model.getPicsPage()[position];
  }

  getPicTitle(key: number): string {
    if (key !== 0) {
      const p = this.model.getPicWithThumb(key);
      return p.title;
    } else {
      return '(None)';
    }
  }

  getPic(key: number): Pic {
    return this.model.getPicWithThumb(key);
  }

  getPicsPage(): Pic[] {
    return this.model.getPicsPage();
  }

  private opGt = (a, b) => a > b;
  private opLt = (a, b) => a < b;

  get pageCount(): number {
    return this.model.getPageCount();
  }

  getPicsCount(): number {
    return this.model.getPicsCount();
  }

  getSelected(pic: Pic): boolean {
    return pic === this.selectedPic;
  }

  getID(index: number, pic: Pic) {
    return pic.id;
  }

}
