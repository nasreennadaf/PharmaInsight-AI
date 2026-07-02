import { useEffect, useState } from "react";
import api from "../services/api";

function DrugExplorer() {
  const [drugs, setDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState("");
  const [drug, setDrug] = useState(null);

  const [loadingList, setLoadingList] = useState(true);
  const [loadingDrug, setLoadingDrug] = useState(false);

  // -----------------------------
  // Load Drug List
  // -----------------------------

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await api.get("/drugs");

        setDrugs(response.data);

        if (response.data.length > 0) {
          setSelectedDrug(response.data[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingList(false);
      }
    };

    fetchDrugs();
  }, []);

  // -----------------------------
  // Load Selected Drug
  // -----------------------------

  useEffect(() => {
    if (!selectedDrug) return;

    const fetchDrug = async () => {
      setLoadingDrug(true);

      try {
        const response = await api.get(
          `/drug/${encodeURIComponent(selectedDrug)}`
        );

        setDrug(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDrug(false);
      }
    };

    fetchDrug();
  }, [selectedDrug]);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white p-10">

      {/* ================= HEADER ================= */}

      <div className="mb-10">

        <h1 className="text-5xl font-black mb-3">

          Drug Explorer

        </h1>

        <p className="text-gray-400">

          Explore every medication in the Drugs.com dataset.

        </p>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">

        <label className="block mb-4 text-sm text-gray-400">

          Select Drug

        </label>

        <select
          className="w-full bg-[#181818] border border-white/10 rounded-xl px-5 py-4 text-white outline-none"
          value={selectedDrug}
          onChange={(e) => setSelectedDrug(e.target.value)}
        >

          {loadingList ? (

            <option>

              Loading...

            </option>

          ) : (

            drugs.map((drug) => (

              <option
                key={drug}
                value={drug}
              >

                {drug}

              </option>

            ))

          )}

        </select>

      </div>

      {/* ================= CONTENT ================= */}

      {loadingDrug ? (

        <div className="text-center py-20 text-gray-400">

          Loading drug information...

        </div>

      ) : drug && (

        <>
              {/* ================= KPI CARDS ================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">

            <div className="rounded-2xl bg-white/5 border border-white/10 p-8">

              <div className="text-gray-400 text-sm mb-3">
                Average Rating
              </div>

              <div className="text-5xl font-black text-yellow-400">
                ⭐ {drug.average_rating}
              </div>

            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-8">

              <div className="text-gray-400 text-sm mb-3">
                Reviews
              </div>

              <div className="text-5xl font-black text-cyan-400">
                {drug.reviews_count.toLocaleString()}
              </div>

            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-8">

              <div className="text-gray-400 text-sm mb-3">
                Average Useful Votes
              </div>

              <div className="text-5xl font-black text-green-400">
                {drug.average_useful_votes}
              </div>

            </div>

          </div>

          {/* ================= MAIN GRID ================= */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

            {/* CONDITIONS */}

            <div className="rounded-2xl bg-white/5 border border-white/10 p-8">

              <h2 className="text-2xl font-bold mb-6">

                Conditions Treated

              </h2>

              <div className="space-y-4">

                {drug.conditions.map((condition, index) => (

                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-white/10 pb-3"
                  >

                    <div>

                      <div className="font-semibold">

                        {condition.condition}

                      </div>

                      <div className="text-xs text-gray-500">

                        Medical Condition

                      </div>

                    </div>

                    <div className="text-cyan-400 font-bold">

                      {condition.reviews.toLocaleString()}

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* REVIEWS */}

            <div className="rounded-2xl bg-white/5 border border-white/10 p-8">

              <h2 className="text-2xl font-bold mb-6">

                Recent Patient Reviews

              </h2>

              <div className="space-y-5 max-h-[600px] overflow-y-auto pr-2">

                {drug.reviews.map((review, index) => (

                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-black/20 p-5"
                  >

                    <div className="flex justify-between mb-4">

                      <span className="font-bold text-yellow-400">

                        ⭐ {review.rating}

                      </span>

                      <span className="text-sm text-gray-500">

                        👍 {review.usefulCount}

                      </span>

                    </div>

                    <p className="text-gray-300 leading-7">

                      {review.review}

                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

                  </>
      )}

      {!loadingDrug && !drug && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-10 text-center">

          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Drug Not Found
          </h2>

          <p className="text-gray-400">
            No information is available for the selected drug.
          </p>

        </div>
      )}

    </div>
  );
}

export default DrugExplorer;