# MMVL Website — Claude Code Project Notes

## How to Resume a Session

1. Open the terminal in this folder (`C:\IITJ\Website\MMVL`)
2. Run `claude` to start Claude Code
3. Just say **"continue where we left off"** or describe what you want to work on next — Claude will read this file and pick up context automatically.

---

## Project Overview

Static HTML/Bootstrap website for the **Machine & Medical Vision Lab (MMVL)**, IIT Jodhpur.  
Supervisor: **Prof. Bikash Santra**

### File Structure

| File | Purpose |
|------|---------|
| `index.html` | Home page |
| `team.html` | Current lab members |
| `alumni.html` | Alumni / former members |
| `research.html` | Research areas |
| `facilities.html` | Lab GPU servers, storage, funding info |
| `publications.html` | Publications list |
| `contact.html` | Contact page |
| `admin.html` | Admin panel |
| `navbar.html` | Shared navbar reference (each page has its own inline copy) |
| `footer.html` | Shared footer (loaded via fetch) |
| `data/team-data.js` | All team member data (supervisor, PhD, MTech, BTech, alumni arrays) |
| `data/publications-data.js` | Publications data |
| `loaders/team-load.js` | Renders team cards from team-data.js |
| `loaders/publications-load.js` | Renders publications |
| `assets/images/` | All member photos |
| `assets/images/facilities/` | GPU/server/lab photos (drop images here) |

### Navbar — Important

Every page has its **own inline navbar** (no shared fetch). When adding a new nav link, update all these files:
`navbar.html`, `index.html`, `team.html`, `research.html`, `facilities.html`, `publications.html`, `contact.html`, `admin.html`, `alumni.html`

---

## What Has Been Done (Recent Changes)

- **Facilities page** added (`facilities.html`) — GPU servers, data storage, funding, HPC, travel support, photo gallery
- **Alumni page** added (`alumni.html`) — PhD, Masters, Project, and BTech sections with dummy data
- **Vaishnavi Bholane** removed from Masters students
- **BTech students** now have `dept`, `passedYear`, and `project` fields in `team-data.js`; only name + dept shown on team page
- **Alumni link** added at bottom of `team.html`

## Pending / To Do

- Fill in real `dept` values for each BTech student in `team-data.js` (currently all set to `"School of AI and DS"` as dummy)
- Add real server/lab photos to `assets/images/facilities/` — filenames: `gpu-server.jpg`, `data-server.jpg`, `gpu-cards.jpg`, `hpc-center.jpg`
- Replace dummy alumni entries in `alumni.html` with real graduated students
- claude --resume 2468c9ad-4711-4dde-aea4-73aae46e5748