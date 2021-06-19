const BASE_URL = 'https://api.exchangerate.host/latest'
const rateList = document.querySelector('#rate-list');
const baseCurrency = document.querySelector('#base-currency');
const btnAdd = document.querySelector('#search-button'); 
const ERROR_MESSAGE = 'Algo está errado, tente novamente mais tarde'

const renderRates = (base, rates) => {  
  const ratesEntries = Object.entries(rates); // pegas todas as entradas de cotações
  // console.log(ratesEntries); // mostra vários arrays das rates
  baseCurrency.innerHTML = `Moeda: ${base}`;

  ratesEntries.map(([key, value]) => { // desestrutura a rateEntries
    // console.log(key, value); // mostra a lista de cotações com ex: ["WST", 0.503749]
    const rateValues = document.createElement('li');
    rateValues.innerHTML = `${key}: $ ${value}`;
    rateList.appendChild(rateValues);
  })
}

const cleanRates = () => {
  rateList.innerHTML = '';
}

// const fetchCurrency = (currency) => {
//   fetch(`${BASE_URL}?base=${currency}`) // pega a variavel com a URL e faz o fetch
//   .then((response) => response.json()) // aqui faz chamada da promise de cima
//   .then(({ base, rates }) => {
//     // const { base, rates } = object; //destructor com chaves pois é um ojeto
//     // console.log(object); // mostra a 'base' BRL e 'rates' que são as cotações
//     cleanRates();
//     renderRates(base, rates);     
//   })
//   .catch(() => {
//       alert(ERROR_MESSAGE);
//   })
// }

const fetchCurrencyAsync = async (currency) => {
  try {
    const response = await fetch(`${BASE_URL}?base=${currency}`);
    const object = await response.json();
    const {base , rates} = object; // poderia desconstruir na linha anterior "const {base , rates} = await response.json();"
    cleanRates();
    renderRates(base, rates); 
  } catch(error) {
    alert(ERROR_MESSAGE);
  }
}


const setupEvents = () => {
  btnAdd.addEventListener('click', () => {
    const valueInput = document.querySelector('#currency-input');
    fetchCurrencyAsync(valueInput.value);
    valueInput.value = '';
  })
}

window.onload = () => {
  setupEvents();
  // fetchCurrency('BRL');
  fetchCurrencyAsync('BRL');
}
 