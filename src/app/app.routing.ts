import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { ProduceComponent }        from './app.produce';
import { SupplierComponent }        from './app.supplier';
import { ProduceSupplierComponent }        from './app.producesupplier';

const appRoutes: Routes = [
  { path: 'produce', component: ProduceComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'producesupplier', component: ProduceSupplierComponent },
  { path: '', redirectTo: '/produce', pathMatch: 'full' }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
