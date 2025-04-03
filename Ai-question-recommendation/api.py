import google.generativeai as genai
import os

# Set up API key
os.environ["GOOGLE_API_KEY"] = "AIzaSyB__lFW10KE-UZOmVToklaiveB8luhigPY"
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])


