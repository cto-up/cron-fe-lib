import { type Component } from "vue";
import { type RouteRecordRaw } from "vue-router";

export function cronRoutes(MainLayout: Component): RouteRecordRaw {
  return {
    path: "/cron",
    component: MainLayout,
    children: [
      {
        path: "",
        component: () =>
          import("core-fe-lib/components-shadcn/layouts/PassthroughLayout.vue"),
        children: [
          {
            path: "job-audit-logs",
            name: "job-audit-logs",
            component: () =>
              import("./components/job-audit-log/JobAuditLogList.vue"),
            meta: { requiresAuth: true },
          },
          {
            path: "job-audit-logs/:id/edit",
            name: "edit-job-audit-log",
            component: () =>
              import("./components/job-audit-log/JobAuditLogEdit.vue"),
            meta: { requiresAuth: true },
          },
          {
            path: "jobs",
            name: "jobs",
            component: () => import("./components/job/JobList.vue"),
            meta: { requiresAuth: true },
          },
          {
            path: "jobs/:id/edit",
            name: "edit-job",
            component: () => import("./components/job/JobEdit.vue"),
            meta: { requiresAuth: true },
          },
          {
            path: "registered-jobs",
            name: "registered-jobs",
            component: () =>
              import("./components/registered-job/RegisteredJobList.vue"),
            meta: { requiresAuth: true },
          },
          {
            path: "registered-jobs/:id/view",
            name: "view-registered-job",
            component: () =>
              import("./components/registered-job/RegisteredJobView.vue"),
            meta: { requiresAuth: true },
          },
          {
            path: "registered-jobs/:id/audit-logs",
            name: "registered-job-audit-logs",
            component: () =>
              import("./components/job-audit-log/JobAuditLogList.vue"),
            meta: { requiresAuth: true },
          },
        ],
      },
    ],
  };
}
