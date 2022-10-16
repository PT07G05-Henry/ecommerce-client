# FrontEnd del Proyecto final para Henry (PT7-PF-Group5-Client)

## Pasos para instalar

Usar Create-React-App ahorra mucho tiempo pero tiene una contra y es que hay que reconstruir la carpeta node_modules que con solo un "npm i" no funciona. La manera mas fácil es la siguiente ( si arrancaste haciendo el git clone de este repo ya arrancaste mal, borra la carpeta del repositorio y vamos desde el principio, Guárdate este archivo o míralo desde GitHub para seguir las instrucciones.)

Supongamos que vas a trabajar dentro de una capeta PF ( porque también en un futuro queres tener dentro el repo del API pero en su propia carpeta ), los pasos son los siguientes:

1) Dentro de PF creas la carpeta "ecommerce-client"
2) Sin moverte de PF ejecutas el comando "npx create-react-app ecommerce-client --template redux" o si usas pnpm "pnpm create react-app ecommerce-client --template redux" (es importante que si usas npm o pnpm siempre uses ese de ahora en adelante)
3) Una vez haya terminado el proceso y te aparezca el típico mensaje "Happy Hacking" borra todo menos la carpeta "node_modules" de dentro de "ecommerce-client".
4) Volves a PF nuevamente y desde ahi ahora si hacer el clon con git ejecutando "git clone https://github.com/PT07G05-Henry/ecommerce-client.git".
5) Entras a "ecommerce-client" y ahora si haces un "npm i" o "pnpm i" para instalar las dependencias faltantes.
6) Crear archivo .env con las siguientes variables
```bash
REACT_APP_DOMAIN=DOMAIN #Dominio de Auth0
REACT_APP_CLIENT_ID=ClientId #ClientId de Auth0
REACT_APP_DEV_API=API_DIRECTION #lugar donde esta corriendo la API, posibles valores localhost, localhost:3000 (en caso de usar otro puerto), 192.168.88.5:3000, dominio.com:4000
```

__Aclaración:__ Esto es solamente para la 1ra clonación, una vez hecho podes moverte entre ramas que no deberías tener que volver a hacerlo.


## El template ya integra...

- index.html limpio con Normalize.css + unos tweaks para que no renieguen con CSS.
- Carpeta /src/store con la implementación hecha ya en el index.js, solo tienen que modificar el Slice hecho con Redux-Toolkit en el archivo api.js (ya con un ejemplo hecho) o si quieren hacer otro slice para otra funcionalidad agregarlo, crear otro archivo ahi e importarlo como a api.js dentro de store.js
- React-Router 6 instalado e implementado. Rutas en App.js
- Carpetas "components" y "containers" con ejemplos implementados y funcionando.
- React-Icons, Axios y demás dependencias. Pueden consultar el archivo "package.json" ante cualquier duda.

__Importante para Deploy y test usando el repo de API:__ No descomentar #/build del .gitignore . Si quieren probar el build desde la API recuerden hacer un "run build".

# Original Template Documentation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
