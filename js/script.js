/* ============================================
   Pet Zila — Interatividade DOM + Orientação a Objetos
   ============================================ */

// 1. Classe Animal (OO)
class Animal {
  constructor(nome, especie, raca, idade) {
    this.nome    = nome;
    this.especie = especie;
    this.raca    = raca;
    this.idade   = idade;
  }

  exibirAlerta() {
    return (
      `🐾 ${this.nome}\n\n` +
      `Espécie: ${this.especie}\n` +
      `Raça: ${this.raca}\n` +
      `Idade: ${this.idade}`
    );
  }
}

// 2. Manipulação do DOM
const cards = document.querySelectorAll('.card-animal');

cards.forEach(card => {
  // Instancia a classe Animal lendo as tags data-* do HTML
  const pet = new Animal(
    card.getAttribute('data-nome'),
    card.getAttribute('data-especie'),
    card.getAttribute('data-raca'),
    card.getAttribute('data-idade')
  );

  // Associa o alerta ao clique no cartão
  card.addEventListener('click', () => {
    alert(pet.exibirAlerta());
  });
});