import { component$, useComputed$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  useLocation,
  Link,
} from "@builder.io/qwik-city";


export const usePokemonList = routeLoader$(
  async ({ query, redirect, pathname }) => {
    const offset = query.get("offset") || 0;
    if (+offset  < 0) {
      throw redirect(301, pathname);
    } else {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`,
      );
      const data = await response.json();
      return data.results;
    }
  },
);

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();
  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.search); 
    return Number(offsetString.get("offset") || 0);
  });

  console.log(currentOffset.value);

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Esta cargando pagina</span>
      </div>

      <div class="mt-10 ">
        <Link
          href={`/pokemons/list-ssr?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </Link>
        <Link
          href={`/pokemons/list-ssr?offset=${currentOffset.value + 10}`}
          class="btn btn-primary mr-2"
        >
          Siguientes
        </Link>
      </div>

      <div class="mt-5 grid grid-cols-6">
        {pokemons.value.map((pokemon: any) => (
          <div
            key={pokemon.name}
            class="m-5 flex flex-col items-center justify-center"
          >
            <span class="capitalize">{pokemon.name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Pokemon List SSR",
  meta: [{ name: "description", content: "Pokemon List" }],
};
