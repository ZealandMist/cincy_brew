async function getBreweries() {
  let url = 'https://api.openbrewerydb.org/breweries?by_city=cincinnati&sort=name:asc';
  try {
      let response = await fetch(url);
      if(response.ok) {
        let jsonResponse = await response.json();
        console.log('Success!'); 
        return jsonResponse;
      }
      throw new Error('Request FAILED!')
  } catch (error) {
      console.log(error);
  }
}

async function renderBreweries() {
  let breweries = await getBreweries();
  let html = '';

  for(let i = 0; i < breweries.length; i++) {
    let phoneNumber = breweries[i].phone;
    let brew_type = breweries[i].brewery_type
    
    let htmlSegment = `<div class="brewery">
    <h2>${breweries[i].name}</h2>
      <div class="brew-type"><h4>${capitalizeFirstLetter(brew_type)} Bewery</h4></div>
      <ol>
        <li>${breweries[i].street}</li>
        <li>${breweries[i].city}, ${breweries[i].state} ${breweries[i].postal_code}</li>
        <li>${formatPhone(phoneNumber)}</li>
        <li><a href="${breweries[i].website_url}" target="_blank">${breweries[i].website_url}</a></li>
      </ol>
    </div>`;

    html += htmlSegment;
  }
  let container = document.querySelector('.container');
  container.innerHTML = html;
}

function formatPhone(phone) {
  let cleaned = ('' + phone).replace(/\D/g, '')
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return phone
} 

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

renderBreweries(); 
