export default {
  registeredJob: {
    name: "RegisteredJob",
    home: {
      title: "Job registrati",
      createLabel: "Crea job registrato",
    },
    detail: {
      title: "Job registrato",
    },
    fields: {
      jobName: "Nome del job",
      schedule: "Pianificazione",
      lastRegisteredAt: "Ultima registrazione",
      isEnabled: "Abilitato",
      isLongRunning: "Lunga esecuzione",
      tenantId: "ID tenant",
      instanceId: "ID istanza",
      createdAt: "Creato il",
      updatedAt: "Aggiornato il",
    },
    actions: {
      delete: {
        label: "Elimina",
        confirm: "Vuoi davvero eliminare il job registrato %{name}?",
      },
      viewAuditLogs: "Visualizza log di audit",
    },
  },
  jobAuditLog: {
    name: "JobAuditLog",
    home: {
      title: "JobAuditLogs",
      createLabel: "Crea JobAuditLog",
    },
    detail: {
      title: "JobAuditLog",
    },
    fields: {
      appId: "ID app",
      requestId: "ID richiesta",
      jobName: "Nome del job",
      scheduledTime: "Orario pianificato",
      startTime: "Orario di inizio",
      endTime: "Orario di fine",
      status: "Stato",
      output: "Output",
      error: "Errore",
    },
    actions: {
      delete: {
        label: "Elimina",
        confirm: "Vuoi davvero eliminare il log di audit del job %{name}?",
      },
      deleteLog: "Elimina log di audit",
    },
  },
  job: {
    name: "Job",
    home: {
      title: "Job",
      createLabel: "Crea job",
    },
    detail: {
      title: "Job",
    },
    fields: {
      name: "Nome",
      schedule: "Pianificazione",
      active: "Attivo",
      status: "Stato",
      lastExecutionTime: "Ultima esecuzione",
      nextExecutionTime: "Prossima esecuzione",
      lockedBy: "Bloccato da",
      lockedAt: "Bloccato il",
    },
    actions: {
      delete: {
        label: "Elimina",
        confirm: "Vuoi davvero eliminare il job %{name}?",
      },
      deleteJob: "Elimina job",
    },
  },
};
