import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { TaxonRepository } from './taxonRepository.model';
import { Taxon } from './taxon.model';

@Component({
  selector: 'app-taxon-select',
  templateUrl: 'taxonSelect.html',
  styleUrls: ['./taxon.component.css']
})
export class TaxonSelectComponent {

  constructor(private model: TaxonRepository) { }

  selectedTaxon: Taxon = null;
  selectedTaxonId: number = null;

  sortListBy = 'fullName';
  sortListOrder = 'ASC';
  taxaPerPage = 20;
  selectedPage = 1;

  onChange() {
    this.selectedTaxon = this.model.getTaxon(this.selectedTaxonId);
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
