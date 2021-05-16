import { Injectable } from '@angular/core';
import { Taxon } from './taxon.model';
import { RestDataSource } from '../rest.datasource';

@Injectable()
export class TaxonRepository {
  private taxonPage: Taxon[];
  private taxaCount = 0;
  private taxaPerPage = 20;
  private sortBy = '';
  private sortDir = '';
  private filterBy = '';
  private pageNo = 0;
  private pageCount = 0;
  private locator = (t: Taxon, id: number) => t.id == id;


  constructor(private dataSource: RestDataSource) {
    this.dataSource.getTaxaPage(this.filterBy, this.sortBy, this.sortDir, this.pageNo, this.taxaPerPage).subscribe(data => {
      // console.log(data);
      this.taxonPage = data['content'];
      this.taxaCount = data['totalElements'];
      this.pageCount = Math.ceil( this.taxaCount / this.taxaPerPage);
      console.log(this.taxonPage);

    });
  }

  getTaxonPage(): Taxon[] {
    return this.taxonPage;
  }

  getTaxon(id: number): Taxon {
    // might need to call repository
    return this.taxonPage.find(t => this.locator(t, id));
  }

  getTaxaCount(): number {
    return this.taxaCount;
  }


  getPageCount(): number {
    return this.pageCount;
  }

  setPageNo(page: number) {
    if (page > 0 && page <= this.pageCount) {
      this.pageNo = page -1; //TODO: this is clumsy
      this.setTaxonPage();
    }
  }

  setSort(sortBy: string, sortDir: string) {
    this.sortBy = sortBy;
    this.sortDir = (sortDir.toLowerCase() == 'desc'? 'DESC' : 'ASC');
    this.setTaxonPage();
  }

  setFilter(filter: string) {
    this.filterBy = filter;
    this.pageNo = 0;
    this.setTaxonPage();
  }

  private setTaxonPage() {
    this.dataSource.getTaxaPage(this.filterBy, this.sortBy, this.sortDir, this.pageNo, this.taxaPerPage).subscribe(data => {
      this.taxonPage = data['content'];
      this.taxaCount = data['totalElements'];
      this.pageCount = Math.ceil( this.taxaCount / this.taxaPerPage);
    });
  }

  saveTaxon(taxon: Taxon) {
    if (taxon.id == 0 || taxon.id == null) {
      this.dataSource.saveTaxon(taxon)
        .subscribe(s => {
            // this.speciesAll.push(s);
          this.setTaxonPage();
          }
        );
    } else {
      this.dataSource.updateTaxon(taxon).subscribe(s => {
        this.setTaxonPage();
      });
    }
  }

  deleteTaxon(taxon: Taxon) {
    const index = this.taxonPage.findIndex(s => this.locator(s, taxon.id));
    if (taxon != null && index >= 0) {
      this.dataSource.deleteTaxon(taxon)
        .subscribe(s => {
          this.setTaxonPage();
          }
        );
    }
  }

}
