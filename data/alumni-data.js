// data/alumni-data.js
//
// Former MMVL members, grouped by the route they came through. Same convention
// as team-data.js / publications-data.js — content lives here, markup does not.
//
// Student lists (PhD, Masters, Bachelors) share one shape:
//   name, degree, thesis, year (graduated), linkedin, currentPosition.
//
// Project alumni are fellows on sponsored work, not degree students, so they
// have their own shape — see the notes above that array.
//
// In every list:
//   • linkedin — a real profile URL, or "" / "#" for none (no icon is drawn).
//   • currentPosition — where they are now; shown only when filled in.

/* ── 1. PhD alumni ── */
const phdAlumni = [];

/* ── 2. Project alumni — project fellows on sponsored work ──
   A fellow holds an appointment against a grant rather than reading for a
   degree, so this list has its own fields:
     • role    — the appointment: "JRF", "SRF", "Project Associate", …
     • funding — the sponsoring project or grant, e.g. "ANRF ECRG"
     • project — the work they did
     • completed — when the fellowship ended, as month + year: "Jan 2025"
   linkedin and currentPosition work exactly as in the student lists. */
const projectAlumni = [
  { name: "Gadha Lekshmi", role: "JRF", funding: "TIH iHub-Drishti", project: "Computer Vision for Plant Phenomics", completed: "Jan 2025", linkedin: "", currentPosition: "" },
  { name: "Julfikaraehmad Ansari", role: "JRF", funding: "ANRF ECRG", project: "PPGL", completed: "Sep 2025", linkedin: "https://www.linkedin.com/in/julfikar-aehmad", currentPosition: "" },
];

/* ── 3. Masters alumni ── */
const mastersAlumni = [
  { name: "Amit Kumar", degree: "M.Tech (AI Executive)", thesis: "Plant Disease Detection", year: "2024", linkedin: "", currentPosition: "" },
  { name: "Priyanka Srivastava", degree: "M.Tech (AI Executive)", thesis: "Alzheimer's Disease Detection", year: "2024", linkedin: "", currentPosition: "" },
  { name: "Oindrila Ray", degree: "M.Tech (AI Executive)", thesis: "", year: "2025", linkedin: "", currentPosition: "" },
  { name: "Kunal Biswas", degree: "M.Tech (AI Executive)", thesis: "", year: "2025", linkedin: "", currentPosition: "" },
  { name: "Mayank Raghav", degree: "M.Tech (AI Executive)", thesis: "", year: "2025", linkedin: "", currentPosition: "" },
  { name: "Mitesh Kumar", degree: "M.Tech (DCS)", thesis: "Novel Product Identification", year: "2025", linkedin: "", currentPosition: "" },
  { name: "Ganesh Patidar", degree: "M.Tech (DCS)", thesis: "Federated Learning for Dermatological Image Segmentation", year: "2025", linkedin: "", currentPosition: "" },
  { name: "Adarsh Gupta", degree: "M.Tech (AR/VR)", thesis: "Augmented Reality — Virtual Trial Room", year: "2025", linkedin: "", currentPosition: "" },
  { name: "Ghanshyam Govind Variya", degree: "M.Tech (AR/VR Executive)", thesis: "Pelvic Fracture Segmentation", year: "2025", linkedin: "", currentPosition: "" },
  { name: "Pranav Kumar Tak", degree: "MedTech", thesis: "Medical Image Segmentation", year: "2026", linkedin: "", currentPosition: "" },
  { name: "Suvodip Som", degree: "MTech AI Executive", thesis: "Holistic cardiac risk assessment from CT", year: "2026", linkedin: "", currentPosition: "" },
];

/* ── 4. Bachelors alumni — B.Tech project students on sponsored work ── */
const bachelorsAlumni = [
  { name: "Ale Anwesh", degree: "B.Tech (AI & DS)", thesis: "Plant Annotation Tool", year: "2024", linkedin: "", currentPosition: "" },
  { name: "Devam Patel", degree: "B.Tech CH", thesis: "", year: "2024", linkedin: "", currentPosition: "" },
  { name: "Keval", degree: "B.Tech (CSE)", thesis: "Ascites Detection", year: "2024", linkedin: "", currentPosition: "" },
  { name: "Khushal Damor", degree: "B.Tech (AI & DS)", thesis: "PPGL Project", year: "2024", linkedin: "", currentPosition: "" },
  { name: "Samarth", degree: "B.Tech (CSE)", thesis: "ACC Tumor Detection", year: "2025", linkedin: "", currentPosition: "" },
  { name: "Amey Chaya", degree: "B.Tech (ES)", thesis: "Adrenal Tumors", year: "2025", linkedin: "", currentPosition: "" },
  { name: "Nirmal Kumar Godara", degree: "B.Tech (AI & DS)", thesis: "CT Multiphase Generation", year: "2025", linkedin: "", currentPosition: "" },
  { name: "Darsh Patel", degree: "B.Tech (AI & DS)", thesis: "VLM: Foundation Model for Report Summarization", year: "2025", linkedin: "", currentPosition: "" },
  { name: "Harsh Kumar", degree: "B.Tech (ES)", thesis: "RECIST Automation", year: "2025", linkedin: "", currentPosition: "" },
  { name: "Nihar Kuchankar", degree: "B.Tech (AI & DS)", thesis: "PPGL Annotation", year: "2025", linkedin: "", currentPosition: "" },
  { name: "Patil Sanskar", degree: "B.Tech (CSE)", thesis: "AyurTech", year: "2025", linkedin: "", currentPosition: "" },

  { name: "Hritin Raj", degree: "B.Tech (ES)", thesis: "Imprecise Boundary Identification", year: "2026", linkedin: "", currentPosition: "" },
  { name: "Abhay Kashyap", degree: "B.Tech (CSE)", thesis: "Continual Learning", year: "2026", linkedin: "", currentPosition: "" },
  { name: "Priyansh Saxena", degree: "B.Tech (EE)", thesis: "Hemoglobin Device", year: "2026", linkedin: "", currentPosition: "" },
  { name: "Himanshu Kumar", degree: "B.Tech (EE)", thesis: "Hemoglobin Device", year: "2026", linkedin: "", currentPosition: "" },
  { name: "Bhavya Uchat", degree: "B.Tech (CSE)", thesis: "PFL", year: "2026", linkedin: "", currentPosition: "" },
  { name: "Yogendra", degree: "B.Tech (BSBE)", thesis: "AyurTech", year: "2026", linkedin: "", currentPosition: "" },
  { name: "Raghava", degree: "B.Tech (BSBE)", thesis: "AyurTech", year: "2026", linkedin: "", currentPosition: "" },
  { name: "Subham Mishra", degree: "B.Tech (ME)", thesis: "", year: "", linkedin: "", currentPosition: "" },
  { name: "Kapil", degree: "B.Tech (AI)", thesis: "LWM for segmenation, classification, and summarization", year: "", linkedin: "", currentPosition: "" },
  { name: "Bhagwan", degree: "B.Tech (AI)", thesis: "LWM for segmenation, classification, and summarization", year: "", linkedin: "", currentPosition: "" },
  { name: "Vivek", degree: "B.Tech (AI)", thesis: "LWM for segmenation, classification, and summarization", year: "", linkedin: "", currentPosition: "" },


  { name: "Gokul Bansal", degree: "B.Tech (AI)", thesis: "Facial Attendance System like Digiyatra", year: "2026", linkedin: "", currentPosition: "" },

];
