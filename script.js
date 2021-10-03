
class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').insertAdjacentHTML('beforeend', listHtml);
    }
    allPrice() {
        let prices = 0;
        if (!this.goods.length == 0) {
            this.goods.forEach(good => {
                prices += good.price
            });
        }
        return prices;
    }
}

// Наследование не работает. Я не смог понять почему.
// Единственное что я понял, это то, что проблема либо в fetchGoods(),
// либо в render() класса BasketList.

// class BasketItem extends GoodsItem {
//     constructor(title, price) {
//         super(title, price)
//     }
//     render() {
//         return `<div class="basket-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
//     }
// }

// class BasketList extends GoodsList {
//     constructor() {
//         super(goods)
//     }
//     fetchGoods() {
//         this.goods = [
//             { title: 'Shirt', price: 150 },
//             { title: 'Socks', price: 50 },
//         ];
//     }
//     render() {
//         let listHtmlBasket = '';
//         this.goods.forEach(good => {
//             const basketItem = new BasketItem(good.title, good.price);
//             listHtmlBasket += basketItem.render();
//         });
//         document.querySelector('.basket').insertAdjacentHTML('beforeend', listHtmlBasket);
//     }
//     addItem() {
//         // метод добавления продукта в корзину
//     }
//     popItem() {
//         // метод удаления продукта из корзины
//     }
//     showBasket() {
//         // метод открытия\закрытия корзины
//     }
// }

class BasketItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="basket-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}


class BasketList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [];
    }
    render() {
        let listHtmlBasket = '';
        this.goods.forEach(good => {
            const basketItem = new BasketItem(good.title, good.price);
            listHtmlBasket += basketItem.render();
        });
        document.querySelector('.basket').insertAdjacentHTML('beforeend', listHtmlBasket);
    }
    addItem() {
        // метод добавления продукта в корзину
        return true
    }
    popItem() {
        // метод удаления продукта из корзины
        return true
    }
    showBasket() {
        // метод открытия\закрытия корзины
        return true
    }
    allPrice() {
        let prices = 0;
        if (!this.goods.length == 0) {
            this.goods.forEach(good => {
                prices += good.price
            });
        }
        return prices;
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
console.log(list.allPrice());

const listBasket = new BasketList();
listBasket.fetchGoods();
listBasket.render();
console.log(listBasket.allPrice());