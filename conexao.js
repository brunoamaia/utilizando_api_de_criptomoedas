var apiData = {}

var dataCall = ''

let numberOfLines = 10
let beginTable = 0
let currentPage = 1

// Se os dados não foram requisitados, a api é chamada
if (!sessionStorage.getItem('apiData')) {
  dataCall = 'Dados carregados pela API'

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
      dataCall = 'Os dados Não Foram carregados <br> Verifique os pré-requisitos'
      document.querySelector(".loading-mode").innerHTML = `
        <p class="lead text-danger">
        Os dados Não Foram carregados! <br> Verifique os pré-requisitos!
        <\p>
      `
      console.log(error.message);
    })
} else {
  dataCall = 'Dados carregados da seção local'

  apiData = JSON.parse(sessionStorage.getItem('apiData'))
  insertInformations()
}
document.querySelector(".loading-mode").innerHTML = ` <p class="lead text-danger"> ${dataCall}<\p>`

function insertInformations(page = 1) {

  if (page == 1 || page != currentPage) {
    currentPage = page

    
    beginTable = (currentPage-1) * 10
    
    let texto = ``
    // pegar os valores das primeiras 10 moedas
    for (let i = beginTable; i < (beginTable + numberOfLines) ;i++) {
      texto += `
        <tr class=" ${(i%2 === 0) ? 'table-dark' : 'table-light'}">
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
  
    InsertTablePagination(page)
  }


}

/*
function updateTableData(param) {

  let ordena  = []
  if (param == 0) {
    ordena  = apiData.data.sort(function(a,b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  } else if (param == 1) {
    ordena  = apiData.data.sort(function(a,b) {
      return a.symbol < b.symbol ? -1 : a.symbol > b.symbol ? 1 : 0;
    });
  } else if (param == 2) {
    ordena  = apiData.data.sort(function(a,b) {
      return a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : 0;
    });
  } else if (param == 3) {
    ordena  = apiData.data.sort(function(a,b) {
      return a.first_historical_data < b.first_historical_data ? -1 : a.first_historical_data > b.first_historical_data ? 1 : 0;
    });
  } else if (param == 4) {
    ordena  = apiData.data.sort(function(a,b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  } else if (param == 5) {
    ordena  = apiData.data.sort(function(a,b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  } else if (param == 6) {
    ordena  = apiData.data.sort(function(a,b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  } else if (param == 7) {
    ordena  = apiData.data.sort(function(a,b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  } else if (param == 8) {
    ordena  = apiData.data.sort(function(a,b) {
      return a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : 0;
    });
  }


  let texto = ``
  // pegar os valores das primeiras 10 moedas
  for (let i = 0; i < numberOfLines ;i++) {
    
    texto += `
      <tr class=" ${(i%2 === 0) ? 'table-dark' : 'table-light'}">
        <th scope="row">${ordena[i].name}</th>
        <td>${ordena[i].symbol}</td>
        <td>${ordena[i].rank}</td>
        <td>${ordena[i].first_historical_data}</td>
        <td>${(ordena[i].is_active == 1) ? 'sim' : 'não'}</td>
      </tr>
    `
  }
  texto += ``
  document.getElementById("autocomplete").innerHTML = texto
}
*/

/*pessoas.sort(function(a,b) {
    return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
}) */

function autoInsertInformations() {
  insertInformations()
}

function InsertTablePagination(page = 1) {
  let lastPageNumber = Math.ceil(apiData.data.length/numberOfLines)


  let pages = `<div>
    <ul class="pagination pagination-lg">
    <li class="page-item ${(page == 1) ? 'disabled' : ''} ">
      <a class="page-link" onclick="insertInformations(${1})">&laquo;</a>
    </li>
  `


  function insertNormalPageNumber(number) {
    pages += `
      <li ${(number == page) ? 'class="page-item active"' :'class="page-item"' }>
        <a class="page-link" onclick="insertInformations(${number})">${number}</a>
      </li>
    `
  }
  function insertDotPageNumber () {
    pages += `
      <li class="page-item">
        <a class="page-link">...</a>
      </li>
    `
  }

  if (lastPageNumber < 7) {
    for (let i = 1; i <= lastPageNumber; i++) {
      insertNormalPageNumber(i)
    }
    
  } else {

    if (page < 5) {
      for (let i = 1; i <= 5; i++) {
        insertNormalPageNumber(i)
      }
      insertDotPageNumber()
      insertNormalPageNumber(lastPageNumber)

    } else if (page < lastPageNumber-3 ) {
      insertNormalPageNumber(1)
      insertDotPageNumber()

      for (let i = -1; i < 2; i++) {
        insertNormalPageNumber(page+i)
      }

      insertDotPageNumber()
      insertNormalPageNumber(lastPageNumber)
    } else {
      insertNormalPageNumber(1)
      insertDotPageNumber()

      for (let i = -4; i < 1; i++) {
        insertNormalPageNumber(lastPageNumber+i)
        
      }
    }
    
  }


  
  pages += `
    <li class="page-item ${(page == lastPageNumber) ? 'disabled' : ''}">
      <a class="page-link" onclick="insertInformations(${lastPageNumber})">&raquo;</a>
    </li>
    </ul></div>
  `
  document.querySelector(".tablePagination").innerHTML = ` <p class="lead text-danger"> 
      Quantidade de linhas  = ${apiData.data.length} <br>
      Quantidade de Páginas  = ${ Math.ceil(apiData.data.length/numberOfLines)} <br>
    <\p>
    ${pages}
  `
  
}


