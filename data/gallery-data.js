// data/gallery-data.js
//
// Photos for the Gallery page. Content lives here, markup does not — same
// convention as team-data.js / publications-data.js.
//
// ADDING A PHOTO
//   1. Drop the file in assets/images/gallery/
//   2. Append an entry to galleryPhotos below. Order does not matter: the page
//      sorts newest first by `date` before rendering.
//
// Entry shape:
//   {
//     src:      "./assets/images/gallery/holi-2026-01.jpg",  // required
//     title:    "Holi at the lab",                           // shown on hover + in the viewer
//     caption:  "A sentence or two about the moment.",       // optional; slides up on
//                                                            // hover and shows in the viewer
//     category: "celebrations",                              // must match an id below
//     date:     "Mar 2026"                                   // "Mon YYYY"; sorts newest first
//   }
//
// Only `src` is truly required — a photo with no title still renders, it just
// shows no hover caption. Keep images under ~400 KB so the grid stays quick;
// anything above ~2000px wide is larger than the page can ever display.

// The filter chips, in the order they appear. "all" must stay first.
// To add a category, add it here and use its id on a photo.
var galleryCategories = [
  { id: "all",          label: "All Photos" },
  { id: "everyday",     label: "Everyday at MMVL" },
  { id: "celebrations", label: "Celebrations" },
  { id: "workshops",    label: "Workshops" },
  { id: "conferences",  label: "Talks & Conferences" },
  { id: "visits",       label: "Lab Visits" },
  { id: "memories",     label: "Memories" }
];

var galleryPhotos = [
  // ── SAIDS 2.0, ISI Kolkata ──
  // isical.ac.in/~caiml/SAIDS_2/
  {
    src: "./assets/images/gallery/saids2-2026-amit-kumar-pal.jpg",
    title: "Amit at the Indo-French SAIDS 2.0 Workshop",
    caption: "Amit Kumar Pal attended the Indo-French SAIDS 2.0 Workshop at ISI Kolkata, 5–7 November 2026 — the Second Indo-French Workshop on Statistics and Artificial Intelligence for Data Science, hosted by CAIML at the Indian Statistical Institute — and received his certificate of participation.",
    category: "workshops",
    date: "Nov 2026"
  },
  {
    src: "./assets/images/gallery/saids2-2026-prajwal-kajare.jpg",
    title: "Prajwal at the Indo-French SAIDS 2.0 Workshop",
    caption: "Prajwal Vijay Kajare attended the Indo-French SAIDS 2.0 Workshop at ISI Kolkata, 5–7 November 2026 — the Second Indo-French Workshop on Statistics and Artificial Intelligence for Data Science, hosted by CAIML at the Indian Statistical Institute — and received his certificate of participation.",
    category: "workshops",
    date: "Nov 2026"
  },

  // ── Teachers' Day in the lab ──
  // Dated Sep 2026 on the assumption these are from Teachers' Day 2026
  // (5 September). Correct the `date` on these five if that is wrong.
  {
    src: "./assets/images/gallery/teachers-day-2026-group.jpg",
    title: "Teachers' Day at MMVL",
    caption: "The lab together around the cake — students, scholars and faculty marking Teachers' Day.",
    category: "celebrations",
    date: "Sep 2026"
  },
  {
    src: "./assets/images/gallery/teachers-day-2026-phd-scholars.jpg",
    title: "PhD Scholars",
    caption: "MMVL's PhD scholars in the lab on Teachers' Day.",
    category: "celebrations",
    date: "Sep 2026"
  },
  {
    src: "./assets/images/gallery/teachers-day-2026-01.jpg",
    title: "Cutting the Cake",
    caption: "Gathered in the lab for the Teachers' Day celebration.",
    category: "celebrations",
    date: "Sep 2026"
  },
  {
    src: "./assets/images/gallery/teachers-day-2026-02.jpg",
    title: "Celebrating Together",
    caption: "A quieter corner of the same afternoon, by the lab's Data Hub desks.",
    category: "celebrations",
    date: "Sep 2026"
  },

  // ── Carousel photos, here so the page had something to show from day one.
  //    Safe to drop as more real gallery photos come in. ──
  {
    src: "./assets/images/home/life_at_mmvl_01.jpg",
    title: "Life at MMVL",
    caption: "Beyond the lab bench — members sharing ideas, celebrating milestones, and building the collaborative culture that drives our research.",
    category: "everyday",
    date: "Aug 2026"
  },
  {
    src: "./assets/images/home/team_02.jpg",
    title: "The MMVL Family",
    caption: "Students, scholars and faculty of the Machine & Medical Vision Lab at IIT Jodhpur.",
    category: "memories",
    date: "Jul 2026"
  },
  {
    src: "./assets/images/home/sir_home.jpeg",
    title: "Presenting at ISBI",
    caption: "Dr. Bikash Santra presenting the lab's work at the IEEE International Symposium on Biomedical Imaging.",
    category: "conferences",
    date: "May 2026"
  },
  {
    src: "./assets/images/home/rashmi_home.png",
    title: "Federated Learning Workshop",
    caption: "Rashmi leading a hands-on session on federated learning — privacy-preserving AI for medical imaging.",
    category: "workshops",
    date: "Apr 2026"
  },
  {
    src: "./assets/images/home/prajwal_home.jpeg",
    title: "Multimodal AI Session",
    caption: "Prajwal sharing deep learning insights in a hands-on session on multimodal AI.",
    category: "workshops",
    date: "Mar 2026"
  },
  {
    src: "./assets/images/home/group_02.jpeg",
    title: "Together at MMVL",
    caption: "Surrounded by research posters and the everyday collaboration that keeps the work moving.",
    category: "everyday",
    date: "Feb 2026"
  },
  {
    src: "./assets/images/home/ankita_home.jpg",
    title: "Clinical AI in Practice",
    caption: "Ankita at work on medical image segmentation and explainability for real-world healthcare.",
    category: "everyday",
    date: "Jan 2026"
  }
];
