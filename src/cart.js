let label=document.getElementById('label');
let Shoppingcart=document.getElementById('shopping-cart');



let basket=JSON.parse(localStorage.getItem("data"))||[];

let calculation = () =>{

    
    
    let cartIcon = document.getElementById("cart-amount");

    cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x+y, 0);

    

}

calculation();



let generateCartItems = ()=>{

      if(basket.length !==0 ){
          return (Shoppingcart.innerHTML=basket.map((x)=>{
                let{id,item}=x;
                let search = shopItemsData.find((y)=>y.id === id)|| [];
                
                return`
                <div class="cart-item">
                <img width="100" src=${search.img} alt="" />
                <div class="details">
                   
                    <div class="title-price-x">
                       <h4 class="title-price">
                          <p>${search.name}</p>
                          <p class="cart-item-price">$ ${search.price} </p>
                          </h4>
                          <i onclick="removeItem(${id})"  class="bi bi-x-lg"></i>
                          </div>
                          <div class="button">
                         <i onclick="decrement(${id})" class="bi bi-dash "></i>
                         
                         <div  id=${id} class="count">${item}</div>
                         <i onclick="increment(${id})" class="bi bi-plus  "></i>

                       </div>

                 
                  <h3>$ ${item * search.price}</h3>
                  </div>
                  </div>
                  
                `;
          }).join(""));


      }
      else{
   
       Shoppingcart.innerHTML=``;
        
        label.innerHTML= `
          <h2>Cart is Empty</h2>
          <a href="index.html">
          <button class="HomeBtn">Back to home</button>
          </a>
        `;
      }

    
};

generateCartItems();


let increment=(id)=>{
  let selected=id;

  let search= basket.find((x)=> x.id===selected.id);

  if(search===undefined){
   basket.push({
       id: selected.id,
       item:1,

   })
  }
  else{
   search.item+=1;
  }

 generateCartItems();
 update(selected.id);

 localStorage.setItem("data",JSON.stringify(basket));
  

}



let decrement=(id)=>{
   let selected=id;
   
   let search= basket.find((x)=> x.id===selected.id);

   if(search===undefined){
       return;
   }
   
   else if(search.item === 0){
     return;
   }
   
   else{
    search.item-=1;
   }


   update(selected.id);
   basket=basket.filter((x)=> x.item !== 0);
 
   generateCartItems();

   localStorage.setItem("data",JSON.stringify(basket));

   
}



let update = (id) => {
  let search = basket.find((x) => x.id === id);
  
  document.getElementById(id).innerHTML = search.item;
  calculation();
  
};


let removeItem = (id) =>{
  let selected = id;

  basket= basket.filter((x)=> x.id !==selected.id);
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
  
}
let clearcart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};



let TotalAmount=()=>{
  if(basket.length!==0){
    let amount = basket.map((x)=>{
      let {item,id}=x;
      let search = shopItemsData.find((y) => y.id === id) || [];

      return item*search.price;
    }).reduce((x,y)=>x+y,0);

    label.innerHTML=
    `<h2>Total Bill:$ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearcart()" class="removeAll">Clear Cart</button>`;
  }else return;
};

TotalAmount();