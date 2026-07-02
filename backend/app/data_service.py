from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_PATH = BASE_DIR / "data" / "processed" / "cleaned_drugs.csv"


def get_dataframe():

    df = pd.read_csv(DATA_PATH)

    df = df.dropna(subset=["condition"])

    df = df[
        ~df["condition"]
        .astype(str)
        .str.contains("</span>", case=False, na=False)
    ]

    df["condition"] = df["condition"].str.strip()

    return df
