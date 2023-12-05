import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  pokemonId: number;
  size?: number;
  isFront?: boolean;
}
export default component$(
  ({ pokemonId, size = 200, isFront = true }: Props) => {
    const imageLoaded = useSignal<boolean>(false);

    useTask$(({ track }) => {
      track(() => pokemonId); 
      imageLoaded.value = false;
    });

    return (
      <div class="flex items-center justify-center">
        <img
          src={
            isFront
              ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
              : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`
          }
          alt="pokemon"
          height={size}
          width={size}
        />
      </div>
    );
  },
);
