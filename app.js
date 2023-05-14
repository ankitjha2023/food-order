const allFood = [
    {
        name:"breakfast",
        src:"/img-1.png",
        price:"20$"
    },
    {
        name:"dinner",
        src:"/img-2.png",
        price:"20$"
    },
    {
        name:"lunch",
        src:"/img-3.png",
        price:"20$"
    },
    {
        name:"dinner",
        src:"/img-4.png",
        price:"20$"
    },
    {
        name:"lunch",
        src:"/img-5.png",
        price:"20$"
    },
    {
        name:"breakfast",
        src:"/img-6.png",
        price:"20$"
    },
    {
        name:"lunch",
        src:"/img-7.png",
        price:"10$"
    },
    {
        name:"dinner",
        src:"/img-8.png",
        price:"30$"
    },
    {
        name:"breakfast",
        src:"/img-9.png",
        price:"10$"
    }
]






const foodContainer = document.getElementById('food-container');
const orderContainer = document.getElementById('order-container');
const search = document.getElementById('search');
const homeBtn = document.getElementById('home-btn');
const orders = document.getElementById('orders-btn')


//display food add the food items when page reload using allFood array

const displayFood = (food) => {
  
    let foodBox = document.createElement('div')
    foodBox.classList.add('food-box')

    foodBox.innerHTML = `
    
    <img src=${food.src}></img>
    <h3>${food.name}</h3>
    <b>${food.price}</b>
    <button onclick="orderFood(this)">Order Now</button>
    `
    foodContainer.appendChild(foodBox)

}

allFood.forEach((food)=>{
    displayFood(food)
})

//displayFood function work complete

//search code start

const foodNames = document.querySelectorAll('h3')

search.addEventListener('keyup',()=>{
   
    let searchValue = search.value.toUpperCase()
   
    
         foodNames.forEach((food)=>{
            if(food.textContent.toUpperCase().indexOf(searchValue)> -1){
                food.parentElement.style.display=""
            }else{
                food.parentElement.style.display="none"
            }

         })
   
})





orders.addEventListener('click',()=>{
 foodContainer.style.display="none"   
 orderContainer.style.display=""  

 homeBtn.style.textDecoration="none"
    orders.style.textDecoration="underline"

})

homeBtn.addEventListener('click',()=>{
    foodContainer.style.display=""   
    orderContainer.style.display="none"   
    homeBtn.style.textDecoration="underline"
    orders.style.textDecoration="none"
   })




function updateLs(){
    localStorage.setItem('arr',JSON.stringify(arr))
    localStorage.setItem('count',count)
}

let count= localStorage.getItem('count') || 0
const total = document.getElementById('total')
total.innerHTML=count;
function orderFood(btn){
   
   
    
    let food = currFood(btn)
    if(isPresent(food)){
        alert("Food is already present")
    }else{
        btn.parentElement.style.display="none"
        addFood(food)    
        pushFood(food)
       
        
    }
   
    
}

function isPresent(food){
    let count=0
    arr.forEach((curFood)=>{
        if(curFood.src==food.src){
            count++;
        }
    })
    if(count==0){
        return false
    }else{
        return true
    }
}

function addFood(food){
     let foodBox = document.createElement('div')
     foodBox.classList.add('food-box');
     foodBox.innerHTML = `
    
    <img src=${food.src}></img>
    <h3>${food.name}</h3>
    <b>${food.price}</b>
    <button onclick="removeFood(this)">Remove</button>
    
    `
    orderContainer.appendChild(foodBox)
   
}


const arr = JSON.parse(localStorage.getItem('arr')) || []

arr.forEach((food)=>{
    addFood(food)
})

function pushFood(food){
    count++
    total.innerHTML=count
   arr.push(food)
    updateLs()
}

function popFood(food){

    arr.forEach((ele,index)=>{
        if(ele.src==food.src){
            arr.splice(index,1)
        }
    })
    count--;
    total.innerHTML=count
    updateLs()
}

function removeFood(btn){
    btn.parentElement.style.display="none"
    let food = currFood(btn)
   
    popFood(food)  
}


function currFood(btn){
   
    let foodsrc = btn.parentElement.firstElementChild.src;
    let foodname = btn.parentElement.querySelector('h3').textContent;
    let foodprice = btn.previousElementSibling.textContent;
    
    
    let food = {
        src:foodsrc,
        name:foodname,
        price:foodprice
    }
    return food
}

