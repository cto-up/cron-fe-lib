import type { HubModule } from "core-fe-lib/components-shadcn/shell/types";
import { cronRoutes } from "./routes";
import { getCronLinks } from "./links";
import enUS from "./i18n/en-US";
import fr from "./i18n/fr";

export interface CronModuleOptions {
  requiredFeature?: string;
  adminOnly?: boolean;
  landingPath?: string;
  landingPriority?: number;
  navIcon?: string;
}

export function createCronModule(opts: CronModuleOptions = {}): HubModule {
  return {
    id: "cron",
    name: "Cron",
    adminOnly: opts.adminOnly ?? true,
    requiredFeature: opts.requiredFeature,
    landingPath: opts.landingPath,
    landingPriority: opts.landingPriority,
    routes: (layouts) => cronRoutes(layouts.MainLayout),
    navLinks: (ctx) => getCronLinks(ctx.t, opts.navIcon ?? "book"),
    messages: { "en-US": enUS, fr },
  };
}
