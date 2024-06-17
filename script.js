
let regionalData = [];

// Fetch data from the API
fetch('https://api.rootnet.in/covid19-in/stats/latest')
    .then(response => response.json())
    .then(data => {
        regionalData = data.data.regional;

        // create dropdown with region names
        const dropdown = document.getElementById('regionDropdown');
        regionalData.forEach(region => {
            const option = document.createElement('option');
            option.value = region.loc;
            option.textContent = region.loc;
            dropdown.appendChild(option);
        });

        // Display all regions initially
        displayRegion('All');
    })
    .catch(error => console.error('Error fetching data:', error));

function displayRegion(selectedRegion) {
    const cardsRow = document.getElementById('cards-row');
    cardsRow.innerHTML = '';

    const filteredData = selectedRegion === 'All' ? regionalData : regionalData.filter(region => region.loc === selectedRegion);

    filteredData.forEach(region => {
        const card = document.createElement('div');
        card.className = 'col-12 col-sm-6 col-md-4 mb-4';

        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body" style="align-items:center;">
                    <i class="fas fa-virus card-icon"></i>
                    <h5 class="card-title">${region.loc}</h5>
                    <p class="card-text"><strong>Total Confirmed:</strong> ${region.totalConfirmed}</p>
                    <p id="cardr"><strong>Recovered:</strong> ${region.discharged}</p>
                    <p id="cardd"><strong>Deaths:</strong> ${region.deaths}</p>
                </div>
            </div>
        `;

        cardsRow.appendChild(card);
    });
}