let label = document.getElementById('label');
let shopping_cart = document.getElementById('shopping-cart');
let temporary_save = JSON.parse(localStorage.getItem("data")) || [];
let calculation = () => {
    let cart_icon = document.getElementById("cartAmount");
    cart_icon.innerHTML = temporary_save.map((x)=>x.item).reduce((x, y) => x+y, 0);
}

calculation();

let generateCartItems = () => {
    if (temporary_save.length !== 0) {
      return (shopping_cart.innerHTML = temporary_save.map((x) => {
          let { id, item } = x;
          let search = shopItems.find((y) => y.id === id) || [];
          return `
        <div class="cart-item">
          <img width="100" src=${search.image} alt="" />
          <div class="details">
  
                <div class="title-price-x">
                    <h4 class="title-price">
                    <p>${search.name}</p>
                    <p class="cart-item-price"> <i class="fa-solid fa-bangladeshi-taka-sign"></i> ${search.price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="fa-solid fa-xmark"></i>
                </div>
  
                <div class="buttons">
                    <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${x.id})" class="fa-solid fa-plus"></i>
                </div>
  
                <h3><i class="fa-solid fa-bangladeshi-taka-sign"></i>    ${item * search.price}</h3>
          </div>
        </div>
        `;
        })
        .join(""));
    } else {
      shopping_cart.innerHTML = ``;
      label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button class="HomeBtn">Back to home</button>
      </a>
      `;
    }
    calculation();
  };
  
  generateCartItems();


let increment = (id) => {
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
    generateCartItems();
};
let decrement = (id) => {
    let selected_item = id;
    let search_for_item = temporary_save.find((x) => x.id === selected_item.id);

    if (search_for_item === undefined) return;
    else if (search_for_item.item === 0) {
        return;
    }
    else {
        search_for_item.item-=1;
    }
    
    update(selected_item.id);
    temporary_save = temporary_save.filter((x) => x.item != 0);  
    generateCartItems();  
    localStorage.setItem("data", JSON.stringify(temporary_save));
};
let update = (id) => {
    let search = temporary_save.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
  };

let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    temporary_save = temporary_save.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(temporary_save));
};

let clearCart = () => {
    temporary_save = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(temporary_save));
};

let TotalAmount = () => {
    if (temporary_save.length !== 0) {
        let amount = temporary_save
        .map((x) => {
            let { item, id } = x;
            let search = shopItems.find((y) => y.id === id) || [];

            return item * search.price;
        })
        .reduce((x, y) => x + y, 0);
        // console.log(amount);
        label.innerHTML = `
            <h2>Total Bill : $ ${amount}</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    } else return;
};

TotalAmount();