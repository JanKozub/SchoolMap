import {RouterModule, Routes} from '@angular/router';
import {Input, NgModule} from '@angular/core';
import {MainViewComponent} from './views/main-view/main-view.component';
import {FloorZeroComponent} from './views/floor-zero/floor-zero.component';
import {FloorMinusOneComponent} from './views/floor-minus-one/floor-minus-one.component';
import {FloorOneComponent} from './views/floor-one/floor-one.component';
import {FloorTwoComponent} from './views/floor-two/floor-two.component';
import {DormitoryViewComponent} from './views/dormitory-view/dormitory-view.component';

const routes: Routes = [
  {path: '', component: MainViewComponent},
  {path: 'floor-minus-one', component: FloorMinusOneComponent},
  {path: 'floor-zero', component: FloorZeroComponent},
  {path: 'floor-one', component: FloorOneComponent},
  {path: 'floor-two', component: FloorTwoComponent},
  {path: 'dormitory', component: DormitoryViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  @Input() clickSwitch: boolean;
}
