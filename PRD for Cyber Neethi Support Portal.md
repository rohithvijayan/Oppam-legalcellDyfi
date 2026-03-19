Here is the complete, consolidated Product Requirements Document (PRD) formatted in Markdown. You can copy this directly into your GitHub repository or project documentation.

# ---

**PRD: സൈബർ നീതി (Cyber Neethi) Support Portal**

## **1\. Project Overview**

**Cyber Neethi** is a bilingual (primarily Malayalam) web platform designed to provide accessible legal support for victims of cybercrimes, including abusive messaging, sexual harassment, and caste/communal abuse. Supported by AILU and DYFI, the platform offers a secure, empathetic, and highly professional environment for victims to report incidents and seek guidance.

**Key Objectives:**

* Provide a frictionless, secure reporting mechanism.  
* Establish trust through a highly professional, modern aesthetic.  
* Ensure low to zero operational costs initially by leveraging free-tier optimized technologies (target: \~1,000 complaints).

## ---

**2\. Technology Stack (Free-Tier Optimized)**

| Category | Technology | Purpose & Free Tier Benefit |
| :---- | :---- | :---- |
| **Framework** | Next.js (App Router) | High performance, SEO, and built-in API routes. |
| **Styling** | Tailwind CSS | Rapid, responsive UI development. |
| **Database** | Supabase (PostgreSQL) | Secure relational data storage (500MB free tier). |
| **Storage** | Supabase Storage | Secure hosting for evidence screenshots (1GB free tier). |
| **Form Logic** | React Hook Form \+ Zod | Strict client/server validation for Malayalam text and files. |
| **Mailing** | Resend | Admin notifications on new submissions (3,000 emails/month free). |
| **Hosting** | Vercel | Seamless Next.js deployment and CI/CD. |

## ---

**3\. Design System & UI Scheme**

**Aesthetic:** "Modern Solidarity" (Premium, Empathetic, Authoritative)

**Core Concept:** Glassmorphism (translucent cards) over soft backgrounds to feel approachable, paired with deep reds for authority.

* **Background Base:** Soft Pearl (\#FAFAFA) with subtle, blurred crimson background orbs.  
* **Primary Accent:** Crimson Gradient (from-\[\#E63946\] to-\[\#9B111E\]).  
* **Glass Elements:** Translucent White (bg-white/70 backdrop-blur-md) for form containers.  
* **Typography:** \* Headings: *Noto Serif Malayalam* (Elegant, authoritative).  
  * Body/Forms: *Noto Sans Malayalam* (Clean, readable).  
* **Shape Language:** Smooth, large rounded corners (rounded-2xl).

## ---

**4\. Page Specifications**

### **Page 1: ഹോം പേജ് (Landing Page & Intake Form)**

**Layout:** Asymmetrical Split-Screen (Desktop) / Stacked (Mobile).

**Left Side (Hero):** Massive Malayalam typography with a crimson gradient accent line.

**Right Side (Form):** A glassmorphic card floating over the background.

**Complaint Intake Form Fields:**

| Field Label (Malayalam) | Data Type | Requirement |
| :---- | :---- | :---- |
| പേര് (Name) | Text | Mandatory |
| വയസ്സ് (Age) | Number | Mandatory |
| വിലാസം (Address) | Text Area | Mandatory |
| ഫോൺ നമ്പർ (Phone Num) | Tel (10 Digits) | Mandatory |
| ഇമെയിൽ (Email) | Email | Mandatory |
| ജില്ല (District) | Select/Dropdown | Mandatory |
| പഞ്ചായത്ത്/മുനിസിപ്പാലിറ്റി/കോർപ്പറേഷൻ | Text | Mandatory |
| അടുത്തുള്ള പോലീസ് സ്റ്റേഷൻ | Text | Mandatory |
| നിങ്ങളുടെ സോഷ്യൽ മീഡിയ ലിങ്ക് | URL | Mandatory |
| കുറ്റം ചെയ്ത ആളുടെ പ്രൊഫൈൽ ലിങ്ക് | URL | Mandatory |
| തെളിവുകൾ അപ്‌ലോഡ് ചെയ്യുക (Screenshots) | File (JPG/PNG/PDF, Max 2MB) | Mandatory |
| പരാതിയെക്കുറിച്ചുള്ള ലഘുവിവരണം | Text Area | Optional |

### **Page 2: ഞങ്ങളെക്കുറിച്ച് (About Us)**

**Layout:** Bento-Box Grid (Desktop) / Vertical Stack (Mobile).

A highly visual, easy-to-read grid of soft-white cards with delicate drop shadows, avoiding overwhelming walls of text.

**Bento Box Sections:**

* **Mission Card (Large):** ലക്ഷ്യം (Mission to protect common people from cyber abuse).  
* **Privacy Card (Tall):** സ്വകാര്യത (Data security emphasis, featuring a minimalist 3D red shield icon).  
* **Partners Card (Wide):** Subtle, elegant display of AILU and DYFI affiliation.  
* **Services Card:** സേവനങ്ങൾ (Legal advice, complaint drafting, awareness).

## ---

**5\. Database Schema (Supabase)**

Table Name: complaints

| Column | Type | Description |
| :---- | :---- | :---- |
| id | UUID (PK) | Unique identifier for the complaint. |
| created\_at | Timestamp | Auto-generated timestamp. |
| victim\_name | Text | Full name of the user. |
| victim\_age | Integer | Age of the user. |
| contact\_phone | Text | 10-digit mobile number. |
| contact\_email | Text | Valid email address. |
| location\_district | Text | Selected district. |
| location\_local\_body | Text | Panchayat/Municipality/Corporation. |
| police\_station | Text | Nearest police station. |
| victim\_social\_link | Text | URL to the victim's profile. |
| accused\_social\_link | Text | URL to the accused's profile. |
| evidence\_urls | Text\[\] | Array of Supabase Storage file URLs. |
| description | Text | Optional brief of the incident. |
| status | Enum | Default: 'PENDING' (Options: REVIEWED, ACTION\_TAKEN). |

## ---

**6\. Security & Compliance**

* **Row Level Security (RLS):** Supabase RLS policies must be configured so anonymous users can INSERT but only authenticated admins can SELECT or UPDATE records.  
* **Rate Limiting:** Implement middleware or Upstash rate limiting (e.g., 5 requests per IP per hour) to prevent spam submissions.  
* **Input Sanitization:** Utilize Zod to strip malicious scripts from text inputs before database insertion.  
* **Storage Security:** Restrict bucket uploads to specific MIME types (image/jpeg, image/png, application/pdf) and enforce a strict 2MB file size limit per evidence piece.

---

Would you like me to set up the Next.js directory structure and write the initial schema.sql for your Supabase database as the next step?