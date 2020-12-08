var apiData = {}

// Se os dados não foram requisitados, a api é chamada
if (!sessionStorage.getItem('apiData')) {
  console.log('Api chamada')
  document.querySelector(".loading-mode").innerHTML = ' <p class="lead text-danger"> Dados carregados pela API <\p>'
  let apiKey = {key: '5e58f31a-337d-4b9b-94ac-366510957a93'}
  // Get Fetch Requisition
  fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY='+apiKey.key)
    .then((response) => {
      if (!response.ok) throw new Error('Erro ao executar a requisição, status ' + response.status);
        return response.json();
    })
    .then((api) => {
      apiData = api;
      sessionStorage.setItem('apiData', JSON.stringify(apiData));
      
      // Só chama da função após os dados serem obtidos
      // Devido ao "hoisting" posso chamar a função antes de ser declarada
      autoInsertInformations()  
    })
    .catch((error) => {
      console.log(error.message);
    })
} else {
  console.log('usando dados da Sessão do navegador')
  document.querySelector(".loading-mode").innerHTML = ' <p class="lead text-danger"> Dados carregados da seção local <\p>'
  apiData = JSON.parse(sessionStorage.getItem('apiData'))
  insertInformations()
}


function insertInformations() {
  var texto = ``
  // pegar os valores das primeiras 10 moedas
  for (let i = 0; i < 10 ;i++) {
    
    texto += `
      <tr class=" ${(i%2 === 0) ? 'table-active' : ''}">
        <th scope="row">${apiData.data[i].name}</th>
        <td>${apiData.data[i].symbol}</td>
        <td>${apiData.data[i].rank}</td>
        <td>${apiData.data[i].first_historical_data}</td>
        <td>${(apiData.data[i].is_active == 1) ? 'sim' : 'não'}</td>
      </tr>
    `
  }
  texto += ``
  document.getElementById("autocomplete").innerHTML = texto
}

function autoInsertInformations() {
  insertInformations()
}
