import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { ReportListComponent } from './reports/report-list/report-list.component';
import { SettingListComponent } from './settings/setting-list/setting-list.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    {path: 'items', component: ItemListComponent, canActivate: [authGuard]},
    {path: 'item/:id', component: ItemDetailComponent, canActivate: [authGuard]},
    {path: 'categories', component: CategoryListComponent, canActivate: [authGuard]},
    {path: 'category/:id', component: CategoryDetailComponent, canActivate: [authGuard]},
    {path: 'users', component: UserListComponent, /* anActivate: [authGuard] */},
    {path: 'user/:id', component: UserDetailComponent, canActivate: [authGuard]},
    {path: 'orders', component: OrderListComponent, canActivate: [authGuard]},
    {path: 'order/:id', component: OrderDetailComponent, canActivate: [authGuard]},
    {path: 'reports', component: ReportListComponent, canActivate: [authGuard]},
    {path: 'settings', component: SettingListComponent, canActivate: [authGuard]},
    {path: 'logout', component: LogoutComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
})

export class AppRoutingModule { }