<template>
  <div class="container mx-auto p-6">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4"
    >
      <h1 class="text-2xl font-semibold tracking-tight flex-grow">
        {{ $t("cron.jobAuditLog.home.title") }}
      </h1>
      <div class="flex items-center space-x-2">
        <Input v-model="filter" placeholder="Search..." class="max-w-sm" />
      </div>
    </div>

    <div class="border rounded-md overflow-x-auto">
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
              <TableCell>{{ row.app_id }}</TableCell>
              <TableCell>{{ row.request_id }}</TableCell>
              <TableCell>{{ row.job_name }}</TableCell>
              <TableCell>{{ row.scheduled_time }}</TableCell>
              <TableCell>{{ row.start_time }}</TableCell>
              <TableCell>{{ row.end_time }}</TableCell>
              <TableCell>{{ row.status }}</TableCell>
              <TableCell>{{ row.output }}</TableCell>
              <TableCell>{{ row.error }}</TableCell>
              <TableCell class="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  :title="$t('cron.jobAuditLog.actions.deleteLog')"
                  @click="
                    (event: MouseEvent) => {
                      event.stopPropagation();
                      deleteJobAuditLog(row.id, row.name);
                    }
                  "
                >
                  <Trash2 class="h-4 w-4" />
                </Button>
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
  type JobAuditLog,
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
import { Button } from "core-fe-lib/components-shadcn/ui/button";
import BPagination from "core-fe-lib/components-shadcn/primitives/BPagination.vue";
import { Loader2, Trash2 } from "lucide-vue-next";

const { notify } = useNotify();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { handleError } = useErrors();

const rows = ref<JobAuditLog[]>([]);
const loading = ref(false);
const { currentQuery, setQueryParam, pagination } = useQueryParams();
const filter = ref("");

// get registered job id from route params
const registeredJobId = ref(route.params.registeredId as string);

interface Column {
  name: string;
  align: "left" | "right" | "center";
  label: string;
  field: string;
  sortable: boolean;
}

const columns: Column[] = [
  {
    name: "app_id",
    align: "left",
    label: t("cron.jobAuditLog.fields.appId"),
    field: "app_id",
    sortable: true,
  },
  {
    name: "request_id",
    align: "left",
    label: t("cron.jobAuditLog.fields.requestId"),
    field: "request_id",
    sortable: true,
  },
  {
    name: "job_name",
    align: "left",
    label: t("cron.jobAuditLog.fields.jobName"),
    field: "job_name",
    sortable: true,
  },
  {
    name: "scheduled_time",
    align: "left",
    label: t("cron.jobAuditLog.fields.scheduledTime"),
    field: "scheduled_time",
    sortable: true,
  },
  {
    name: "start_time",
    align: "left",
    label: t("cron.jobAuditLog.fields.startTime"),
    field: "start_time",
    sortable: true,
  },
  {
    name: "end_time",
    align: "left",
    label: t("cron.jobAuditLog.fields.endTime"),
    field: "end_time",
    sortable: true,
  },

  {
    name: "status",
    align: "left",
    label: t("cron.jobAuditLog.fields.status"),
    field: "status",
    sortable: true,
  },

  {
    name: "output",
    align: "left",
    label: t("cron.jobAuditLog.fields.output"),
    field: "output",
    sortable: true,
  },

  {
    name: "error",
    align: "left",
    label: t("cron.jobAuditLog.fields.error"),
    field: "error",
    sortable: true,
  },
];

const listService: ListService<JobAuditLog> = {
  listService(
    page: number,
    rowsPerPage: number,
    sortBy: string,
    order: "asc" | "desc",
    q?: string
  ): CancelablePromise<Array<JobAuditLog>> {
    if (registeredJobId.value) {
      return DefaultService.getJobAuditLogs(
        registeredJobId.value,
        page,
        rowsPerPage,
        sortBy,
        order
      );
    }
    return DefaultService.listJobAuditLogs(page, rowsPerPage, sortBy, order, q);
  },
};

const { onRequest } = useListService<JobAuditLog>({
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

const onRowSelect = (jobAuditLogID: string) => {
  // https://github.com/single-spa/single-spa/issues/929
  // ugly but .push triggered 2 changes in history instead of 1
  void router.push({
    name: "edit-job-audit-log",
    params: { id: jobAuditLogID },
    query: currentQuery.value, // This preserves the query parameters
  });
};

const deleteJobAuditLog = (id: string, name: string) => {
  DefaultService.deleteJobAuditLog(id)
    .then(() => {
      onRequest({ pagination: pagination.value, getCellValue });
      notify({
        message: t("cron.jobAuditLog.actions.delete.success", { name: name }),
      });
    })
    .catch((err: any) => {
      handleError(err);
    });
};
</script>
