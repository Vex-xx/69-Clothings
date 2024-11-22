let itemsContainer = document.querySelector(".itemsContainer");
let body = document.body;
let btnAdd,popUp;
let filter = document.querySelector(".filter");
let select = document.querySelector(".select");
let filter_option = document.querySelectorAll(".filter-option");
let type = "All";
let selected = document.querySelector(".default");
let item;
let shoppingCart = document.querySelector(".cartContainer");
let p = document.querySelector("#temp");
let cartList = [];
let index = 0;
let list,no,quantity,totalPrice;
let totalAmount = document.querySelector(".amount");
let totalQuantity = document.querySelector(".totalQuantity");
let total = 0;
let exist = false;
let btnMinus,btnPlus;
let btnHomePage = document.querySelector(".btnHome");
let btnPayment = document.querySelector(".btnPayment");
let paymentContainer = document.querySelector(".paymentContainer");
let method1 = document.querySelector(".method1");
let method2 = document.querySelector(".method2");
let method1QR = document.querySelector(".method1QR");
let method2QR = document.querySelector(".method2QR");
let close = document.querySelectorAll(".close");
let back = document.querySelector(".back");
let paymentInstruction = document.querySelector(".paymentInstruction");
let formContainer = document.querySelector(".formContainer");
let form = document.querySelector(".form");

let darkmode = document.querySelector(".mode-svg");
let mode = document.querySelector(".mode-svg");

if(darkmode){
    darkmode.addEventListener("click",() => {
        if(body.classList.contains("darkmode")){
            body.classList.remove("darkmode");
            sessionStorage.removeItem("darkmode");
            mode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>`;
        }

        else{
            body.classList.add("darkmode");
            sessionStorage.setItem("darkmode","dark");
            mode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>`;
        }
    })
}

if(sessionStorage.getItem("darkmode")){
    window.addEventListener("load", () => {
        body.classList.add("darkmode");
    })
}

class Item{
    constructor(id,name,type,color,img,price){
        this.id = id;
        this.name = name;
        this.type = type;
        this.color = color;
        this.img = img;
        this.price = price;
        this.quantity = 1;
    } 
}

let products = [];
products[0] = new Item(1,"Blue T-shirt","T-shirt","Blue","1.png",5000);
products[1] = new Item(2,"Red T-shirt","T-shirt","Red","2.png",5000);
products[2] = new Item(3,"Green T-shirt","T-shirt","Green","3.png",5000);
products[3] = new Item(4,"Blue Hoodie","Hoodie","Blue","4.png",10000);
products[4] = new Item(5,"Black Hoodie","Hoodie","Black","5.png",10000);
products[5] = new Item(6,"Khaki Hoodie","Hoodie","Khaki","6.png",10000);
products[6] = new Item(7,"Khaki Pants","Pants","Khaki","7.png",8000);
products[7] = new Item(8,"Gray Pants","Pants","Gray","8.png",8000);
products[8] = new Item(9,"Blue Pants","Pants","Blue","9.png",8000);
products[9] = new Item(10,"T-shirt","T-shirt","Black","10.png",10000);
products[10] = new Item(11,"T-shirt","T-shirt","Gray","11.png",10000);
products[11] = new Item(12,"T-shirt","T-shirt","Black","12.png",10000);

const addAllItem = () => {
    products.forEach((value,key) => {
        let newItem = document.createElement("div");
    
            newItem.innerHTML = `
            <img src = "${value.img}">
            <p class="itemName">${value.name}</p>
            <P class="itemPrice">${value.price} Ks</p>
            <span class="popUp">Add to cart</span>
            <button class="btnAdd" onclick="addToCart(${key});"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg></button>
            `
            
            newItem.classList.add("item");
            itemsContainer.appendChild(newItem);
    })
}

if(itemsContainer){
    addAllItem();

    btnAdd = document.querySelectorAll(".btnAdd");
    popUp = document.querySelectorAll(".popUp");
    item = document.querySelectorAll(".item");
}

const displayAllItem = () => {
    products.forEach((value,key) => {
        item[key].style.display = "flex";
    })
}

const filterItem = (type) => {
    displayAllItem();
    if(type != "All"){
        products.forEach((value,key) => {
            if(value.type != type){
                item[key].style.display = "none";
            }
        })
    }
}

if(sessionStorage.getItem("type")){
    type = sessionStorage.getItem("type");    
    if(selected){
        selected.textContent = type;
        filterItem(type);
    }
}

if(filter_option){
    for(let i = 0; i < filter_option.length; i++){
        filter_option[i].addEventListener("click",() => {
            type = filter_option[i].textContent;
            sessionStorage.setItem("type",type);
            selected.textContent = type;

            if(type === "All"){
                displayAllItem();
            }
            else{
                filterItem(type);
            }            
        })
    }
}

if(filter){
    filter.addEventListener("click",() => {
        select.classList.toggle("filter-active");
    })

    filter.addEventListener("mouseover",() => {
        select.classList.add("filter-active");
    })

    filter.addEventListener("mouseout",() => {
        select.classList.remove("filter-active");
    })
}

if(sessionStorage.getItem("item")){
    cartList = JSON.parse(sessionStorage.getItem("item"));
}

if(sessionStorage.getItem("index")){
    index = sessionStorage.getItem("index");
}

if(sessionStorage.getItem("total")){
    total = sessionStorage.getItem("total");
    if(totalQuantity){
        totalQuantity.innerHTML = sessionStorage.getItem("total");
    }
}
else{
    if(totalQuantity){
        totalQuantity.innerHTML = 0;
    }
}

if(btnAdd){
    btnAdd.forEach((btnAdd,key) => {
        btnAdd.addEventListener("mouseover",() => {
            popUp[key].style.visibility = "visible";
        })
    
        btnAdd.addEventListener("mouseout",() => {
            popUp[key].style.visibility = "hidden";
        })
    })

    if(sessionStorage.getItem("btnAdded")){
        for(let value of cartList){
            for(let key = 0; key < products.length; key++){
                if(value.id === products[key].id){
                    btnAdd[key].classList.add("btnAdded");
                    popUp[key].innerHTML = "Added";
                    break;
                }
            }
        }
    }
}

const addToCart = (key) => {
    if(sessionStorage.getItem("item")){
        exist = !cartList.every((value) => value.id != products[key].id);
    }

    if(!exist){
        cartList[index++] = products[key];
        sessionStorage.setItem("item",JSON.stringify(cartList)); 
        sessionStorage.setItem("index",index);

        total++;
        totalQuantity.textContent = total;
        sessionStorage.setItem("total",total);

        btnAdd[key].classList.add("btnAdded");                
        sessionStorage.setItem("btnAdded","btnAdded");

        popUp[key].textContent = "Added";
    }  

    else{
        btnAdd[key].classList.remove("btnAdded");  
        popUp[key].textContent = "Add to cart";

        for(let i = 0; i < cartList.length; i++){
            if(cartList[i].id === products[key].id){
                cartList.splice(i,1);
                index -= 1;
                break;
            }
        }         
        sessionStorage.setItem("index",index); 
        sessionStorage.setItem("item",JSON.stringify(cartList)); 

        totalQuantity.textContent = --total; 
        sessionStorage.setItem("total",total);  
        
        if(isEmpty(cartList)){
            cartList = [];
            index = 0;
            exist = false;
            sessionStorage.setItem("index",index);
            sessionStorage.removeItem("item");  
        }   
    }
}

const reload = () => {
    no = document.querySelectorAll(".no");
    btnMinus = document.querySelectorAll(".btnMinus");
    btnPlus = document.querySelectorAll(".btnPlus");
    list = document.querySelectorAll(".list");
    quantity = document.querySelectorAll(".quantity"); 
    totalPrice = document.querySelectorAll(".totalPrice");
    
    cartList.forEach((value,key) => {
        no[key].textContent = key + 1;
        btnMinus[key].onclick = () => {
            quantityMinus(key);
        };
        btnPlus[key].onclick = () => {
            quantityPlus(key)
        };
    })
}

const reloadAmount = () => {
    let total,amount = 0;
    cartList.forEach((value,key) => {
        total = value.price * value.quantity;
        amount += total;
    })
    totalAmount.textContent = amount;
}

if(form){
    form.addEventListener("submit",() => {
        event.preventDefault();
        paymentContainer.style.display = "flex";
        formContainer.style.display = "none";
    })
}

if(btnPayment){
    btnPayment.addEventListener("click",() => {
        formContainer.style.display = "flex";
    })    
}

if(close[0]){
    close[0].addEventListener("click",() => {        
        formContainer.style.display = "none";
    })
}

if(close[1]){
    close[1].addEventListener("click",() => {
        paymentContainer.style.display = "none";
    })
}

if(back){
    back.addEventListener("click",() => {
        back.style.display = "none";
        method1QR.style.display = "none";
        method2QR.style.display = "none";
        paymentInstruction.textContent = "Choose your Payment method";
    })
}

if(method1){
    method1.addEventListener("click",() => {        
        method1QR.style.display = "block";
        back.style.display = "inline";
        paymentInstruction.textContent = "Scan the QR and Enter this amount '" + totalAmount.textContent + "' Ks";
    })
}

if(method2){
    method2.addEventListener("click",() => {
        method2QR.style.display = "block";
        back.style.display = "inline";
        paymentInstruction.textContent = "Scan the QR and Enter this amount '" + totalAmount.textContent + "' Ks";
    })
}

if(shoppingCart){    
    totalAmount.textContent = 0;
    if(sessionStorage.getItem("item")){
        p.textContent = "";
        cartList = JSON.parse(sessionStorage.getItem("item"));
        let total,amount = 0;                   
        cartList.forEach((value,key)=>{
                total = cartList[key].price * cartList[key].quantity;
                amount += total;                 

                let newDiv = document.createElement("div");
                newDiv.classList.add("list");

                newDiv.innerHTML = `  
                <p class="no"></p>
                <div class="itemImg">
                    <img class="itemImg" src="${cartList[key].img}"></img>                                          
                </div>                            
                <p class="name">${cartList[key].name}</p>
                <p class="itemPriceInCart"><span class="price">${cartList[key].price}</span> Ks</p>                    
                <div class="itemQuantity">
                    <button class="btnMinus">-</button>
                    <p class="quantity">${cartList[key].quantity}</p>
                    <button class="btnPlus">+</button>
                </div>                    
                <p class="itemTotalPrice"><span class="totalPrice">${total}</span> Ks</p>
                `

                shoppingCart.appendChild(newDiv);         
        }) 
        totalAmount.textContent = amount;
        reload();
    }
}

if(btnHomePage){
    btnHomePage.addEventListener("click",() => {
        window.location.href = "index.html";
    })
}

const quantityMinus = (key) => {
    cartList[key].quantity -= 1;  
    quantity[key].textContent = cartList[key].quantity;
    totalPrice[key].textContent = cartList[key].quantity * cartList[key].price;   
    sessionStorage.setItem("item",JSON.stringify(cartList));
    if(cartList[key].quantity < 1){
        cartList.splice(key,1);  
        sessionStorage.setItem("index",--index); 
        list[key].remove();        
        sessionStorage.setItem("total",--total);
        sessionStorage.setItem("item",JSON.stringify(cartList));
        if(isEmpty(cartList)){
            cartList = [];
            sessionStorage.removeItem("index");
            sessionStorage.removeItem("item");  
            p.textContent = "There are no items in the cart";
        }        
        reload();
    }    
    reloadAmount();
}

const quantityPlus = (key) => {
    cartList[key].quantity += 1;
    quantity[key].textContent = cartList[key].quantity;
    totalPrice[key].textContent = cartList[key].quantity * cartList[key].price;
    sessionStorage.setItem("item",JSON.stringify(cartList));
    reloadAmount();
}

const isEmpty = (arr) => {
    return arr.every((value) => value == null);
}
