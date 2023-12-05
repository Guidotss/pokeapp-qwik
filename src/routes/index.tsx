import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import PokemonImage from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const pokemonId = useSignal<number>(1); // Utilizar el hook useSignal solo para tipos primitivos
  const isFront = useSignal<boolean>(true);

  const nextId = $(() => {
    pokemonId.value = pokemonId.value + 1;
  });

  const prevId = $(() => {
    if (pokemonId.value > 1) {
      pokemonId.value = pokemonId.value - 1;
    }
  });

  const flip = $(() => {
    isFront.value = !isFront.value;
  })

  return (
    <>
      <PokemonImage pokemonId={pokemonId.value} isFront={isFront.value}/>

      <div class="mt-2 flex items-center gap-2">
        <button class="btn btn-primary" onClick$={prevId}>
          <span>Anterior</span>
        </button>
        <button class="btn btn-primary" onClick$={nextId}>
          <span>Siguiente</span>
        </button>
        <button class="btn btn-primary" onClick$={flip}>
          <span>Voltear</span>
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
