import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegressionSimpleComponent } from './components/regression-simple/regression-simple.component';
import { RegressionMultipleComponent } from './components/regression-multiple/regression-multiple.component';

@NgModule({
  declarations: [
    AppComponent,
    RegressionSimpleComponent,
    RegressionMultipleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
