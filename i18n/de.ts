export default {
  registeredJob: {
    name: "RegisteredJob",
    home: {
      title: "Registrierte Jobs",
      createLabel: "Registrierten Job erstellen",
    },
    detail: {
      title: "Registrierter Job",
    },
    fields: {
      jobName: "Job-Name",
      schedule: "Zeitplan",
      lastRegisteredAt: "Zuletzt registriert am",
      isEnabled: "Aktiviert",
      isLongRunning: "Langläufig",
      tenantId: "Mandanten-ID",
      instanceId: "Instanz-ID",
      createdAt: "Erstellt am",
      updatedAt: "Aktualisiert am",
    },
    actions: {
      delete: {
        label: "Löschen",
        confirm: "Möchten Sie den registrierten Job %{name} wirklich löschen?",
      },
      viewAuditLogs: "Audit-Protokolle anzeigen",
    },
  },
  jobAuditLog: {
    name: "JobAuditLog",
    home: {
      title: "Job-Audit-Protokolle",
      createLabel: "JobAuditLog erstellen",
    },
    detail: {
      title: "JobAuditLog",
    },
    fields: {
      appId: "App-ID",
      requestId: "Anfrage-ID",
      jobName: "Job-Name",
      scheduledTime: "Geplante Zeit",
      startTime: "Startzeit",
      endTime: "Endzeit",
      status: "Status",
      output: "Ausgabe",
      error: "Fehler",
    },
    actions: {
      delete: {
        label: "Löschen",
        confirm: "Möchten Sie das Job-Audit-Protokoll %{name} wirklich löschen?",
      },
      deleteLog: "Audit-Protokoll löschen",
    },
  },
  job: {
    name: "Job",
    home: {
      title: "Jobs",
      createLabel: "Job erstellen",
    },
    detail: {
      title: "Job",
    },
    fields: {
      name: "Name",
      schedule: "Zeitplan",
      active: "Aktiv",
      status: "Status",
      lastExecutionTime: "Letzte Ausführungszeit",
      nextExecutionTime: "Nächste Ausführungszeit",
      lockedBy: "Gesperrt von",
      lockedAt: "Gesperrt am",
    },
    actions: {
      delete: {
        label: "Löschen",
        confirm: "Möchten Sie den Job %{name} wirklich löschen?",
      },
      deleteJob: "Job löschen",
    },
  },
};
