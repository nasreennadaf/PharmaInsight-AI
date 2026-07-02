import pandas as pd
from pathlib import Path
from sklearn.preprocessing import MinMaxScaler

# ----------------------------------
# Load Dataset
# ----------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent
file_path = BASE_DIR / "data" / "processed" / "cleaned_drugs.csv"

df = pd.read_csv(file_path)

# ----------------------------------
# Aggregate Drug Statistics
# ----------------------------------

drug_stats = df.groupby("drugName").agg(
    Average_Rating=("rating", "mean"),
    Review_Count=("rating", "count"),
    Average_Useful=("usefulCount", "mean")
).reset_index()

# ----------------------------------
# Keep only drugs with at least 50 reviews
# ----------------------------------

drug_stats = drug_stats[drug_stats["Review_Count"] >= 50].copy()

# ----------------------------------
# Normalize Values
# ----------------------------------

scaler = MinMaxScaler()

drug_stats[["Average_Rating", "Review_Count", "Average_Useful"]] = scaler.fit_transform(
    drug_stats[["Average_Rating", "Review_Count", "Average_Useful"]]
)

# ----------------------------------
# Calculate Trust Score
# ----------------------------------

drug_stats["Trust_Score"] = (
    0.50 * drug_stats["Average_Rating"] +
    0.30 * drug_stats["Average_Useful"] +
    0.20 * drug_stats["Review_Count"]
)

# ----------------------------------
# Sort by Trust Score
# ----------------------------------

drug_stats = drug_stats.sort_values(
    by="Trust_Score",
    ascending=False
)

# ----------------------------------
# Display Top 20
# ----------------------------------

print("\n========== TOP 20 TRUSTED DRUGS ==========\n")

print(
    drug_stats[
        [
            "drugName",
            "Average_Rating",
            "Review_Count",
            "Average_Useful",
            "Trust_Score"
        ]
    ].head(20)
)