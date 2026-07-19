export default {
  registeredJob: {
    name: "RegisteredJob",
    home: {
      title: "Tarefas registadas",
      createLabel: "Criar tarefa registada",
    },
    detail: {
      title: "Tarefa registada",
    },
    fields: {
      jobName: "Nome da tarefa",
      schedule: "Agendamento",
      lastRegisteredAt: "Último registo em",
      isEnabled: "Ativada",
      isLongRunning: "De execução prolongada",
      tenantId: "ID do inquilino",
      instanceId: "ID da instância",
      createdAt: "Criada em",
      updatedAt: "Atualizada em",
    },
    actions: {
      delete: {
        label: "Eliminar",
        confirm: "Tem a certeza de que pretende eliminar a tarefa registada %{name}?",
      },
      viewAuditLogs: "Ver registos de auditoria",
    },
  },
  jobAuditLog: {
    name: "JobAuditLog",
    home: {
      title: "JobAuditLogs",
      createLabel: "Criar JobAuditLog",
    },
    detail: {
      title: "JobAuditLog",
    },
    fields: {
      appId: "ID da aplicação",
      requestId: "ID do pedido",
      jobName: "Nome da tarefa",
      scheduledTime: "Hora agendada",
      startTime: "Hora de início",
      endTime: "Hora de fim",
      status: "Estado",
      output: "Saída",
      error: "Erro",
    },
    actions: {
      delete: {
        label: "Eliminar",
        confirm: "Tem a certeza de que pretende eliminar o registo de auditoria da tarefa %{name}?",
      },
      deleteLog: "Eliminar registo de auditoria",
    },
  },
  job: {
    name: "Job",
    home: {
      title: "Tarefas",
      createLabel: "Criar tarefa",
    },
    detail: {
      title: "Tarefa",
    },
    fields: {
      name: "Nome",
      schedule: "Agendamento",
      active: "Ativa",
      status: "Estado",
      lastExecutionTime: "Hora da última execução",
      nextExecutionTime: "Hora da próxima execução",
      lockedBy: "Bloqueada por",
      lockedAt: "Bloqueada em",
    },
    actions: {
      delete: {
        label: "Eliminar",
        confirm: "Tem a certeza de que pretende eliminar a tarefa %{name}?",
      },
      deleteJob: "Eliminar tarefa",
    },
  },
};
