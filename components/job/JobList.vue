<template>
  <div class="container mx-auto p-6">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4"
    >
      <h1 class="text-2xl font-semibold tracking-tight">
        {{ $t("cron.job.home.title") }}
      </h1>
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
              <TableCell>{{ row.name }}</TableCell>
              <TableCell>{{ row.status }}</TableCell>
              <TableCell>{{ row.last_execution_time }}</TableCell>
              <TableCell>{{ row.next_execution_time }}</TableCell>
              <TableCell>{{ row.locked_by }}</TableCell>
              <TableCell>{{ row.locked_at }}</TableCell>

              <TableCell class="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  :title="$t('cron.job.actions.deleteJob')"
                  @click="
                    (event: MouseEvent) => {
                      event.stopPropagation();
                      deleteJob(row.id, row.name);
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
import { type CancelablePromise, DefaultService, type Job } from "../../lib";
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

const rows = ref<Job[]>([]);
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
    name: "name",
    align: "left",
    label: t("cron.job.fields.name"),
    field: "name",
    sortable: true,
  },
  {
    name: "status",
    align: "left",
    label: t("cron.job.fields.status"),
    field: "status",
    sortable: true,
  },
  {
    name: "last_execution_time",
    align: "left",
    label: t("cron.job.fields.lastExecutionTime"),
    field: "last_execution_time",
    sortable: true,
  },
  {
    name: "next_execution_time",
    align: "left",
    label: t("cron.job.fields.nextExecutionTime"),
    field: "next_execution_time",
    sortable: true,
  },

  {
    name: "locked_by",
    align: "left",
    label: t("cron.job.fields.lockedBy"),
    field: "locked_by",
    sortable: true,
  },

  {
    name: "locked_at",
    align: "left",
    label: t("cron.job.fields.lockedAt"),
    field: "locked_at",
    sortable: true,
  },
];

const listService: ListService<Job> = {
  listService(
    page: number,
    rowsPerPage: number,
    sortBy: string,
    order: "asc" | "desc",
    q?: string
  ): CancelablePromise<Array<Job>> {
    return DefaultService.listJobs(page, rowsPerPage, sortBy, order, q);
  },
};

const { onRequest } = useListService<Job>({
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
  // https://github.com/single-spa/single-spa/issues/929
  // ugly but .push triggered 2 changes in history instead of 1
  void router.push({
    name: "edit-job",
    params: { id: jobID },
    query: currentQuery.value, // This preserves the query parameters
  });
};

const deleteJob = (id: string, name: string) => {
  DefaultService.deleteJob(id)
    .then(() => {
      onRequest({ pagination: pagination.value, getCellValue });
      notify({
        message: t("cron.job.actions.delete.success", { name: name }),
      });
    })
    .catch((err: any) => {
      handleError(err);
    });
};
</script>
