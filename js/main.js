function MainModule(listingsID = "#listings") {
  const me = {};


  const listingsElement = document.querySelector(listingsID);
  function getListingCode(listing) {
    const accId = `accordion-${listing.id}`;

    return `
  <div class="col-4 mb-4">
    <div class="listing card h-100">
      <img
        src="${listing.picture_url}"
        class="card-img-top"
        alt="AirBNB Listing Thumbnail"
      />

      <div class="card-body">
        <h2 class="card-title">${listing.name}</h2>

        <div class="accordion" id="${accId}">

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#desc-${listing.id}">
                Description
              </button>
            </h2>
            <div
              id="desc-${listing.id}"
              class="accordion-collapse collapse"
              data-bs-parent="#${accId}">
              <div class="accordion-body">
                ${listing.description}
              </div>
            </div>
          </div>

          <!-- Price -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#price-${listing.id}">
                Price
              </button>
            </h2>
            <div
              id="price-${listing.id}"
              class="accordion-collapse collapse"
              data-bs-parent="#${accId}">
              <div class="accordion-body">
                ${listing.price}
              </div>
            </div>
          </div>

          <!-- Host -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#host-${listing.id}">
                Host
              </button>
            </h2>
            <div
              id="host-${listing.id}"
              class="accordion-collapse collapse"
              data-bs-parent="#${accId}">
              <div class="accordion-body">
                <p><strong>${listing.host_name}</strong><p>
                <img
                  src="${listing.host_picture_url}"
                  alt="${listing.host_name}"
                  class="img-fluid rounded"
                />
              </div>
            </div>
          </div>

          <!-- Amenities -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#amenities-${listing.id}">
                Amenities
              </button>
            </h2>
            <div
              id="amenities-${listing.id}"
              class="accordion-collapse collapse"
              data-bs-parent="#${accId}">
              <div class="accordion-body">
                ${Array.isArray(listing.amenities)
        ? listing.amenities.join(", ")
        : listing.amenities}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  `;
  }


  function redraw(listings) {
    listingsElement.innerHTML = "";
    // for (let i = 0; i < listings.length; i++) {
    //   listingsElement.innerHTML += getListingCode(listings[i]);
    // }

    // for (let listing of listings) {
    //   console.log("listing", listing );
    //   listingsElement.innerHTML += getListingCode(listing);
    // }

    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();


    me.redraw(listings.slice(0, 50));
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();


main.loadData();
console.log("Yuh")