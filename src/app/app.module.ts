import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {MainViewComponent} from './main-view/main-view.component';
import {FloorZeroComponent} from './floor-zero/floor-zero.component';
import {DataService} from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    FloorZeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
