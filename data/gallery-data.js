// data/gallery-data.js
//
// Photos for the Gallery page. Content lives here, markup does not — same
// convention as team-data.js / publications-data.js.
//
// ADDING A PHOTO
//   1. Drop the file in assets/images/gallery/
//   2. Append an entry to galleryPhotos below. Order does not matter: the page
//      sorts newest first by `date` before rendering.
//   3. Run:  python tools/make-gallery-thumbs.py
//      The grid loads small copies from assets/images/gallery/thumbs/ rather
//      than the full photos — a quarter of the bytes, and the difference
//      between a gallery that appears at once and one that trickles in.
//      Skipping this step is not fatal: a photo with no thumbnail falls back
//      to its full-size file, it just loads more slowly than the rest.
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
  // Both are Nov 2026, and the sort is stable — so the order here is what
  // decides which of the two shows first. Prajwal, then Amit.
  {
    src: "./assets/images/gallery/saids2-2026-prajwal-kajare.jpg",
    title: "Prajwal at the Indo-French SAIDS 2.0 Workshop",
    caption: "Prajwal Vijay Kajare attended the Indo-French SAIDS 2.0 Workshop at ISI Kolkata, 5–7 November 2026 — the Second Indo-French Workshop on Statistics and Artificial Intelligence for Data Science, hosted by CAIML at the Indian Statistical Institute — and received his certificate of participation.",
    category: "workshops",
    date: "Nov 2026"
  },
  {
    src: "./assets/images/gallery/saids2-2026-amit-kumar-pal.jpg",
    title: "Amit at the Indo-French SAIDS 2.0 Workshop",
    caption: "Amit Kumar Pal attended the Indo-French SAIDS 2.0 Workshop at ISI Kolkata, 5–7 November 2026 — the Second Indo-French Workshop on Statistics and Artificial Intelligence for Data Science, hosted by CAIML at the Indian Statistical Institute — and received his certificate of participation.",
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
    src: "./assets/images/gallery/isbi-2026-bikash-santra.jpg",
    title: "Presenting at ISBI 2026",
    caption: "Dr. Bikash Santra with the lab's poster at the IEEE International Symposium on Biomedical Imaging (ISBI 2026) — “Cross-Modal Image Learning for HER2 Status Detection from H&E Histopathology Images”, by S. Mishra, D. Roy, S. R. Mathur and B. Santra.",
    category: "conferences",
    date: "Apr 2026"
  },
  // ── SAIDE GenAI workshop, IIT Jodhpur, 2–4 Feb 2026 ──
  // "Hands-On Workshop on Recent Trends in Generative AI Models and Their
  // Applications" — iitj-saide.github.io/GenAI-workshop-2026/
  // The descriptions below say what each presenter works on, which is not
  // always the topic on the slide behind them.
  {
    src: "./assets/images/home/prajwal_home.jpeg",
    title: "Multimodal AI Session",
    caption: "Prajwal sharing deep learning insights in a hands-on session on multimodal AI, at the SAIDE Hands-On Workshop on Generative AI, IIT Jodhpur, 2–4 February 2026.",
    category: "workshops",
    date: "Feb 2026"
  },
  {
    src: "./assets/images/home/rashmi_home.png",
    title: "Federated Learning Workshop",
    caption: "Rashmi leading a hands-on session on federated learning — privacy-preserving AI for medical imaging — at the SAIDE Hands-On Workshop on Generative AI, IIT Jodhpur, 2–4 February 2026.",
    category: "workshops",
    date: "Feb 2026"
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
    title: "Ankita leading a hands-on session",
    caption: "Ankita, who works on medical image segmentation, leading a hands-on session on transfer learning and convolutional networks, at the SAIDE Hands-On Workshop on Generative AI, IIT Jodhpur, 2–4 February 2026.",
    category: "workshops",
    date: "Feb 2026"
  }
];
