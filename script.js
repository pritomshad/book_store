let shop = document.getElementById('shop');

let temporary_save = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItems.map((x)=>{
        let { id, name, writer, price, image } = x;
        let search = temporary_save.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${x.id} class="item">
        <img width="220" height="300" src="${image}" alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${writer}</p>
            <div class="price_and_quantity">
                <h4><i class="fa-solid fa-bangladeshi-taka-sign"></i>${price}</h4>
                <div class="buttons_for_quantity">
                    <i onclick="decrement_product_number(${id})" class="fa-solid fa-minus"></i>
                    <div id=${x.id} class="quantity">
                    ${search.item === undefined? 0: search.item}
                    </div>
                    <i onclick="increment_product_number(${x.id})" class="fa-solid fa-plus"></i>                    
                </div>
            </div>
        </div>
        </div>
    `
    }).join(""));
};
generateShop();

let increment_product_number = (id) => {
    let selected_item = id;
    let search_for_item = temporary_save.find((x) => x.id === selected_item.id);

    if (search_for_item === undefined) {
        temporary_save.push({
            id: selected_item.id,
            item: 1,
        })
    }
    else {
        search_for_item.item+=1;
    }
    console.log(temporary_save);
    localStorage.setItem("data", JSON.stringify(temporary_save));
    update(selected_item.id);
};
let decrement_product_number = (id) => {
    let selected_item = id;
    let search_for_item = temporary_save.find((x) => x.id === selected_item.id);

    if (search_for_item === undefined) return;
    else if (search_for_item.item === 0) {
        return;
    }
    else {
        search_for_item.item-=1;
    }
    console.log(temporary_save);
    update(selected_item.id);
    temporary_save = temporary_save.filter((x) => x.item != 0);    
    localStorage.setItem("data", JSON.stringify(temporary_save));
};
let update = (id) => {
    let search = temporary_save.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};
let calculation = () => {
    let cart_icon = document.getElementById("cartAmount");
    cart_icon.innerHTML = temporary_save.map((x)=>x.item).reduce((x, y) => x+y, 0);
}

calculation();