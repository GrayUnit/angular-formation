# CrmBetclic

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Instruction pour le SSR :

# Pour installer angular universal :

`ng add @nguniversal/express-engine`


Deux commandes principales ont été ajoutées via la schematics (voir package.json).

Pour lancer l'application en mode SSR : 

`npm run dev:ssr` (compilera le projet dans dist/votre_projet/browser)
`npm run serve:ssr` (servira les fichiers contenu dans dist/votre_projet/browser)
