const cats = [
    {
        id: 1,
        name: 'Joe',
        photo: './assets/images/joe-cat.jpg'
    },
    {
        id: 2,
        name: 'Lady',
        photo: './assets/images/lady-cat.jpg'
    }
];

var createCatsElement = function () {
    let main = document.getElementById('cats');
    cats.forEach(cat => {
        let catSection = document.createElement('section');
        let catName = document.createElement('h2');
        let catCounter = document.createElement('span');
        let catImg = document.createElement('img');

        catName.innerText = `${cat.name} count clicks: `;
        catCounter.id = cat.id;
        catCounter.innerText = 0;
        catImg.id = cat.id;
        catImg.src = cat.photo;

        catImg.addEventListener('click', function (event) {
            let id = event.target.id;
            let countElem = document.getElementById(id);
            countElem.innerHTML = parseInt(countElem.innerHTML) ? parseInt(countElem.innerHTML) + 1 : 1;
        });

        catName.appendChild(catCounter);
        catSection.appendChild(catName);
        catSection.appendChild(catImg);
        main.appendChild(catSection);
    });
}
createCatsElement();