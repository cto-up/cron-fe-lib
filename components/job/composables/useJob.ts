// src/composables/useJob.ts
import { DefaultService, type Job } from "../../../lib";
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "core-fe-lib/components-shadcn/ui/toast/use-toast";
import { useDialog } from "core-fe-lib/components-shadcn/composables/useDialog";
import { useErrors } from "core-fe-lib/components-shadcn/composables/useErrors";
import useVuelidate from "@vuelidate/core";
import { maxLength, required } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";

export function useJob() {
  const route = useRoute();
  const router = useRouter();
  const { toast } = useToast();
  const { dialog } = useDialog();
  const { handleError } = useErrors();

  const job = reactive<Job>({
    id: "",
    name: "",
    status: "",
    last_execution_time: "",
    next_execution_time: "",
    locked_by: "",
    locked_at: "",
  });

  const { t } = useI18n();
  const loading = ref(false);
  const rules = {
    name: {
      required,
      $autoDirty: true,
    },
    status: {
      required,
      $autoDirty: true,
      maxLength: maxLength(20),
    },
  };

  const v$ = useVuelidate(rules, job as Job);

  const fetchJob = async () => {
    if (route.params.id) {
      try {
        const response = await DefaultService.getJobById(
          route.params.id as string
        );
        Object.assign(job, response);
      } catch (e) {
        handleError(e);
      }
    }
  };

  const deleteJob = async () => {
    const confirmed = await dialog({
      message: t("cron.job.actions.delete.confirm", { name: job.name }),
      cancel: t("actions.cancel"),
      ok: t("actions.delete"),
    });

    if (!confirmed) return;

    DefaultService.deleteJob(job.id)
      .then(() => {
        toast({ title: t("actions.deleted"), variant: "default" });
        void router.push({
          name: "jobs",
          query: route.query,
        });
      })
      .catch((e) => {
        handleError(e);
      });
  };

  const backToJobList = () => {
    void router.push({
      name: "jobs",
      query: route.query,
    });
  };

  return {
    v$,
    job,
    loading,
    fetchJob,
    deleteJob,
    backToJobList,
  };
}
