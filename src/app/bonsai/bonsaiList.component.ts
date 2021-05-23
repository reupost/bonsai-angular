import { Component } from '@angular/core';
import { BonsaiRepository } from './bonsaiRepository.model';
import { TaxonSelectComponent } from '../taxon/taxonSelect.component';
// import { TaxonRepository } from '../taxon/taxonRepository.model';
import { Bonsai } from './bonsai.model';
import { Taxon } from '../taxon/taxon.model';
import { LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-bonsai-list',
  templateUrl: 'bonsaiList.html',
  styleUrls: ['./bonsai.component.css']
})
export class BonsaiListComponent {
  constructor(private model: BonsaiRepository, /* @Inject(TaxonSelectComponent) private taxonSelect: TaxonSelectComponent, */
      @Inject(LOCALE_ID) public locale: string) {
      console.log('locale', this.locale);
  }
  stylingBy = 'style';
  selectedBonsai: Bonsai = null;
  selectedTaxonId: number;
  mouseoverBonsaiID = 0;
  newBonsaiTag: number = null;

  sortListBy = 'tag';
  sortListOrder = 'ASC';
  bonsaisPerPage = 20;
  selectedPage = 1;

  newBonsai: Bonsai = new Bonsai();

  // TODO
  getBonsaiByPosition(position: number): Bonsai {
    return this.model.getBonsaiPage()[position];
  }

  getBonsaiName(key: number): string {
    if (key !== 0) {
      const s = this.model.getBonsai(key);
      return s.name;
    } else {
      return '(None)';
    }
  }

  getBonsai(key: number): Bonsai {
    return this.model.getBonsai(key);
  }

  getBonsaiPage(): Bonsai[] {
    return this.model.getBonsaiPage();
  }

  getBonsaisCount(): number {
      return this.model.getBonsaisCount();
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
    this.bonsaisPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number {
    return this.model.getPageCount();
  }

  getSelected(bonsai: Bonsai): boolean {
    return bonsai === this.selectedBonsai;
  }

  getMouseOvered(bonsai: Bonsai): {} {
    return bonsai.id === this.mouseoverBonsaiID;
  }

  getBonsaiStyle(s: Bonsai): string {
    switch (s.style) {
      case 'Informal upright' : return 'bg-info';
      default: return '';
    }
  }

  setStylingBy(style: string) {
    this.stylingBy = style;
  }

  getBonsaiRowStyle(s: Bonsai): {} {
    let bgColor = '';
    if (this.stylingBy === 'style') {
      switch (s.style) {
        case 'Informal upright' :
          bgColor = '#006600';
          break;
        case 'Formal upright' :
          bgColor = '#996633';
          break;
      }
    } else if (this.stylingBy === 'costAmount') {
      let bgColorScale = s.costAmount * 30;
      if (bgColorScale > 200) { bgColorScale = 200; }
      bgColor = '#FF' + (255 - bgColorScale).toString(16) + (255 - bgColorScale).toString(16);
    }
    return {
      backgroundColor: bgColor
    };
  }

  getID(index: number,bonsai: Bonsai) {
    return bonsai.id;
  }

  addBonsai() {
    if (this.newBonsai.tag) {
      //this.newBonsai.taxon = selectTaxon.getSelectedTaxon();
      this.model.saveBonsai(this.newBonsai);
      this.newBonsai = new Bonsai();
    }
  }
  updateBonsaiTag() {
    if (this.selectedBonsai && this.newBonsaiTag) {
      this.selectedBonsai.tag = this.newBonsaiTag;
      this.model.saveBonsai(this.selectedBonsai);
    }
  }

  delBonsai() {
    this.model.deleteBonsai(this.selectedBonsai);
  }

  incrementSelectedTaxonId() {
    this.selectedTaxonId++;
  }

  selectedTaxonChangedHandler(newTaxon: Taxon) {
    this.newBonsai.taxon = newTaxon;
  }
}
