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

//dette er view'et, som er her vi opretter elementer og laver events.
async function goalsView() {
    //her henter vi et array fra fetchGoals() funktionen
    let index_of_goals = [...await fetchGoals()];

    //her henter vi det element som vi har lagt ind i vores html
    let card_container = document.querySelector('#card_container');
    
    //det her er for at lave alle de cards (mål), som kommer fra api'et
    index_of_goals.forEach(element => {
        let card = document.createElement('article');
            card.setAttribute('class', 'card');
            card.setAttribute('data-priority', `${element.id}`);
                card_container.appendChild(card);

            let cardBack = document.createElement('div');
                cardBack.setAttribute('class', 'cardBack');
                cardBack.style.backgroundColor = `#${element.color}`;
                cardBack.innerHTML = `<p>${element.id}. ${element.byline}</p>`;
                    card.appendChild(cardBack);

            
            let cardFront = document.createElement('div');
                cardFront.setAttribute('class', 'cardFront');
                cardFront.style.backgroundImage = `url('/assets/media/${element.id}.jpeg')`;
                cardFront.innerHTML = `<h2>${element.id}. ${element.title}</h2>${element.icon}`;
                    card.appendChild(cardFront);

            let overlay = document.createElement('div');
                overlay.setAttribute('class', 'overlay');
                    cardFront.appendChild(overlay);
    });

    //dette er den funktion som gør at man kan skifte mellem målene når man trykker på nxt knappen
    let carusel_function = () => {
        let cards = [...document.querySelectorAll('.card')];

        let nxt_card = document.querySelector('#nxt_btn');

        for(let i = 0; i < cards.length; i ++) {
            cards[i].style.order = i + 1;

            if(cards[i].style.order == 1) {
                cards[i].classList.add('active');
            };
        }

        let index = 0;
        
        nxt_card.addEventListener('click', () => {
            for(let i = 0; i < cards.length; i ++) {
                cards[i].style.order = (index++ % cards.length) + 1;

                if(cards[i].style.order == 1) {
                    cards[i].classList.add('active');
                } else {
                    cards[i].classList.remove('active');
                };
            };

            index = (index - 1);
        });
    };

    //dette er funktionen som gør at jeg kan hente detaljerne fra det aktive kort, når jeg trykker på read_btn.
    let read_function = async () => {
        let details_container = document.createElement('section');
            details_container.setAttribute('id', 'details_container');
                document.body.appendChild(details_container);

                let card_details = document.createElement('article');
                    card_details.setAttribute('class', 'card_details');
                        details_container.appendChild(card_details);


        let read_btn = document.querySelector('#read_btn');

        read_btn.addEventListener('click', () => {
            let active_card = document.querySelector('.active');
            
            //her henter den detaljerne ud fra den data attribute som er givet (dens id).
            get_details(active_card.getAttribute('data-priority'));
        });

            //dette er så funktionen som henter datane fra controlleren som ligger i toppen af dokumentet
            let get_details = async (priority) => {
                let details = await detailsController(priority);
                let {id, title, byline, description, icon, targets} = details;

                details_container.style.display = 'flex';

                card_details.innerHTML = 
                `<p id="close_btn">luk</p>
                <p>${id}. ${title}</p>
                <p>${description}</p>`;

                for(let i = 0; i < targets.length; i++) {
                    card_details.innerHTML += 
                    `<p>${targets[i].title}</p>
                    <p>${targets[i].description}</p>`
                };

                card_details.style.backgroundColor = `#${details.color}`;

                let close_btn =  document.querySelector('#close_btn');

                close_btn.addEventListener('click', () => {
                    details_container.style.display = 'none';
                });
            };
    };

    carusel_function();
    read_function();
};

goalsView();