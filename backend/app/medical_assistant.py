from app.ai_assistant import generate_response
from app.prompts import MEDICAL_PROMPT

def medical_assistant(question):

    prompt = f"""
{MEDICAL_PROMPT}

Question

{question}
"""

    return generate_response(prompt)
if __name__ == "__main__":

    while True:

        q = input("\nMedical Question : ")

        if q.lower() == "exit":
            break

        print()

        print(medical_assistant(q))
