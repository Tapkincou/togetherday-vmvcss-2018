import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import  *  as icons from '@fortawesome/free-solid-svg-icons';
/*["coffee","wrench","umbrella",
                    "spock", "futbol", "feather",
                    "fish", "grin-tongue-wink", "car-side"
                  ,"cut","code-branch", "fire-extinguisher"];*/
// Add an icon to the library for convenient access in other components
library.add(icons.faCoffee);
library.add(icons.faUmbrella);
library.add(icons.faWrench);
library.add(icons.faHandSpock);
library.add(icons.faFutbol);
library.add(icons.faFeather);
library.add(icons.faFish);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatButtonModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
