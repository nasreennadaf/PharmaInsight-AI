
import { useState } from "react";
import api from "../services/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function StructuredReport({ content, reportType, audience, created, onClear }) {

  const sections = [
    { key: "EXECUTIVE SUMMARY", label: "Executive Summary" },
    { key: "KEY METRICS", label: "Key Metrics" },
    { key: "KEY FINDINGS", label: "Key Findings" },
    { key: "STRATEGIC RECOMMENDATIONS", label: "Strategic Recommendations" },
    { key: "BUSINESS IMPACT", label: "Business Impact" },
    { key: "RISK CONSIDERATIONS", label: "Risk Considerations" },
    { key: "CONCLUSION & NEXT STEPS", label: "Conclusion & Next Steps" },
  ];

  const parseSection = (text, heading) => {
    const allHeadings = sections.map(s => s.key).join("|");
    const regex = new RegExp(`${heading}\\n([\\s\\S]*?)(?=(?:${allHeadings})|$)`);
    const match = text.match(regex);
    return match ? match[1].trim() : null;
  };

  return (
<div id="report-preview" className="rounded-3xl border border-white/10 bg-[#111111] overflow-hidden mb-10">
      {/* Header */}
      <div className="flex justify-between items-start px-8 py-6 border-b border-white/10">
        <div>
          <div className="flex gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
              {reportType}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold">
              {audience}
            </span>
          </div>
          <h2 className="text-3xl font-black">AI Generated Report</h2>
          <p className="text-gray-500 text-sm mt-1">{created}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigator.clipboard.writeText(content)}
            className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 transition"
          >
            📋 Copy
          </button>
          <button
            onClick={onClear}
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 transition"
          >
            🗑 Clear
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="p-8 space-y-8">
        {sections.map(({ key, label }) => {
          const sectionContent = parseSection(content, key);
          if (!sectionContent) return null;
          return (
            <div key={key}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4 pb-2 border-b border-cyan-500/20">
                {label}
              </h3>
              <div className="prose prose-invert max-w-none text-gray-300 leading-7">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {sectionContent}
                </ReactMarkdown>
              </div>
            </div>
          );
        })}

        {/* Fallback: if no sections matched, render the whole report */}
        {sections.every(({ key }) => !parseSection(content, key)) && (
          <div className="prose prose-invert max-w-none text-gray-300 leading-7">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>

    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4 pb-2 border-b border-cyan-500/20">
        {title}
      </h3>
      {children}
    </div>
  );
}

function NumberedList({ text }) {
  const items = text.split(/\n\d+\.\s+/).filter(Boolean);
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs flex items-center justify-center mt-1">{i + 1}</span>
          <p className="text-gray-300 leading-7">{item.trim()}</p>
        </li>
      ))}
    </ol>
  );
}

function MetricsGrid({ text }) {
  const lines = text.split('\n').filter(l => l.includes(':'));
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {lines.map((line, i) => {
        const [label, value] = line.replace(/^-\s*/, '').split(':');
        return (
          <div key={i} className="rounded-2xl bg-white/5 p-4">
            <p className="text-gray-500 text-xs mb-1">{label?.trim()}</p>
            <p className="text-2xl font-bold text-white">{value?.trim()}</p>
          </div>
        );
      })}
    </div>
  );
}

function ReportStudio(){

const [reportType,setReportType]=useState("Executive Summary");

const [audience,setAudience]=useState("CEO");

const [objective,setObjective]=useState("");

const [instructions,setInstructions]=useState("");


const [history, setHistory] = useState([]);

const [selectedReport, setSelectedReport] = useState(null);

const [loading,setLoading]=useState(false);

const [report, setReport] = useState("");

const templates = [
{
title:"Investment Decision Brief",
icon:"💰",
type:"Executive Summary",
audience:"CEO",
objective:"Should we invest further in this pharmaceutical portfolio based on patient reviews and market opportunity?",
instructions:"Provide an investment score, risks, opportunities and final recommendation."
},

{
title:"Drug Launch Readiness",
icon:"🚀",
type:"Drug Performance",
audience:"Marketing",
objective:"Evaluate whether a drug is ready for a wider commercial launch.",
instructions:"Focus on patient satisfaction, adoption and commercial readiness."
},

{
title:"Portfolio Health Check",
icon:"💊",
type:"Executive Summary",
audience:"Medical Affairs",
objective:"Assess the overall health of the pharmaceutical portfolio.",
instructions:"Highlight strengths, weak drugs and recommendations."
},

{
title:"Competitive Benchmark",
icon:"📊",
type:"Competitive Analysis",
audience:"Sales",
objective:"Compare leading drugs and identify competitive advantages.",
instructions:"Generate strategic competitive insights."
},

{
title:"Market Expansion Strategy",
icon:"🌍",
type:"Market Opportunity",
audience:"CEO",
objective:"Identify drugs suitable for expansion into new markets.",
instructions:"Focus on high-rated drugs with moderate adoption."
},

{
title:"Risk Assessment",
icon:"⚠️",
type:"Executive Summary",
audience:"Regulatory",
objective:"Identify clinical and commercial risks in the portfolio.",
instructions:"Prioritize patient safety and low-rated medications."
}

];
const objectiveSuggestions = [
  "Identify drugs suitable for expansion into new markets",
  "Evaluate investment potential of high-rated low-adoption drugs",
  "Assess portfolio readiness for commercial launch",
  "Compare top drugs against competitive benchmarks",
  "Identify clinical and commercial risk across the portfolio",
];

const instructionSuggestions = [
  "Focus on ROI and revenue potential",
  "Prioritize patient safety signals",
  "Include regulatory risk flags",
  "Highlight underserved patient segments",
  "Compare against industry benchmarks",
];
const generate=async()=>{

if(!objective)return;

setLoading(true);

try{

const res=await api.post("/reports/generate",{

report_type:reportType,

audience,

objective,

instructions

});

const generated = {

id: Date.now(),

title: reportType,

audience,

objective,

created: new Date().toLocaleString(),

content: res.data.report

};

setReport(generated.content);

setSelectedReport(generated.id);

setHistory(prev => [

generated,

...prev

]);

}

catch(err){

console.log(err);

}

finally{

setLoading(false);

}

};

return(

<div className="min-h-screen bg-[#090909] text-white p-10">

<div className="mb-12">

<h1 className="text-6xl font-black">

AI Report Studio

</h1>

<div className="mt-5 inline-flex rounded-full bg-cyan-500/10 border border-cyan-500/20 px-5 py-2 text-cyan-400 text-sm font-semibold">

✨ Powered by Gemini + PharmaInsight Analytics


<p className="text-gray-400 mt-4 text-xl">

Generate executive-ready pharmaceutical reports using AI.

</p>

</div>
</div>
{/* ====================================================== */}
{/* AI TEMPLATES */}
{/* ====================================================== */}

<div className="mb-12">
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-3xl font-black">AI Templates</h2>
      <p className="text-gray-500 mt-1 text-sm">Select a template to auto-fill the form below</p>
    </div>
    <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs font-medium">
      {templates.length} templates
    </span>
  </div>

  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
    {templates.map((template, index) => (
      <div
        key={index}
        onClick={() => {
          setReportType(template.type);
          setAudience(template.audience);
          setObjective(template.objective);
          setInstructions(template.instructions);
        }}
        className={`group cursor-pointer rounded-2xl border bg-[#111] hover:border-cyan-500/60 transition-all duration-200 overflow-hidden ${
          reportType === template.type && objective === template.objective
            ? "border-cyan-500 ring-1 ring-cyan-500/30"
            : "border-white/8"
        }`}
      >
        {/* Top bar accent */}
        <div className={`h-1 w-full ${template.accent}`} />

        <div className="p-6">
          {/* Icon + Audience row */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
              {template.icon}
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-400">
              {template.audience}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-white mb-1">
            {template.title}
          </h3>

          {/* Type badge */}
          <p className="text-xs text-cyan-500/70 font-medium mb-3">
            {template.type}
          </p>

          {/* Objective */}
          <p className="text-gray-500 text-sm leading-6 line-clamp-2">
            {template.objective}
          </p>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-gray-600">Click to use template</span>
            <span className="text-xs text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
              Apply →
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

{/* ====================================================== */}
{/* REPORT TYPE */}
{/* ====================================================== */}

<div className="mb-10">
  <h2 className="text-2xl font-bold mb-2">Report Type</h2>
  <p className="text-gray-500 text-sm mb-6">Choose the structure of your generated report</p>

  <div className="grid md:grid-cols-3 gap-3">
    {[
      { type: "Executive Summary", desc: "High-level overview for leadership", icon: "📋" },
      { type: "Drug Performance", desc: "Detailed efficacy and adoption metrics", icon: "💊" },
      { type: "Market Opportunity", desc: "Expansion and revenue potential", icon: "🌍" },
      { type: "Competitive Analysis", desc: "Benchmark against market competitors", icon: "📊" },
      { type: "Patient Sentiment", desc: "Review-based satisfaction insights", icon: "🧬" },
      { type: "Custom Report", desc: "Define your own report structure", icon: "✏️" },
    ].map(({ type, desc, icon }) => (
      <button
        key={type}
        onClick={() => setReportType(type)}
        className={`rounded-xl border p-5 text-left transition-all duration-200 flex gap-4 items-start ${
          reportType === type
            ? "border-cyan-500 bg-cyan-500/10"
            : "border-white/8 bg-[#111] hover:border-white/20 hover:bg-white/5"
        }`}
      >
        <span className="text-2xl mt-0.5">{icon}</span>
        <div>
          <div className={`text-sm font-semibold mb-1 ${reportType === type ? "text-cyan-400" : "text-white"}`}>
            {type}
          </div>
          <div className="text-xs text-gray-500 leading-5">{desc}</div>
        </div>
      </button>
    ))}
  </div>
</div>

{/* ====================================================== */}
{/* AUDIENCE */}
{/* ====================================================== */}

<div className="mb-10">

<h2 className="text-2xl font-bold mb-6">

Audience

</h2>

<select

value={audience}

onChange={(e)=>setAudience(e.target.value)}

className="w-full rounded-2xl bg-[#171717] border border-white/10 p-5 text-white"

>

<option>CEO</option>

<option>Marketing</option>

<option>Medical Affairs</option>

<option>Sales</option>

<option>Research & Development</option>

<option>Regulatory</option>

<option>Investors</option>

</select>

</div>

{/* ====================================================== */}
{/* OBJECTIVE */}
{/* ====================================================== */}

<div className="mb-10">

<h2 className="text-2xl font-bold mb-6">

Business Objective

</h2>

<textarea

rows={4}

value={objective}

onChange={(e)=>setObjective(e.target.value)}

placeholder="Example: Identify high-potential drugs suitable for commercial expansion in emerging therapeutic segments."

className="w-full rounded-3xl bg-[#171717] border border-white/10 p-6 resize-none text-white placeholder:text-gray-500 outline-none focus:border-cyan-500"

/>
<div className="flex flex-wrap gap-2 mt-3">
        {objectiveSuggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => setObjective(s)}
            className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-400 text-xs text-gray-400 transition-all"
          >
            {s}
          </button>
        ))}
      </div>
</div>

{/* ====================================================== */}
{/* EXTRA INSTRUCTIONS */}
{/* ====================================================== */}

<div className="mb-10">

<h2 className="text-2xl font-bold mb-6">

Additional Instructions (Optional)

</h2>

<textarea

rows={4}

value={instructions}

onChange={(e)=>setInstructions(e.target.value)}

placeholder="Focus on business impact, investment opportunities, patient satisfaction, pricing strategy..."

className="w-full rounded-3xl bg-[#171717] border border-white/10 p-6 resize-none text-white placeholder:text-gray-500 outline-none focus:border-cyan-500"

/>
<div className="flex flex-wrap gap-2 mt-3">
        {instructionSuggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => setInstructions(prev => prev ? `${prev}, ${s}` : s)}
            className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-400 text-xs text-gray-400 transition-all"
          >
            + {s}
          </button>
        ))}
      </div>
</div>

{/* ====================================================== */}
{/* GENERATE */}
{/* ====================================================== */}

<div className="flex justify-center mb-12">

<button

onClick={generate}

disabled={loading}

className="px-12 py-5 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xl font-bold hover:scale-105 transition-all disabled:opacity-50"

>

{

loading

?

"Generating Report..."

:

"Generate AI Report"

}

</button>

</div>
{/* ====================================================== */}
{/* REPORT PREVIEW */}
{/* ====================================================== */}



{report && (
  <StructuredReport
    content={report}
    reportType={reportType}
    audience={audience}
    created={new Date().toLocaleString()}
    onClear={() => setReport("")}
  />
)}

{/* ====================================================== */}
{/* EXPORT TOOLBAR */}
{/* ====================================================== */}

{report && (
  <div className="rounded-2xl bg-[#111] border border-white/10 p-6 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <h2 className="text-lg font-bold">Export Report</h2>
      <p className="text-gray-500 text-sm mt-1">Download a print-ready PDF of this report</p>
    </div>
    <button
      onClick={async () => {
        const html2pdf = (await import("html2pdf.js")).default;
        const element = document.getElementById("report-preview");
        html2pdf()
          .set({
            margin: 12,
            filename: `${reportType.replace(/\s+/g, "_")}_${audience}_Report.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, backgroundColor: "#111111" },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          })
          .from(element)
          .save();
      }}
      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 transition font-semibold text-sm whitespace-nowrap"
    >
      📄 Download PDF
    </button>
  </div>
)}
{/* ====================================================== */}
{/* REPORT WORKSPACE */}
{/* ====================================================== */}

<div className="rounded-3xl border border-white/10 bg-[#111111] overflow-hidden mb-12">

<div className="border-b border-white/10 px-8 py-6">

<h2 className="text-3xl font-black">

AI Workspace

</h2>

<p className="text-gray-400 mt-2">

Reports generated during this session.

</p>

</div>

{

history.length===0

?

(

<div className="py-20 text-center text-gray-500">

No reports generated yet.

</div>

)

:

(

<div className="divide-y divide-white/5">

{

history.map(item=>(

<div

key={item.id}

onClick={()=>{

setSelectedReport(item.id);

setReport(item.content);

}}

className={`cursor-pointer p-8 transition-all hover:bg-white/5 ${
selectedReport===item.id

?

"bg-cyan-500/10"

:

""

}`}

>

<div className="flex justify-between items-center">

<div>

<h3 className="text-xl font-bold">

{item.title}

</h3>

<p className="text-gray-500 mt-2">

{item.objective}

</p>

</div>

<div className="text-right">

<div className="text-cyan-400 font-bold">

{item.audience}

</div>

<div className="text-sm text-gray-500 mt-2">

{item.created}

</div>

</div>

</div>

</div>

))

}

</div>

)

}

</div>
    </div>

    );

}

export default ReportStudio;