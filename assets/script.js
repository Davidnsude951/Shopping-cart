const iconCart = document.getElementById(`showCart2`);
const body = document.querySelector(`body`);
const closeCart = document.getElementById(`closeMenu`);

let listProductHtml=document.querySelector(`.listproduct`)
let listCartHtml = document.querySelector(`.listCart`)
let iconCartSpan = document.getElementById(`iconCartSpan`)

let listProducts = [];
let carts =[];


body.classList.remove(`showCart`)

iconCart.addEventListener(`click`,event=>{
      body.classList.toggle(`showCart`);
})

closeCart.addEventListener(`click`,()=>{
      body.classList.remove(`showCart`)
})

const addCartToMemory =() =>{
      localStorage.setItem(`cart`,JSON.stringify(carts))
}

const addDataToHtml = () =>{
      listProductHtml.innerHtml =``;
      if(listProducts.length>0){
            listProducts.forEach(product => {
                  let newProduct = document.createElement(`div`)
                  newProduct.classList.add(`items`);
                  newProduct.dataset.id = product.id;
                  newProduct.innerHTML =`
                   <img src="${product.image.desktop}" alt="">
                    <div class="button">
                         <div class="add-to-cart"><img src="./assets/images/icon-add-to-cart.svg" alt=""> Add to Cart</div>
                    </div>
                    <p class="category">${product.category}</p>
                    <p class="name">${product.name}</p>
                    <div class="price">$${product.price}</div>`;
                  listProductHtml.appendChild(newProduct);
            })
      }
}
listProductHtml.addEventListener(`click`, event => {
      let positionClick = event.target;
      while (positionClick && !positionClick.classList.contains(`button`)) {
        positionClick = positionClick.parentElement;
      }
      if (positionClick && positionClick.classList.contains(`button`)) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
      }
});

const addToCart =(product_id)=>{
      let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
      if(carts.length <=0 ){
            carts = [{
                  product_id:product_id,
                  quantity: 1
            }]
      }else if(positionThisProductInCart <0){
            carts.push({
                  product_id:product_id,
                  quantity:1
            })
      }else{
            carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
      }
      addCartToHtml();
      addCartToMemory();
}

const addCartToHtml = ()=>{
      listCartHtml.innerHTML=``;
      let totalQuantity = 0;
      if(carts.length>0){
            carts.forEach(cart =>{
                  totalQuantity = totalQuantity + cart.quantity;
                  let newCart = document.createElement(`div`)
                  newCart.classList.add(`item`)
                  newCart.dataset.id = cart.product_id;
                  let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
                  let info = listProducts[positionProduct];
                  newCart.innerHTML=`
                    <div class="image">
                              <img src="${info.image.thumbnail}" alt="">
                         </div>
                         <div class="category">
                              ${info.category}
                         </div>
                         <div class="name">
                              ${info.name}
                         </div>
                         <div class="price">
                              $${info.price}
                         </div>
                         <div class="quantity">
                              <span class="minus">-</span>
                              <span>${cart.quantity}</span>
                              <span class="plus">+</span>
                         </div>`;
                  listCartHtml.appendChild(newCart);
            })
      }
      iconCartSpan.innerText = totalQuantity;
}

listCartHtml.addEventListener(`click`,event=>{
      let positionClick=event.target;
      if(positionClick.classList.contains(`minus`)||positionClick.classList.contains(`plus`)){
            let product_id = positionClick.parentElement.dataset.id;
            let type =`minus`;
            if(positionClick.classList.contains(`plus`)){
                  type=`plus`;
            }
            changeQuantity(product_id, type);
      }
})

const changeQuantity = (product_id, type) =>{
      let positionItemInCart = carts.findIndex((value) => value.product_id= product_id)
      if(positionItemInCart >=0){
            switch(type){
                  case `plus`:
                        carts[positionItemInCart].quantity= carts[positionItemInCart].quantity + 1;
                        break;
                  default:
                        let valueChange = carts[positionItemInCart].quantity -1;
                        if(valueChange>0){
                              carts[positionItemInCart].quantity = valueChange;
                        }else{
                              carts.splice(positionItemInCart,1);
                        }
                        break
            }
      }
      addCartToMemory();
      addCartToHtml();
}
const initApp = () =>{//\ its literally just a function
      //get data from json
      fetch(`products.json`)
      .then(response => response.json())
      .then(data => {
            listProducts=data;
            addDataToHtml();

            // Get cart from memory
            if(localStorage.getItem(`cart`)){
                  carts=JSON.parse(localStorage.getItem(`cart`));
                  addCartToHtml();
            }
      })
}

initApp()     