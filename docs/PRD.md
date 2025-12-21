# Product Requirement Document (PRD): YardDriveThru
**Version:** 2.0 (Business Plan Integration)
**Date:** December 20, 2025
**Project:** YardDriveThru – One-Day Drive-In Cinema Event
**Target Audience:** Gen Z (18-35), Families, Content Creators in Abuja.
**Core Objective:** Sell tickets (Target: 100 cars) & Drive social engagement (Voting).

---

## 1. Executive Summary
YardDriveThru is Abuja's first premium retro drive-in cinema event, happening **December 27**. The digital platform must reflect the event's "Retro-Nostalgia" vision while serving as a high-speed sales funnel.
**Primary Functions:**
1.  **Movie Voting:** Users choose the film (Community engagement).
2.  **Ticket Sales:** Direct integration with Paystack for 3 distinct pricing tiers.
3.  **Event Info:** Quick, visual logistics (Location, FM Audio details).

---

## 2. Design System: "Neobrutalist Retro"
* **Vibe:** High-energy, raw, decisive. "Less words, more graphics."
* **Visual Language:**
    * **Layouts:** Asymmetrical grids, hard black borders (`border-4`), sharp drop shadows.
    * **Typography:**
        * *Headings:* Massive, Condensed Sans-Serif (e.g., `Anton`, `Druk Wide`, `Oswald`).
        * *Body:* Monospace / Terminal style (e.g., `JetBrains Mono`, `Space Mono`).
    * **Colors:**
        * `bg-zinc-950` (Void Black)
        * `text-white`
        * Accents: **#CCFF00 (Acid Green)**, **#FF00FF (Hot Pink)**, **#00FFFF (Cyan)**.
    * **Textures:** Grain overlays, scanlines, marquee scrolling text.

---

## 3. Component Specifications

### 3.1. Hero Section (The Hook)
* **Content:**
    * **Headline:** "YARD DRIVE THRU" (Full width, massive).
    * **Sub-head:** "ABUJA /// DEC 27 /// GATES OPEN 5PM".
    * **Graphic:** A looping, grainy video or GIF of a retro car dashboard/windshield looking at a screen.
    * **CTA Button:** "SECURE YOUR SPOT" (Blinking/Vibrating animation).
    * **Ticker:** Infinite scroll text at bottom: *"LIMITED CAPACITY /// 100 CARS ONLY /// FM TRANSMISSION /// OUTDOOR VIBES ///"*

### 3.2. "Cinema Wars" (Voting Module)
* **Purpose:** Let users choose the movie.
* **Data:** Connects to Supabase (or Firebase) to store vote counts.
* **UI:**
    * 2 or 3 Vertical Movie Posters (e.g., *Black Panther* vs *Home Alone 2*).
    * Posters have thick neon borders.
    * **Action:** Click "VOTE".
    * **Feedback:** Confetti pop + Progress bar reveals current percentages.

### 3.3. Ticket Selection (The Money Maker)
* **Layout:** Horizontal Scroll (Mobile) / 3-Column Grid (Desktop).
* **Design:** Cards look like perforated "Admit One" ticket stubs.
* **Tiers (From Business Plan):**

    * **TIER 1: THE CRUISER (Standard)**
        * **Price:** ₦12,000
        * **Color:** White/Monochrome.
        * **Includes:** 1 Car Entry (Max 4 ppl), General Parking.

    * **TIER 2: THE CONVERTIBLE (VIP)**
        * **Price:** ₦35,000
        * **Color:** Cyan/Pink Gradient Border.
        * **Includes:** **Prime Center View**, Snack Box (2x Popcorn/Drinks), Priority Queue (Skip Line).

    * **TIER 3: GOLDEN ERA (Ultra Premium)**
        * **Price:** ₦600,000 (Double Seat Pkg) or ₦300k (Single).
        * **Color:** Metallic Gold Background.
        * **Includes:** **Front Row**, Personal Butler, Full Food Platter, Brand Shoutout on Screen.

* **Integration:** "GRAB IT" button triggers Paystack modal.

### 3.4. Logistics & Vibe (Bento Grid)
* **Style:** 4-Block Grid. Icon-heavy, minimal text.
    1.  **AUDIO:** "Tune to FM 99.9" (Radio Icon).
    2.  **FOOD:** "Order via QR Code" (Burger Icon).
    3.  **LOCATION:** "[Venue Name], Abuja" (Map Pin - Link to Google Maps).
    4.  **SAFETY:** "Secure & Controlled" (Shield Icon).

### 3.5. Footer
* **Sponsors:** "Supported By" section for logo placeholders (Coke, Pepsi, etc.).
* **Socials:** Big, blocky links to Instagram/TikTok.
* **Copyright:** "© 2024 YARD DRIVE THRU".

---

## 4. Technical Implementation Steps for Cursor

1.  **Setup:**
    * Initialize Next.js 14 (App Router).
    * Install `framer-motion` (for smooth reveal animations).
    * Install `lucide-react` (for icons).

2.  **Tailwind Config:**
    * Add custom fonts (`Anton`, `JetBrains Mono`).
    * Define neon colors in `theme.extend`.
    * Add `box-shadow` utility for the "hard shadow" look (`8px 8px 0px 0px #000`).

3.  **Data Logic:**
    * Create a simple array for Ticket Data.
    * Create a mock function for Voting (increment state) if backend isn't ready.

4.  **Responsive Check:**
    * Ensure Ticket Grid turns into a swipeable carousel on mobile screens (critical for IG traffic).
