import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BurgerOrderOrderComponent} from "./features/burger-order/burger-order-order.component";

const routes: Routes = [
  { path: 'order', component: BurgerOrderOrderComponent },
  { path: '', redirectTo: '/order', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
