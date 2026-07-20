import pandas as pd
from pathlib import Path
from functools import lru_cache

BASE_DIR = Path(__file__).resolve().parent.parent

@lru_cache(maxsize=1)
def get_dataframe():
    path = BASE_DIR / "data" / "processed" / "cleaned_drugs.csv"
    return pd.read_csv(path)
    df = df.dropna(subset=["condition"])

    df = df[
        ~df["condition"]
        .astype(str)
        .str.contains("</span>", case=False, na=False)
    ]

    df["condition"] = df["condition"].str.strip()

    return df
