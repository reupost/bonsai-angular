import {Taxon} from './taxon.model';

export class TaxaPage {
  constructor(public taxa: Taxon[], public page: number, public totalPages: number, public totalTaxa: number) {}

}
