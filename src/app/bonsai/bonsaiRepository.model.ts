import { Injectable } from '@angular/core';
import { Bonsai } from './bonsai.model';
import { RestDataSource } from '../rest.datasource';

@Injectable()
export class BonsaiRepository {
  private bonsaiPage: Bonsai[];
  private bonsaisCount = 0;
  private bonsaisPerPage = 20;
  private sortBy = '';
  private sortDir = '';
  private filterBy = '';
  private pageNo = 0;
  private pageCount = 0;
  private locator = (s: Bonsai, id: number) => s.id === id;


  constructor(private dataSource: RestDataSource) {
    this.dataSource.getBonsaisPage(this.filterBy, this.sortBy, this.sortDir, this.pageNo, this.bonsaisPerPage).subscribe(data => {
      // console.log(data);
      this.bonsaiPage = data['content'];
      this.bonsaisCount = data['totalElements'];
      this.pageCount = Math.ceil( this.bonsaisCount / this.bonsaisPerPage);
      console.log(this.bonsaiPage);

    });
  }

  getBonsaiPage(): Bonsai[] {
    return this.bonsaiPage;
  }

  getBonsai(id: number): Bonsai {
    // might need to call repository
    return this.bonsaiPage.find(s => this.locator(s, id));
  }

  getBonsaisCount(): number {
    return this.bonsaisCount;
  }


  getPageCount(): number {
    return this.pageCount;
  }

  setPageNo(page: number) {
    if (page > 0 && page <= this.pageCount) {
      this.pageNo = page -1; //TODO: this is clumsy
      this.setBonsaiPage();
    }
  }

  setSort(sortBy: string, sortDir: string) {
    this.sortBy = sortBy;
    this.sortDir = (sortDir.toLowerCase() == 'desc'? 'DESC' : 'ASC');
    this.setBonsaiPage();
  }

  setFilter(filter: string) {
    this.filterBy = filter;
    this.pageNo = 0;
    this.setBonsaiPage();
  }

  private setBonsaiPage() {
    this.dataSource.getBonsaisPage(this.filterBy, this.sortBy, this.sortDir, this.pageNo, this.bonsaisPerPage).subscribe(data => {
      this.bonsaiPage = data['content'];
      this.bonsaisCount = data['totalElements'];
      this.pageCount = Math.ceil( this.bonsaisCount / this.bonsaisPerPage);
    });
  }

  saveBonsai(bonsai: Bonsai) {
    if (bonsai.id == 0 || bonsai.id == null) {
      this.dataSource.saveBonsai(bonsai)
        .subscribe(s => {
            // this.speciesAll.push(s);
          this.setBonsaiPage();
          }
        );
    } else {
      this.dataSource.updateBonsai(bonsai).subscribe(s => {
        this.setBonsaiPage();
      });
    }
  }

  deleteBonsai(bonsai: Bonsai) {
    const index = this.bonsaiPage.findIndex(s => this.locator(s, bonsai.id));
    if (bonsai != null && index >= 0) {
      this.dataSource.deleteBonsai(bonsai)
        .subscribe(s => {
          this.setBonsaiPage();
          }
        );
    }
  }

}
