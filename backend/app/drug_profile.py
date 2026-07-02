import pandas as pd
from pathlib import Path

# ----------------------------------------
# Load Dataset
# ----------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

file_path = BASE_DIR / "data" / "processed" / "cleaned_drugs.csv"

df = pd.read_csv(file_path)

# ----------------------------------------
# User Input
# ----------------------------------------

drug = input("Enter Drug Name: ").strip()

drug_df = df[df["drugName"].str.lower() == drug.lower()]

if drug_df.empty:
    print("\nDrug not found.")
    exit()

print("\n==============================")
print(f"Drug : {drug}")
print("==============================")

print(f"Total Reviews : {len(drug_df)}")

print(f"Average Rating : {round(drug_df['rating'].mean(),2)}")

print(f"Average Useful Votes : {round(drug_df['usefulCount'].mean(),2)}")

print("\nConditions Treated")

print(drug_df["condition"].value_counts())

print("\nTop 3 Reviews\n")

for review in drug_df["review"].head(3):
    print("-"*60)
    print(review)