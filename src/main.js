const shop=document.getElementById('shop');


/* Array of Objects */


let basket=JSON.parse(localStorage.getItem("data"))||[];


let generateShop = ()=>{

    return (shop.innerHTML= shopItemsData.map((x)=>{
     
        let {id,name,price,desc,img}=x;

        let search = basket.find((x)=> x.id === id) || [];
        

  return    `  <div id=product-id-${id} class="items">
  <img src="${img}" alt="shirt1" width="200px">
  <div class="details">
      <h1>${name}</h1>
      <p>${desc}</p>
      <div class="price-quantity">
          <h2 class="price">$${price}</h2>
          <div class="button">
          <i onclick="decrement(${id})" class="bi bi-dash "></i>
          <div  id=${id} class="count">${search.item === undefined ?0:search.item}</div>
          <i onclick="increment(${id})" class="bi bi-plus  "></i>

          </div>
      </div>
  </div>
</div>`;
    }).join(""));
};
generateShop();



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
  
   

    localStorage.setItem("data",JSON.stringify(basket));

    
}

let update=(id)=>{

    let search =basket.find((x)=>x.id === id);

    document.getElementById(id).innerHTML=search?search.item:0;
    
    calculation();

}

let calculation = () =>{

    
    
    let cartIcon = document.getElementById("cart-amount");

    cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x+y, 0);

    

}

calculation();









