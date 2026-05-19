<template>
  <div class="container mx-auto p-6">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4"
    >
      <b-title :model-value="$t('cron.registeredJob.home.title')" />
      <div class="flex items-center space-x-2">
        <Input v-model="filter" placeholder="Search..." class="max-w-sm" />
      </div>
    </div>

    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead v-for="column in columns" :key="column.name">
              {{ column.label }}
            </TableHead>
            <TableHead />
            <!-- For actions column -->
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="loading">
            <TableRow>
              <TableCell :colspan="columns.length + 1" class="text-center py-4">
                <div class="flex justify-center items-center">
                  <Loader2 class="h-6 w-6 animate-spin text-primary" />
                </div>
              </TableCell>
            </TableRow>
          </template>
          <template v-else-if="rows.length">
            <TableRow
              v-for="row in rows"
              :key="row.id"
              class="cursor-pointer"
              @click="onRowSelect(row.id)"
            >
              <TableCell>{{ row.job_name }}</TableCell>
              <TableCell>{{ row.schedule }}</TableCell>
              <TableCell>{{ row.last_registered_at }}</TableCell>
              <TableCell>
                <Badge :variant="row.is_enabled ? 'default' : 'destructive'">
                  {{
                    row.is_enabled
                      ? $t("common.enabled")
                      : $t("common.disabled")
                  }}
                </Badge>
              </TableCell>
              <TableCell class="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  :title="$t('cron.registeredJob.actions.viewAuditLogs')"
                  @click="
                    (event: MouseEvent) => {
                      event.stopPropagation();
                      viewAuditLogs(row.id);
                    }
                  "
                >
                  <History class="h-4 w-4" />
                </Button>
                <Switch
                  :checked="row.is_enabled"
                  @update:checked="toggleJobEnabled(row.id, $event)"
                  @click.stop
                />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell
                :colspan="columns.length + 1"
                class="text-center py-8 text-muted-foreground"
              >
                No data available
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <BPagination
      v-model="pagination"
      @change="onRequest({ getCellValue, pagination })"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  type CancelablePromise,
  DefaultService,
  type RegisteredJob,
} from "../../lib";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import useListService, {
  getCellValue,
  type ListService,
} from "core-fe-lib/components-shadcn/composables/useListService";
import { useQueryParams } from "core-fe-lib/composables/useQueryParams";
import { useErrors } from "core-fe-lib/components-shadcn/composables/useErrors";
import { useNotify } from "core-fe-lib/components-shadcn/composables/useNotify";
import { Input } from "core-fe-lib/components-shadcn/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "core-fe-lib/components-shadcn/ui/table";
import { Badge } from "core-fe-lib/components-shadcn/ui/badge";
import { Switch } from "core-fe-lib/components-shadcn/ui/switch";
import { Button } from "core-fe-lib/components-shadcn/ui/button";
import BPagination from "core-fe-lib/components-shadcn/primitives/BPagination.vue";
import { Loader2, History } from "lucide-vue-next";

const { notify } = useNotify();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { handleError } = useErrors();

const rows = ref<RegisteredJob[]>([]);
const loading = ref(false);
const { currentQuery, setQueryParam, pagination } = useQueryParams();
const filter = ref("");

interface Column {
  name: string;
  align: "left" | "right" | "center";
  label: string;
  field: string;
  sortable: boolean;
}

const columns: Column[] = [
  {
    name: "job_name",
    align: "left",
    label: t("cron.registeredJob.fields.jobName"),
    field: "job_name",
    sortable: true,
  },
  {
    name: "schedule",
    align: "left",
    label: t("cron.registeredJob.fields.schedule"),
    field: "schedule",
    sortable: true,
  },
  {
    name: "last_registered_at",
    align: "left",
    label: t("cron.registeredJob.fields.lastRegisteredAt"),
    field: "last_registered_at",
    sortable: true,
  },
  {
    name: "is_enabled",
    align: "left",
    label: t("cron.registeredJob.fields.isEnabled"),
    field: "is_enabled",
    sortable: true,
  },
];

const listService: ListService<RegisteredJob> = {
  listService(
    page: number,
    rowsPerPage: number,
    sortBy: string,
    order: "asc" | "desc",
    q?: string
  ): CancelablePromise<Array<RegisteredJob>> {
    return DefaultService.listRegisteredJobs(
      page,
      rowsPerPage,
      sortBy as "job_name" | "schedule" | "last_registered_at" | "is_enabled",
      order,
      q
    );
  },
};

const { onRequest } = useListService<RegisteredJob>({
  listService,
  rows,
  pagination,
  loading,
  filter,
});

watch(
  () => route.query.page,
  (newPage) => {
    pagination.value.page = Number.parseInt(newPage as string) || 1;
    onRequest({ getCellValue, pagination: pagination.value });
  }
);

watch(
  () => filter.value,
  (newFilter) => {
    setQueryParam("filter", newFilter);
  }
);

onMounted(() => {
  filter.value = (route.query.filter as string) || "";
  onRequest({
    getCellValue,
    pagination: pagination.value,
    filter: filter.value,
  });
});

const onRowSelect = (jobID: string) => {
  void router.push({
    name: "view-registered-job",
    params: { id: jobID },
    query: currentQuery.value, // This preserves the query parameters
  });
};

const viewAuditLogs = (jobID: string) => {
  void router.push({
    name: "job-audit-logs",
    params: { registeredId: jobID },
    query: currentQuery.value,
  });
};

const toggleJobEnabled = (id: string, isEnabled: boolean) => {
  loading.value = true;
  DefaultService.updateRegisteredJob(id, { is_enabled: isEnabled })
    .then(() => {
      notify({
        message: isEnabled
          ? t("cron.registeredJob.notifications.enabled")
          : t("cron.registeredJob.notifications.disabled"),
      });
      onRequest({ getCellValue, pagination: pagination.value });
    })
    .catch((err: any) => {
      handleError(err);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
