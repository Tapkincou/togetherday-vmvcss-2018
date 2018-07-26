import { Component } from '@angular/core';
import { timer } from 'rxjs'; 
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  countDown;
  count = 5*60;

  goTimer(){
    console.log('goTimer');
    this.countDown = 
      timer(0,1000)
        .pipe(
        take(this.count),
        map(()=> Math.floor(--this.count / 60) + ':' + (this.count % 60))
        );
  }

}
