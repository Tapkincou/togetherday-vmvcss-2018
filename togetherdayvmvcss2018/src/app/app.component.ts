import { Component, ElementRef } from '@angular/core';
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
    {
      id: 0,
      texte: 'Vous êtes bloqué sur le projet, que faites-vous ?',
      reponses: [
        {id: 0 , texte: 'Je cherche tout seul \'à ce que je trouve', correcte: false, icone: 'coffee'},
        {id: 1 , texte: 'Je demande de l\'aide à mes co-équipiers puis j\'alerte si nécessaire', correcte: true, icone: 'umbrella'},
        {id: 2 , texte: 'Je demande conseille au client', correcte: false, icone: 'wrench'},
      ]
    },
    {
      id: 1,
      texte: 'Les spécifications sont incomplètes.. ou ambiguës',
      reponses: [
        {id: 3, texte: 'Vous demandez au Business Analyst', correcte: true},
        {id: 4, texte: 'Vous passez à une autre exigence mieux spécifiée pour ne pas être bloqué', correcte: false},
        {id: 5, texte: 'Je demande conseille au client', correcte: false},
      ]
    },
    {
      id: 2,
      texte: 'Votre code compile',
      reponses: [
        {id: 6, texte: 'Vous le mettez dans le Repository et faite un COMMIT des sources', correcte: false},
        {id: 7,
          texte: 'Je fais mes tests unitaires, puis je synchronise mon environnement, avant de faire un COMMIT de mes sources',
          correcte: true},
        {id: 8, texte: 'Je passe au codage de l\'exigence suivante', correcte: false},
      ]
    },
    {
      id: 3,
      texte: 'L\'intégration continue est plantée ! Que faire ?',
      reponses: [
        {id: 9, texte: 'Consulter le rapport de bugs', correcte: true},
        {id: 10, texte: 'Alerter le client', correcte: false},
        {id: 11, texte: 'Chercher dans le code', correcte: false},
      ]
    },
    {
      id: 4,
      texte: 'Qu\'est-ce qui nous permet de valider l\'architecture technique mise en place ?',
      reponses: [
        {id: 12, texte: 'Elle correspond à la demande et au contexte client.', correcte: false},
        {id: 13, texte: 'Elle est fonctionnelle et éprouvée via un POC (proof of concept).', correcte: true},
        {id: 14, texte: 'Elle est écrite exhaustivement sur un document de spécifications techniques.', correcte: false},
      ]
    },
    {
      id: 5,
      texte: 'Qu\'est-ce qui nous permet de valider l\'architecture technique mise en place ?',
      reponses: [
        {id: 15, texte: 'Elle correspond à la demande et au contexte client.', correcte: false},
        {id: 16, texte: 'Elle est fonctionnelle et éprouvée via un POC (proof of concept).', correcte: true},
        {id: 17, texte: 'Elle est écrite exhaustivement sur un document de spécifications techniques.', correcte: false},
      ]
    },
    {
      id: 6,
      texte: 'Le client vous appelle pour vous demander un petit changement qui n\'était pas prévu',
      reponses: [
        {id: 18, texte: 'Pour conserver un bon contact avec le client, vous lui faite la modif.', correcte: false},
        {id: 19, texte: 'Vous écoutez le client sans vous engager et vous demandez l\'avis du chef de projet.', correcte: true},
        {id: 20, texte: 'Vous raccrochez directement.', correcte: false},
      ]
    },
    {
      id: 7,
      texte: 'Qu\'est-ce qu\'une exigence ?',
      reponses: [
        {id: 21, texte: 'La description du besoin du client .', correcte: true},
        {id: 22, texte: 'Les règles d\'architecture de la solution informatique.', correcte: false},
        {id: 23, texte: 'Le périmètre du projet.', correcte: false},
      ]
    }
  ];

  public isVictoire = false;
  public selectedIcons;
  public combinaison;
  public reponsesPropose = [];
  public bonnesReponses = [];
  public bonnesReponsesOrdreInitial = [1, 2, 7, 9, 13, 16, 19, 21];
  public iconeSelected = false;
  public currentIndex;
  public showQuestions = false;
  public showReponses = false;
  public title = 'app';
  public countDown;
  public countStartValue;
  public count;
  public count$;
  public showButton;
  public iconsList = ['coffee', 'music', 'fire',
                      'key', 'camera', 'truck',
                      'thermometer', 'utensil-spoon', 'umbrella',
                      'trophy', 'wrench', 'hand-spock', 'heart', 'rocket',
                      'hand-spock', 'futbol', 'feather',
                      'fish', 'grin-tongue-wink', 'shower',
                      'cut', 'code-branch', 'fire-extinguisher', 'concierge-bell'];


  constructor() {
    this.shuffleQuestionsReponses();
    this.showButton = true;
    this.countStartValue = 1 * 20;
    this.count = new BehaviorSubject<number>(this.countStartValue);
    this.count$ = this.count.asObservable();
    let subscription = this.count$.subscribe(c => {
      if ( c === 0) { this.end() };
  });

 }

 begin(withTimer = false) {
  this.combinaison = 0;
  this.selectedIcons = new Array(7);
  this.currentIndex = 0;
  this.showButton = false;
  this.showQuestions = true;
  this.showReponses = false;
  if ( withTimer === true) {
    this.goTimer();
  }

 }

 end() {
    console.log('end');
    this.showQuestions = false;
    this.showReponses = false;
 }

 openBox() {
  console.log('openBox');
  this.showQuestions = false;
  this.showReponses = true;
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
    this.bonnesReponses = [];
    this.questions = this.shuffle(this.questions);
    this.questions.forEach(question => {
      question.reponses = this.shuffle(question.reponses);
      this.bonnesReponses.push(this.bonnesReponsesOrdreInitial[question.id]);
    });
    this.shuffle(this.iconsList);
    console.log(this.bonnesReponses);

  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  unlock(icone, id) {
    console.log(icone);
    this.iconeSelected = true;


    this.selectedIcons[this.combinaison] = icone;
    this.reponsesPropose.push(id);
    if (this.combinaison < 7) {
      this.combinaison ++;

    } else {
      // icon dans le resultat entree puis comparer avec la reponse
      console.log(this.reponsesPropose + ' ' + this.bonnesReponses);
      if (this.reponsesPropose.toString() === this.bonnesReponses.toString()) {
        console.log('gagne');
        this.isVictoire = true;

      } else {
        console.log('perdu');
        this.shuffleQuestionsReponses();
        this.begin();
      }

    }

    console.log(this.combinaison);
  }

}
