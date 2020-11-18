    
    async function fetchGoals() {
        let response = await fetch('https://api.mediehuset.net/sdg/goals');
        let goals = await response.json();

        return goals.items;
    };

    async function detailsController(priority) {
        let response = await fetch(`https://api.mediehuset.net/sdg/goals/${priority}`)
        let detials = await response.json();

        return detials.item;
    };

    async function goalsView() {
       let index_of_goals = [...await fetchGoals()];


        let createHtml = async () => {
            index_of_goals.forEach(element => {
                let html = document.createElement('section');
                document.body.appendChild(html);
                html.setAttribute('class', 'btn');
                html.setAttribute('data-priority', `${element.id}`);
                html.style.backgroundImage = `url(/assets/media/${element.id}.jpeg)`;

                    let overlay = document.createElement('article');
                    html.appendChild(overlay);
                    overlay.innerHTML = `${element.title}`
            });
        };

        let click_event = async () => {
            let clickable_btns = document.querySelectorAll('.btn');

            clickable_btns.forEach(element => element.addEventListener('click', () => {
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
















































        // async function fetchGoalsDetails(index) {
    //     let response = await fetch(`https://api.mediehuset.net/sdg/goals/${index}`);
    //     let details = await response.json();

    //     return details;
    // };

    // async function testView() {
    //     let index_of_goals = [...await testController()];

    //     console.log(index_of_goals);
    // }
    // testView();