import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupplierComponent } from './app.supplier';
import { ProduceComponent } from './app.produce';
import { ProduceSupplierComponent } from './app.producesupplier';
import { routing }        from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent, SupplierComponent, ProduceComponent, ProduceSupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, routing, FormsModule, HttpClientModule

  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
