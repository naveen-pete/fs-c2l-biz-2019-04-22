import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './product-form/product-form.component';

import { LoggerService } from './services/logger.service';
import { ProductsService } from './services/products.service';
import { SearchPipe } from './search.pipe';
import { appReducers } from './store/app.reducers';
import { ProductsEffects } from './store/products.effects';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent,
    ProductDetailComponent,
    ProductFormComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ProductsEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [LoggerService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
