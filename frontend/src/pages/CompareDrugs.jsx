import { useEffect, useState } from "react";
import api from "../services/api";

function CompareDrugs() {

  const [drugs, setDrugs] = useState([]);

  const [drug1, setDrug1] = useState("");

  const [drug2, setDrug2] = useState("");

  const [comparison, setComparison] = useState(null);

  const [loading, setLoading] = useState(true);

  // ---------------------------------
  // Load Drug List
  // ---------------------------------

  useEffect(() => {

    const loadDrugs = async () => {

      try {

        const response = await api.get("/drugs");

        setDrugs(response.data);

        if (response.data.length > 1) {

          setDrug1(response.data[0]);

          setDrug2(response.data[1]);

        }

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    loadDrugs();

  }, []);

  // ---------------------------------
  // Compare Drugs
  // ---------------------------------

  useEffect(() => {

    if (!drug1 || !drug2) return;

    const compare = async () => {

      try {

        const response = await api.get(
          `/compare?drug1=${encodeURIComponent(drug1)}&drug2=${encodeURIComponent(drug2)}`
        );

        setComparison(response.data);

      }

      catch (err) {

        console.error(err);

      }

    };

    compare();

  }, [drug1, drug2]);

  return (

    <div className="min-h-screen bg-[#0B0B0D] text-white p-10">

      {/* ================= HEADER ================= */}

      <div className="mb-10">

        <h1 className="text-5xl font-black mb-3">

          Compare Drugs

        </h1>

        <p className="text-gray-400 text-lg">

          Compare patient satisfaction, effectiveness and trust
          across multiple medications.

        </p>

      </div>
{/* ================= SELECTORS ================= */}

<div className="flex items-center justify-center gap-8 mb-12 flex-col lg:flex-row">

  {/* Drug A */}

  <div className="w-full lg:w-[42%] rounded-3xl bg-white/5 border border-white/10 p-8">

    <h3 className="text-xl font-bold mb-5">
      Drug A
    </h3>

    <select
      value={drug1}
      onChange={(e) => setDrug1(e.target.value)}
      className="w-full bg-[#181818] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-cyan-400 transition"
    >
      {drugs.map((drug) => (
        <option key={drug} value={drug}>
          {drug}
        </option>
      ))}
    </select>

  </div>

  {/* VS */}

  <div className="flex justify-center items-center shrink-0">

    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-cyan-500/20">

      <span className="text-2xl font-black tracking-widest text-white">
        VS
      </span>

    </div>

  </div>

  {/* Drug B */}

  <div className="w-full lg:w-[42%] rounded-3xl bg-white/5 border border-white/10 p-8">

    <h3 className="text-xl font-bold mb-5">
      Drug B
    </h3>

    <select
      value={drug2}
      onChange={(e) => setDrug2(e.target.value)}
      className="w-full bg-[#181818] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-cyan-400 transition"
    >
      {drugs.map((drug) => (
        <option key={drug} value={drug}>
          {drug}
        </option>
      ))}
    </select>

  </div>

</div>

{
  loading ? (
    <div className="text-center text-gray-400 py-20">
      Loading...
    </div>
  ) 

        :

        comparison &&

        (

          <>
                  {/* ========================================= */}
          {/* COMPARISON CARDS */}
          {/* ========================================= */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-12">

            {/* ================= Drug A ================= */}

            <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

              <h2 className="text-3xl font-black mb-8">

                {comparison.drug1.name}

              </h2>

              <div className="space-y-5">

                <div className="flex justify-between items-center">

                  <span className="text-gray-400">

                    ⭐ Average Rating

                  </span>

                  <span className="text-2xl font-black text-yellow-400">

                    {comparison.drug1.rating}

                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <span className="text-gray-400">

                    💬 Reviews

                  </span>

                  <span className="text-2xl font-black text-cyan-400">

                    {comparison.drug1.reviews.toLocaleString()}

                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <span className="text-gray-400">

                    👍 Useful Votes

                  </span>

                  <span className="text-2xl font-black text-green-400">

                    {comparison.drug1.usefulVotes}

                  </span>

                </div>

                <div className="mt-10">

                  <div className="text-sm text-gray-500 mb-3">

                    Trust Score

                  </div>

                  <div className="w-full bg-white/10 rounded-full h-3">

                    <div

                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full"

                      style={{

                        width: `${comparison.drug1.rating * 10}%`

                      }}

                    />

                  </div>

                </div>

              </div>

            </div>

            {/* ================= Drug B ================= */}

            <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

              <h2 className="text-3xl font-black mb-8">

                {comparison.drug2.name}

              </h2>

              <div className="space-y-5">

                <div className="flex justify-between items-center">

                  <span className="text-gray-400">

                    ⭐ Average Rating

                  </span>

                  <span className="text-2xl font-black text-yellow-400">

                    {comparison.drug2.rating}

                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <span className="text-gray-400">

                    💬 Reviews

                  </span>

                  <span className="text-2xl font-black text-cyan-400">

                    {comparison.drug2.reviews.toLocaleString()}

                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <span className="text-gray-400">

                    👍 Useful Votes

                  </span>

                  <span className="text-2xl font-black text-green-400">

                    {comparison.drug2.usefulVotes}

                  </span>

                </div>

                <div className="mt-10">

                  <div className="text-sm text-gray-500 mb-3">

                    Trust Score

                  </div>

                  <div className="w-full bg-white/10 rounded-full h-3">

                    <div

                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"

                      style={{

                        width: `${comparison.drug2.rating * 10}%`

                      }}

                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* EXECUTIVE COMPARISON */}
          {/* ========================================= */}

          <div className="rounded-3xl bg-white/5 border border-white/10 p-10 mb-12">

            <h2 className="text-3xl font-black mb-8">

              Executive Comparison

            </h2>

            <table className="w-full">

              <thead>

                <tr className="border-b border-white/10 text-gray-400">

                  <th className="text-left py-4">

                    Metric

                  </th>

                  <th className="text-center">

                    {comparison.drug1.name}

                  </th>

                  <th className="text-center">

                    {comparison.drug2.name}

                  </th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-b border-white/5">

                  <td className="py-5">

                    Average Rating

                  </td>

                  <td className="text-center">

                    {comparison.drug1.rating}

                  </td>

                  <td className="text-center">

                    {comparison.drug2.rating}

                  </td>

                </tr>

                <tr className="border-b border-white/5">

                  <td className="py-5">

                    Reviews

                  </td>

                  <td className="text-center">

                    {comparison.drug1.reviews}

                  </td>

                  <td className="text-center">

                    {comparison.drug2.reviews}

                  </td>

                </tr>

                <tr>

                  <td className="py-5">

                    Useful Votes

                  </td>

                  <td className="text-center">

                    {comparison.drug1.usefulVotes}

                  </td>

                  <td className="text-center">

                    {comparison.drug2.usefulVotes}

                  </td>

                </tr>

              </tbody>

            </table>

          </div>
                    {/* ========================================= */}
          {/* RATING DISTRIBUTION */}
          {/* ========================================= */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-12">

            <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

              <h2 className="text-2xl font-black mb-6">

                Rating Distribution

              </h2>

              <div className="space-y-5">

                <div>

                  <div className="flex justify-between mb-2">

                    <span>Drug A</span>

                    <span>{comparison.drug1.rating}/10</span>

                  </div>

                  <div className="h-4 rounded-full bg-white/10">

                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      style={{
                        width: `${comparison.drug1.rating * 10}%`
                      }}
                    />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-2">

                    <span>Drug B</span>

                    <span>{comparison.drug2.rating}/10</span>

                  </div>

                  <div className="h-4 rounded-full bg-white/10">

                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{
                        width: `${comparison.drug2.rating * 10}%`
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* ========================================= */}
            {/* TOP CONDITIONS */}
            {/* ========================================= */}

            <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

              <h2 className="text-2xl font-black mb-6">

                Top Conditions Comparison

              </h2>

              <div className="space-y-4">

                <div className="flex justify-between border-b border-white/10 pb-3">

                  <span>{comparison.drug1.name}</span>

                  <span className="text-cyan-400">

                    {comparison.drug1.reviews.toLocaleString()} Reviews

                  </span>

                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">

                  <span>{comparison.drug2.name}</span>

                  <span className="text-pink-400">

                    {comparison.drug2.reviews.toLocaleString()} Reviews

                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* AI RECOMMENDATION */}
          {/* ========================================= */}

          <div className="rounded-3xl bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-cyan-500/20 p-10">

            <h2 className="text-3xl font-black mb-6">

              AI Recommendation

            </h2>

            <div className="text-lg leading-9 text-gray-300">

              {

                comparison.drug1.rating >

                comparison.drug2.rating

                ?

                `${comparison.drug1.name} performs better based on patient satisfaction, showing a higher average rating while maintaining strong review volume.`

                :

                `${comparison.drug2.name} performs better based on patient satisfaction, showing a higher average rating while maintaining strong review volume.`

              }

            </div>

          </div>

        </>

      )}

    </div>

  );

}

export default CompareDrugs;