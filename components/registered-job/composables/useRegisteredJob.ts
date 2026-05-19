import { DefaultService, type RegisteredJob } from "../../../lib";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { useErrors } from "core-fe-lib/components-shadcn/composables/useErrors";

export function useRegisteredJob() {
  const route = useRoute();
  const { handleError } = useErrors();

  const registeredJob = reactive<RegisteredJob>({
    id: "",
    job_name: "",
    description: "",
    schedule: "",
    is_long_running: false,
    is_enabled: false,
    last_registered_at: "",
    instance_id: "",
    tenant_id: "",
    created_at: "",
    updated_at: "",
  });

  const loading = ref(false);

  const fetchRegisteredJob = async () => {
    if (route.params.id) {
      try {
        const response = await DefaultService.getRegisteredJob(
          route.params.id as string
        );
        Object.assign(registeredJob, response);
      } catch (e) {
        handleError(e);
      }
    }
  };

  return {
    registeredJob,
    loading,
    fetchRegisteredJob,
  };
}
