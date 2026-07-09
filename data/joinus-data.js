// data/joinus-data.js
//
// All content for the "Join Us" page lives here so it can be updated without
// touching the page markup — same convention as team-data.js / publications-data.js.
//
// ⚠  ACTION ITEMS FOR THE ADMIN:
//    • Replace every "REPLACE_WITH_..." Google Form URL below with the real link.
//    • Update "status" to "available" / "closed" / "upcoming" as openings change.
//    • Confirm the MMVL lab room/address in joinConfig.labAddress.

/* ─────────────────────────────────────────────────────────────
   1. PhD POSITIONS — fellowship tracks
   Each fellowship lists its terms clearly (eligibility, stipend,
   duration, benefits). Stipend figures follow prevailing Govt. of
   India norms and are subject to revision by the funding agency.
   ───────────────────────────────────────────────────────────── */
const phdFellowships = [
  {
    name: "Institute Fellowship (MoE / HTRA)",
    agency: "Ministry of Education, Govt. of India",
    icon: "cap",
    // status="available",
    eligibility:
      "M.Tech / M.E. / M.Sc. (or equivalent) in a relevant discipline with a valid GATE score, followed by qualifying the IIT Jodhpur PhD admission process (test + interview).",
    stipend:
      "₹37,000 / month (1st–2nd year, JRF) → ₹42,000 / month (3rd year onward, SRF)",
    duration: "Up to 5 years (subject to satisfactory progress)",
    benefits:
      "Annual contingency grant, HRA as per institute norms, and institute travel support for conferences.",
    highlight: "Most common route for full-time PhD scholars at IIT Jodhpur."
  },
  {
    name: "UGC / CSIR NET-JRF",
    agency: "UGC / CSIR, Govt. of India",
    icon: "award",
    // status:"available",
    eligibility:
      "Candidates who have qualified UGC-NET (JRF) or CSIR-NET (JRF). The fellowship is portable to IIT Jodhpur on admission to the PhD programme.",
    stipend:
      "₹37,000 / month (JRF, 1st–2nd year) → ₹42,000 / month (SRF, 3rd year onward)",
    duration: "5 years (2 years JRF + 3 years SRF, as per UGC/CSIR norms)",
    benefits: "HRA and annual contingency grant as per UGC/CSIR guidelines.",
    highlight: "Bring your own national fellowship and join our research."
  },
  {
    name: "DST-INSPIRE Fellowship",
    agency: "Department of Science & Technology (DST)",
    icon: "spark",
    // status:"available",
    eligibility:
      "INSPIRE Fellowship awardees (top rank holders in qualifying exams / eligible M.Sc. toppers) admitted to the IIT Jodhpur PhD programme.",
    stipend:
      "₹37,000 / month (1st–2nd year) → ₹42,000 / month (3rd year onward)",
    duration: "Up to 5 years",
    benefits: "Annual research grant and HRA as per DST INSPIRE norms.",
    highlight: "For merit-based INSPIRE awardees in science disciplines."
  },
  {
    name: "Prime Minister's Research Fellowship (PMRF)",
    agency: "Ministry of Education, Govt. of India",
    icon: "star",
    // status:"",
    eligibility:
      "Outstanding candidates through the PMRF direct-entry / lateral-entry channels who meet the CGPA and institute-eligibility criteria. Highly competitive.",
    stipend:
      "₹70,000 / month (Year 1–2), ₹75,000 / month (Year 3), ₹80,000 / month (Year 4–5)",
    duration: "Up to 5 years",
    benefits: "Research grant of ₹2 lakh per year for 5 years (₹10 lakh total).",
    highlight: "India's most prestigious PhD fellowship — for exceptional PhD students nominated by the institute"
  },
  {
    name: "External / Sponsored PhD",
    agency: "Industry / Institute / Self-sponsored",
    icon: "briefcase",
    // status:"",
    eligibility:
      "Working professionals or candidates sponsored by their employer/organisation, or self-financed scholars meeting the PhD admission criteria.",
    stipend: "As per the sponsoring organisation (no institute fellowship).",
    duration: "As per programme category (part-time / full-time)",
    benefits: "Full access to MMVL compute, data, and mentorship.",
    highlight: "For sponsored and part-time research scholars."
  }
];

/* ─────────────────────────────────────────────────────────────
   2. PROJECT POSITIONS — a single JRF / SRF opening that runs across
   funded research projects. The funding agencies (ANRF, DBT, …) are
   shown together in one view.
   status: "available"  → shows AVAILABLE badge + "Join Us" button
           "upcoming"   → shows "Opening Soon" badge (no button)
           "closed"     → shows "Applications Closed" badge (no button)
   formLink: the Google Form (or application) URL for the position.
   ───────────────────────────────────────────────────────────── */
const projectPositions = [
  {
    role: "Junior Research Fellow (JRF)",
    project: "Multimodal & annotation-efficient deep learning for medical image analysis",
    agencies: ["ANRF", "DBT", "and others"],
    positions: 1,
    status: "available",
    eligibility:
      "M.Sc / M.Tech / B.Tech (completed) with GATE / NET-JRF or equivalent. Preferred: Medical Image Analysis, Computer Vision, Deep Learning.",
    stipend: "₹37,000 + HRA per month",
    duration: "As per project sanction (leading to PhD, extendable)",
    lastDate: "23 Jun 2026",
    // ↓ Replace with a Google Form link when ready. Currently points to the live application link.
    formLink: "https://lnkd.in/gH9TzSqU"
  }
];

/* ─────────────────────────────────────────────────────────────
   3. + 4. Config for M.Tech/B.Tech projects & Internships
   ───────────────────────────────────────────────────────────── */
const joinConfig = {
  supervisorName: "Dr. B. Santra",
  supervisorEmail: "bikash@iitj.ac.in",
  labEmail: "mmvlab.bs@gmail.com",
  // TODO: confirm the exact MMVL lab room/venue at SAIDE.
  labAddress:
    "School of Artificial Intelligence and Data Science (SAIDE), IIT Jodhpur — Room 305-C, CRF Building (Besides Shamiyana), NH-65 Nagaur Road, Karwar, Jodhpur, Rajasthan — 342037",
  // ↓ Replace with the long-term research internship Google Form link.
  internshipFormLink: "REPLACE_WITH_INTERNSHIP_FORM_LINK"
};
