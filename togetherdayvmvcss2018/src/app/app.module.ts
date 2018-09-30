import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as icons from '@fortawesome/free-solid-svg-icons';
/* public iconsList = ['coffee', 'wrench', 'umbrella',
                    'hand-spock', 'futbol', 'feather',
                    'fish', 'grin-tongue-wink', 'car-side',
                    'cut', 'code-branch', 'fire-extinguisher',
                    'key', 'heart', 'fire', 'paw',
                    'spoon', 'shower', 'rebel',
                    'bicycle', 'bluetooth-b', 'bomb',
                    'bug']*/
// Add an icon to the library for convenient access in other components
library.add(icons.faCoffee);
library.add(icons.faUmbrella);
library.add(icons.faWrench);
library.add(icons.faHandSpock);
library.add(icons.faFutbol);
library.add(icons.faFeather);
library.add(icons.faFish);
library.add(icons.faGrinTongueWink);
library.add(icons.faCut);
library.add(icons.faCodeBranch);
library.add(icons.faFireExtinguisher);
library.add(icons.faKey);
library.add(icons.faHeart);
library.add(icons.faFire);
library.add(icons.faPaw);
library.add(icons.faThermometer);
library.add(icons.faShower);
library.add(icons.faUtensilSpoon);
library.add(icons.faCamera);
library.add(icons.faMusic);
library.add(icons.faRocket);
library.add(icons.faTrophy);
library.add(icons.faTruck);
library.add(icons.faConciergeBell);
library.add(icons.faCloud);

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
