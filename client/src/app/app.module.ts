import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CalculatorComponent } from './calculator/calculator.component';
import { HistoryComponent } from './history/history.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} }; //For Developemnt
const config: SocketIoConfig = { url: window.location.origin, options: {} }; //For Production
// const config: SocketIoConfig = { url: "https://tranquil-island-79700.herokuapp.com", options: {} }; //For Production

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
