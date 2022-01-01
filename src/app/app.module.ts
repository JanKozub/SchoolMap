import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {MainViewComponent} from './views/main-view/main-view.component';
import {FloorZeroComponent} from './views/floor-zero/floor-zero.component';
import {DataService} from './data.service';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {DetailsFieldComponent} from './details-field/details-field.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {DetailsService} from './details.service';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    FloorZeroComponent,
    SearchBarComponent,
    DetailsFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [DataService, DetailsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
