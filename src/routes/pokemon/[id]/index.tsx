import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import PokemonImage from "~/components/pokemons/pokemon-image";

export const usePokemonId = routeLoader$(({ params, redirect }) => {
  console.log(isNaN(+params.id))
  if (isNaN(+params.id)) {
    redirect(301, "/");
  }
  if (+params.id < 1 || +params.id > 151) {
    redirect(301, "/");
  }
  return params.id;
});

export default component$(() => {
  const pokemonId = usePokemonId();
  console.log(pokemonId.value);

  return <PokemonImage pokemonId={+pokemonId.value} size={300} />;
});

export const head: DocumentHead = {
  title: "Pokemon Page",
  meta: [{ name: "description", content: "Pokemon Page" }],
};
