import PokemonDetailCard from "@/components/PokemonDetailsCard";
import { fetchPokemonDetails } from "@/utils/api";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PokemonDetail(props : any) {
  const { pokemonId } = props.params;
  if (!pokemonId) return notFound();

  const pokemon = await fetchPokemonDetails(pokemonId);

  if (!pokemon) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <PokemonDetailCard {...pokemon} />
      <Link
        href="/"
        className="inline-block mt-4 bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-md"
        aria-label="Go back to homepage"
      >
        ← Back
      </Link>
    </div>
  );
}
