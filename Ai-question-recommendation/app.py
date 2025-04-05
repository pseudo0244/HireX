import streamlit as st
import os
from resume_parser import extract_text_from_resume
from question_generator import generate_interview_questions

# Streamlit UI
st.set_page_config(page_title="AI Interview Question Generator", layout="wide")

st.title("🧠 AI-Powered Interview Preparation")
st.write("Upload a candidate's resume and specify the job role to generate relevant interview questions.")

# File upload
uploaded_file = st.file_uploader("📂 Upload Resume (PDF/DOCX)", type=["pdf", "docx"])
job_role = st.text_input("💼 Enter Job Role", placeholder="Software Engineer, Data Scientist, etc.")

if uploaded_file and job_role:
    st.info("Processing resume... ⏳")

    # Save uploaded file temporarily
    file_path = f"temp_resume.{uploaded_file.name.split('.')[-1]}"
    with open(file_path, "wb") as f:
        f.write(uploaded_file.read())

    # Extract text from resume
    resume_text = extract_text_from_resume(file_path)

    # Generate AI-powered interview questions
    questions = generate_interview_questions(resume_text, job_role)

    st.success("✅ Interview Questions Generated!")
    st.subheader("📌 Suggested Interview Questions")
    st.write(questions)

    # Cleanup temp file
    os.remove(file_path)
