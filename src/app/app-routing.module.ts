import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { BonsaiListComponent } from './bonsai';
import { TaxonListComponent } from './taxon';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'bonsai', component: BonsaiListComponent },
    { path: 'taxon', component: TaxonListComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
