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
        },
        {
            id: 5,
            name: 'Chill',
            photo: './assets/images/chill.jpg',
            count: 0
        }]
    };

    const octopus = {
        init: function () {
            model.currentCat = model.cats[0];
            catListView.init();
            catCounterView.init();
            catAdminView.init();
        },
        setCurrentCat: function (idCat) {
            model.currentCat = model.cats.find(cat => cat.id == idCat);
            catCounterView.render();
            catAdminView.render();
        },
        getCurrentCat: function () {
            return model.currentCat;
        },
        updateCat: function (id, name, photo, count) {
            let cat = model.cats.find(cat => cat.id == id);
            let hasChangedPhoto = cat.photo != photo;
            cat.id = id;
            cat.name = name;
            cat.photo = photo;
            cat.count = count;
            if(hasChangedPhoto)
                catListView.render();
            catCounterView.render();
            catAdminView.render();
        },
        getCats: function () {
            return model.cats;
        },
        incrementCounter: function () {
            model.currentCat.count = model.currentCat.count + 1;
            catCounterView.render();
            catAdminView.render();
        }
    };

    const catListView = {
        init: function () {
            this.catListElm = document.getElementById('catList');
            this.render();
        },
        render: function () {
            let cats = octopus.getCats();
            this.catListElm.innerHTML = '';
            cats.forEach(cat => {
                let catItem = document.createElement('li');
                let catImg = document.createElement('img');

                catItem.classList = 'cat-list__item';
                catImg.classList = 'cat-list__img';
                catImg.src = cat.photo;

                catImg.addEventListener('click', (function (idCat) {
                    return function () {
                        octopus.setCurrentCat(idCat);
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
            this.catName = document.getElementById('catName');
            this.catCounter = document.getElementById('catCounter');
            this.catImg = document.getElementById('catImage');

            this.catImg.addEventListener('click', function () {
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

    const catAdminView = {
        init: function () {
            this.id = document.getElementById('idCat');
            this.name = document.getElementById('name');
            this.url = document.getElementById('url');
            this.clicks = document.getElementById('clicks');
            this.formAdmin = document.getElementById('formAdmin');
            this.adminButton = document.getElementById('adminButton');
            this.cancelButton = document.getElementById('cancelButton');
            this.catMain = document.getElementById('catMain');

            this.formAdmin.addEventListener('submit', function (event) {
                octopus.updateCat(this.id.value, this.name.value, this.url.value, this.clicks.value);
                octopus.setCurrentCat(this.id.value);
                event.preventDefault();
            });

            this.adminButton.addEventListener('click', function () {
                catMain.classList.toggle('cat-content__main--open-admin');
            });

            this.cancelButton.addEventListener('click', function () {
                catAdminView.render();
            });

            this.render();
        },
        render: function () {
            this.closeAdmin();
            setTimeout(() => {
                let cat = octopus.getCurrentCat();

                this.id.value       = cat.id;
                this.name.value     = cat.name;
                this.url.value      = cat.photo;
                this.clicks.value   = cat.count;
            }, 300);
        },
        closeAdmin: function () {
            catMain.classList.remove('cat-content__main--open-admin');
        }
    }

    octopus.init();
})();