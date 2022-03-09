let lista = [
  { nome: 'pizza', quantidade: '1', valor: 40, imagem: 'pizza.png' },
  { nome: 'hamburguer', quantidade: '1', valor: 20, imagem: 'hamburguer.png' },
  { nome: 'parmegiana', quantidade: '1', valor: 18, imagem: 'parmegiana.png' },
]

let carrinho = []
let apagaItem = 0
let lista_temporaria = []
let historico = []

function preenche_lista() {
  for (i = 0; i < lista.length; i++) {
    $("#lista")[0].innerHTML +=
      `<div class="col-sm-4">
      <div class="card">
        <div class="card-body text-center px-0 py-0">
          <img class="imagem_cardapio w-100" onclick="opcao('${i}')" src="${lista[i].imagem}" />
          <div>${lista[i].nome}</div>
          <div>${lista[i].valor}</div>
        </div>
      </div>
    </div>`
  }

  espelho_compra()
}

$(document).ready(
  function () {
    cancelar_compra()
    preenche_lista()

    $("#subtotal")[0].innerHTML = 0
    $("#desconto")[0].innerHTML = 0
    $("#total")[0].innerHTML = 0
    $("#pago")[0].innerHTML = 0
    $("#troco")[0].innerHTML = 0

    $("#desconto").change(espelho_compra);
    $("#desconto").keyup(espelho_compra);
    $("#pago").change(espelho_compra);
    $("#pago").keyup(espelho_compra);
  }
);

function abrir_modal() {
  $("#exampleModal").modal("show")
}



function opcao(i) {
  lista_temporaria.push(lista[i])
}

function adicionar_produto() {
  for (let index = 0; index < lista_temporaria.length; index++) {

    let novoProduto = {
      nome: lista_temporaria[index].nome,
      quantidade: lista_temporaria[index].quantidade,
      valor: lista_temporaria[index].valor,
      imagem: lista_temporaria[index].imagem,
    }

    carrinho.push(novoProduto)
  }
  lista_temporaria = []
  $("#exampleModal").modal("hide")
  reescreve_tabela()
  espelho_compra()
}

function reescreve_tabela() {
  $("#corpo_da_tabela")[0].innerHTML = ''

  for (i = 0; i < carrinho.length; i++) {
    $("#corpo_da_tabela")[0].innerHTML += `
    <tr>
      <th scope="row">
        <img src="${carrinho[i].imagem}" class="card-img-top" alt="...">
      </th>
      <td>
        <input
        type="number" min="1"
        onchange="atualizaQuantidade(${i})"
        id="fname${i}"
        value="${carrinho[i].quantidade}"
        name="fname">
      </td>
      <td>${carrinho[i].nome}</td>
      <td>
      <div id="valorProduto" >${carrinho[i].valor}</div>
      </td>
      <td>
      <button type="button" class="btn-close" onclick="apagar_linha(${i})" data-bs-toggle="modal" data-bs-target="#certezaModal" aria-label="Close"></button>
      </td>
    </tr> `
  }
}


function apagar_linha(i) {
  $("#certezaModal").modal("show")
  apagaItem = i
}

function confirmaApaga() {
  carrinho.splice(apagaItem, 1)
  reescreve_tabela()
  espelho_compra()
}

function atualizaQuantidade(i) {
  let value = $(`#fname${i}`).val()
  if (value < 1) {
    value = 1
  }

  $(`#fname${i}`).val(Math.round(value))

  carrinho[i].quantidade = parseInt(Math.round(value))

  espelho_compra()
}


function espelho_compra(i) {
  let valores_produtos = 0
  let total = 0
  let desconto = 0
  let pago = 0
  let diferença_pago = 0

  for (i = 0; i < carrinho.length; i++) {
    valores_produtos += carrinho[i].valor * carrinho[i].quantidade
  }

  desconto = parseFloat($("#desconto").val())
  if (desconto > 0) {
    total = valores_produtos - desconto
  } else {
    total = valores_produtos
  }


  pago = parseFloat($("#pago").val())


  if (pago > 0) {
    diferença_pago = pago - total
  } else {
    diferença_pago = 0 - total
  }

  $("#total").val(total)
  $("#troco").val(diferença_pago)
  $("#subtotal").val(valores_produtos)
}

function cancelar_compra() {
  $("#corpo_da_tabela")[0].innerHTML = ''
  $("#subtotal").val("")
  $("#desconto").val("")
  $("#total").val("")
  $("#pago").val("")
  $("#troco").val("")
}

function finalizar_compra() {
  $("#finalizarModal").modal("show")
  historicoo()
  reset()
}

function reset() {
  carrinho = []
  $("#corpo_da_tabela")[0].innerHTML = ''

}


function historicoo() {


  for (i = 0; i < carrinho.length; i++) {

    historico = [
      $("#tabela_historico")[0].innerHTML += `
    <tr>
      <th scope="row">
        <img src="${carrinho[i].imagem}" class="card-img-top" alt="...">
      </th>
      <td>
        <input type="text" onchange="somar()" value=${carrinho[i].quantidade} id="fname" name="fname">
      </td>
      <td>${carrinho[i].nome}</td>
      <td>
      <div align=center id="valorProduto" >${carrinho[i].valor}</div>
      </td>
    </tr> `
    ]
  }

  $("#tabela_espelho")[0].innerHTML += `
  <td>${$("#subtotal").val()}</td>
  <td>${$("#desconto").val()}</td>
  <td>${$("#total").val()}</td>
  <td>${$("#pago").val()}</td>
  <td>${$("#troco").val()}</td>`

  $("#subtotal").val("")
  $("#desconto").val("")
  $("#total").val("")
  $("#pago").val("")
  $("#troco").val("")



}



