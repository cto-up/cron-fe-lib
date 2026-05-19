import { type MenuLink } from "core-fe-lib/components-shadcn/types/menu-link";

import { Role } from "core-fe-lib/openapi/core/models/Role";

export function getCronLinks(t: any, icon: string = "book"): MenuLink[] {
  return [
    {
      title: t("layout.navigation.cron.title"),
      caption: t("layout.navigation.cron.caption"),
      icon,
      hasExpansion: true,
      items: [
        {
          title: t("layout.navigation.cron.jobAuditLogs.title"),
          caption: t("layout.navigation.cron.jobAuditLogs.caption"),
          link: "/cron/job-audit-logs",
          requiredPrivilege: Role.ADMIN,
        },
        {
          title: t("layout.navigation.cron.jobs.title"),
          caption: t("layout.navigation.cron.jobs.caption"),
          link: "/cron/jobs",
          requiredPrivilege: Role.ADMIN,
        },
        {
          title: t("layout.navigation.cron.registeredJobs.title"),
          caption: t("layout.navigation.cron.registeredJobs.caption"),
          link: "/cron/registered-jobs",
          requiredPrivilege: Role.ADMIN,
        },
      ],
    },
  ];
}
