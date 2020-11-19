    //her henter jeg data fra api'et. data'ene er alle billederne, samt deres data (men ikke deres detaljer)
    async function fetchGoals() {
        let response = await fetch('https://api.mediehuset.net/sdg/goals');
        let goals = await response.json();

        //der bliver retuneret et array med alle objekterne
        return goals.items;
    };

    //her henter jeg data fra api'et. data'ene er detaljerne fra alle billederne.
    //men her henter jeg kun en ind af gangen, og dette bliver bestemt af viewet.
    async function detailsController(priority) {
        let response = await fetch(`https://api.mediehuset.net/sdg/goals/${priority}`)
        let detials = await response.json();

        //her bliver retuneret et objekt som er detaljerne af det valgte verdensmål
        return detials.item;
    };

    async function goalsView() {
       let index_of_goals = [...await fetchGoals()];


        let createHtml = async () => {
            index_of_goals.forEach(element => {
                let card = document.createElement('section');
                document.body.appendChild(card);
                card.setAttribute('class', 'goalCard');
                card.setAttribute('data-priority', `${element.id}`);

                    let cardFront = document.createElement('article');
                    card.appendChild(cardFront);
                    cardFront.setAttribute('class', 'cardFront');
                    cardFront.style.backgroundImage = `url(/assets/media/${element.id}.jpeg)`;
                    cardFront.innerHTML = `<span class="overlay">${element.title}</span>`;

                    let cardBack = document.createElement('article');
                    card.appendChild(cardBack);
                    cardBack.setAttribute('class', 'cardBack');
                    cardBack.style.backgroundColor = `#${element.color}`;
                    cardBack.innerHTML = `${element.byline} <br /> <span>Click for at læse mere</span>`;
            });
        };

        let click_event = async () => {
            let clickable_cards = document.querySelectorAll('.goalCard');

            clickable_cards.forEach(element => element.addEventListener('click', () => {
                open_event(element.getAttribute('data-priority'));
            }));

            let open_event = async (n) => {
                let details = await detailsController(n);
                console.log(details);
            };
        };

        createHtml();
        click_event();
    };

    goalsView();



































