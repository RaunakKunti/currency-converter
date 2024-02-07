const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const from = document.querySelector("#from");
const to = document.querySelector("#to");
const msg = document.querySelector(".msg");

// for(i in countryList){
//     console.log(i, countryList[i]);
// }

for(let i of dropDowns){
    for(let cuntryCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = cuntryCode;
        newOption.value = cuntryCode;
        if(i.name === "from" && cuntryCode === "USD"){
            newOption.selected = "selected";
        }else if (i.name === "to" && cuntryCode === "INR"){
            newOption.selected = "selected";
        }
        i.append(newOption);

    }
    i.addEventListener("change",(e)=>{
        updateFlag(e.target);
        // console.log(e.target);
    });
}

const updateFlag = (e)=>{
    let currCode = e.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];
    // console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = e.parentElement.querySelector("img");
    // console.log(img);
    img.src = newSrc;
};


const updateRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal>0){
        console.log("all good");
    }
    else{
        alert("wrong input");
        amountVal = 1;
        amount.value = "1";
    }
    // console.log(from.value,to.value);
    const Url = `${baseUrl}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    let response = await fetch (Url);
    let data = await response.json();
    let rate = data[to.value.toLowerCase()];
    
    let finalAmount = amount.value*rate;
    msg.innerText = `${amountVal} ${from.value} = ${finalAmount} ${to.value}`;
}

btn.addEventListener("click",async (e)=>{
    e.preventDefault();  //discard auto refresh on page... all works should done by us
    updateRate();
});
window.addEventListener("load", (e)=>{
    updateRate();
})

