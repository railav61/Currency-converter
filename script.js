const base_url = "https://api.frankfurter.app/latest?amount=1&from=USD&to=INR";

const drpdwn = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg  = document.querySelector(".msg");

for(let select of drpdwn){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "to" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "from" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}


const updateflag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval==="" || amtval < 0){
        amtval = 1;
        amount.value = "1";
    }
    const URL = `https://api.frankfurter.app/latest?amount=${amtval}&from=${fromcurr.value}&to=${tocurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let arr = Object.values(data);
    let rate = Object.values(arr[3]);
    msg.innerText = `${amtval} ${fromcurr.value} = ${rate[0]} ${tocurr.value}`;
    
})