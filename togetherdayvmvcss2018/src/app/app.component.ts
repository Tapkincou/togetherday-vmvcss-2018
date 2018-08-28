import { Component } from '@angular/core';
import { timer, Observable, BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  questions =
  [
    {texte: 'Vous êtes bloqué sur le projet, que faites-vous ?',
      reponses: [
        {id: 0, texte: 'Je cherche tout seul jusqu\'à ce que je trouve', correcte: false, icone: 'coffee'},
        {id: 1, texte: 'Je demande de l\'aide à mes co-équipiers puis j\'alerte si nécessaire', correcte: true, icone: 'umbrella'},
        {id: 2, texte: 'Je demande conseille au client', correcte: false, icone: 'wrench'},
      ]
    },
    {texte: 'Les spécifications sont incomplètes.. ou ambiguës',
      reponses: [
        {id: 3, texte: 'Vous demandez au Business Analyst', correcte: true},
        {id: 4, texte: 'Vous passez à une autre exigence mieux spécifiée pour ne pas être bloqué', correcte: false},
        {id: 5 , texte: 'Je demande conseille au client', correcte: false},
      ]
    },
    {texte: 'Votre code compile',
      reponses: [
        {id: 6, texte: 'Vous le mettez dans le Repository et faite un COMMIT des sources', correcte: false},
        {id: 7, texte: 'Je fais mes tests unitaires, puis je synchronise mon environnement,'
                        + 'avant de faire un COMMIT de mes sources', correcte: true},
        {id: 8, texte: 'Je passe au codage de l\'exigence suivante', correcte: false},
      ]
    },
    {texte: 'L\'intégration continue est plantée ! Que faire ?',
      reponses: [
        {texte: 'Consulter le rapport de bugs', correcte: true},
        {texte: 'Alerter le client', correcte: false},
        {texte: 'Chercher dans le code', correcte: false},
      ]
    },
    {texte: 'Qu\'est-ce qui nous permet de valider l\'architecture technique mise en place ?',
      reponses: [
        {texte: 'Elle correspond à la demande et au contexte client.', correcte: false},
        {texte: 'Elle est fonctionnelle et éprouvée via un POC (proof of concept).', correcte: true},
        {texte: 'Elle est écrite exhaustivement sur un document de spécifications techniques.', correcte: false},
      ]
    },
    {texte: 'Qu\'est-ce qui nous permet de valider l\'architecture technique mise en place ?',
      reponses: [
        {texte: 'Elle correspond à la demande et au contexte client.', correcte: false},
        {texte: 'Elle est fonctionnelle et éprouvée via un POC (proof of concept).', correcte: true},
        {texte: 'Elle est écrite exhaustivement sur un document de spécifications techniques.', correcte: false},
      ]
    },
    {texte: 'Le client vous appelle pour vous demander un petit changement qui n\'était pas prévu',
      reponses: [
        {texte: 'Pour conserver un bon contact avec le client, vous lui faite la modif.', correcte: false},
        {texte: 'Vous écoutez le client sans vous engager et vous demandez l\'avis du chef de projet.', correcte: true},
        {texte: 'Vous raccrochez directement.', correcte: false},
      ]
    },
    {texte: 'Qu\'est-ce qu\'une exigence ?',
      reponses: [
        {texte: 'La description du besoin du client .', correcte: true},
        {texte: 'Les règles d\'architecture de la solution informatique.', correcte: false},
        {texte: 'Le périmètre du projet.', correcte: false},
      ]
    }
  ];

  public currentIndex;
  public showQuestions = false;
  public title = 'app';
  public countDown;
  public countStartValue;
  public count;
  public count$;
  public showButton;
  public iconsList = ['coffee', 'wrench', 'umbrella',
                    'hand-spock', 'futbol', 'feather',
                    'fish', 'grin-tongue-wink', 'car-side',
                    'cut', 'code-branch', 'fire-extinguisher',
                    'key', 'heart', 'fire', 'paw',
                    'spoon', 'shower', 'rebel',
                    'bicycle', 'bluetooth-b', 'bomb',
                    'bug'];


  constructor() {
    this.shuffleQuestionsReponses();
    this.currentIndex = 0;
    this.showButton = true;
    this.countStartValue = 1 * 10;
    this.count = new BehaviorSubject<number>(this.countStartValue);
    this.count$ = this.count.asObservable();
    const subscription = this.count$.subscribe(c => {
      if (c === 0) { this.end(); }
    });

 }

 begin() {
  this.showButton = false;
  this.showQuestions = true;
  // this.goTimer();

 }

 end() {
    console.log('end');
    this.showQuestions = false;
 }

 openBox() {
  console.log('openBox');
  this.showQuestions = false;
}

 increaseIndex() {
  console.log( this.currentIndex + '/' + String(this.questions.length - 1));
  this.currentIndex < this.questions.length - 1 ? this.currentIndex++ : this.openBox();


}

counterNextValue() {
  this.count.next(this.count.getValue() - 1);
  return this.count.getValue();
}

  goTimer() {
    console.log('goTimer');
    this.countDown =
      timer(0, 1000)
        .pipe(
        take(this.count.getValue()),
        map(() => Math.floor(this.counterNextValue() / 60) + ':' + (this.count.getValue() % 60)
        ));
  }

  shuffleQuestionsReponses() {
    this.questions = this.shuffle(this.questions);
    this.questions.forEach(question => {
      question.reponses = this.shuffle(question.reponses);
    });

    this.shuffle(this.iconsList);
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

}
