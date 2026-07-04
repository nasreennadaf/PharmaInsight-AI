from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import Query
from app.medical_assistant import medical_assistant
from app.data_analyst import data_analyst
from app.business_consultant import business_consultant
from app.analytics import get_report_context
from app.ai_assistant import generate_response

class AIRequest(BaseModel):

    assistant: str

    question: str

class ReportRequest(BaseModel):

    report_type:str

    audience:str

    objective:str

    instructions:str=""


app = FastAPI(title="PharmaInsight API")

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.analytics import (
    get_dashboard_kpis,
    get_top_conditions,
    get_condition_distribution,
    get_all_drugs,
    get_drug_details,
    compare_drugs,
    get_market_intelligence,
    get_report_data,
    get_report_context,
    get_dashboard_charts,
    get_top_conditions,
    get_rating_distribution,
    get_top_drugs, 
)


from fastapi.responses import JSONResponse

@app.api_route("/", methods=["GET", "HEAD"])
def root():
    return {"message": "PharmaInsight API Running"}

@app.get("/dashboard/kpis")
def dashboard():
    return get_dashboard_kpis()

@app.get("/dashboard/top-conditions")
def dashboard_top_conditions():
    return get_top_conditions()

@app.get("/dashboard/top-drugs")
def dashboard_top_drugs():
    return get_top_drugs(limit=6)

@app.get("/dashboard/rating-distribution")
def dashboard_rating_distribution():
    return get_rating_distribution()

@app.get("/dashboard/charts")
def dashboard_charts():
    return get_condition_distribution()


@app.get("/drugs")
def drugs():
    return get_all_drugs()


@app.get("/drug/{drug_name}")
def drug_details(drug_name: str):

    result = get_drug_details(drug_name)

    if result is None:

        return {
            "error": "Drug not found"
        }

    return result


@app.get("/compare")
def compare(
    drug1: str = Query(...),
    drug2: str = Query(...)
):

    result = compare_drugs(drug1, drug2)

    if result is None:
        return {"error": "Drug not found"}

    return result

@app.post("/ai/chat")
def ai_chat(request: AIRequest):

    try:

        assistant = request.assistant.lower()

        if assistant == "medical":

            answer = medical_assistant(
                request.question
            )

        elif assistant == "data":

            answer = data_analyst(
                request.question
            )

        elif assistant == "business":

            answer = business_consultant(
                request.question
            )

        else:

            return {
                "error": "Unknown assistant"
            }

        return {

            "assistant": assistant,

            "response": answer

        }

    except Exception as e:

        return {

            "error": str(e)

        }
@app.get("/market/intelligence")
def market():

    return get_market_intelligence()

@app.get("/reports")
def reports():

    return get_report_data()




@app.post("/reports/generate")
def generate_report(request: ReportRequest):

    context = get_report_context()

    prompt = f"""

You are an executive pharmaceutical consultant.

You are a senior pharmaceutical strategy consultant.

Generate a concise executive report.

Rules:

- Maximum 450 words.
- Maximum 1 page.
- Do NOT use Markdown (#, ##, **, -, *).
- Write in professional business language.
- Keep paragraphs short.
- Avoid repeating statistics.
- Use only the supplied dataset context.

Return the report using exactly this structure:

TITLE
EXECUTIVE SUMMARY (2–3 sentences)
KEY METRICS (4–6 metrics only)
KEY FINDINGS (maximum 4)
RECOMMENDATIONS (maximum 4)
BUSINESS IMPACT (2–3 sentences)
FINAL DECISION (one sentence)
Report Type

{request.report_type}

Audience

{request.audience}

Objective

{request.objective}

Extra Instructions

{request.instructions}

Dataset Context

{context}

Structure

# Executive Summary

# Key Findings

# Business Insights

# Recommendations

# Action Plan

Never invent numbers.

Use only supplied context.

"""

    report = generate_response(prompt)

    return {

        "report":report

    }





