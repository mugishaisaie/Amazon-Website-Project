import { cart,removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deleiveryOption.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"


let htmlCartItem;

cart.forEach((cartItem)=>{
    const productId = cartItem.productId;

    let matchingProduct;
    products.forEach((product)=>{
    if(product.id === productId){
        matchingProduct= product;
        
    }
    })
    // console.log(matchingProduct)
    
  htmlCartItem +=  `
    <div class="cart-item-container cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${(matchingProduct.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                
               ${deliveryOptinsHtml(matchingProduct,cartItem)}

              </div>
            </div>
          </div>
     `
})


function deliveryOptinsHtml(matchingProduct,cartItem){

  let html = ''
   deliveryOptions.forEach((deliveryOption )=>{

    const toDay= dayjs();
    const deliveryDate = toDay.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format("dddd,MMMM D");
     const priceString = deliveryOption.pricrCents === 0 ? 'FREE' : `$${(deliveryOption.pricrCents/100).toFixed(2)}`;
   const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

   html += `
    <div class="delivery-option">
                  <input type="radio"
                  ${isChecked? 'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                  </div>
    
    `

   })
   return html;
}

document.querySelector(".js-order-summary").innerHTML=htmlCartItem;

document.querySelectorAll(".js-delete-link").forEach((linkDel)=>{
  linkDel.addEventListener("click",()=>{
    const productId= linkDel.dataset.productId;
    removeFromCart(productId);
    // console.log(cart)

    const container = document.querySelector(`.cart-item-container-${productId}`);
    // console.log(container)
    container.remove();
  })
  

})
// console.log(htmlCartItem);