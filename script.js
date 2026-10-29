const listaBotoes = document.querySelectorAll(".filtro");
const listaImagens = document.querySelectorAll(".miniatura");
const galeria = document.querySelector(".galeria");
const totalImagens = document.querySelector("#totalImagens"); 
const modal = document.querySelector("#modal");
const btnFechar = document.querySelector("#fechar");
const btnAnterior = document.querySelector("#anterior");
const btnProximo = document.querySelector("#proximo");
const imagemModal = document.querySelector("#imagemModal");
const contador = document.querySelector("#contador");
const nomeImagem = document.querySelector("#nomeImagem");
const descricaoImagem = document.querySelector("#descricaoImagem");

let imagensVisiveis = [];
let indiceAtual = 0;
 
function atualizarImagensVisiveis(){
    imagensVisiveis = Array.from(listaImagens).filter(
        function(imagem){
            return !imagem.classList.contains("oculta")
        });

    totalImagens.textContent = `Exibindo ${imagensVisiveis.length} de ${listaImagens.length}`;
}
 
function filtrarImagens(categoria){

    galeria.classList.toggle("filtrada", categoria !== "todos");

    listaImagens.forEach((imagem)=> {
        let categoriaImagem = imagem.dataset.categoria;
       
        if(categoria === "todos" || categoriaImagem === categoria){
            imagem.classList.remove("oculta");
            imagem.tabIndex = 0;
        }
        else{
            imagem.classList.add("oculta");
            imagem.tabIndex = -1;
        }
    });
 
    atualizarImagensVisiveis();
}
 
listaBotoes.forEach((botao)=>{
    botao.addEventListener('click', ()=>{
        let categoria = botao.dataset.filtro;
 
        listaBotoes.forEach((item)=>{
            item.classList.remove("ativo");
        });
 
        botao.classList.add('ativo');
 
        filtrarImagens(categoria);
    });
});
 
function mostrarImagem(indice){

    let quantidade = imagensVisiveis.length;

    if (quantidade === 0){
        return;
    }

    indiceAtual = (indice + quantidade) % quantidade;

    const imagem = imagensVisiveis[indiceAtual];
    
    imagemModal.src = imagem.src;
    imagemModal.alt = imagem.alt;
    nomeImagem.textContent = imagem.alt;
    
    if (descricaoImagem) {
        descricaoImagem.textContent = imagem.dataset.descricao || "";
    }

    contador.textContent = `${indiceAtual + 1} de ${quantidade}`;
}
 
function abrirModal(imagem){
    indiceAtual = imagensVisiveis.indexOf(imagem);
    modal.classList.add("ativo");
    mostrarImagem(indiceAtual);
}
 
listaImagens.forEach((imagem)=>{
    imagem.addEventListener('click', ()=>{
        abrirModal(imagem);
    });
});

btnFechar.addEventListener("click", ()=>{
    modal.classList.remove("ativo");
});
 
btnProximo.addEventListener("click", ()=>{
    mostrarImagem(indiceAtual + 1);
});
 
btnAnterior.addEventListener("click", ()=>{
    mostrarImagem(indiceAtual - 1);
});

document.addEventListener('keydown', (evento)=>{
    if (evento.key === "Escape"){
       modal.classList.remove("ativo"); 
    }

    if (evento.key === "ArrowRight"){
       mostrarImagem(indiceAtual + 1);
    }
    
    if (evento.key === "ArrowLeft"){
       mostrarImagem(indiceAtual - 1); 
    }
    
    if (evento.target === modal){
       modal.classList.remove("ativo");
    }
});
 
filtrarImagens("todos");