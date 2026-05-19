// src/composables/useJobAuditLog.ts
import { DefaultService, type JobAuditLog } from "../../../lib";
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "core-fe-lib/components-shadcn/ui/toast/use-toast";
import { useDialog } from "core-fe-lib/components-shadcn/composables/useDialog";
import { useErrors } from "core-fe-lib/components-shadcn/composables/useErrors";
import { useI18n } from "vue-i18n";

export function useJobAuditLog() {
  const route = useRoute();
  const router = useRouter();
  const { toast } = useToast();
  const { dialog } = useDialog();
  const { handleError } = useErrors();

  const jobAuditLog = reactive<JobAuditLog>({
    id: "",
    app_id: "",
    request_id: "",
    job_name: "",
    scheduled_time: "",
    start_time: "",
    end_time: "",
    status: "",
    output: "",
    error: "",
    tenantID: "",
    createdAt: "",
    updatedAt: "",
  });

  const { t } = useI18n();
  const loading = ref(false);
  const fetchJobAuditLog = async () => {
    if (route.params.id) {
      try {
        const response = await DefaultService.getJobAuditLogById(
          route.params.id as string
        );
        Object.assign(jobAuditLog, response);
      } catch (e) {
        handleError(e);
      }
    }
  };

  const deleteJobAuditLog = async () => {
    const confirmed = await dialog({
      message: t("cron.jobAuditLog.actions.delete.confirm", {
        name: jobAuditLog.job_name,
      }),
      cancel: t("actions.cancel"),
      ok: t("actions.delete"),
    });

    if (!confirmed) return;

    DefaultService.deleteJobAuditLog(jobAuditLog.id)
      .then(() => {
        toast({ title: t("actions.deleted"), variant: "default" });
        void router.push({
          name: "job-audit-logs",
          query: route.query,
        });
      })
      .catch((e) => {
        handleError(e);
      });
  };

  const backToJobAuditLogList = () => {
    void router.push({
      name: "job-audit-logs",
      query: route.query,
    });
  };

  return {
    jobAuditLog,
    loading,
    fetchJobAuditLog,
    deleteJobAuditLog,
    backToJobAuditLogList,
  };
}
