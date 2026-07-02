"""
=====================================================
PharmaInsight AI
Gemini Client
=====================================================

This module ONLY communicates with Gemini.

It does NOT contain:

- Medical Logic
- Business Logic
- Dataset Logic
- Streamlit Code

Those responsibilities belong to the individual
assistant modules.
"""

from google import genai
from dotenv import load_dotenv
import os

# =====================================================
# LOAD ENVIRONMENT VARIABLES
# =====================================================

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if API_KEY is None:
    raise ValueError(
        "GEMINI_API_KEY not found. "
        "Create a .env file and add your API key."
    )

# =====================================================
# GEMINI CLIENT
# =====================================================

client = genai.Client(api_key=API_KEY)

MODEL = "gemini-2.5-flash"

# =====================================================
# GENERATE RESPONSE
# =====================================================

def generate_response(prompt):

    response = client.models.generate_content(

        model=MODEL,

        contents=prompt

    )

    return response.text


# =====================================================
# CHAT FUNCTION
# =====================================================

def chat(system_prompt, question, context=""):

    prompt = f"""
{system_prompt}

=====================================================

Context

{context}

=====================================================

User Question

{question}

=====================================================

Instructions

Answer professionally.

Never invent numerical values.

If the required information
does not exist in the supplied context,
clearly mention that.

Use markdown headings.

"""

    return generate_response(prompt)


# =====================================================
# TEST
# =====================================================

if __name__ == "__main__":

    print(
        generate_response(
            "Say hello in one sentence."
        )
    )


