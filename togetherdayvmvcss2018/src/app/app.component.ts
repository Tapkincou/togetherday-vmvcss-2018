import { Component } from '@angular/core';
import { timer } from 'rxjs'; 
import { take, map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  questions = 
  [
    {texte: "question 1 ?",
      reponses: [
        {texte:"réponse A", correcte:false},
        {texte:"réponse B", correcte:true},  
        {texte:"réponse C", correcte:false},
      ]
    },
    {texte: "question 2 ?",
      reponses: [
        {texte:"réponse A", correcte:true},
        {texte:"réponse B", correcte:false},  
        {texte:"réponse C", correcte:false},
      ]
    }
  ];
  title = 'app';
  countDown;
  count;
  constructor(){
    this.count = 10;

    //called first time before the ngOnInit()
 }
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
