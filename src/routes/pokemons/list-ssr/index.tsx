import { $, component$, useSignal } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  useNavigate,
} from "@builder.io/qwik-city";

export const usePokemonList = routeLoader$(async ({ query }) => {
  const offset = query.get("offset") || 0;
  if (+offset < 0) throw new Error("Offset can't be less than 0");
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`,
  );
  const data = await response.json();
  return data.results;
});

export default component$(() => {
  const pokemons = usePokemonList();
  const navigate = useNavigate();
  const currentOffset = useSignal<number>(0);

  const handleOffsetChange = $((offset: number) => {
    currentOffset.value += offset;
    if (currentOffset.value < 0) {
      currentOffset.value = 0;
      navigate("/pokemons/list-ssr/");
      return; 
    }
    navigate(`/pokemons/list-ssr?offset=${currentOffset.value}`);
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Esta cargando pagina</span>
      </div>

      <div class="mt-10 ">
        <button
          onClick$={() => handleOffsetChange(-10)}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </button>
        <button
          onClick$={() => handleOffsetChange(10)}
          class="btn btn-primary mr-2"
        >
          Siguientes
        </button>
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
