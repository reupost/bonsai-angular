import { Component } from '@angular/core';
import { TaxonRepository } from './taxonRepository.model';
import { Taxon } from './taxon.model';

@Component({
  selector: 'app-taxon-list',
  templateUrl: 'taxonList.html',
  styleUrls: ['./taxon.component.css']
})
export class TaxonListComponent {
  constructor(private model: TaxonRepository) { }
  stylingBy = 'generalType';
  selectedTaxon: Taxon = null;
  mouseoverTaxonID = 0;
  newBonsaiCount: number = null;

  sortListBy = 'fullName';
  sortListOrder = 'ASC';
  taxaPerPage = 20;
  selectedPage = 1;

  newTaxon: Taxon = new Taxon();

  // TODO
  getTaxonByPosition(position: number): Taxon {
    return this.model.getTaxonPage()[position];
  }

  getTaxonName(key: number): string {
    if (key !== 0) {
      const s = this.model.getTaxon(key);
      return s.fullName;
    } else {
      return '(None)';
    }
  }

  getTaxon(key: number): Taxon {
    return this.model.getTaxon(key);
  }

  getTaxonPage(): Taxon[] {
    return this.model.getTaxonPage();
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
    this.taxaPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number {
    return this.model.getPageCount();
  }

  getTaxaCount(): number {
    return this.model.getTaxaCount();
  }

  getSelected(taxon: Taxon): boolean {
    return taxon === this.selectedTaxon;
  }

  getMouseOvered(taxon: Taxon): {} {
    return taxon.id === this.mouseoverTaxonID;
  }

  getTaxonClass(s: Taxon): string {
    switch (s.generalType) {
      case 'Evergreen' : return 'bg-info';
      default: return '';
    }
  }

  setStylingBy(style: string) {
    this.stylingBy = style;
  }

  getTaxonRowStyle(s: Taxon): {} {
    let bgColor = '';
    if (this.stylingBy === 'generalType') {
      switch (s.generalType) {
        case 'Evergreen' :
          bgColor = '#006600';
          break;
        case 'Deciduous' :
          bgColor = '#996633';
          break;
        case 'Coniferous' :
          bgColor = '#009999';
          break;
        case 'Flowering' :
          bgColor = '#ff9999';
          break;
        case 'Pine' :
          bgColor = '#336600';
          break;
        case 'Succulent' :
          bgColor = '#ff9966';
          break;
        case 'Tropical' :
          bgColor = '#9900cc';
          break;
      }
    } else if (this.stylingBy === 'countBonsais') {
      let bgColorScale = s.countBonsais * 30;
      if (bgColorScale > 200) { bgColorScale = 200; }
      bgColor = '#FF' + (255 - bgColorScale).toString(16) + (255 - bgColorScale).toString(16);
    }
    return {
      backgroundColor: bgColor
    };
  }

  getID(index: number,taxon: Taxon) {
    return taxon.id;
  }

  addTaxon() {
    if (this.newTaxon.genus) {
      this.model.saveTaxon(this.newTaxon);
      this.newTaxon = new Taxon();
    }
  }
  updateTaxonBonsaiCount() {
    if (this.selectedTaxon && this.newBonsaiCount) {
      this.selectedTaxon.countBonsais = this.newBonsaiCount;
      this.model.saveTaxon(this.selectedTaxon);
    }
  }

  delTaxon() {
    this.model.deleteTaxon(this.selectedTaxon);
  }


}
