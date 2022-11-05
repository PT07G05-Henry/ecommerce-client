# Documentación de uso para api.js

## Ubicación: /src/lib/api.js

#

## ¿Por qué?

La idea es evitar los posibles errores a la hora de usar los endpoints del API-Rest que se está implementando por lo que se deja en un solo lugar el como se comporta y como se lo llama para no estar chequeando si se escribió mal o se olvido de algo.

## ¿Qué soluciona de por sí?

- Usa la url que se haya declarado en REACT_APP_DEV_API dentro del .env
- Si estás logueado (como está conectado al store de Redux que contiene la info del usuario logueado) agrega la query "sid" a todo mensaje http que se envié
- Es un lugar para dejar las direcciones, query y posibles valores ya predefinidos para evitar errores de manera organizada así evitar errores y en el futuro si cambia algo no tenerlo hardcodeado en muchos archivos a la vez, solo cambiarlo de un solo lugar común.

## ¿Cómo lo uso?

Por defecto importando el archivo les devuelve una instancia de un objeto "api" con los métodos "get", "delete", "post", "put" y "patch" ya implementados.

Los métodos reciben por argumentos los mismos datos en el orden (endPoint< obligatorio > , {data:{ ...body... }, params: {query1:valor,query2:valor} }< objeto opcional > ) donde:

- "endPoint" es un string que hace referencia a la parte posterior que direcciona a una ruta en la URL ejemplo: si el endpoint al que le quieren pegar es https://server.net/users/auth0 endPoint debe contener "users/auth0" ya que api conoce https://server.net/ y va a concatenar endPoint al final para completar la URL
- Como segundo parámetro recibe un objeto que puede contener las propiedades "data" y "params" pudiendo existir una sin la otra dentro del objeto.
  - "data" de estar definida solo acepta un objeto que va a ser el representante de lo que se envía por body del mensaje http.
  - "params" debe ser un objeto donde la key de cada propiedad va a ser el identificador de la query que se va a agregar al final de la URL automáticamente y su valor el valor de la misma. Existe la posibilidad de dejar propiedades con valor "undefined", en ese caso no van a ser agregadas a la URL aunque este la Key.

## ¿Qué devuelve?

La misma promise que Axios ( porque api encapsula el uso de Axios ) y deben manejarla de la misma manera.

### Ejemplo de uso

```javascript
//un simple get...
import api from "../lib/api";

let response = await api.get("products"); //equivalente a axios.get("https://server.net/products")
let products = response.data;
```

```javascript
//un get con querys...
import api from "../lib/api";

let response = await api.get("products", {
  params: { name: "fuu", typeOrder: "name" },
}); //equivalente a axios.get("https://server.net/products?name=fuu&typeOrder=name")
let products = response.data;
```

```javascript
//un post con body...
import api from "../lib/api";

let body = {
  /* ... un objeto body con datos, como nombre y demás... */
};

let response = await api.post("products", { data: body }); //equivalente a axios.post("https://server.net/products",body) < claramente esto no existe en el api real pero es un ejemplo. >
let products = response.data;
```

```javascript
//un post con querys y body...
import api from "../lib/api";

let body = {
  /* ... un objeto body con datos, como nombre y demás... */
};

let response = await api.post("products", {
  params: { ranking: 5, categoryId: 32 },
  data: body,
}); //equivalente a axios.post("https://server.net/products?ranking=5&categoryId=32",body) < claramente esto no existe en el api real pero es un ejemplo. >
let products = response.data;
```

## Uso de constantes

Para evitar equivocaciones el archivo incluye constantes de objetos que guardan los endPoints, querys y valores comunes a usar. Se llaman "endPoint", "query" y "value" respectivamente y tienen propiedades definidas para que una vez importados (Destructuring mediante) les aparezcan como opciones en las sugerencias de VSCode y así evitar equivocaciones. Por ejemplo si quieren usar el endPoint products, pueden llamar a "endPoint.products" y contiene el string adecuado. También pueden agregar más al objeto conforme se vayan agregando más al API.

**Importante:** Prioricen el uso de las constantes más allá de que en los ejemplos anteriores no se usaron para que si el día de mañana cambia el nombre del algún endPoint o query solo se modifique el valor de la constante y no se tenga que salir a buscar en que archivos se hardCodeo.

**Atención:** En el caso de usar la constante "query" dentro de params tiene que usar [bracketNotation] ya que el string contenido en la propiedad de la constante es la que tiene que quedar por nombre de la key dentro del objeto en params.

### Ejemplo de uso

```javascript
//un post con querys y body, ahora usando las constantes...
import api, { endPoint, query } from "../lib/api";

let body = {
  /* ... un objeto body con datos, como nombre y demás... */
};

let response = await api.post(endPoint.products, {
  params: { [query.category]: 21 },
  data: body,
}); //equivalente a axios.post("https://server.net/products?category=21",body) < claramente esto no existe en el api real pero es un ejemplo. >
let products = response.data;
```

```javascript
//El mismo que el anterior pero usando la constante de base para el endPoint...
import api, { endPoint, query } from "../lib/api";

let body = {
  /* ... un objeto body con datos, como nombre y demás... */
};

let response = await api.post(`${endPoint.products}/otro`, {
  params: { [query.category]: 21 },
  data: body,
}); //equivalente a axios.post("https://server.net/products/otro?category=21",body) < claramente esto no existe en el api real pero es un ejemplo. >
let products = response.data;
```
