import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { BonsaiListComponent } from './bonsai';
import { TaxonListComponent } from './taxon';
import { TaxonSelectComponent } from './taxon';
import { PicListComponent } from './pic';
import { PicSelectComponent } from './pic';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'bonsai', component: BonsaiListComponent },
    { path: 'taxon', component: TaxonListComponent },
    { path: 'taxon/select', component: TaxonSelectComponent },
    { path: 'pic', component: PicListComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
