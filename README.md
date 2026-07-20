# Merch Store

A small e-commerce site for a merch shop — browse products, add to cart, check out, and manage an account. Built with plain HTML/CSS/JS and hosted on GitHub Pages.

## Tech Stack

- **HTML/CSS/JS** — no framework, no build step. Every page is a standalone `.html` file.
- **Firebase Authentication** — real user accounts (email/password and Google sign-in).
- **Firebase Firestore** — stores registered account data (profile info) and order history.
- **EmailJS** — sends an order-confirmation email whenever a customer checks out.
- **GitHub Pages** — static hosting, no backend server.

## How JS Was Built

The HTML and CSS in this project were written and are maintained by hand. The JavaScript — cart logic, checkout flow, Firebase integration, EmailJS wiring, analytics tracking — was written with the help of **Claude AI**, used as a coding assistant throughout development. This is disclosed here for transparency.

## Design Decisions

**No search bar.** This is intentional, not missing functionality. The store is a small merch shop with a limited, manually curated product catalog — a handful of items doesn't need a search feature to be usable, and adding one would be complexity without real benefit at this scale. If the catalog grows significantly, this is worth revisiting.

**Products are added manually.** There's no product database or admin CRUD system — new items are added by hand as new HTML pages. This keeps things simple for a catalog this size, rather than building out a full inventory system that wouldn't get used to its potential.

## Setup (For Anyone Cloning This Repo)

This repo is public, but **none of the third-party service credentials in it are live/functional** — every key is a placeholder. This is intentional:

- `script/firebase-config.js` — contains placeholder Firebase config (`YOUR_API_KEY`, etc.)
- `checkout.html` — contains placeholder EmailJS credentials (`YOUR_EMAILJS_PUBLIC_KEY`, etc.)

Real credentials are **not** committed, so that:
1. Random visitors/bots can't fire requests through *my* EmailJS account and drain its free-tier monthly quota.
2. Nobody can write to *my* Firebase project's database.
3. Anyone cloning this repo for their own use starts from a clean, safe slate rather than accidentally inheriting my live services.

To run a working copy of this project yourself, you'll need to create your own free accounts and fill in your own values:

1. **Firebase** — create a project at [console.firebase.google.com](https://console.firebase.google.com), enable Authentication (Email/Password + Google), create a Firestore database, and paste your config into `script/firebase-config.js`. Full step-by-step instructions are in the comments at the top of that file, including the Firestore security rules to publish.
2. **EmailJS** — create a free account at [emailjs.com](https://www.emailjs.com), connect an email service, build an order-confirmation template, and paste your Service ID / Template ID / Public Key into `checkout.html`. Setup instructions are in the comments above that code.

## How Accounts Work

User accounts are handled entirely by **Firebase Authentication** — not a custom backend, and not `localStorage`. When someone signs up (with email/password or Google), Firebase creates a real account and securely stores their credentials on Google's servers; this project's code never sees or stores raw passwords. Profile details (name, address, phone) and order history are saved separately in **Firestore**, each tied to that user's unique account ID, with security rules that only ever let a signed-in user read or write their *own* data — never anyone else's.

**An account is not required to place an order.** Checkout works for guests too — anyone can fill in their name, address, and contact details directly on the checkout page and complete a purchase without ever signing up. The difference is what happens *after*: a signed-in customer's order is automatically saved to their account, so they can look it up later under "My Orders" on their profile page. A guest's order still goes through and still sends the store owner a confirmation email — it just isn't tied to any account, so there's no order history for them to check back on afterward. Signing in is a convenience for returning customers, not a checkout requirement.

## Known Limitations

- No real payment processor — checkout collects order details and sends a confirmation email, but doesn't process actual payments.
- Shipping/tax rates are a flat per-country approximation, not real tax compliance.
- Profile pictures are stored in the browser's `localStorage`, not Firebase Storage — they don't sync across devices.
