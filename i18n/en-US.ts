export default {
  registeredJob: {
    name: "RegisteredJob",
    home: {
      title: "Registered Jobs",
      createLabel: "Create Registered Job",
    },
    detail: {
      title: "Registered Job",
    },
    fields: {
      jobName: "Job Name",
      schedule: "Schedule",
      lastRegisteredAt: "Last Registered At",
      isEnabled: "Is Enabled",
      isLongRunning: "Is Long Running",
      tenantId: "Tenant ID",
      instanceId: "Instance ID",
      createdAt: "Created At",
      updatedAt: "Updated At",
    },
    actions: {
      delete: {
        label: "Delete",
        confirm: "Are you sure you want to delete registered job %{name}?",
      },
      viewAuditLogs: "View Audit Logs",
    },
  },
  jobAuditLog: {
    name: "JobAuditLog",
    home: {
      title: "JobAuditLogs",
      createLabel: "Create JobAuditLog",
    },
    detail: {
      title: "JobAuditLog",
    },
    fields: {
      appId: "App Id",
      requestId: "Request Id",
      jobName: "Job Name",
      scheduledTime: "Scheduled Time",
      startTime: "Start Time",
      endTime: "End Time",
      status: "Status",
      output: "Output",
      error: "Error",
    },
    actions: {
      delete: {
        label: "Delete",
        confirm: "Are you sure you want to delete job audit log %{name}?",
      },
      deleteLog: "Delete audit log",
    },
  },
  job: {
    name: "Job",
    home: {
      title: "Jobs",
      createLabel: "Create Job",
    },
    detail: {
      title: "Job",
    },
    fields: {
      name: "Name",
      schedule: "Schedule",
      active: "Active",
      status: "Status",
      lastExecutionTime: "Last Execution Time",
      nextExecutionTime: "Next Execution Time",
      lockedBy: "Locked by",
      lockedAt: "Locked at",
    },
    actions: {
      delete: {
        label: "Delete",
        confirm: "Are you sure you want to delete Job %{name}?",
      },
      deleteJob: "Delete job",
    },
  },
};
