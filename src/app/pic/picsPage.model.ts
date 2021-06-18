import {Pic} from './pic.model';

export class PicsPage {
  constructor(public pics: Pic[], public page: number, public totalPages: number, public totalPics: number) {}

}
