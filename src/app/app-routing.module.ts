import {RouterModule, Routes} from '@angular/router';
import {Input, NgModule} from '@angular/core';
import {MainViewComponent} from './main-view/main-view.component';
import {FloorZeroComponent} from './floor-zero/floor-zero.component';

const routes: Routes = [
  {path: '', component: MainViewComponent},
  {path: 'floor-zero', component: FloorZeroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  @Input() clickSwitch: boolean;
}
