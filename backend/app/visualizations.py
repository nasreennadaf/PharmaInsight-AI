import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

# --------------------------------
# File Paths
# --------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

input_file = BASE_DIR / "data" / "processed" / "cleaned_drugs.csv"

output_folder = BASE_DIR / "outputs" / "images"

output_folder.mkdir(parents=True, exist_ok=True)

# --------------------------------
# Load Data
# --------------------------------

df = pd.read_csv(input_file)

# --------------------------------
# Top 10 Most Reviewed Drugs
# --------------------------------

top_drugs = df["drugName"].value_counts().head(10)

plt.figure(figsize=(12,6))

plt.bar(top_drugs.index, top_drugs.values)

plt.title("Top 10 Most Reviewed Drugs")

plt.xlabel("Drug")

plt.ylabel("Number of Reviews")

plt.xticks(rotation=45, ha="right")

plt.tight_layout()

plt.savefig(output_folder / "top10_drugs.png")

plt.show()

print("✅ Chart saved successfully!")