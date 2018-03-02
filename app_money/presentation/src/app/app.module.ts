import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CounterComponent } from './ui/counter/counter.component';
import { CounterWithServiceComponent } from './ui/counter-with-service/counter-with-service.component';
import {CounterService} from './services/counter/counter.service';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterWithServiceComponent,

    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [CounterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
