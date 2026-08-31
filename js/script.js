/* ============================================
   Pet Zila — Lógica de Adoção
   ============================================ */

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

// Configura o evento em cada card de pet
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

      // Guarda qual pet/botão está sendo processado
      petSelecionado = { pet, btnAdotar };

      // Atualiza o nome no formulário
      if (modalNomePet) modalNomePet.textContent = pet.nome;

      // Abre o formulário e foca no primeiro campo de texto
      formAdocao.classList.remove('hidden');
      formAdocao.classList.add('flex');
      document.getElementById('nome-adotador').focus();
    });
  }
});

// Fechar e resetar formulário
function fecharFormulario() {
  formAdocao.classList.add('hidden');
  formAdocao.classList.remove('flex');
  formAdocao.reset();
}

btnFecharModal.addEventListener('click', fecharFormulario);

// O navegador só dispara o evento submit se TODOS os campos com 'required' estiverem preenchidos
formAdocao.addEventListener('submit', (e) => {
  e.preventDefault();

  if (petSelecionado) {
    // 1. Marca como adotado no objeto
    petSelecionado.pet.adotado = true;

    // 2. Altera o texto e desativa o botão do card
    const btn = petSelecionado.btnAdotar;
    btn.textContent = 'Adotado';
    btn.disabled = true;
    btn.className = 'btn-adotar w-full py-2 px-4 bg-gray-400 text-white font-bold rounded cursor-not-allowed';
  }

  // 3. Fecha o formulário
  fecharFormulario();
});