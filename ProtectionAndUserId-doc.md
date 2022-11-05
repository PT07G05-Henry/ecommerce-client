# Documentación del utilidades para el manejo del UI para distintos usuarios

### Ahora es mas fácil!

Literalmente donde me puse a estilar la dashboard me di cuenta que no solo se estaba volviendo a programar/repetir la protección de rutas con otra lógica sino que también en el medio integraban un reemplazo para React-Router! (WTF!? no hay que volver a inventar la rueda) y bajo el inconveniente que representaba la repetición del código, tanto de la protección, como de la lógica de ruteo según el usuario, como de mismo código dentro del archivo dashboard 😵‍💫, usaba menos tiempo para hacerlo nuevamente y de paso nacieron componentes que les van a ser útiles para seguir trabajando.

## Librería access.js (Ubicación /src/lib/access.js)

Literalmente la vi en varios archivos. Usen la regla DRY por favor (Don't Repeat Yourself), si saben que la van a usar en todos lados. Básicamente aisle la función y la conecte al store de thisUser para que funcionara sin problema. El funcionamiento sigue siendo idéntico, devuelve un string con el rol del usuario, solo la importan y ya funciona.

```javascript
import access from "./lib/access";

//código...

<Orders rol={access()} adminId={userId} />;

//Mas código...
```

## Obtener el ID de usuario

Ahora el store de thisUser tiene un selector que devuelve el ID del usuario logueado o -1 si es Guest, lo usan como cualquier otro selector.

```javascript
import { selectThisUserId } from "./store/thisUser";
import { useSelector } from "react-redux";
import access from "./lib/access";

//código...

const userId = useSelector(selectThisUserId);

//Mas código...

<Orders rol={access()} adminId={userId} />;

//Mas mas código...
```

### .

### .

### .

## ( 22 Lineas de código, el componente de protección final )

# Componente "ProtectedFrom"

Literalmente se notaba que hacia falta un componente que unifique la protección que hacia falta, tanto para las rutas como para mostrar distintos componentes según el tipo de usuario. Por eso cree un componente que de manera declarativa te ayuda a hacerlo. Les presento a ProtectedFrom (leerse "protegido de" que lo use x usuario)

```javascript
import ProtectedFrom from "./components/protectedFrom/ProtectedFrom";

<ProtectedFrom ElTipoDeUsuario>
  <ComponenteAProteger />
</ProtectedFrom>;
```

Esta basado en el uso de la función access ahora en access.js y tiene 2 propósitos

- Seguir protegiendo rutas, sin repetir condiciones basadas en access y poder implementar rutas protegidas en React-Router nuevas mas fácil. Sigue la lógica de las antiguas condiciones que las protegían, si pones un nombre de tipo de usuario es que queres evitarlo, pero ahora son props (y no hay que agregarles valor a las props). Los valores posibles para las props son los tipos de usuario "Guest", "User", "Admin" y "Superadmin". Se pueden y deben usar en combinación para hacer que el usuario del tipo definido no pueda ver el componente .

```javascript
import ProtectedFrom from "./components/protectedFrom/ProtectedFrom"

<Route path="dashBoard" element={ <ProtectedFrom Guest> <DashBoard /> </ProtectedFrom> }>
  //rutas...
  <Route path="users" element={<ProtectedFrom Guest User Admin> <Users /> <ProtectedFrom>} />
  //mas rutas...
</Route>
```

- Evitar que se renderice un componente para algún tipo de usuario: En el caso anterior si queres acceder al componente y ProtectedFrom tiene definido no mostrártelo, lo que va a hacer es devolverte el componente "Redirect" para que te avise de que la ruta no es correcta y te lleve a la home de nuevo, pero ¿si quiero usarlo para que proteger un componente y que no se muestre? Podes usar la prop "noRender" para utilizar a ProtectedFrom de manera que X componente o N componentes no se muestren a algún tipo de usuario y de esa manera tener una UI adaptada dinámicamente a cada tipo de usuario.

```javascript
import ProtectedFrom from "./components/protectedFrom/ProtectedFrom";

<button>Botón para todos 1</button>
<button>Botón para todos 2</button>
<button>Botón para todos 3</button>

<ProtectedFrom Guest User Admin noRender>
    <button>Botón solo para Superadmin 1</button>
    <button>Botón solo para Superadmin 2</button>
    <button>Botón solo para Superadmin 3</button>
</ProtectedFrom>

<button>Botón para todos 5</button>
<button>Botón para todos 6</button>
<button>Botón para todos 7</button>
```

Ojala les sirva, por aca es tarde, las 4:19am para ser exactos, pero esto es importante para seguir trabajando por lo que les armo un PR con lo hecho y mañana sigo estilando el componente dashboard y continuo con el resto.