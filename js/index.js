// load data 
const searchPhone =()=>{
    const searchField =document.getElementById("search-field")
    const searchText =searchField.value;

    searchField.value ='';
    // empty string error handle 
    if(searchText==''){
    

    document.getElementById("search-result").textContent="please write something";
    }
    else{
        const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySearchResult(data.data))

    }
   
}
// show result 
const displaySearchResult =mobiles=>{
    const searchResult =document.getElementById("search-result");
    
    searchResult.innerHTML='';

    if(mobiles.length==0){
        console.log("none"); 
       const showField = document.getElementById("search-result");
       showField.innerText="No result found";

       showField.style.fontSize="24px";
        
        
    }
    else{

        

    mobiles.slice(0, 20) 
    .forEach(mobile=>{
       
        
        const div =document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div class="card h-100">
           <img src="${mobile.image}" class="card-img-top" alt="...">
           <div class="card-body">
              <h5 class="card-title">${mobile.brand}</h5>
              <p class="card-text">${mobile.phone_name}</p>
              <button onclick="loadMobileDetail('${mobile.slug}')">Details</button>
           </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}
    
}
//  load id 
const loadMobileDetail =mobileId=>{
    const url =`https://openapi.programming-hero.com/api/phone/${mobileId}`;

    fetch(url)
    .then(res=>res.json())
    .then(data=>displayMobileDetail(data.data));

} 
// show mobile detail 
const displayMobileDetail =mobile=>{
    
    const mobileDiv =document.getElementById("mobile-detail");
    mobileDiv.textContent='';

    const div =document.createElement("div");
        div.classList.add('card')
     
        
    div.innerHTML =`
    
            <img src="${mobile.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h4 class="card-title">${mobile.name}</h4>
              <p class="card-text">${mobile.releaseDate?mobile.releaseDate:"realse date not found"
            }
            
              <h5>Main Features:</h6>
              <h6>Storage:</h6>${mobile.mainFeatures.storage}
              <h6>Display-Size:</h6>${mobile.mainFeatures.displaySize}
              <h6>Chipset:</h6>${mobile.mainFeatures.chipSet}
              <h5>Sensors:</h5>${mobile.mainFeatures.sensors.map(item=>item)}
              <h5>:Others</h5><h6>WLAN:</h6>${mobile.others.WLAN?mobile.others.WLAN:"NO"}
              <h6>Blutooth:</h6>${mobile.others.Bluetooth?mobile.others.Bluetooth:"NO"}
              <h6>GPS:</h6>${mobile.others.GPS?mobile.others.GPS:"NO"}
              <h6>NFC:</h6>${mobile.others.NFC?mobile.others.NFC:"NO"}
              <h6>Radio:</h6>${mobile.others.Radio?mobile.others.Radio:"NO"}
              <h6>USB:</h6>${mobile.others.USB?mobile.others.USB:"NO"}

           

            </p>
            
            </div>

    `;
    
    mobileDiv.appendChild(div);
}