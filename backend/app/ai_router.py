"""
AI Router

Determines which assistant
should answer the user's question.
"""

import re


# ==========================================
# MEDICAL QUESTIONS
# ==========================================

MEDICAL = [

    "what is",

    "define",

    "explain",

    "symptoms",

    "causes",

    "treatment",

    "side effects",

    "dosage",

    "medicine",

    "disease"

]


# ==========================================
# DATA QUESTIONS
# ==========================================

DATA = [

    "highest",

    "best",

    "top",

    "compare",

    "rating",

    "reviews",

    "review",

    "patient",

    "condition",

    "drug",

    "dataset"

]


# ==========================================
# BUSINESS QUESTIONS
# ==========================================

BUSINESS = [

    "market",

    "marketing",

    "investment",

    "opportunity",

    "potential",

    "recommend",

    "business",

    "strategy",

    "sales",

    "growth",

    "competition"

]


# ==========================================
# ROUTER
# ==========================================

def route(question):

    q = question.lower()

    # Business

    for word in BUSINESS:

        if re.search(rf"\b{word}\b", q):

            return "BUSINESS"

    # Medical

    for word in MEDICAL:

        if re.search(rf"\b{word}\b", q):

            return "MEDICAL"

    # Data

    for word in DATA:

        if re.search(rf"\b{word}\b", q):

            return "DATA"

    return "DATA"
if __name__=="__main__":

    while True:

        q=input("\nQuestion : ")

        if q=="exit":
            break

        print(route(q))