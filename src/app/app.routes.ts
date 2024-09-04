import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'items', component: ItemListComponent},
    {path: 'item/:id', component: ItemDetailComponent},
    {path: 'categories', component: CategoryListComponent},
    {path: 'category/:id', component: CategoryDetailComponent},
    {path: 'users', component: UserListComponent},
    {path: 'user/:id', component: UserDetailComponent}
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