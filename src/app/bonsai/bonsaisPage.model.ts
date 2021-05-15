import {Bonsai} from './bonsai.model';

export class BonsaisPage {
  constructor(public bonsais: Bonsai[], public page: number, public totalPages: number, public totalBonsais: number) {}

}
