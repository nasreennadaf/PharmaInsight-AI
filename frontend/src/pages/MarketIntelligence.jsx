import { useEffect, useState } from "react";
import api from "../services/api";

function MarketIntelligence(){

    const [market,setMarket]=useState(null);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        const load=async()=>{

            try{

                const res=await api.get("/market/intelligence");

                setMarket(res.data);

            }

            catch(err){

                console.error(err);

            }

            finally{

                setLoading(false);

            }

        };

        load();

    },[]);

    return(

        <div className="min-h-screen bg-[#0B0B0D] text-white p-10">

            <div className="mb-12">

                <h1 className="text-5xl font-black">

                    Market Intelligence

                </h1>

                <p className="text-gray-400 mt-3 text-lg">

                    Discover pharmaceutical opportunities using real patient review analytics.

                </p>

            </div>

            {

                loading ?

                (

                    <div className="text-center py-20">

                        Loading Market Intelligence...

                    </div>

                )

                :

                market &&

                (

                    <>
                    {/* ===================================== */}
                    {/* MARKET OVERVIEW */}
                    {/* ===================================== */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

                        <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

                            <div className="text-gray-400 text-sm mb-3">

                                Top Rated Drugs

                            </div>

                            <div className="text-5xl font-black text-cyan-400">

                                {market.topRated.length}

                            </div>

                        </div>

                        <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

                            <div className="text-gray-400 text-sm mb-3">

                                Market Opportunities

                            </div>

                            <div className="text-5xl font-black text-green-400">

                                {market.opportunities.length}

                            </div>

                        </div>

                        <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

                            <div className="text-gray-400 text-sm mb-3">

                                Underperforming Drugs

                            </div>

                            <div className="text-5xl font-black text-red-400">

                                {market.underperforming.length}

                            </div>

                        </div>

                    </div>

                    {/* ===================================== */}
                    {/* TOP RATED DRUGS */}
                    {/* ===================================== */}

                    <div className="rounded-3xl bg-white/5 border border-white/10 p-8 mb-10">

                        <h2 className="text-3xl font-black mb-8">

                            Top Rated Drugs

                        </h2>

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b border-white/10 text-gray-400">

                                        <th className="text-left py-4">

                                            Drug

                                        </th>

                                        <th>

                                            Rating

                                        </th>

                                        <th>

                                            Reviews

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        market.topRated.map((drug,index)=>(

                                            <tr
                                                key={index}
                                                className="border-b border-white/5 hover:bg-white/5 transition"
                                            >

                                                <td className="py-5 font-semibold">

                                                    {drug.drugName}

                                                </td>

                                                <td className="text-center text-yellow-400 font-bold">

                                                    ⭐ {drug.Rating.toFixed(2)}

                                                </td>

                                                <td className="text-center">

                                                    {drug.Reviews}

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* ===================================== */}
                    {/* MARKET OPPORTUNITIES */}
                    {/* ===================================== */}

                    <div className="grid md:grid-cols-2 gap-8 mb-10">

                        {

                            market.opportunities.map((drug,index)=>(

                                <div
                                    key={index}
                                    className="rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-8"
                                >

                                    <div className="text-sm text-green-400 font-bold mb-3">

                                        HIGH POTENTIAL

                                    </div>

                                    <div className="text-2xl font-black mb-3">

                                        {drug.drugName}

                                    </div>

                                    <div className="flex justify-between mt-6">

                                        <div>

                                            <div className="text-gray-500 text-xs">

                                                Rating

                                            </div>

                                            <div className="text-xl font-bold text-yellow-400">

                                                ⭐ {drug.Rating.toFixed(2)}

                                            </div>

                                        </div>

                                        <div>

                                            <div className="text-gray-500 text-xs">

                                                Reviews

                                            </div>

                                            <div className="text-xl font-bold text-cyan-400">

                                                {drug.Reviews}

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                    {/* ===================================== */}
                    {/* UNDERPERFORMING */}
                    {/* ===================================== */}

                    <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

                        <h2 className="text-3xl font-black mb-8">

                            Underperforming Drugs

                        </h2>

                        <div className="space-y-5">

                            {

                                market.underperforming.map((drug,index)=>(

                                    <div
                                        key={index}
                                        className="flex justify-between items-center border-b border-white/10 pb-4"
                                    >

                                        <div>

                                            <div className="font-bold">

                                                {drug.drugName}

                                            </div>

                                            <div className="text-sm text-gray-500">

                                                {drug.Reviews} Reviews

                                            </div>

                                        </div>

                                        <div className="text-red-400 font-black text-xl">

                                            ⭐ {drug.Rating.toFixed(2)}

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    </div>
                    {/* ===================================== */}
                    {/* EXECUTIVE INSIGHTS */}
                    {/* ===================================== */}

                    <div className="mt-10 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 p-10">

                        <h2 className="text-3xl font-black mb-8">

                            Executive Insights

                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">

                            <div>

                                <div className="text-5xl mb-4">

                                    📈

                                </div>

                                <h3 className="text-xl font-bold mb-3">

                                    High Growth Segment

                                </h3>

                                <p className="text-gray-300 leading-7">

                                    {market.opportunities.length > 0
                                        ? `${market.opportunities[0].drugName} demonstrates strong patient satisfaction with comparatively lower review volume, indicating untapped market potential.`
                                        : "No significant high-growth opportunity identified from the current dataset."}

                                </p>

                            </div>

                            <div>

                                <div className="text-5xl mb-4">

                                    ⚠️

                                </div>

                                <h3 className="text-xl font-bold mb-3">

                                    Market Risk

                                </h3>

                                <p className="text-gray-300 leading-7">

                                    {market.underperforming.length > 0
                                        ? `${market.underperforming[0].drugName} has consistently lower patient ratings and may require further clinical or commercial evaluation.`
                                        : "No major market risks detected from the current analytics."}

                                </p>

                            </div>

                            <div>

                                <div className="text-5xl mb-4">

                                    💊

                                </div>

                                <h3 className="text-xl font-bold mb-3">

                                    Portfolio Leader

                                </h3>

                                <p className="text-gray-300 leading-7">

                                    {market.topRated.length > 0
                                        ? `${market.topRated[0].drugName} currently leads the portfolio based on average patient satisfaction.`
                                        : "No portfolio leader available."}

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* ===================================== */}
                    {/* AI RECOMMENDATION */}
                    {/* ===================================== */}

                    <div className="mt-10 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-600/10 to-pink-500/10 p-10">

                        <h2 className="text-3xl font-black mb-6">

                            AI Market Recommendation

                        </h2>

                        <div className="text-lg text-gray-300 leading-9">

                            Based on the current pharmaceutical review analytics,
                            prioritize investment in highly rated medications with
                            moderate review volume, while monitoring consistently
                            underperforming drugs for reformulation, repositioning,
                            or marketing improvements. Expanding the presence of
                            high-performing drugs into underserved therapeutic
                            segments represents the strongest growth opportunity.

                        </div>

                    </div>

                </>

            )

            }

        </div>

    );

}

export default MarketIntelligence;