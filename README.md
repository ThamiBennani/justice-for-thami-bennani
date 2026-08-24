# Justice for Thami Bennani

An independent multilingual public-interest archive supporting the search for truth and justice in the Thami Bennani case.

## Local setup

```bash
npm install
npm run dev
```

## Editorial standard

The site distinguishes court outcomes, published reporting, and attributed family statements. Sensitive claims must link to a source. This first edition is not an official family or court website and should be updated after primary documents and family-provided material are reviewed.

## GitHub Pages deployment

The static output is generated in `dist/` by `npm run build`. The included GitHub Actions workflow deploys every push to `main` using Node 20.

1. Create the public repository `ThamiBennani/justice-for-thami-bennani` without a generated README, `.gitignore`, or license.
2. Push this project to the repository with `main` as its default branch.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Run the workflow or push a change to `main`.

Do not commit credentials or private data to this repository.

## Participation backend

Petition signatures, newsletter consent, and private messages use an Azure Function with Azure Table Storage. Petition emails are retained only as salted, one-way fingerprints and signer identities are not exposed by the public API. Newsletter email addresses remain private, and the message form requests no identity.

1. Select the intended Azure subscription and keep each public domain in a separate resource group.
2. Create an Azure Email Communication Services resource and provision either an Azure-managed sender domain or a verified custom sender domain. Create an Azure Communication Services resource, connect that email domain under **Email → Domains**, and copy its connection string from **Keys**.
3. Sign the Azure CLI into the intended tenant with `az login`, then select the subscription with `az account set --subscription "SUBSCRIPTION NAME OR ID"`.
4. In your own terminal, export `AZURE_SUBSCRIPTION_ID`, `PUBLIC_ORIGINS`, a random `EMAIL_HASH_SALT`, `ACS_EMAIL_CONNECTION_STRING`, and `ACS_EMAIL_SENDER_ADDRESS`. `PUBLIC_ORIGINS` is a comma-separated list such as `https://example.com,https://www.example.com`. The sender must belong to the connected email domain. Never paste or commit secret values.
5. Run `chmod +x scripts/deploy-azure-api.sh && scripts/deploy-azure-api.sh`. The script creates a Consumption-plan Function App and a Standard LRS Storage account, configures private app settings, builds the API, and deploys it.
6. Add the public domain as `VITE_SITE_URL` and the printed API URL as `VITE_PUBLIC_ACTIONS_URL` in GitHub repository variables. Rerun the Pages deployment.

Submissions are protected by strict origin checks, a hidden honeypot, payload and field validation, duplicate petition detection, and salted per-client hourly rate limits. Raw client network addresses are never stored.

## Manual domain promotion

1. Verify the new domain in the GitHub organization and configure its apex and `www` DNS records for GitHub Pages.
2. Add only the new HTTPS origins to the Azure Function `ALLOWED_ORIGINS` and CORS settings.
3. Set `VITE_SITE_URL` and `VITE_PUBLIC_ACTIONS_URL` to the new environment values.
4. Change the Pages custom domain, run the deployment workflow, wait for GitHub's managed certificate, and enable **Enforce HTTPS**.
5. Verify the certificate, HTTP redirect, petition summary, one petition submission, one welcome email, and one private message.
6. Remove the previous domain from API origins only after the new domain passes all checks.

Before changing DNS, export the release values and run `scripts/check-release.sh`. It rejects non-HTTPS or non-release origins, environment-labelled API hostnames, missing values, and Azure-managed email sender domains.

For local API work, use Node 22 or newer, run `npm install` in `api/`, copy `api/local.settings.example.json` to the ignored `api/local.settings.json`, and install Azure Functions Core Tools 4.

Each new newsletter row queues a localized welcome email. The queue worker marks successful rows as `subscribed` and records `welcomeSentAt`; Azure Functions retries transient email failures. Full newsletter campaigns still require an unsubscribe endpoint, suppression handling, and a controlled sending workflow. The private message form requests no identity, but hosting and abuse-prevention providers may process technical request metadata. Review and delete submissions according to an adopted retention policy.