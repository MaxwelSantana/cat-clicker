(function() {
    const cats = [
        {
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
        }
    ];
    
    const createCatList = function () {
        let catListElm  = document.getElementById('catList');
        cats.forEach(cat => {
            let catItem = document.createElement('li');
            let catImg  = document.createElement('img');
    
            catItem.classList   = 'cat-list__item';
            catImg.classList    = 'cat-list__img';
            catImg.src = cat.photo;
    
            catImg.addEventListener('click', (function (id) {
                return function () {
                    createMainCatContent(id);
                }
            })(cat.id));
    
            catItem.appendChild(catImg)
            catListElm.appendChild(catItem);
        });
    }
    
    const createMainCatContent = function (id) {
        const cat = cats.find(c => c.id == id);
        if (!cat) return;
    
        let catContent  = document.getElementById('catContent');
        let catName     = document.createElement('h2');
        let catCounter  = document.createElement('span');
        let catImg      = document.createElement('img');
        
        catContent.innerHTML    = '';
        catName.innerText       = `${cat.name} count clicks: `;
        catCounter.id           = cat.id;
        catCounter.innerText    = cat.count;
        catImg.classList        = 'cat-content__img';
        catImg.src              = cat.photo;
    
        catImg.addEventListener('click', (function(id) {
            return function (event) {
                let catObj = cats.find(c => c.id == id);
                if (!catObj) return;
    
                catObj.count += 1;
                let catCounter  = document.getElementById(id);
                catCounter.innerText = catObj.count;
            }
        })(cat.id));
    
        catName.appendChild(catCounter);
        catContent.appendChild(catImg);
        catContent.appendChild(catName);
    }
    
    //createCatList();
    //createMainCatContent(cats[0].id);
})();