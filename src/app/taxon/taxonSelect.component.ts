import { Component, Input, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { TaxonRepository } from './taxonRepository.model';
import { Taxon } from './taxon.model';

@Component({
  selector: 'app-taxon-select',
  templateUrl: 'taxonSelect.html',
  styleUrls: ['./taxon.component.css']
})
export class TaxonSelectComponent implements OnChanges {

  constructor(private model: TaxonRepository) { }

  selectedTaxon: Taxon = null;
  //TODO rather have filter as input property
  @Input()
  selectedTaxonId: number;

  sortListBy = 'fullName';
  sortListOrder = 'ASC';
  taxaPerPage = 20;
  selectedPage = 1;

  @Output()
  selectedTaxonChanged: EventEmitter<Taxon> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {

    for (let property in changes) {
      if (property === 'selectedTaxonId') {
        console.log('Previous:', changes[property].previousValue);
        console.log('Current:', changes[property].currentValue);
        console.log('firstChange:', changes[property].firstChange);
      }
    }
  }


  onChange() {
    this.selectedTaxon = this.model.getTaxon(this.selectedTaxonId);
    this.selectedTaxonChanged.emit(this.selectedTaxon);
  }

  getSelectedTaxon(): Taxon {
    return this.selectedTaxon;
  }

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

  get pageCount(): number {
    return this.model.getPageCount();
  }

  getTaxaCount(): number {
    return this.model.getTaxaCount();
  }

  getSelected(taxon: Taxon): boolean {
    return taxon === this.selectedTaxon;
  }

  getID(index: number,taxon: Taxon) {
    return taxon.id;
  }

}
