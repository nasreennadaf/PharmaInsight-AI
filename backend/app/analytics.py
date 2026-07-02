import pandas as pd
from pathlib import Path
from app.data_service import get_dataframe


def get_dashboard_kpis():
    df = get_dataframe()

    return {
        "reviews": int(len(df)),
        "drugs": int(df["drugName"].nunique()),
        "conditions": int(df["condition"].nunique()),
        "rating": round(float(df["rating"].mean()), 2),
        "average_useful_votes": round(float(df["usefulCount"].mean()), 2),
    }


def get_top_conditions(limit=5):
    df = get_dataframe()

    top_conditions = (
        df.groupby("condition")
        .size()
        .sort_values(ascending=False)
        .head(limit)
        .reset_index(name="reviews")
    )

    return top_conditions.to_dict(orient="records")


def get_top_drugs(limit=10):
    df = get_dataframe()

    top_drugs = (
        df.groupby("drugName")
        .agg(
            average_rating=("rating", "mean"),
            reviews=("drugName", "count"),
        )
        .sort_values("reviews", ascending=False)
        .head(limit)
        .reset_index()
    )

    top_drugs["average_rating"] = top_drugs["average_rating"].round(2)

    return top_drugs.to_dict(orient="records")


def get_rating_distribution():
    df = get_dataframe()

    ratings = (
        df["rating"]
        .value_counts()
        .sort_index()
    )

    return {
        "labels": ratings.index.astype(str).tolist(),
        "values": ratings.values.tolist(),
    }


def get_condition_distribution(limit=8):
    df = get_dataframe()

    conditions = (
        df.groupby("condition")
        .size()
        .sort_values(ascending=False)
        .head(limit)
    )

    return {
        "labels": conditions.index.tolist(),
        "values": conditions.values.tolist(),
    }
def get_all_drugs():
    df = get_dataframe()

    drugs = (
        df["drugName"]
        .dropna()
        .sort_values()
        .unique()
        .tolist()
    )

    return drugs


def get_drug_details(drug_name):
    df = get_dataframe()

    drug_df = df[df["drugName"] == drug_name]

    if drug_df.empty:
        return None

    conditions = (
        drug_df["condition"]
        .value_counts()
        .reset_index()
    )

    conditions.columns = ["condition", "reviews"]

    reviews = (
        drug_df[
            ["rating", "review", "usefulCount"]
        ]
        .head(10)
        .to_dict(orient="records")
    )

    return {
        "drug": drug_name,
        "average_rating": round(float(drug_df["rating"].mean()), 2),
        "reviews_count": int(len(drug_df)),
        "average_useful_votes": round(
            float(drug_df["usefulCount"].mean()), 2
        ),
        "conditions": conditions.to_dict(orient="records"),
        "reviews": reviews,
    }
def compare_drugs(drug1, drug2):

    df = get_dataframe()

    drug1_df = df[df["drugName"] == drug1]
    drug2_df = df[df["drugName"] == drug2]

    if drug1_df.empty or drug2_df.empty:
        return None

    def build_profile(drug_df, name):

        conditions = (
            drug_df["condition"]
            .value_counts()
            .head(5)
            .reset_index()
        )

        conditions.columns = ["condition", "reviews"]

        ratings = (
            drug_df["rating"]
            .value_counts()
            .sort_index()
            .reset_index()
        )

        ratings.columns = ["rating", "count"]

        trust_score = (
            (drug_df["rating"].mean() / 10) * 70
            +
            (min(len(drug_df), 1000) / 1000) * 30
        )

        return {

            "name": name,

            "rating": round(float(drug_df["rating"].mean()), 2),

            "reviews": int(len(drug_df)),

            "usefulVotes": round(float(drug_df["usefulCount"].mean()), 2),

            "trustScore": round(float(trust_score), 1),

            "conditions": conditions.to_dict(orient="records"),

            "ratingDistribution": ratings.to_dict(orient="records")

        }

    return {

        "drug1": build_profile(drug1_df, drug1),

        "drug2": build_profile(drug2_df, drug2)

    }
def get_market_intelligence():

    df = get_dataframe()

    top_rated = (
        df.groupby("drugName")
        .agg(
            Rating=("rating", "mean"),
            Reviews=("rating", "count")
        )
        .query("Reviews >= 10")
        .sort_values("Rating", ascending=False)
        .head(10)
        .reset_index()
    )

    market_opportunity = (
        top_rated[
            (top_rated["Rating"] >= 8.5)
            &
            (top_rated["Reviews"] <= 100)
        ]
    )

    underperforming = (
        df.groupby("drugName")
        .agg(
            Rating=("rating","mean"),
            Reviews=("rating","count")
        )
        .query("Reviews >= 20")
        .sort_values("Rating")
        .head(10)
        .reset_index()
    )

    return {

        "topRated": top_rated.to_dict(orient="records"),

        "opportunities": market_opportunity.to_dict(orient="records"),

        "underperforming": underperforming.to_dict(orient="records")

    }
def get_report_data():

    df = get_dataframe()

    total_reviews = len(df)

    total_drugs = df["drugName"].nunique()

    avg_rating = round(df["rating"].mean(), 2)

    top_drugs = (

        df.groupby("drugName")
        .agg(
            Rating=("rating", "mean"),
            Reviews=("rating", "count")
        )
        .query("Reviews>=10")
        .sort_values("Rating", ascending=False)
        .head(10)
        .reset_index()

    )

    low_drugs = (

        df.groupby("drugName")
        .agg(
            Rating=("rating", "mean"),
            Reviews=("rating", "count")
        )
        .query("Reviews>=20")
        .sort_values("Rating")
        .head(10)
        .reset_index()

    )

    return {

        "summary": {

            "reviews": total_reviews,

            "drugs": total_drugs,

            "rating": avg_rating

        },

        "topDrugs": top_drugs.to_dict(orient="records"),

        "lowDrugs": low_drugs.to_dict(orient="records")

    }
def get_report_context():

    df = get_dataframe()

    summary = {

        "total_reviews": len(df),

        "total_drugs": int(df["drugName"].nunique()),

        "total_conditions": int(df["condition"].nunique()),

        "average_rating": round(float(df["rating"].mean()),2)

    }

from app.data_service import get_dataframe

def get_dashboard_charts():

    df = get_dataframe()

    chart = (
        df.groupby("condition")
        .size()
        .sort_values(ascending=False)
        .head(10)
        .reset_index(name="reviews")
    )

    return {

        "labels": chart["condition"].tolist(),

        "values": chart["reviews"].tolist()

    }