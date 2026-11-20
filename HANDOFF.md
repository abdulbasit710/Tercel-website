# TERCEL website handoff

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. Use `npm run build`, `npm run typecheck`, and `npm run lint` for verification.

## Content and integration notes

- Contact form validates the required fields and opens a prepared email in the visitor's email application. No server-side form service is configured; the visitor must send the email there.
- The source documents disagree on the AFAAQ participant figure (508, 560, and more than 500), University of Dubai programme reach (20,000+ versus 25,000+), and some degree details. The public site omits the disputed specifics.
- The profile mentions a memoir, but no verified book title, cover, purchase URL, or publication details were supplied. The Book page is enquiry led.
- Service photographs are illustrative. The supplied portrait is used for founder and book sections. Confirm the portrait identifies Dr. Vidya before publication.
- The complete logo and original PNG photos are preserved in `public/images`; optimised WebP versions are used in the site.
- Reviewed 21st.dev component patterns and their listed MIT licenses. Tabs and accordion were implemented locally for exact design and keyboard behaviour; no third-party component source was copied.
