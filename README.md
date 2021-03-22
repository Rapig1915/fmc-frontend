# FixMyCar - Web application
Front-end web application for FixMyCar.

## Technology / Frameworks
- Typescript / React / Redux / Sass
- ESLint / Stylelint / Prettier
- Ant Design
- Jest / React Testing Library

## Installation
The project is built on `Node v14.16.0`, and we use `yarn` to manage dependencies.<br/>
Execute `yarn install` to install packages.

## Run development server
Execute `yarn start` to run development server.

## Build the app for production
Execute `yarn build` to build the app for production.

## Run tests
Execute `yarn test` to run tests.

## Code Style
- We use ESLint for typescript files(*.ts, *.tsx).<br/>
  Execute `yarn lint:ts` to check typescript.
- We use Stylelint for stylesheet files(*.css, *.scss).<br/>
  Execute `yarn lint:style` to check stylesheets.
- We use Prettier to automatically update typescripts and stylesheets.
  Execute `yarn lint:prettier` to lint typescripts and stylesheets.
- Execute `yarn lint` to execute above 3 steps altogether.

## GitHub Hooks
- The project automatically checks & updates styles of typescripts and stylesheets per each `git commit`.
- The project automatically executes `yarn audit` for front-end security before the `git push`.
