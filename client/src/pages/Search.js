import React, { useEffect, useState } from "react";
import { searchProductApi } from "../api/productApi";
import Loading from "../components/loading/Loading";
import ProductItem from "../components/products/ProductItem";
import { useSearchParams } from "../hooks/useSearchParams";

const Search = () => {
  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await searchProductApi(searchParams.get("q"));
        if (res.data.success) {
          setResults(res.data.results);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      setLoading(false);
    })();
  }, [searchParams.get("q")]);

  if (loading) {
    return (
      <div className="mt-10">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="container">
        <div className="min-h-[600px]">
          <h1 className="font-semibold text-[20px] mb-6 text-center">
            Search results for:{" "}
            <p className="cursor-pointer  font-bold uppercase text-[#bc13fe]">
              {searchParams.get("q")}
            </p>
          </h1>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
            {results.map((result) => (
              <ProductItem data={result} key={result._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
