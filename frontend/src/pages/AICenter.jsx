import { useState } from "react";
import api from "../services/api";

function AICenter() {

    const [assistant, setAssistant] = useState("medical");

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const assistants = [

        {
            id: "medical",
            title: "Medical Expert",
            icon: "🩺",
            color: "border-blue-500"
        },

        {
            id: "data",
            title: "Data Analyst",
            icon: "📊",
            color: "border-green-500"
        },

        {
            id: "business",
            title: "Business Consultant",
            icon: "💼",
            color: "border-purple-500"
        }

    ];

    const sendQuestion = async () => {

        if (!question.trim()) return;

        const userMessage = {

            sender: "user",

            text: question

        };

        setMessages(prev => [...prev, userMessage]);

        setLoading(true);

        try {

            const response = await api.post("/ai/chat", {

                assistant,

                question

            });

            setMessages(prev => [

                ...prev,

                {

                    sender: "ai",

                    assistant,

                    text: response.data.response

                }

            ]);

        }

        catch (err) {

            setMessages(prev => [
    ...prev,
    {
        sender: "ai",
        assistant,
        text: "Unable to contact the AI assistant. Please check that the FastAPI backend is running."
    }
]);

        }

        finally {

            setLoading(false);

            setQuestion("");

        }

    };

    return (

        <div className="min-h-screen bg-[#090909] text-white p-10">

            {/* HEADER */}

            <div className="mb-12">

                <h1 className="text-5xl font-black">

                    AI Center

                </h1>

                <p className="text-gray-400 mt-3 text-lg">

                    Ask medical, analytical and business questions powered by Gemini.

                </p>

            </div>

            {/* ASSISTANTS */}

            <div className="grid md:grid-cols-3 gap-8 mb-12">

                {

                    assistants.map(a => (

                        <div

                            key={a.id}

                            onClick={() => setAssistant(a.id)}

                            className={`cursor-pointer rounded-3xl border-2 p-8 transition-all ${assistant === a.id
                                ? a.color
                                : "border-white/10"
                                } bg-white/5 hover:bg-white/10`}

                        >

                            <div className="text-5xl mb-5">

                                {a.icon}

                            </div>

                            <div className="text-2xl font-bold">

                                {a.title}

                            </div>

                        </div>

                    ))

                }

            </div>
            {/* ================= CHAT WINDOW ================= */}

            <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">

                {/* Chat Header */}

                <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">

                    <div>

                        <h2 className="text-2xl font-bold">

                            Conversation

                        </h2>

                        <p className="text-gray-500 text-sm mt-1">

                            Current Assistant :
                            {" "}
                            <span className="text-cyan-400 capitalize">

                                {assistant}

                            </span>

                        </p>

                    </div>

                    <div className="flex items-center gap-2">

                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

                        <span className="text-sm text-green-400">

                            Gemini Online

                        </span>

                    </div>

                </div>

                {/* Messages */}

                <div className="h-[500px] overflow-y-auto p-8 space-y-6">

                    {

                        messages.length === 0 && (

                            <div className="flex items-center justify-center h-full">

                                <div className="text-center">

                                    <div className="text-7xl mb-5">

                                        🤖

                                    </div>

                                    <h3 className="text-2xl font-bold mb-3">

                                        Ready to Assist

                                    </h3>

                                    <p className="text-gray-500 max-w-lg">

                                        Choose an assistant above and ask
                                        anything about pharmaceuticals,
                                        market intelligence or medical
                                        knowledge.

                                    </p>

                                </div>

                            </div>

                        )

                    }

                    {

                        messages.map((msg, index) => (

                            <div

                                key={index}

                                className={`flex ${msg.sender === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}

                            >

                                <div

                                    className={`max-w-[75%] rounded-3xl px-6 py-5 ${msg.sender === "user"
                                        ? "bg-blue-600"
                                        : "bg-[#1a1a1a] border border-white/10"
                                        }`}

                                >

                                    {

                                        msg.sender === "ai" && (

                                            <div className="text-xs uppercase tracking-wider text-cyan-400 mb-3 font-bold">

                                                {msg.assistant}

                                            </div>

                                        )

                                    }

                                    <div className="leading-8 whitespace-pre-wrap">

                                        {msg.text}

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                    {

                        loading && (

                            <div className="flex justify-start">

                                <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl px-6 py-5">

                                    <div className="flex gap-2">

                                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>

                                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-150"></div>

                                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-300"></div>

                                    </div>

                                </div>

                            </div>

                        )

                    }

                </div>
            {/* ================= INPUT ================= */}

            <div className="border-t border-white/10 bg-[#111111] p-6">

                <div className="flex gap-4">

                    <textarea

                        rows={3}

                        value={question}

                        onChange={(e)=>setQuestion(e.target.value)}

                        onKeyDown={(e)=>{

                            if(e.key==="Enter" && !e.shiftKey){

                                e.preventDefault();

                                sendQuestion();

                            }

                        }}

                        placeholder={`Ask the ${assistant} assistant anything...`}

                        className="flex-1 resize-none rounded-2xl bg-[#181818] border border-white/10 px-5 py-4 outline-none text-white placeholder:text-gray-500 focus:border-cyan-500 transition"

                    />

                    <button

                        onClick={sendQuestion}

                        disabled={loading}

                        className="w-40 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all font-bold disabled:opacity-50"

                    >

                        {

                            loading ?

                            "Thinking..."

                            :

                            "Send"

                        }

                    </button>

                </div>

            </div>

        </div>

        {/* ================= QUICK PROMPTS ================= */}

        <div className="mt-12">

            <h2 className="text-2xl font-bold mb-6">

                Suggested Questions

            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <button

                    onClick={()=>setQuestion("What are the side effects of Ibuprofen?")}

                    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:border-blue-500 hover:bg-white/10 transition"

                >

                    🩺 Medical Question

                    <p className="text-gray-400 mt-3 text-sm">

                        What are the side effects of Ibuprofen?

                    </p>

                </button>

                <button

                    onClick={()=>setQuestion("Which drugs have the highest patient ratings?")}

                    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:border-green-500 hover:bg-white/10 transition"

                >

                    📊 Dataset Analysis

                    <p className="text-gray-400 mt-3 text-sm">

                        Which drugs have the highest patient ratings?

                    </p>

                </button>

                <button

                    onClick={()=>setQuestion("Suggest a market opportunity based on the dataset.")}

                    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:border-purple-500 hover:bg-white/10 transition"

                >

                    💼 Business Insight

                    <p className="text-gray-400 mt-3 text-sm">

                        Suggest a market opportunity from the available data.

                    </p>

                </button>

            </div>

        </div>

    </div>

    );

}

export default AICenter;