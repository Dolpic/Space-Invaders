# Sysmic Invaders

## But
Le but est de créer un jeu à mettre sur notre site internet pour faire la comm, l'idée est de gérer des highscores
et de mettre en jeu de petits prix à gagner pour les meilleurs joueurs. Plus il y aura de gens à jouer plus on aura
fait de comm.

## Comment installer le jeu sur mon ordinateur ?
Ce jeu ne peux pas simplement se lancer en local pour des raisons de sécurité.\
Pour le lancer en local il faut installer un serveur web sur son ordinateur, le plus simple pour windows est d'utiliser USBWebServer (https://www.usbwebserver.net/webserver/) \
Il suffit d'extraire l'archive quelque part, de supprimer tout ce qui se trouve dans le dossier `root` et d'y cloner ce repo git.\
Ensuite il suffit de lancer `usbwebserver.exe` et de cliquer sur `localhost`. \
Le jeu devrait se lancer.

## Comment je peux contribuer ?
Il y a plein de trucs à faire, toutes les idées sont les bienvenues, plus il y a de trucs dans le jeu plus il sera cool !
On faut notamment :
 * Des gens pour faire la programmation
 * Faire du pixel art
 * Faire les musiques
 * Créer des niveaux
 * Paramétrer le jeu pour qu'il soit agréable à jouer (ni trop difficile ni trop facile)
 * Tester le jeu, trouver les bugs
 * Etc...
 
Je cherche vraiment plein d'idées! Faut vraiment pas hésiter à porposer des trucs, même si c'est juste 1 pixel art, ou 1 idée d'ennemi !
 
 ## Comment fonctionne le JavaScript et ce projet ?
 Ce jeu est programmé en javascript, le fichier principal est **index.html** qui est une page web qui charge tous les fichiers
 javascript (.js) et qui démarre le jeu depuis la classe principale qui se trouve dans **main.js**.\
 Ce projet utilise la librairie Phaser 3 (https://phaser.io/) qui est entièrement contenue dans le long fichier **phaser.js**,
 normalement pas besoin d'y toucher.\
 \
 Le fichier **loader.js** est celui qui charge toutes les images/animations depuis les fichiers qui se trouvent dans le dossier /ressources\
 Le fichier **various.js** contient toutes les fonctions utiles un peu partout dans le code et qui n'apartiennent pas un objet particulier\
 \
 Tous les autres fichiers contiennent des classes (objets) JavaScript
 
 ## Le JS en 2-2
 Les `;` en fin de ligne sont totalement facultatifs en javascript. \
 Les variables se déclarent avec le mot-clé `var`, par exemple : `var vie = 100`. \
 Par défaut, toute variable qui n'a pas été initialisée à autre chose vaut la valeur spéciale `undefined`. \
 Le javascript est à typage dynamique, cela veut dire qu'on indique pas le type des variables, il est automatiquement reconnu. \
 Le javascript fonctionne avec un ramasse-miette (garbage collector), cela signifie qu'on ne s'occupe pas du tout de la mémoire, le language désalloue automatiquement la mémoire de **tout ce qui n'est plus référencé**, c'est très pratique, mais il faut s'assurer que les objets dont on a plus besoin ne soit plus référencés du tout. \
 Le javascript est "orienté objet", on peut y créer des classes mais il n'y a aucune méthode d'encapsulation (pas de notion de "privée" ou "publique"). \
 Tout ce que contient un objet est toujours public. \
 \
 Une classe JS se déclare comme cela : `class Truc{}`¨ \
 On crée un objet avec le mot clé `new`, par exemple : `new monObjet(parametre1, parametre2)`
 Elle contient ses méthodes (fonctions) qui se déclarent avec simplement leur nom (pas de `function`) : 
 ```
 class Truc{ 
    maFonction(){ 
      ...
    } 
    monAutreFonction(){
      ...
    }
 }
 ```
 La méthode particulière `constructor` est le constructeur qui est automatiquement appelé lors de la création d'un objet. Ce sont les paramètres de `constructor` qu'il faut renseigner lors de la création d'un objet.\
 Les attributs d'un objet commencent tous par le mot clé `this` et **il faudra mettre ce mot clé chaque fois qu'on appelle l'attribut !** \
 Pour appeler une fonction interne à l'objet il faut aussi utiliser `this`. \
 
 ### Héritage
 On fait hériter une classe avec le mot clé `extends`, la classe enfant va posséder automatiquement toutes les méthodes et attributs de la
 classe parente. Si une méthode de la classe enfant porte le même nom qu'une méthode de la classe parente, la méthode de l'enfant va
 masquer celle du parent et c'est donc celle de l'enfant qui sera appelée.\
 \
 Depuis la classe enfant on peut appeler le constructeur du parent avec la "méthode" `super()`. \
 Depuis la classe enfant on peut appeler une méthode du parent en utilisant la syntaxe `super.methodeDeParent()`
 
 ### Exemple complet de classe 
 ```
 class Magicien extends Personnage{ 
    constructor(nom, vie, mana, baguetteMagique){
      // On appelle le constructeur de Personnage avec, par exemple, ces paramètres
      //   On suppose par exemple que ce constructeur crée this.nom et this.vie
      super(nom, vie)
      
      this.manaMax = mana
      this.mana    = mana
      this.baguetteMagique = baguetteMagique
    }
    
    sortSuperPuisse(cible){
      this.mana -= 10
      // Etc...
    }
    
    sortDeRechargeMana(){
      this.vie -= 10
      this.rechargeMana()
    }
    
    rechargeMana(){
      this.mana = this.manaMax
    }
    
    // Ici on peut supposer que Personnage possède une méthode degats, mais
    // on souhaite que notre magicien perde aussi du mana s'il est touché
    degats(){
      this.mana -= 5
      super.degats()
    }
    
 }
  ```
  Et on pourrait un Magicien avec par exemple : `var mage = new Magicien(nom, vie, mana, baguette)`

### Debugger son code
Infos pratiques :
 * Pour avoir la console javascript (là où sont affichées toutes les infos et les messages d'erreur) il suffit de faire clic droit sur la page web du jeu, puis de séléctionner `outil pour développeur` ou `inspecter` suivant le navigateur, puis d'aller dans l'onglet console.
 * Pour afficher quelque chose dans la console depuis le code, il faut utiliser la fonction `console.log(Truc)`, cette fonction peut tout afficher, aussi bien du texte que des objets entiers.
 
