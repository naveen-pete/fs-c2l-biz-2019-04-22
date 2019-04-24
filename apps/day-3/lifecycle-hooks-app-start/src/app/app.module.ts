import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServerFormComponent } from './server-form/server-form.component';
import { ServerDetailComponent } from './server-detail/server-detail.component';

@NgModule({
  declarations: [AppComponent, ServerFormComponent, ServerDetailComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
