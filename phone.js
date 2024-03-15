const loadPhone = async (searchText = 13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAll = document.getElementById('show-all')
    if (phones.length > 12 && !isShowAll) {
        showAll.classList.remove('hidden')
    }
    else {
        showAll.classList.add('hidden')
    }
    // showing 12 item
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }


    // console.log(phones.length)


    // showing the item card
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList = `card bg-base-100 border border-gray-200`;
        phoneDiv.innerHTML = `
                    <figure class="px-7 pt-7">
                      <img src="${phone.image}" alt="phone" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="text-3xl font-bold">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <h2 class="text-2xl font-bold">$999</h2>
                      <div class="card-actions">
                        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `
        phoneContainer.appendChild(phoneDiv)
    });

    // hide loading spinner
    toggleLaodingSpinner(false)
}

const handleSearch = (isShowAll) => {
    toggleLaodingSpinner(true)
    const searchField = document.getElementById('search-field').value;
    // console.log(searchField)
    loadPhone(searchField, isShowAll)
}


const handleShowDetail = async (id) => {
    console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data
    handleModal(phone)
}


const handleModal = (phone) => {
    const showDetailModalContainer = document.getElementById('show-detail-modal-container');
    showDetailModalContainer.innerHTML = `
    <img src="${phone.image}" alt="" class="w-full px-20 pt-10">
    <h3 class="font-bold text-3xl">${phone.name}</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <p><span class="font-bold">Storage :</span> ${phone.mainFeatures.storage}</p>
    <p><span class="font-bold">Display Size :</span> ${phone.mainFeatures.displaySize}</p>
    <p><span class="font-bold">Chipset :</span> ${phone.mainFeatures.chipSet}</p>
    <p><span class="font-bold">Memory :</span> ${phone.mainFeatures.memory}</p>
    <p><span class="font-bold">Slug :</span> ${phone.slug}</p>
    <p><span class="font-bold">Release data :</span> ${phone.releaseDate}</p>
    <p><span class="font-bold">Brand :</span> ${phone.brand}</p>
    <p><span class="font-bold">GPS :</span> ${phone.others?.GPS || 'No GPS'}</p>
    <div class="modal-action">
        <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
        </form>
    </div>
    `
    console.log(phone)
    show_details_modal.showModal()
}

const toggleLaodingSpinner = (isLoading) => {
    const laodingSpinner = document.getElementById('laoding-spinner');
    if (isLoading) {
        laodingSpinner.classList.remove('hidden')
    }
    else {
        laodingSpinner.classList.add('hidden')
    }
}

const handleShowAll = () => {
    handleSearch(true)
}

loadPhone()