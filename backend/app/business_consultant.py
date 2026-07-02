
from app.ai_assistant import generate_response
from app.prompts import BUSINESS_PROMPT

# =====================================================
# LOAD DATA
# =====================================================

from app.data_service import get_dataframe

df = get_dataframe()
# =====================================================
# CREATE BUSINESS METRICS
# =====================================================

drug_stats = df.groupby("drugName").agg(

    Average_Rating=("rating", "mean"),

    Reviews=("rating", "count"),

    UsefulVotes=("usefulCount", "mean")

).reset_index()

# =====================================================
# MARKET OPPORTUNITY
# =====================================================

def market_opportunity():

    temp = drug_stats.copy()

    temp = temp[
        (temp["Average_Rating"] >= 8.5) &
        (temp["Reviews"] >= 10) &
        (temp["Reviews"] <= 100)
    ]

    return temp.sort_values(
        by="Average_Rating",
        ascending=False
    ).head(10)


# =====================================================
# UNDERPERFORMING DRUGS
# =====================================================

def underperforming():

    temp = drug_stats.copy()

    temp = temp[
        (temp["Average_Rating"] <= 5)
        &
        (temp["Reviews"] >= 20)
    ]

    return temp.sort_values(
        by="Average_Rating"
    ).head(10)


# =====================================================
# HIGH ADOPTION DRUGS
# =====================================================

def high_adoption():

    temp = drug_stats.copy()

    return temp.sort_values(
        by="Reviews",
        ascending=False
    ).head(10)


# =====================================================
# BUSINESS CONSULTANT
# =====================================================

def business_consultant(question):

    q = question.lower()

    if "market" in q or "potential" in q or "opportunity" in q:

        analytics = market_opportunity()

        title = "High Market Opportunity Drugs"

    elif "underperform" in q or "low" in q:

        analytics = underperforming()

        title = "Underperforming Drugs"

    elif "marketing" in q or "investment" in q or "promote" in q:

        analytics = high_adoption()

        title = "High Adoption Drugs"

    else:

        analytics = market_opportunity()

        title = "Business Analytics"

    prompt = f"""
{BUSINESS_PROMPT}

Business Report

{title}

{analytics.to_markdown(index=False)}

Question

{question}

Generate a professional consulting report.

Include:

## Executive Summary

## Key Business Findings

## Recommendation

## Business Impact

Base every statement ONLY on the supplied data.
"""

    return generate_response(prompt)


# =====================================================
# TEST
# =====================================================

if __name__ == "__main__":

    while True:

        q = input("\nBusiness Question : ")

        if q.lower() == "exit":
            break

        print()

        print(business_consultant(q))