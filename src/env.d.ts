/// <reference path="../.astro/types.d.ts" />

type Runtime = import("@astrojs/cloudflare").Runtime<{
  TURNSTILE_SECRET_KEY: string;
  GOOGLE_PRIVATE_KEY: string;
  GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
  SPREADSHEET_ID: string;
}>;

declare namespace App {
  interface Locals extends Runtime {}
}

interface ImportMetaEnv {
  readonly PUBLIC_TURNSTILE_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
