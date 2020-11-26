# FN_Verdensmaal
Denne opgave tager udgangspukt i fn's verdens mål, og formålet er at vi lærer at arbejde med api'er.

## Opgavens generelle opbygning / styling
For at løse denne opgave, har jeg valgt at lave den som en simpel card carusel, hvor man kun kan trykke 'næste' og 'læs mere'.
> det skal dog lige nævnes, at der en en lille bug, hvor man skal trykke 2 gange på 'næste' første gang man vil til det næste card.

Det første card i rækken, vil altid være det aktive card, som betyder at det er det som man kigger på. Det vil sige at hvis man trykker på 'læs mere'
så er det detaljerne fra det card som man vil se.

## MVC struktur
Opgavens javascript er opbygget efter mvc (model, view, controller) strukturen.
Den er opbygget ved at vi har vores model, som er det api hvor vi henter vores data.

Der er så derefter lavet to controllers.
1. Den første fungerer ved at hente data ind fra api'et omkring alle    verdensmålene.

2. Den anden controller fungerer så ved at vi også henter data ind fra api'et, men denne gang er det kun de specifikke detaljer fra et enkelt verdensmål.

Dette kommer til at se sådan her ud:
```javascript
//dette er controlleren for de generelle mål
async function fetchGoals() {
    let response = await fetch('https://api.mediehuset.net/sdg/goals');
    let goals = await response.json();

    return goals.items;
};

//dette er controlleren for målenes detaljer
async function detailsController(priority) {
    let response = await fetch(`https://api.mediehuset.net/sdg/goals/${priority}`)
    let detials = await response.json();

    return detials.item;
};
```

Herefter kommer view'et så, det er så her vi opretter elementer og eventlisteners, som gør at brugeren kan se og interagerer med sitet.

Denne funktion ser i dette tilfælde sådan ud:

```javascript
async function goalsView() {
    ... //koden ligger her
}
```

## Programmerings metoder (som skulle indgå)
I opgaven blev det oplagt at skulle bruge nogle bestemte programmerings metoder.
1. Arrow functions
2. Closures
3. Rest parameter
4. Spread operator
5. Destructuring Assignment
6. Error catching

### Arrow functions
Arrow functions er blevet brugt en del i opgaven, men her er et eksempel.
```javascript
let read_function = async () => {...}
```
### Closures
```javascript
async function goalsView() {
    ... //koden ligger her

    let carusel_function = () => {
        ... //koden ligger her

        nxt_card.addEventListener('click', () => {
            .... //koden ligger her
        });
    };

    let read_function = async () => {
        ... //koden ligger her

        read_btn.addEventListener('click', () => {
            ... //koden ligger her
            get_details(...);
        });

            let get_details = async (...) => {
            ... //koden ligger her
            };
    };

    carusel_function();
    read_function();
}
```
### Rest parameter & Spread operator
I opgaven bruger jeg ikke rest parameter, men tilgengæld bruger jeg spread operatorer til at smide elementer ind i et array.

```javascript
let index_of_goals = [...await fetchGoals()];
```
### Destructuring Assignment
Destructuring Assignment bruger jeg en gang i opgaven og det er i funktionen get_details();
```javascript
let {id, title, byline, description, icon, targets} = details;
```
### Error catching
For at vise en error catching, har jeg valgt at bruge dette på get_details(); funktionen. her tester jeg om de details jeg får fra api'et ankommer som et object, og hvis de gør så kører den videre. 
Men elementet ikke er et objekt, så console logger den et error message. 
```javascript
let get_details = async (priority) => {
            let details = await detailsController(priority);

            //her tester vi om det data som kommer fra api'et er et objekt, og hvis det er det, 
            //så kører den resten af funktionen, og hvis ikke det er det, så viser console logger den en fejl meddelelse.
            if(isObject(details).result) {
                ... //koden kommer her
            } else {
                console.log(isObject(details).message);
            };
        };
```