const loadPhones = async(dataLimit, searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    displayPhones(dataLimit, data.data);
}

const displayPhones = (dataLimit, phones) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent='';

    //if no phone is found
    const notFound = document.getElementById('not-found-warning');
    if(phones.length === 0)
        {
            notFound.classList.remove('d-none');
        }
    else
    {
        notFound.classList.add('d-none');
    }
    //display 10 phones only
    const showAllBtn = document.getElementById('show-all-btn');
    if(dataLimit && phones.length>dataLimit)
    {
        phones=phones.slice(0,dataLimit);
        showAllBtn.classList.remove('d-none');
    }
    else{
        showAllBtn.classList.add('d-none');
    }
    
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        <div class="card h-70 p-3">
            <img class="img-fluid" src="${phone.image}" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${phone.phone_name}</h5>
                    <div onclick="loadPhoneDetails('${phone.slug}')" class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" >Show Details</div>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    //stop loader
    toggleSpinner(false);
}

const processSearch = dataLimit =>
{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(dataLimit, searchText);
}

// type the type of phone to search say iphone, oppo, samsung and press search btn
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    // here we defined how many phones will be shown by default search
    processSearch(9);
})

//search by pressing 'enter' in the input field
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(9);
    }
});

document.getElementById('btn-show-all').addEventListener('click', function(){
    // here we fetch all the phones from database again to show all
    processSearch();
});


const toggleSpinner = isLoading =>{
    const loaderCheck = document.getElementById('loader');
    if(isLoading)
        loaderCheck.classList.remove('d-none');
    else
        loaderCheck.classList.add('d-none');
}

const loadPhoneDetails = async(slug) =>{
    url = ` https://openapi.programming-hero.com/api/phone/${slug}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phoneDetail =>{
    const phoneModalLabel = document.getElementById('phone-modal-label');
    const phoneModalBody = document.getElementById('phone-modal-body');
    phoneModalLabel.innerHTML = 
    `
    <img src="${phoneDetail.image}">
    <h4>Phone Name: ${phoneDetail.phone_name}</h4>
    `;
    phoneModalBody.innerHTML = `
    <p>Brand Name: ${phoneDetail.brand}</p>
    <p>Slug: ${phoneDetail.slug}</p>
    `;
}

// loadPhones();