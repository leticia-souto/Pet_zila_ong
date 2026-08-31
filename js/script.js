/* ============================================
   Pet Zila ONG — Live Code: Pets + Formulário
   Objetivo: Orientação a Objetos + Manipulação do DOM.

   Fluxo:
     1. Classes (Animal e Adotante)
     2. Instâncias e dados iniciais
     3. Menu Hambúrguer + Filtros (Caninos/Felinos)
     4. Renderização dos Pets
     5. Processamento do Formulário de Adoção
   ============================================ */


/* -----------------------------------------------------------
   PARTE 1 — OO (Classes)
   ----------------------------------------------------------- */


class Animal {
  constructor(nome, sexo, especie, porte, raca, idade, imagem) {
    this.nome    = nome;       
    this.sexo = sexo;
    this.especie = especie;    // "Canino" ou "Felino"
    this.porte   = porte;    
    this.raca = raca
    this.idade   = idade;        
    this.imagem    = imagem;
  }

  getIdadeTexto() {
    return this.idade === 1 ? `1 ano` : `${this.idade} anos`;
  }
}

class Adotante {
  constructor(nome, telefone, email, cpf, petNome) {
    this.nome        = nome;
    this.telefone    = telefone;
    this.email       = email;
    this.cpf         = cpf;
    this.petNome     = petNome;
    this.dataRegistro = new Date();
  }

  // Método OO que resume os dados do cadastro
  gerarComprovante() {
    return (
      `📋 CADASTRO DE ADOÇÃO REGISTRADO!\n\n` +
      `Adotante: ${this.nome}\n` +
      `CPF: ${this.cpf}\n` +
      `Contato: ${this.telefone} | ${this.email}\n` +
      `Interesse no pet: ${this.petNome}`
    );
  }
}


/* -----------------------------------------------------------
   PARTE 2 — Instanciando objetos
   ----------------------------------------------------------- */
const listaPets = [
  new Animal("Thor", "Canino", 3, "Grande", "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400"),
  new Animal("Luna", "Felino", 1, "Pequeno", "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400"),
  new Animal("Mel", "Canino", 2, "Médio", "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400"),
  new Animal("Simba", "Felino", 4, "Pequeno", "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400"),
];


/* -----------------------------------------------------------
   PARTE 3 — DOM: Menu Hambúrguer, Filtros e Cards
   ----------------------------------------------------------- */

// Seletores do DOM
const containerPets   = document.querySelector('#container-pets');
const btnHamburguer   = document.querySelector('#btn-hamburguer');
const menuNav         = document.querySelector('#menu-nav');

const linkTodos       = document.querySelector('#link-todos');
const linkCaninos     = document.querySelector('#caninos');
const linkFelinos     = document.querySelector('#felinos');

const selectPetForm   = document.querySelector('#form-pet');
const formAdocao      = document.querySelector('#form-adocao');

/* --- 3.1 Menu Hambúrguer --- */
if (btnHamburguer && menuNav) {
  btnHamburguer.addEventListener('click', () => {
    menuNav.classList.toggle('hidden');
  });
}

/* --- 3.2 Criar Card e Selecionar Pet --- */
function criarCardPet(pet) {
  const card = document.createElement('div');
  card.className = 'card-animal bg-white rounded-2xl shadow-sm p-4 flex flex-col justify-between border border-slate-100';

  card.innerHTML = `
    <img src="${pet.foto}" alt="${pet.nome}" class="w-full h-48 object-cover rounded-xl mb-4">
    <div class="flex-1">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-xl font-bold text-slate-800">${pet.nome}</h3>
        <span class="text-xs font-bold px-2.5 py-1 rounded-full ${pet.especie === 'Canino' ? 'bg-amber-100 text-amber-800' : 'bg-purple-100 text-purple-800'}">
          ${pet.especie}
        </span>
      </div>
      <p class="text-sm text-slate-500 mb-1">Porte: <strong class="text-slate-700">${pet.porte}</strong></p>
      <p class="text-sm text-slate-500 mb-4">Idade: <strong class="text-slate-700">${pet.getIdadeTexto()}</strong></p>
    </div>
    <button class="btn-adotar w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition cursor-pointer">
      Adotar ${pet.nome}
    </button>
  `;

  // Clique no botão "Adotar": seleciona o pet no formulário e rola a tela até ele
  const btnAdotar = card.querySelector('.btn-adotar');
  btnAdotar.addEventListener('click', () => {
    if (selectPetForm) {
      selectPetForm.value = pet.nome;
    }
    document.querySelector('#secao-formulario')?.scrollIntoView({ behavior: 'smooth' });
  });

  return card;
}

/* --- 3.3 Renderização dos Pets --- */
function renderizarPets(lista) {
  if (!containerPets) return;
  containerPets.innerHTML = '';

  lista.forEach(pet => {
    containerPets.appendChild(criarCardPet(pet));
  });

  atualizarSelectFormulario();
}

// Preenche as opções do <select> do formulário dinamicamente
function atualizarSelectFormulario() {
  if (!selectPetForm) return;
  selectPetForm.innerHTML = '<option value="">Selecione um pet...</option>';
  
  listaPets.forEach(pet => {
    const option = document.createElement('option');
    option.value = pet.nome;
    option.textContent = `${pet.nome} (${pet.especie})`;
    selectPetForm.appendChild(option);
  });
}

/* --- 3.4 Eventos de Filtro --- */
linkTodos?.addEventListener('click', (e) => { e.preventDefault(); renderizarPets(listaPets); });
linkCaninos?.addEventListener('click', (e) => { e.preventDefault(); renderizarPets(listaPets.filter(p => p.especie === 'Canino')); });
linkFelinos?.addEventListener('click', (e) => { e.preventDefault(); renderizarPets(listaPets.filter(p => p.especie === 'Felino')); });


/* -----------------------------------------------------------
   PARTE 4 — Formulário de Adoção (Nome, Telefone, Email, CPF)
   ----------------------------------------------------------- */
if (formAdocao) {
  formAdocao.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita recarregar a página

    // Captura dos valores dos inputs
    const nome     = document.querySelector('#form-nome').value.trim();
    const telefone = document.querySelector('#form-telefone').value.trim();
    const email    = document.querySelector('#form-email').value.trim();
    const cpf      = document.querySelector('#form-cpf').value.trim();
    const petNome  = document.querySelector('#form-pet').value;

    // Validação básica dos campos
    if (!nome || !telefone || !email || !cpf || !petNome) {
      alert("⚠️ Por favor, preencha todos os campos do formulário!");
      return;
    }

    // Instancia o objeto da classe Adotante (OO)
    const novoAdotante = new Adotante(nome, telefone, email, cpf, petNome);

    // Demonstração no console e aviso de sucesso
    console.log("=== Nova proposta registrada ===", novoAdotante);
    alert(novoAdotante.gerarComprovante());

    // Limpa o formulário após o envio
    formAdocao.reset();
  });
}

// Primeira execução quando o script carregar
renderizarPets(listaPets);