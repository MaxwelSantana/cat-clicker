(function () {
    const model = {
        currentCat: {},
        cats: [{
            id: 1,
            name: 'Joe',
            photo: './assets/images/joe-cat.jpg',
            count: 0
        },
        {
            id: 2,
            name: 'Lady',
            photo: './assets/images/lady-cat.jpg',
            count: 0
        },
        {
            id: 3,
            name: 'Simba and Nala',
            photo: './assets/images/simba-e-nala.jpg',
            count: 0
        },
        {
            id: 4,
            name: 'Doritos',
            photo: './assets/images/doritos.jpg',
            count: 0
        }]
    };

    const octopus = {
        init: function () {
            model.currentCat = model.cats[0];
            catListView.init();
            catCounterView.init();
        },
        setCurrentCat: function(idCat) {
            model.currentCat = model.cats.find(cat => cat.id == idCat);
        },
        getCurrentCat: function() {
            return model.currentCat;
        },
        getCats: function () {
            return model.cats;
        },
        incrementCounter: function () {
            model.currentCat.count = model.currentCat.count+1;
            catCounterView.render();
        }
    };

    const catListView = {
        init: function () {
            this.catListElm = document.getElementById('catList');
            this.render();
        },
        render: function () {
            let cats = octopus.getCats();
            cats.forEach(cat => {
                let catItem = document.createElement('li');
                let catImg = document.createElement('img');

                catItem.classList = 'cat-list__item';
                catImg.classList = 'cat-list__img';
                catImg.src = cat.photo;

                catImg.addEventListener('click', (function (idCat) {
                    return function () {
                        octopus.setCurrentCat(idCat);
                        octopus.incrementCounter();
                    }
                })(cat.id));

                catItem.appendChild(catImg)
                this.catListElm.appendChild(catItem);
            });
        }
    };

    const catCounterView = {
        init: function () {
            this.catContent = document.getElementById('catContent');
            this.catName    = document.getElementById('catName');
            this.catCounter = document.getElementById('catCounter');
            this.catImg     = document.getElementById('catImage');

            this.catImg.addEventListener('click', function() {
                octopus.incrementCounter();    
            });

            this.render();
        },

        render: function () {
            let cat = octopus.getCurrentCat();
            
            this.catCounter.id = cat.id;
            this.catCounter.innerText = cat.count;
            this.catName.innerHTML = `${cat.name} count clicks: ${this.catCounter.outerHTML}`;
            this.catImg.classList = 'cat-content__img';
            this.catImg.src = cat.photo;
        }
    }

    octopus.init();
})();