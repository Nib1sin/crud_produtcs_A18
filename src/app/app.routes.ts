import { Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

export const routes: Routes = [

    { path: '', component: ListProductsComponent },
    { path: 'add', component: AddEditProductComponent},
    { path: 'edit/:id', component: AddEditProductComponent },

    //el wildcard del ** sirve para redireccionar si el path indicado no existe. Se debe dejar como ultima prop
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
