const iconCart = document.getElementById(`showCart2`);
const addToCart = document.querySelector(`.add-to-cart`);
const body = document.querySelector(`body`);
const closeCart = document.getElementById(`closeMenu`);

let listProductHtml=document.querySelector(`.listproduct`)

let listProducts = [];


body.classList.remove(`showCart`)

iconCart.addEventListener(`click`,event=>{
      body.classList.toggle(`showCart`);
})

closeCart.addEventListener(`click`,()=>{
      body.classList.remove(`showCart`)
})


const addDataToHtml = () =>{
      listProductHtml.innerHtml =``;
      if(listProducts.length>0){
            listProducts.forEach(product => {
                  let newProduct = document.createElement(`div`)
                  newProduct.classList.add(`items`)
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

listProductHtml.addEventListener(`click`,event=>{
      let positionClick = event.target;
      if(positionClick.classList.contains(`add-to-cart`)){
            alert(`1`)
      }
})

const initApp = () =>{//\ its literally just a function
      //get data from json
      fetch(`products.json`)
      .then(response => response.json())
      .then(data => {
            listProducts=data;
            addDataToHtml();
      })
}

initApp()