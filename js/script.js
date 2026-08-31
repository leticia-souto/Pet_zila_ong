
class Animal {
  constructor(nome, especie, raca, idade) {
    this.nome = nome;
    this.especie = especie;
    this.raca = raca;
    this.idade = idade;
    this.adotado = false;
  }
}

const formAdocao = document.getElementById('form-adocao');
const btnFecharModal = document.getElementById('btn-fechar-modal');
const modalNomePet = document.getElementById('modal-nome-pet');

let petSelecionado = null;


document.querySelectorAll('.card-animal').forEach(card => {
  const pet = new Animal(
    card.getAttribute('data-nome'),
    card.getAttribute('data-especie'),
    card.getAttribute('data-raca'),
    card.getAttribute('data-idade')
  );

  const btnAdotar = card.querySelector('.btn-adotar');

  if (btnAdotar) {
    btnAdotar.addEventListener('click', () => {
      if (pet.adotado) return;

      
      petSelecionado = { pet, btnAdotar };

      
      if (modalNomePet) modalNomePet.textContent = pet.nome;

      
      formAdocao.classList.remove('hidden');
      formAdocao.classList.add('flex');
      document.getElementById('nome-adotador').focus();
    });
  }
});


function fecharFormulario() {
  formAdocao.classList.add('hidden');
  formAdocao.classList.remove('flex');
  formAdocao.reset();
}

btnFecharModal.addEventListener('click', fecharFormulario);


formAdocao.addEventListener('submit', (e) => {
  e.preventDefault();

  if (petSelecionado) {
    
    petSelecionado.pet.adotado = true;

    
    const btn = petSelecionado.btnAdotar;
    btn.textContent = 'Adotado';
    btn.disabled = true;
    btn.className = 'btn-adotar w-full py-2 px-4 bg-gray-400 text-white font-bold rounded cursor-not-allowed';
  }

  
  fecharFormulario();
});