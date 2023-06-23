# Short Link

**Environment:**

- **Backend:** Built with Beego Framework (Golang).
    - Source code: [https://github.com/hvdtam/demo_shortLink_backend](https://github.com/hvdtam/demo_shortLink_backend)
- **Frontend:** Developed with NextJS.
    - **Language**: Typescript.
        - **CSS Framework**: TailwindCSS.
        - **State Management**: localStorage if not authentication. If authentication, using Server.
    - Source code: [https://github.com/hvdtam/demo_shortLink_frontend](https://github.com/hvdtam/demo_shortLink_frontend)
- **Database:** PostgresSQL.

---

## **Demo URL:**
Link: [https://s.tamk.dev](https://s.tamk.dev/)

**Function:**

- **Generate URL ShortLink:**
    - Enter custom alias for the shortlink
    - Set expiration time for the shortlink
    - Enable password protection for the shortlink
- **View:**
    - Copy shortlink to clipboard
    - Share shortlink with QR Code

**Shortlink Management:**

Authentication is required to manage ShortLinks.

**Authentication:**

Authentication using Bear Token.
