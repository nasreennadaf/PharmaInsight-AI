from app.ai_assistant import generate_response
from app.prompts import DATA_ANALYST_PROMPT
from app.data_service import get_dataframe


def data_analyst(question):

    df = get_dataframe()

    summary = f"""
Dataset Summary

Total Reviews : {len(df)}
Total Drugs : {df['drugName'].nunique()}
Total Conditions : {df['condition'].nunique()}
Average Rating : {round(df['rating'].mean(),2)}

Top 10 Conditions

{df['condition'].value_counts().head(10).to_markdown()}
"""

    prompt = f"""
{DATA_ANALYST_PROMPT}

{summary}

Question

{question}

Answer ONLY using the supplied dataset.
Never invent values.
"""

    return generate_response(prompt)