export default {
  registeredJob: {
    name: "RegisteredJob",
    home: {
      title: "Tareas registradas",
      createLabel: "Crear tarea registrada",
    },
    detail: {
      title: "Tarea registrada",
    },
    fields: {
      jobName: "Nombre de la tarea",
      schedule: "Programación",
      lastRegisteredAt: "Último registro",
      isEnabled: "Está habilitada",
      isLongRunning: "Es de larga duración",
      tenantId: "ID de inquilino",
      instanceId: "ID de instancia",
      createdAt: "Creada el",
      updatedAt: "Actualizada el",
    },
    actions: {
      delete: {
        label: "Eliminar",
        confirm: "¿Seguro que quieres eliminar la tarea registrada %{name}?",
      },
      viewAuditLogs: "Ver registros de auditoría",
    },
  },
  jobAuditLog: {
    name: "JobAuditLog",
    home: {
      title: "JobAuditLogs",
      createLabel: "Crear JobAuditLog",
    },
    detail: {
      title: "JobAuditLog",
    },
    fields: {
      appId: "ID de app",
      requestId: "ID de solicitud",
      jobName: "Nombre de la tarea",
      scheduledTime: "Hora programada",
      startTime: "Hora de inicio",
      endTime: "Hora de fin",
      status: "Estado",
      output: "Salida",
      error: "Error",
    },
    actions: {
      delete: {
        label: "Eliminar",
        confirm: "¿Seguro que quieres eliminar el registro de auditoría de la tarea %{name}?",
      },
      deleteLog: "Eliminar registro de auditoría",
    },
  },
  job: {
    name: "Job",
    home: {
      title: "Tareas",
      createLabel: "Crear tarea",
    },
    detail: {
      title: "Tarea",
    },
    fields: {
      name: "Nombre",
      schedule: "Programación",
      active: "Activa",
      status: "Estado",
      lastExecutionTime: "Última ejecución",
      nextExecutionTime: "Próxima ejecución",
      lockedBy: "Bloqueada por",
      lockedAt: "Bloqueada el",
    },
    actions: {
      delete: {
        label: "Eliminar",
        confirm: "¿Seguro que quieres eliminar la tarea %{name}?",
      },
      deleteJob: "Eliminar tarea",
    },
  },
};
