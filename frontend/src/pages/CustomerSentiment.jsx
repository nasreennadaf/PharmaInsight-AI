
import { useState } from "react";
import api from "../services/api";

export default function CustomerSentiment() {
    const [review, setReview] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const analyzeReview = async () => {
        if (!review.trim()) {
            setError("Please enter a review before analyzing.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await api.post("/sentiment/analyze", {
                review: review.trim()
            });

            setResult(response.data);
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                err.response?.data?.error ||
                "Unable to analyze the review. Please check your backend connection."
            );
        } finally {
            setLoading(false);
        }
    };

    const sentimentColors = {
        Positive: "text-green-400 border-green-500/30 bg-green-500/10",
        Negative: "text-red-400 border-red-500/30 bg-red-500/10",
        Neutral: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
    };

    const samples = [
        {
            label: "Positive Review",
            text: "This medication worked wonderfully. I feel healthy and much better now."
        },
        {
            label: "Negative Review",
            text: "This medicine made me feel worse. I had terrible side effects."
        },
        {
            label: "Neutral Review",
            text: "I have mixed feelings about this medication. The results were moderate."
        }
    ];

    return (
        <div className="min-h-screen bg-[#090909] text-white px-6 md:px-10 py-12 pt-28">

            {/* HEADER */}
            <div className="mb-12">
                <p className="text-cyan-400 uppercase tracking-[0.25em] text-sm font-bold mb-4">
                    Machine Learning • BiLSTM
                </p>

                <h1 className="text-4xl md:text-5xl font-black">
                    Customer Sentiment Analysis
                </h1>

                <p className="text-gray-400 mt-4 text-lg max-w-3xl">
                    Analyze patient drug reviews using a trained deep learning
                    model to identify positive, negative and neutral sentiment.
                </p>
            </div>

            {/* REVIEW INPUT */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 mb-10">

                <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">📝</span>
                    <div>
                        <h2 className="text-2xl font-bold">
                            Enter Patient Review
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Paste a drug review below to analyze its sentiment.
                        </p>
                    </div>
                </div>

                <textarea
                    value={review}
                    onChange={(e) => {
                        setReview(e.target.value);
                        setError("");
                    }}
                    rows={6}
                    maxLength={10000}
                    placeholder="Enter a patient review here..."
                    className="w-full resize-y rounded-2xl bg-[#111111] border border-white/10 px-6 py-5 outline-none text-white placeholder:text-gray-500 focus:border-cyan-500 transition"
                />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-5">
                    <span className="text-gray-500 text-sm">
                        {review.length}/10,000 characters
                    </span>

                    <button
                        onClick={analyzeReview}
                        disabled={loading}
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all font-bold disabled:opacity-50"
                    >
                        {loading ? "Analyzing..." : "Analyze Sentiment →"}
                    </button>
                </div>

                {error && (
                    <p className="mt-5 text-red-400 text-sm">
                        {error}
                    </p>
                )}
            </div>

            {/* SAMPLE REVIEWS */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">
                    Try Sample Reviews
                </h2>

                <div className="grid md:grid-cols-3 gap-5">
                    {samples.map((sample) => (
                        <button
                            key={sample.label}
                            onClick={() => {
                                setReview(sample.text);
                                setResult(null);
                                setError("");
                            }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:border-cyan-500/50 hover:bg-white/10 transition"
                        >
                            <span className="text-cyan-400 font-bold">
                                {sample.label}
                            </span>

                            <p className="text-gray-400 mt-3 text-sm leading-6">
                                {sample.text}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* RESULTS */}
            {result && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 mb-10">

                    <h2 className="text-2xl font-bold mb-8">
                        Sentiment Analysis Results
                    </h2>

                    <div className="mb-10">
                        <p className="text-gray-500 text-sm mb-3">
                            Predicted Sentiment
                        </p>

                        <div className={`inline-flex items-center rounded-2xl border px-8 py-5 text-3xl font-black ${sentimentColors[result.sentiment] || "text-white border-white/10"}`}>
                            {result.sentiment}
                        </div>
                    </div>

                    <h3 className="text-lg font-bold mb-6">
                        Class Probabilities
                    </h3>

                    <div className="space-y-6">
                        {["Positive", "Neutral", "Negative"].map((label) => {
                            const probability = result.probabilities[label] ?? 0;
                            const percentage = probability * 100;

                            const barColors = {
                                Positive: "bg-green-400",
                                Neutral: "bg-yellow-400",
                                Negative: "bg-red-400"
                            };

                            return (
                                <div key={label}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-300 font-medium">
                                            {label}
                                        </span>

                                        <span className="text-white font-bold">
                                            {percentage.toFixed(2)}%
                                        </span>
                                    </div>

                                    <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-700 ${barColors[label]}`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <p className="text-gray-500 text-sm mt-8">
                        Probabilities represent the model's estimated confidence
                        across the three sentiment classes.
                    </p>
                </div>
            )}

            {/* MODEL INFORMATION */}
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-3">
                    About This Model
                </h3>

                <p className="text-gray-400 text-sm leading-7">
                    This feature uses a Bidirectional LSTM (BiLSTM) model
                    trained on drug reviews. Sentiment labels were derived
                    from review ratings: 1–4 Negative, 5–6 Neutral and
                    7–10 Positive. Predictions are estimates and should not
                    be treated as medical advice or definitive assessments
                    of patient experience.
                </p>
            </div>

        </div>
    );
}
