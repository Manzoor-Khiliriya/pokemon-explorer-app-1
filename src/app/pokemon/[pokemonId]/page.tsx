import { fetchPokemonDetails } from "@/utils/api";
import PokemonDetailCard from "@/components/PokemonDetailsCard";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PokemonDetailPageProps {
  params: { pokemonId: string };
}

export default async function PokemonDetail({ params }: PokemonDetailPageProps) {
  const { pokemonId } = params;

  try {
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
  } catch (error) {
    console.error("Failed to fetch Pokémon details:", error);
    return notFound();
  }
}
