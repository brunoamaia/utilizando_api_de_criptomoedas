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

    
    beginTable = (currentPage-1) * numberOfLines
    
    let texto = ``
    let lastLine = beginTable + numberOfLines
    if ( lastLine > apiData.data.length) {
      lastLine = apiData.data.length
    }
    for (let i = beginTable; i < lastLine ;i++) {

      let str = apiData.data[i].first_historical_data.split("T")

      let ano = str[0].split('-')
      let hora = str[1].split(':')
      
      texto += `
        <tr class=" ${(i%2 === 0) ? 'table-dark' : 'table-light'}">
          <th scope="row">${apiData.data[i].name}</th>
          <td>${apiData.data[i].symbol}</td>
          <td>${apiData.data[i].rank}</td>
          <td>${ano[2]}/${ano[1]}/${ano[0]} : ${hora[0]}h${hora[1]}</td>
          <td>${apiData.data[i].id}</td>
        </tr>
      `

      //<td>${(apiData.data[i].is_active == 1) ? 'sim' : 'não'}</td>

    }
    texto += ``
    document.getElementById("autocomplete").innerHTML = texto
  
    InsertTablePagination(page)
  }


}

function updateTableData(param) {

  if (param == 0) {
    apiData.data.sort(function(a,b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  } else if (param == 1) {
    apiData.data.sort(function(a,b) {
      return a.symbol < b.symbol ? -1 : a.symbol > b.symbol ? 1 : 0;
    });
  } else if (param == 2) {
    apiData.data.sort(function(a,b) {
      return a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : 0;
    });
  } else if (param == 3) {
    apiData.data.sort(function(a,b) {
      return a.first_historical_data < b.first_historical_data ? -1 : a.first_historical_data > b.first_historical_data ? 1 : 0;
    });
  } else if (param == 4) {
    apiData.data.sort(function(a,b) {
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
  } else if (param == 5) {
    apiData.data.sort(function(a,b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  } else if (param == 6) {
    apiData.data.sort(function(a,b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  } else if (param == 7) {
    apiData.data.sort(function(a,b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  } else if (param == 8) {
    apiData.data.sort(function(a,b) {
      return a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : 0;
    });
  }

  insertInformations()
}

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
      for (let i = 1; i < 6; i++) {
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
  document.querySelector(".tablePagination").innerHTML = ` ${pages} `
  
}

function itemsPerPage(nlines=10) {
  numberOfLines = nlines

  document.querySelector('.itensButton').innerHTML = `
    <button type="button" class="btn btn-info ${(nlines == 10) ? 'disabled':''}" onclick="itemsPerPage()">10</button>
    <button type="button" class="btn btn-info ${(nlines == 25) ? 'disabled':''}" onclick="itemsPerPage(25)">25</button>
    <button type="button" class="btn btn-info ${(nlines == 50) ? 'disabled':''}" onclick="itemsPerPage(50)">50</button>
    <button type="button" class="btn btn-info ${(nlines == 100) ? 'disabled':''}" onclick="itemsPerPage(100)">100</button>
    <button type="button" class="btn btn-info ${(nlines == 200) ? 'disabled':''}" onclick="itemsPerPage(200)">200</button>
    <button type="button" class="btn btn-info ${(nlines == 500) ? 'disabled':''}" onclick="itemsPerPage(500)">500</button>
  `
  insertInformations()
}

document.querySelector('.infos').innerHTML = `<h4> ${apiData.data.length} </h4>`