import { NgModule } from '@angular/core';
import { TaxonRepository } from './taxon/taxonRepository.model';
import { BonsaiRepository } from './bonsai/bonsaiRepository.model';
// import { SimpleDataSource } from './datasource.model';
import { RestDataSource } from './rest.datasource';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  providers: [TaxonRepository, BonsaiRepository, RestDataSource ]
})
export class ModelModule { }
