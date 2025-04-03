import google.generativeai as genai
import os

# Set up Gemini API Key (Replace with your actual API key)
os.environ["GOOGLE_API_KEY"] = "AIzaSyB__lFW10KE-UZOmVToklaiveB8luhigPY"
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

def generate_interview_questions(resume_text, job_role):
    """Generates interview questions based on a candidate's resume and job role."""
    prompt = f"""
    You are an AI interviewer. Generate 5 technical and behavioral interview questions 
    for a candidate applying for a {job_role} role. The questions should be based on 
    the following resume details:\n\n{resume_text}
    """

    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    response = model.generate_content(prompt)

    return response.text.strip()
