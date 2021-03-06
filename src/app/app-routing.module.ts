import {RouterModule, Routes} from '@angular/router';
import {Input, NgModule} from '@angular/core';
import {MainViewComponent} from './views/main-view/main-view.component';
import {FloorZeroComponent} from './views/floor-zero/floor-zero.component';
import {FloorMinusOneComponent} from './views/floor-minus-one/floor-minus-one.component';
import {FloorOneComponent} from './views/floor-one/floor-one.component';
import {FloorTwoComponent} from './views/floor-two/floor-two.component';
import {DormitoryViewComponent} from './views/dormitory-view/dormitory-view.component';
import {WorkshopFloorZeroComponent} from './views/workshop-floor-zero/workshop-floor-zero.component';
import {WorkshopFloorOneComponent} from './views/workshop-floor-one/workshop-floor-one.component';

const routes: Routes = [
  {path: '', component: MainViewComponent},
  {path: 'floor/0', component: FloorMinusOneComponent},
  {path: 'floor/1', component: FloorZeroComponent},
  {path: 'floor/2', component: FloorOneComponent},
  {path: 'floor/3', component: FloorTwoComponent},
  {path: 'dormitory', component: DormitoryViewComponent},
  {path: 'workshop/1', component: WorkshopFloorZeroComponent},
  {path: 'workshop/2', component: WorkshopFloorOneComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  @Input() clickSwitch: boolean;
}
