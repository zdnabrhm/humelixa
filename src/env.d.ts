/// <reference path="../.astro/types.d.ts" />

interface Env {
  TURNSTILE_SECRET_KEY: string;
  GOOGLE_PRIVATE_KEY: string;
  GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
  SPREADSHEET_ID: string;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
