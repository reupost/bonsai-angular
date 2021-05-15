import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterDirective } from './counter.directive';
import { HomeComponent } from './home';
import { TaxonListComponent } from './taxon';
import { TaxonSelectComponent } from './taxon';
import { BonsaiListComponent } from './bonsai';
import { ModelModule } from './model.module';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, TaxonListComponent, TaxonSelectComponent, BonsaiListComponent, CounterDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModelModule
  ],
  providers: [
              { provide: LOCALE_ID, useValue: "en-GB" }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
