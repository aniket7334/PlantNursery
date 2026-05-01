import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { seeds, gardenAccessories } from "../data/catalogData";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery().get("q")?.trim() || "";
  const [searchText, setSearchText] = useState(query);
  const [plantResults, setPlantResults] = useState([]);
  const [loadingPlants, setLoadingPlants] = useState(false);
  const [plantError, setPlantError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setSearchText(query);
  }, [query]);

  useEffect(() => {
    if (!query) {
      setPlantResults([]);
      return;
    }

    const fetchPlants = async () => {
      setLoadingPlants(true);
      setPlantError("");

      try {
        const response = await axios.get("/api/trefle/plants", {
          params: { q: query, page: 1 },
        });
        setPlantResults(response.data?.data || []);
      } catch (error) {
        console.error("Search plants error:", error.response?.data || error.message);
        setPlantError("Live plant search is not available right now.");
        setPlantResults([]);
      } finally {
        setLoadingPlants(false);
      }
    };

    fetchPlants();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmed = searchText.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const lowerCaseQuery = query.toLowerCase();

  const seedResults = useMemo(() => {
    if (!query) return [];
    return seeds.filter((seed) =>
      `${seed.name} ${seed.description}`.toLowerCase().includes(lowerCaseQuery),
    );
  }, [query]);

  const accessoryResults = useMemo(() => {
    if (!query) return [];
    return gardenAccessories.filter((item) =>
      `${item.name} ${item.description}`.toLowerCase().includes(lowerCaseQuery),
    );
  }, [query]);

  const hasResults =
    !!query &&
    (plantResults.length > 0 || seedResults.length > 0 || accessoryResults.length > 0);

  return (
    <section className="min-h-screen bg-green-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-3 text-center text-4xl font-bold text-green-800">
          Search Plants & Products
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Find your favorite plants, seeds, and gardening essentials.
        </p>

        <form onSubmit={handleSearch} className="mx-auto mb-10 flex max-w-3xl gap-2 rounded-full border border-green-200 bg-white p-2 shadow-sm">
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search for plants, seeds, accessories..."
            className="flex-1 rounded-full border-none bg-transparent px-4 py-3 text-gray-800 outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="rounded-full bg-green-700 px-5 py-3 text-white transition hover:bg-green-600"
          >
            Search
          </button>
        </form>

        {!query ? (
          <div className="rounded-3xl border border-dashed border-green-300 bg-white p-10 text-center text-gray-600 shadow-sm">
            Enter a search term to find plants and products.
          </div>
        ) : (
          <>
            {plantError && (
              <div className="mb-6 rounded-xl bg-yellow-50 border border-yellow-300 p-4 text-sm text-yellow-800">
                {plantError}
              </div>
            )}

            <div className="grid gap-10 lg:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-2xl font-semibold text-green-800">Plant Results</h2>
                {loadingPlants ? (
                  <p className="text-gray-600">Searching plants...</p>
                ) : plantResults.length > 0 ? (
                  <div className="space-y-4">
                    {plantResults.slice(0, 6).map((plant) => (
                      <div key={plant.id} className="rounded-2xl border border-gray-200 p-4">
                        <p className="font-semibold text-green-700">{plant.common_name || plant.scientific_name}</p>
                        <p className="text-sm text-gray-600">
                          {plant.family_common_name || plant.family || "Plant item"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No plant results found.</p>
                )}
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-2xl font-semibold text-green-800">Seed Results</h2>
                {seedResults.length > 0 ? (
                  <div className="space-y-4">
                    {seedResults.map((seed) => (
                      <div key={seed.id} className="rounded-2xl border border-gray-200 p-4">
                        <p className="font-semibold text-green-700">{seed.name}</p>
                        <p className="text-sm text-gray-600">{seed.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No matching seeds found.</p>
                )}
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-2xl font-semibold text-green-800">Accessory Results</h2>
                {accessoryResults.length > 0 ? (
                  <div className="space-y-4">
                    {accessoryResults.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-gray-200 p-4">
                        <p className="font-semibold text-green-700">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No matching accessories found.</p>
                )}
              </div>
            </div>

            {!hasResults && !loadingPlants && (
              <div className="mt-10 rounded-3xl border border-dashed border-green-300 bg-white p-10 text-center text-gray-600 shadow-sm">
                No results matched "{query}".
                <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-green-700">
                  <Link to="/indoor" className="rounded-full border border-green-200 px-4 py-2 hover:bg-green-50">
                    Browse Indoor Plants
                  </Link>
                  <Link to="/outdoor" className="rounded-full border border-green-200 px-4 py-2 hover:bg-green-50">
                    Browse Outdoor Plants
                  </Link>
                  <Link to="/seeds" className="rounded-full border border-green-200 px-4 py-2 hover:bg-green-50">
                    Browse Seeds
                  </Link>
                  <Link to="/accessories" className="rounded-full border border-green-200 px-4 py-2 hover:bg-green-50">
                    Browse Accessories
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
