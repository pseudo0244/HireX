const JOBS_KEY = "HireYatra_jobs";
const RESUMES_KEY = "HireYatra_resumes";

// Add a new job to localStorage
export function addJob(job) {
  const jobs = JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
  jobs.push(job);
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

// Get all jobs
export function getJobs() {
  return JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
}

// Upload a resume
export function uploadResume(user, base64File) {
  const resumes = JSON.parse(localStorage.getItem(RESUMES_KEY)) || [];
  resumes.push({ user, file: base64File, uploadedAt: new Date() });
  localStorage.setItem(RESUMES_KEY, JSON.stringify(resumes));
}

// Get all resumes
export function getResumes() {
  return JSON.parse(localStorage.getItem(RESUMES_KEY)) || [];
}

// Convert a file to Base64
export function convertFileToBase64(file, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result);
  reader.onerror = (error) => console.error("Base64 conversion error:", error);
}
