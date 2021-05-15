import {Taxon} from '../taxon/taxon.model';

export class Bonsai {

  constructor(public id?: number, public tag?: number, public numberOfPlants?: number,
              public name?: string, public source?: string, public stateWhenAcquired?: string,
              public dateAcquired?: string, public costAmount?: number, public yearStarted?: number,
              public isYearStartedGuess?: boolean, public yearDied?: number, public dateSold?: string,
              public soldForAmount?: number, public stage?: string, public style?: string, public isGrafted?: boolean,
              public isNoHoper?: boolean, public notes?: string, public taxon?: Taxon) {

  }

}
