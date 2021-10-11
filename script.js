const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

function send(onError, onSuccess, url, method = 'GET', data = null, headers = [], timeout = 60000) {
    let xhr;

    if (window.XMLHttpRequest) {
        // Chrome, Mozilla, Opera, Safari
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // Internet Explorer
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.open(method, url, true);


    headers.forEach((header) => {
        xhr.setRequestHeader(header.key, header.value);
    })


    xhr.timeout = timeout;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 400) {
                onError(xhr.statusText)
            } else {
                onSuccess(xhr.responseText)
            }
        }
    }

    xhr.send(data);
}

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
        fetch(`${API_URL}catalogData.json`)
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                this.goods = request.map(good => ({ title: good.product_name, price: good.price }))
                this.render();
            })
            .catch((err) => {
                console.log(err.text)
            })
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
        fetch(`${API_URL}getBasket.json`)
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                this.goods = []
                this.goods = request;//.map(good => ({ title: good.product_name, price: good.price }));
                this.render();
            })
            .catch((err) => {
                console.log(err.text)
            })
    }
    render() {
        let listHtmlBasket = '';
        this.goods.forEach(good => {
            const basketItem = new BasketItem(good.product_name, good.price);
            listHtmlBasket += basketItem.render();
        });
        document.querySelector('.basket').insertAdjacentHTML('beforeend', listHtmlBasket);
    }
    addItem(item) {
        // fetch(`${API_URL}addToBasket.json`, {
        //     method: "post",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(item)
        // })
        //     .then((response) => {
        //         console.log(response);
        //         console.log(response.status);
        //         console.log(response.ok);
        //         console.log(response.headers);
        //     });

        var data = new FormData();
        data.append("json", JSON.stringify(item));

        fetch(`${API_URL}addToBasket.json`, { //script.js:181 POST https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json 403
            method: "POST",
            body: data
        }).then(function (response) {
            if (!response.ok) {
                return Promise.reject(new Error(
                    'Response failed: ' + response.status + ' (' + response.statusText + ')'
                ));
            }

            return response.json();
        }).then(function (data) {
            console.log(data);
            this.fetchGoods();
        }).catch(function (error) {
            console.log(err.text)
        })

        // fetch(`${API_URL}addToBasket.json`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify(item)
        // })
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((request) => {
        //         console.log(request);
        //         this.item = request; //.map(good => ({ id_product: item.id_product, product_name: item.title, price: item.price }))
        //         this.fetchGoods();
        //     })

        // fetch(`${API_URL}addToBasket.json`)
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((request) => {
        //         console.log(request);
        //         this.item = request; //.map(good => ({ id_product: item.id_product, product_name: item.title, price: item.price }))
        //         this.fetchGoods();
        //     })
        //     .catch((err) => {
        //         console.log(err.text)
        //     })

        // send(
        //     (err) => {
        //         console.log(err.text)
        //     },
        //     (request) => {
        //         request.map(good => ({ product_name: good.title, price: good.price }))
        //         this.fetchGoods();
        //     },
        //     `${API_URL}addToBasket.json`
        // )

        // new Promise((resolve, reject) => {
        //     send(
        //         reject,
        //         resolve,
        //         `${API_URL}addToBasket.json`,
        //         'POST',
        //         item,
        //     )
        // })
        //     .then((request) => {
        //         request.map(good => ({ product_name: good.title, price: good.price }));
        //         this.fetchGoods();
        //     })
        //     .catch((err) => {
        //         console.log(err.text)
        //     })

        // let new_xhr = new XMLHttpRequest();
        // let url = `${API_URL}addToBasket.json`;
        // new_xhr.open("POST", url, true);
        // new_xhr.setRequestHeader("Content-Type", "application/json");
        // new_xhr.onreadystatechange = function () {
        //     if (new_xhr.readyState === 4 && new_xhr.status === 200) {
        //         result.innerHTML = this.responseText;
        //     }
        // };
        // let data = JSON.stringify({
        //     'id_product': item.id_product,
        //     "product_name": item.title,
        //     "price": item.price
        // });
        // new_xhr.send(data);
    }
    popItem(item) {
        var data = new FormData();
        data.append("json", JSON.stringify(item));

        fetch(`${API_URL}deleteFromBasket.json`, { //script.js:275 POST https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json 403
            method: "POST",
            body: data
        }).then(function (response) {
            if (!response.ok) {
                return Promise.reject(new Error(
                    'Response failed: ' + response.status + ' (' + response.statusText + ')'
                ));
            }

            return response.json();
        }).then(function (data) {
            console.log(data);
            this.fetchGoods();
        }).catch(function (error) {
            console.log(err.text)
        })
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

let basket_show = document.querySelector('.cart-button');
let basket = document.querySelector('.basket');
basket_show.addEventListener('click', function () {
    if (basket.style.display == 'none') {
        basket.style.display = 'block';
    } else {
        basket.style.display = 'none';
    }
})

const list = new GoodsList();
list.fetchGoods();
console.log(list.allPrice());

const listBasket = new BasketList();
listBasket.fetchGoods();
console.log(listBasket.allPrice());
listBasket.addItem({
    'id_product': 123,
    'product_name': 'Ноутбук',
    'price': 45600
});
listBasket.popItem({
    'id_product': 123,
    'product_name': 'Ноутбук',
    'price': 45600
});