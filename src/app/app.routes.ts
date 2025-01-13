import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductComponent } from './product/product.component';
import { SalesComponent } from './sales/sales.component';
import { SupplierComponent } from './supplier/supplier.component';
import { AuthenticationComponent } from './authentication/authentication.component';

export const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  // {path: 'home', component:AppComponent},
  {path: 'customer', component:CustomerComponent},
  {path: 'inventory', component:InventoryComponent},
  {path: 'product', component:ProductComponent},
  {path: 'sales', component:SalesComponent},
  {path: 'supplier', component:SupplierComponent},
  {path: 'auth', component:AuthenticationComponent},

];
