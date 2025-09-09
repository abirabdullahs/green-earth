let price = 0;


const manageSpinner = (serial,status) =>{

      if(serial === "catagory"){
              if(status){
                    document.getElementById("spinner-1").classList.remove("hidden");
                    document.getElementById("catagories_container").classList.add("hidden");
              }else{
                    document.getElementById("catagories_container").classList.remove("hidden");
                    document.getElementById("spinner-1").classList.add("hidden");
              }
      }


      else if(serial === "plants"){
              if(status){
                    document.getElementById("spinner-2").classList.remove("hidden");
                    document.getElementById("plants").classList.add("hidden");
              }else{
                    document.getElementById("plants").classList.remove("hidden");
                    document.getElementById("spinner-2").classList.add("hidden");
              }
      }

}




function loadAllPlants() {
    manageSpinner("plants",true);
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
    .then (res => res.json())
    .then (data => showPlants(data.plants));
}

const showPlants = (plants) =>{
     const container = document.getElementById("plants");
    container.innerHTML = "";

    plants.forEach(element => {

        const div = document.createElement("div");
        div.innerHTML = `

                <div class="max-w-full bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 p-4 flex flex-col">

  <!-- Image Fixed Size -->
  <div class="w-full h-48 mb-4 overflow-hidden rounded-lg">
    <img src="${element.image}" alt="" 
         class="w-full h-full object-cover rounded">
  </div>

  <!-- Card Content -->
   <button onclick="plantDetails(${element.id})"><h2 id="name-${element.id}" class="text-lg font-semibold text-gray-800">${element.name}</h2></button>

  <!-- Description Limited -->
  <p class="text-sm text-gray-500 mt-1 line-clamp-3">
    ${element.description}
  </p>

  <!-- Category & Price -->
  <div class="flex items-center justify-between mt-3">
    <span class="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">${element.category}</span>
    <span class="font-semibold text-gray-800">৳${element.price}</span>
  </div>

  <!-- Button pushed to bottom -->
  <button onclick="showHistory('${element.name}', ${element.price})"  
    class="cart-btn-${element.id} cart-btn w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-full transition">
    Add to Cart
  </button>

</div>

            
            `

            container.append(div);

            //  document.getElementById(`name-${element.id}`).addEventListener("click",my_modal_1.showModal());

    });

    manageSpinner("plants",false);

}


loadAllPlants();


function loadCatagories() {

    manageSpinner ("catagory",true);
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url).then(res => res.json()).then(data => showCatagories(data.categories));

}


function plantByCatagories(id) {
  manageSpinner("plants",true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
   fetch(url).then(res => res.json()).then(data => showPlantByCatagories(data.plants));
}


async function plantDetails(id) {
  // Show modal and spinner immediately
  const container = document.getElementById("plantDetailes");
  container.innerHTML = `<div class="flex justify-center items-center min-h-[200px] w-full"><span class="loading loading-dots loading-lg"></span></div>`;
  document.getElementById("my_modal_1").showModal();

  // Fetch data
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showPlantDetails(data.plants);
}


const showCatagories = (categories) => {
  const container = document.getElementById("catagories_container");
  container.innerHTML = "";

  // Add 'All Plants' button at the top
  const allBtnDiv = document.createElement("div");
  allBtnDiv.innerHTML = `
    <button onclick="handleAllPlants()" class="text-black text-left w-full bg-green-50 hover:bg-[#15803D] p-3 rounded border border-green-300 md:border-0 hover:text-white  mb-3" id="ctg-all">All Plants</button>
  `;
  container.append(allBtnDiv);

  categories.forEach(element => {
    const catagoryName = document.createElement("div");
    catagoryName.innerHTML = `
      <button onclick="handleActive(${element.id})" class="text-black text-left w-full hover:bg-[#15803D] p-3 rounded  border border-green-300 md:border-0 hover:text-white btn-ctg mb-3" id="ctg-${element.id}">${element.category_name}</button>
    `;
    container.append(catagoryName);
  });

  manageSpinner ("catagory",false);
}
// Handle All Plants button click
function handleAllPlants() {
  loadAllPlants();
  removeActive();
  // Set active class to All Plants button
  document.getElementById("ctg-all").classList.add("active");
}


loadCatagories();

const handleActive = (id) => {

    plantByCatagories(id);

    removeActive();

    document.getElementById(`ctg-${id}`).classList.add(`active`)



}


const removeActive = () => {
    const classes = document.querySelectorAll(".active")

    classes.forEach(element => {
        element.classList.remove(`active`);
    });
}



const showPlantByCatagories = (plants) => {

    const container = document.getElementById("plants");
    container.innerHTML = "";

    plants.forEach(element => {

        const div = document.createElement("div");
        div.innerHTML = `

                <div class="max-w-full bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 p-4 flex flex-col">

  <!-- Image Fixed Size -->
  <div class="w-full h-48 mb-4 overflow-hidden rounded-lg">
    <img src="${element.image}" alt="" 
         class="w-full h-full object-cover rounded">
  </div>

  <!-- Card Content -->
   <button onclick="plantDetails(${element.id})"><h2 id="name-${element.id}" class="text-lg font-semibold text-gray-800">${element.name}</h2></button>

  <!-- Description Limited -->
  <p class="text-sm text-gray-500 mt-1 line-clamp-3">
    ${element.description}
  </p>

  <!-- Category & Price -->
  <div class="flex items-center justify-between mt-3">
    <span class="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">${element.category}</span>
    <span class="font-semibold text-gray-800">৳${element.price}</span>
  </div>

  <!-- Button pushed to bottom -->
  <button onclick="showHistory('${element.name}', ${element.price})"  
    class="cart-btn-${element.id} cart-btn w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-full transition">
    Add to Cart
  </button>

</div>

            
            `

            container.append(div);


            // document.getElementById(`name-${element.id}`).addEventListener("click",my_modal_1.showModal());

    });

    manageSpinner("plants",false);

}




const showHistory = (name, value) => {
    alert(`you selected ${name}, cost : ${value}`)
    const history = document.getElementById("history");
    const div = document.createElement("div");
    div.classList.add("cross_container")
    // div.classList.add("flex")
    // div.classList.add("justify-between")

    div.innerHTML = `
        <div class="max-w-full bg-green-50 rounded-2xl p-4 flex justify-between items-center shadow-sm mb-2">
            <div>
                <h2 class="text-lg font-semibold text-gray-900">${name}</h2>
                <p class="text-gray-500">৳${value} × 1</p>
            </div>
            <button id = "cross" onclick="removeHistory(this,${value})" class=" cross-btn text-gray-400 hover:text-gray-600">❌</button>
        </div>
    `;
    history.append(div);

   

    price = price + value;
    console.log(price);

    const priceContainer = document.getElementById("price");
    priceContainer.innerHTML="";
    const element = document.createElement("div");
    element.innerHTML = `
    
            <div class="flex justify-between mx-5">
      <div><p>Total: </p></div>
      <div>৳${price}</div>
        </div>
    
    `

    priceContainer.append(element);

    if (price === 0) {
        element.innerHTML = "";
    }

}


function removeHistory(button,value) {
    button.closest(".cross_container").remove();
    price = price - value;

    const priceContainer = document.getElementById("price");
    priceContainer.innerHTML="";
    const element = document.createElement("div");
    element.innerHTML = `
    
            <div class="flex justify-between mx-5">
      <div><p>Total: </p></div>
      <div>৳${price}</div>
        </div>
    
    `

    priceContainer.append(element);

    if (price === 0) {
        element.innerHTML = "";
    }
}



const showPlantDetails = (element)=>{

   const container = document.getElementById("plantDetailes");
    container.innerHTML = "";

 

        const div = document.createElement("div");
        div.innerHTML = `

                <div class="max-w-sm bg-white rounded-2xl overflow-hidden p-4 flex flex-col">

  <!-- Card Content -->
   <h2 id="name-${element.id}" class="text-lg font-semibold text-black mb-5">${element.name}</h2>
  <!-- Image Fixed Size -->
  <div class="w-full h-50 mb-4 overflow-hidden rounded-lg">
    <img src="${element.image}" alt="" 
         class="w-full h-full object-cover rounded">
  </div>

  <div>
 <p> <span class="font-bold ">category: </span> ${element.category} </p>
 <p> <span class="font-bold ">price: </span> ৳${element.price} </p>
  </div>

  <!-- Description Limited -->
  <p class="text-sm text-gray-500 mt-1">
   <span class="font-semibold text-black">Description: </span> ${element.description}
  </p>

</div>

            
            `

            container.append(div);


            // document.getElementById(`name-${element.id}`).addEventListener("click",my_modal_1.showModal());

   


    document.getElementById("my_modal_1").showModal();

}





