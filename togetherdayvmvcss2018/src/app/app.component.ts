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
      texte: 'Vous êtes bloqué sur les développements de l\'Armure d\'Iron Man, que faites-vous ?',
      reponses: [
        {id: 0 , texte: 'Je cherche tout seul jusqu\'à ce que je trouve', correcte: false, icone: 'coffee'},
        {id: 1 , texte: 'Je demande de l\'aide aux collab\' du projet puis j\'alerte le Chef de projet si nécessaire', correcte: true, icone: 'umbrella'},
        {id: 2 , texte: 'Je demande conseil aux Avengers qui sont nos clients', correcte: false, icone: 'wrench'},
      ]
    },
    {
      id: 1,
      texte: 'Les spécifications de l\'armure sont incomplètes ou ambiguës, que faites-vous ?',
      reponses: [
        {id: 3, texte: 'Je demande au Business Analyst du projet (le BA est le responsable des spécifications fonctionnelles)', correcte: true},
        {id: 4, texte: 'Je passe à une autre exigence mieux spécifiée pour ne pas être bloqué', correcte: false},
        {id: 5, texte: 'Je demande conseil aux Avengers qui sont nos clients', correcte: false},
      ]
    },
    {
      id: 2,
      texte: 'Le développement du bras de l\'armure compile, que faites-vous ?',
      reponses: [
        {id: 6, texte: 'Je le mets dans le Repository et fais un commit des sources', correcte: false},
        {id: 7,
          texte: 'Je fais mes tests unitaires puis je mets mes sources dans le Repository',
          correcte: true},
        {id: 8, texte: 'Je passe au développement de l\'exigence suivante', correcte: false},
      ]
    },
    {
      id: 3,
      texte: 'Le Build de l\'intégration continue a planté ! Que faire en premier ? (l\'intégration continue consiste à recompiler les sources sur la plateforme d\'intégration et d\'exécuter les tests unitaires automatisés)',
      reponses: [
        {id: 9, texte: 'Consulter le rapport de bugs', correcte: true},
        {id: 10, texte: 'Alerter le client Avengers', correcte: false},
        {id: 11, texte: 'Chercher dans le code', correcte: false},
      ]
    },
    {
      id: 4,
      texte: 'Qu\'est-ce qui nous permet de valider que l\'architecture technique de l\'armure fonctionne et qu\'elle est viable ?',
      reponses: [
        {id: 12, texte: 'Elle correspond à la demande et au contexte client Avengers', correcte: false},
        {id: 13, texte: 'Elle est exécutable et éprouvée via des POC (proof of concept)', correcte: true},
        {id: 14, texte: 'Elle est écrite exhaustivement sur un document de spécifications techniques', correcte: false},
      ]
    },
    {
      id: 5,
      texte: 'Les Avengers vous appellent pour vous demander un petit changement qui n\'était pas prévu dans l\'armure',
      reponses: [
        {id: 15, texte: 'Pour conserver un bon contact avec le client, je lui fais la modification', correcte: false},
        {id: 16, texte: 'J\'écoute les Avengers sans m\'engager et je demande l\'avis de mon Chef de projet', correcte: true},
        {id: 17, texte: 'Je raccroche immédiatement', correcte: false},

      ]
    },
    {
      id: 6,
      texte: 'Qu\'est-ce qu\'une exigence ?',
      reponses: [
        {id: 18, texte: 'La description d\'un besoin du client Avengers', correcte: true},
        {id: 19, texte: 'Les règles d\'architecture de la solution informatique', correcte: false},
        {id: 20, texte: 'Le périmètre du projet Mission Avengers', correcte: false},
      ]
    },
    {
      id: 7,
      texte: 'Avant de commencer le codage, est-ce que je consulte les standards de développement du projet ?',
      reponses: [
        {id: 21, texte: 'Oui, je les consulte', correcte: true},
        {id: 22, texte: 'Non, ce document ne sert à rien', correcte: false},
        {id: 23, texte: 'Chacun développe à sa façon', correcte: false},
      ]
    },
/*    {
      id: 8,
      texte: 'L\'outil de développement de l\'équipe a été choisi, mais vous en utilisez un autre, car vous le trouvez plus simple. Continuez-vous avec votre outil ?',
      reponses: [
        {id: 24, texte: 'Oui, je continue à utiliser Notepad++ que je connais bien', correcte: false},
        {id: 25, texte: 'Non, j\'utilise les outils du projet', correcte: true},
        {id: 26, texte: 'Chacun fait comme il veut', correcte: false},
      ]
    }*/
  ];

  public isVictoire = false;
  public selectedIcons;
  public combinaison;
  public reponsesPropose = [];
  public bonnesReponses = [];
  public bonnesReponsesOrdreInitial = [1, 3, 7, 9, 13, 16, 18, 21];
  public iconeSelected = false;
  public currentIndex;
  public showTimer = false;
  public showQuestions = false;
  public showFailMessage  = false;
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
                      'trophy', 'wrench', 'cloud', 'heart', 'rocket',
                      'hand-spock', 'futbol', 'feather',
                      'fish', 'grin-tongue-wink', 'shower',
                      'cut', 'code-branch', 'fire-extinguisher', 'concierge-bell'];


  constructor() {
    this.shuffleQuestionsReponses();
    this.showButton = true;
    this.countStartValue = 7 * 60;
    this.count = new BehaviorSubject<number>(this.countStartValue);
    this.count$ = this.count.asObservable();
    let subscription = this.count$.subscribe(c => {
      if ( c === 0) { this.end() };
  });

 }

 begin(withTimer = false) {
  this.combinaison = 0;
  this.reponsesPropose = new Array();
  this.selectedIcons = new Array(7);
  this.currentIndex = 0;
  this.showButton = false;
  this.showQuestions = true;
  this.showReponses = false;
  this.showTimer = true;
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
        this.showFailMessage = true;
        this.shuffleQuestionsReponses();
        this.begin();
      }

    }

    // console.log(this.combinaison);
  }

}
