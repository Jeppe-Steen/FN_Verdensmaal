async function fetchGoals() {
    let response = await fetch('https://api.mediehuset.net/sdg/goals');
    let goals = await response.json();

    //der bliver retuneret et array med alle objekterne
    return goals.items;
};


async function goalsView() {
    let index_of_goals = [...await fetchGoals()];

    let card_container = document.querySelector('#card_container');
    
    index_of_goals.forEach(element => {
        let card = document.createElement('article');
            card.setAttribute('class', 'card');
                card_container.appendChild(card);

            let cardBack = document.createElement('div');
                cardBack.setAttribute('class', 'cardBack');
                cardBack.style.backgroundColor = `#${element.color}`;
                cardBack.innerHTML = `<p>${element.byline}</p>`;
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

    let carusel_function = () => {
        let cards = [...document.querySelectorAll('.card')];

        let nxt_card = document.querySelector('#nxt_btn');

        for(let i = 0; i < cards.length; i ++) {
            cards[i].style.order = i + 1;
        };

        let index = 0;
        
        nxt_card.addEventListener('click', () => {
            for(let i = 0; i < cards.length; i ++) {
                cards[i].style.order = (index++ % cards.length) + 1;
            };

            index = (index - 1);
        });
    };

    carusel_function();
};

goalsView();