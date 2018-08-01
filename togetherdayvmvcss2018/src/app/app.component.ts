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
    {texte: "Vous êtes bloqué sur le projet, que faites-vous ?",
      reponses: [
        {texte:"Je cherche tout seul jusqu'à ce que je trouve", correcte:false},
        {texte:"Je demande de l'aide à mes co-équipiers puis j'alerte si nécessaire", correcte:true},  
        {texte:"Je demande conseille au client", correcte:false},
      ]
    },
    {texte: "Les spécifications sont incomplètes.. ou ambiguës",
      reponses: [
        {texte:"Vous demandez au Business Analyst", correcte:true},
        {texte:"Vous passez à une autre exigence mieux spécifiée pour ne pas être bloqué", correcte:false},  
        {texte:"Je demande conseille au client", correcte:false},
      ]
    },
    {texte: "Votre code compile",
      reponses: [
        {texte:"Vous le mettez dans le Repository et faite un COMMIT des sources", correcte:false},
        {texte:"Je fais mes tests unitaires, puis je synchronise mon environnement, avant de faire un COMMIT de mes sources", correcte:true},  
        {texte:"Je passe au codage de l'exigence suivante", correcte:false},
      ]
    },
    {texte: "L'intégration continue est plantée ! Que faire ?",
      reponses: [
        {texte:"Consulter le rapport de bugs", correcte:true},
        {texte:"Alerter le client", correcte:false},  
        {texte:"Chercher dans le code", correcte:false},
      ]
    },
    {texte: "Qu'est-ce qui nous permet de valider l'architecture technique mise en place ?",
      reponses: [
        {texte:"Elle correspond à la demande et au contexte client.", correcte:false},
        {texte:"Elle est fonctionnelle et éprouvée via un POC (proof of concept).", correcte:true},  
        {texte:"Elle est écrite exhaustivement sur un document de spécifications techniques.", correcte:false},
      ]
    },
    {texte: "Qu'est-ce qui nous permet de valider l'architecture technique mise en place ?",
      reponses: [
        {texte:"Elle correspond à la demande et au contexte client.", correcte:false},
        {texte:"Elle est fonctionnelle et éprouvée via un POC (proof of concept).", correcte:true},  
        {texte:"Elle est écrite exhaustivement sur un document de spécifications techniques.", correcte:false},
      ]
    },
    {texte: "Le client vous appelle pour vous demander un petit changement qui n'était pas prévu",
      reponses: [
        {texte:"Pour conserver un bon contact avec le client, vous lui faite la modif.", correcte:false},
        {texte:"Vous écoutez le client sans vous engager et vous demandez l'avis du chef de projet.", correcte:true},  
        {texte:"Vous raccrochez directement.", correcte:false},
      ]
    },
    {texte: "Qu'est-ce qu'une exigence ?",
      reponses: [
        {texte:"La description du besoin du client .", correcte:true},
        {texte:"Les règles d'architecture de la solution informatique.", correcte:false},  
        {texte:"Le périmètre du projet.", correcte:false},
      ]
    }
  ];

  showQuestions = false;
  title = 'app';
  countDown;
  count;
  constructor(){
    this.shuffleQuestionsReponses();
    this.count = 10;

    //called first time before the ngOnInit()
 }

 begin(){

  this.showQuestions =true;
  this.goTimer();

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

  shuffleQuestionsReponses(){
    this.questions = this.shuffle(this.questions);
    this.questions.forEach(question => {
      question.reponses = this.shuffle(question.reponses);
    });
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }  


}
