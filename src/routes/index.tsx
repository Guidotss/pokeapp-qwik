import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const pokemonId = useSignal<number>(1); // Utilizar el hook useSignal solo para tipos primitivos

  const nextId = $(() => {
    pokemonId.value = pokemonId.value + 1;
  });

  const prevId = $(() => {
    if (pokemonId.value > 1) {
      pokemonId.value = pokemonId.value - 1;
    }
  });

  return (
    <>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`}
        alt="pokemon"
        height={200}
        width={200}
      />
      <div class="mt-2 flex items-center">
        <button class="btn btn-primary mr-2" onClick$={prevId}>
          <span>Anterior</span>
        </button>
        <button class="btn btn-primary" onClick$={nextId}>
          <span>Siguiente</span>
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
