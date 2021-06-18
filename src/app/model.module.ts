import { NgModule } from '@angular/core';
import { TaxonRepository } from './taxon/taxonRepository.model';
import { BonsaiRepository } from './bonsai/bonsaiRepository.model';
import { PicRepository } from './pic/picRepository.model';
// import { SimpleDataSource } from './datasource.model';
import { RestDataSource } from './rest.datasource';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  providers: [TaxonRepository, BonsaiRepository, PicRepository, RestDataSource ]
})
export class ModelModule { }
