const API_URL = "https://pokeapi.co/api/v2/pokemon";

export async function fetchPokemons(limit = 50) {
    try {
        const response = await fetch(`${API_URL}?limit=${limit}`);
        if (!response.ok) throw new Error("Failed to fetch pokemon data");

        const data = await response.json();

        return data.results.map((pokemon: { name: string; url: string }) => {
            const id = pokemon.url.split("/").filter(Boolean).pop(); 
            return {
                id: Number(id),
                name: pokemon.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            };
        });
    } catch (error) {
        console.error("Error fetching pokemon:", error);
        throw new Error("Unable to fetch pokemon list");
    }
}

export async function fetchPokemonDetails(pokemonId: string) {
    if (!pokemonId) throw new Error("Pokemon ID is required");

    try {
        const response = await fetch(`${API_URL}/${pokemonId}`);
        if (!response.ok) throw new Error(`Failed to fetch pokemon details for ID: ${pokemonId}`);

        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
            images: [
                data.sprites?.front_default || "/placeholder.png",
                data.sprites?.back_default || "/placeholder.png",
            ],
            abilities: data.abilities?.map((a: { ability: { name: string } }) => a.ability.name) || [],
            types: data.types?.map((t: { type: { name: string } }) => t.type.name) || [],
            stats: data.stats?.map((s: { stat: { name: string } }) => s.stat.name) || [],
            moves: data.moves?.map((m: { move: { name: string } }) => m.move.name) || [],
        };
    } catch (error) {
        console.error("Error fetching pokemon details:", error);
        throw new Error("Unable to retrieve pokemon details");
    }
}
