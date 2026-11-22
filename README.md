# Top Muse AI GitHub Projects

A standalone static catalog of 237 public GitHub repositories related to Meta’s Muse personal AI agent, including 78 Git-FED entries.

## Why this exists

Muse-related repositories are spread across GitHub and are easy to confuse with unrelated projects using the same name. This site gives you one searchable, source-linked index.

The catalog is intentionally narrow. It includes repositories whose name, description, or topics indicate a connection to `muse.ai`, Meta Muse, the Muse AI agent, or Hatch. It excludes unrelated MuseAI roleplay apps, music and trading projects, hashing collisions, the Muse EEG headband, Unity Muse, museum wordplay, and alternatives that are only positioned against Muse.

## See it work

- Main page: open [`index.html`](index.html).
- Promo gallery: open [`promo.html`](promo.html).
- Community page: open [`community.html`](community.html).
- Support and subscription options: open [`support.html`](support.html).

The repository does not currently publish a verified live demo URL. Run it locally with the command below.

## Quick start

You need Python 3 for the simplest local server. No package installation is required.

```bash
python3 -m http.server 8080
```

Open <http://localhost:8080> in your browser. The catalog loads `data/projects.json` from the same static origin, so serving the directory is more reliable than opening the HTML file directly.

For a quick syntax and data check:

```bash
node --check app.js
node --check auth.js
node --check invite.js
python3 -m json.tool data/projects.json >/dev/null
```

## What you can do

### Search and filter the catalog

Use the search field on the index to filter by repository name, description, or language. The filters switch between all projects, Git-FED entries, and the alternatives section. Results are rendered from [`data/projects.json`](data/projects.json).

### Review the Git-FED shortlist

The index includes a separate top-10 Git-FED section. Each entry links to its public GitHub repository in a new tab.

### Explore the support and community flows

The site includes static HTML destinations for support, donations, subscriptions, Discord choices, private communities, methodology, terms, and privacy. External payment providers remain external; this project does not collect card numbers.

The donation page uses the supplied Git-FED avatar and opens the exact Thanks.dev destination only after an 18+ confirmation:

<https://thanks.dev/d/gh/git-fed/dependencies>

The index header includes three optional community/identity controls:

- **FedPromptly** opens an animated public community card with contact links and the FedPromptly social destination.
- **Join Echoed Server** opens the supplied Echoed server preview in a new tab.
- **Login** opens the optional Supabase email/password identity modal.

## Data and method

`data/projects.json` is the checked-in source for the UI. It contains the full ranked project list, the Git-FED count, the Git-FED top 10, and alternatives.

A project is included when its public metadata shows a connection to Meta’s Muse ecosystem. The inclusion and exclusion rationale is documented on [`method.html`](method.html).

The current updater at [`scripts/update.py`](scripts/update.py) is deliberately credential-free. It reads the checked-in JSON and reports its counts; it does not call GitHub Search or replace the data file. The daily workflow is present for future credentialed refresh integration, but the checked-in updater does not claim to perform that refresh yet.

## Static hosting

This is a plain static site. It can be served from GitHub Pages or Cloudflare Pages without a build step.

For GitHub Pages:

1. Push the repository to GitHub.
2. Open the repository’s Pages settings.
3. Select the branch and root directory containing `index.html`.
4. Save and wait for the Pages deployment.

For Cloudflare Pages, connect the repository and leave the build command empty. Set the output directory to the repository root because the site is already static.

If you enable the Supabase login, add the final deployed origin and its redirect paths to the Supabase project’s authentication URL settings. The browser uses only the supplied publishable key in [`auth.js`](auth.js); no service-role key is included.

## Project structure

```text
.
├── index.html                         # Searchable catalog landing page
├── styles.css                         # Shared dark visual system and page styles
├── app.js                             # Catalog loading, filtering, rendering, and signal field
├── auth.js                            # Optional Supabase login/signup/reset/logout flow
├── invite.js                          # FedPromptly invite modal controller
├── data/
│   └── projects.json                  # 237-project catalog source
├── assets/
│   ├── favicon.svg                    # Symbol favicon
│   ├── logo-muse-index.svg            # Site mark
│   ├── promo-banner.svg               # Promotional banner
│   ├── signal-gremlin.svg             # Mascot artwork
│   ├── signal-scramble.gif            # 520×260 animated promo asset
│   ├── git-fed-avatar.jpg             # Supplied Thanks.dev avatar
│   └── fedpromptly-icon.png           # Local optimized community icon
├── promo.html                         # Promotional gallery
├── support.html                       # Age-gated payment and sponsorship choices
├── donate.html                        # Age-gated Thanks.dev donation page
├── subscribe.html                     # Subscription destination page
├── community.html                     # Centered Discord widget destination
├── discord.html                       # Public and adult Discord access choices
├── private-communities.html           # Age and country-gated Matrix access
├── method.html                        # Inclusion and exclusion methodology
├── terms.html                         # Payment-provider terms notice
├── privacy.html                       # Privacy and third-party provider notice
├── scripts/update.py                  # Credential-free catalog count check
├── .github/workflows/update-daily.yml # Scheduled updater workflow
├── LICENSE                            # MIT license
└── README.md
```

## Visual system

The site uses a dark animated signal field made from drifting contour ribbons. It intentionally avoids orbital visuals. The pages also use looping ticker text, hover motion, animated mascot artwork, a looping GIF, responsive layouts, and reduced-motion fallbacks.

All HTML pages use the symbol favicon at `assets/favicon.svg`. Ko-fi widgets and destinations are not included.

## Accessibility and privacy notes

Images have descriptive alternative text where they carry content. External links use `noopener noreferrer` when opened in a new tab. Dialogs can be closed with their close controls, by clicking outside the card, or with the Escape key where applicable.

The Supabase login is optional and only appears on the index page. Supabase handles account authentication and password-reset email delivery. Configure the production redirect URL in the Supabase dashboard before enabling it for a deployed origin.

Payment providers handle their own checkout pages. Read [`terms.html`](terms.html) and [`privacy.html`](privacy.html) before enabling or promoting a provider link.

## Community and support

- [FedPromptly ecosystem](https://www.fedpromptly.org)
- [FedPromptly social](https://www.fedpromptly.com/social)
- [Echoed server preview](https://preview.echoed.gg/server/65dd48216ed48ac1856e)
- [Public developer Discord](https://discord.gg/Jm4XStx4Pf)
- [Private community access](private-communities.html)
- [Support page](support.html)

For repository issues, use the issue tracker of the GitHub repository that hosts this project. No separate issue tracker URL is asserted here because the repository URL is not embedded in the static files.

## Contributing

Keep changes static-host compatible and dependency-light. Preserve the existing symbol favicon, dark no-orbit visual direction, reduced-motion support, and age gates around restricted payment or private-community flows.

Before opening a pull request, run:

```bash
node --check app.js
node --check auth.js
node --check invite.js
python3 -m json.tool data/projects.json >/dev/null
python3 -m http.server 8080
```

When changing the catalog, keep repository URLs source-linked and explain inclusion or exclusion decisions. Do not add fabricated metrics, screenshots, badges, integrations, or live-demo claims.

## License

This project is released under the [MIT License](LICENSE).
