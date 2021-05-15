import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Taxon } from './taxon/taxon.model';
import { Bonsai } from './bonsai/bonsai.model';
import { TaxaPage } from './taxon/taxaPage.model';
import { BonsaisPage } from './bonsai/bonsaisPage.model';

const PROTOCOL = 'http';
const PORT = 8081;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getTaxaPage(filter?: string, sort?: string, dir?: string, page?: number, pageSize?: number): Observable<TaxaPage> {
    const params = new HttpParams()
      .set('filter', filter? filter : '')
      .set('sort', sort? sort : '')
      .set('dir', dir? dir : 'ASC')
      .set('page', page? page.toString() : '0')
      .set('size', pageSize? pageSize.toString() : '20');
    return this.http.get<any>(this.baseUrl + 'taxon/taxa_page',{params});
  }

  saveTaxon(taxon: Taxon): Observable<Taxon> {
    return this.http.put<Taxon>(this.baseUrl + 'taxon/taxon', taxon);
  }
  updateTaxon(taxon: Taxon): Observable<Taxon> {
    return this.http.put<Taxon>(this.baseUrl + 'taxon/taxon', taxon);
  }

  deleteTaxon(taxon: Taxon): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'taxon/taxon/del/' + taxon.id);
  }

  getBonsaisPage(filter?: string, sort?: string, dir?: string, page?: number, pageSize?: number): Observable<BonsaisPage> {
      const params = new HttpParams()
        .set('filter', filter? filter : '')
        .set('sort', sort? sort : '')
        .set('dir', dir? dir : 'ASC')
        .set('page', page? page.toString() : '0')
        .set('size', pageSize? pageSize.toString() : '20');
      return this.http.get<any>(this.baseUrl + 'bonsai/bonsais_page',{params});
    }

    saveBonsai(bonsai: Bonsai): Observable<Bonsai> {
      return this.http.put<Bonsai>(this.baseUrl + 'bonsai/bonsai', bonsai);
    }
    updateBonsai(bonsai: Bonsai): Observable<Bonsai> {
      return this.http.put<Bonsai>(this.baseUrl + 'bonsai/bonsai', bonsai);
    }

    deleteBonsai(bonsai: Bonsai): Observable<void> {
      return this.http.delete<void>(this.baseUrl + 'bonsai/bonsai/del/' + bonsai.id);
    }
}
