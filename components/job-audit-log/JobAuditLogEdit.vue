<template>
  <div class="container mx-auto p-6">
    <Card class="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{{ $t("cron.jobAuditLog.detail.title") }}</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Label for="app-id">{{ $t("cron.jobAuditLog.fields.appId") }}</Label>
          <Input id="app-id" v-model="jobAuditLog.app_id" readonly />
        </div>

        <div class="space-y-2">
          <Label for="request-id">{{
            $t("cron.jobAuditLog.fields.requestId")
          }}</Label>
          <Input id="request-id" v-model="jobAuditLog.request_id" readonly />
        </div>

        <div class="space-y-2">
          <Label for="job-name">{{
            $t("cron.jobAuditLog.fields.jobName")
          }}</Label>
          <Input id="job-name" v-model="jobAuditLog.job_name" readonly />
        </div>

        <div class="space-y-2">
          <Label>{{ $t("cron.jobAuditLog.fields.scheduledTime") }}</Label>
          <b-date-time v-model="jobAuditLog.scheduled_time" readonly />
        </div>

        <div class="space-y-2">
          <Label>{{ $t("cron.jobAuditLog.fields.startTime") }}</Label>
          <b-date-time v-model="jobAuditLog.start_time" readonly />
        </div>

        <div class="space-y-2">
          <Label>{{ $t("cron.jobAuditLog.fields.endTime") }}</Label>
          <b-date-time v-model="jobAuditLog.end_time" readonly />
        </div>

        <div class="space-y-2">
          <Label for="status">{{ $t("cron.jobAuditLog.fields.status") }}</Label>
          <Input id="status" v-model="jobAuditLog.status" readonly />
        </div>

        <div class="space-y-2">
          <Label for="output">{{ $t("cron.jobAuditLog.fields.output") }}</Label>
          <Textarea
            id="output"
            v-model="jobAuditLog.output"
            readonly
            rows="4"
          />
        </div>

        <div class="space-y-2">
          <Label for="error">{{ $t("cron.jobAuditLog.fields.error") }}</Label>
          <Textarea id="error" v-model="jobAuditLog.error" readonly rows="4" />
        </div>
      </CardContent>
      <CardFooter class="flex gap-2 p-4">
        <Button
          variant="outline"
          :disabled="loading"
          @click="backToJobAuditLogList"
        >
          {{ $t("actions.backToList") }}
        </Button>
        <Button
          variant="secondary"
          :disabled="loading || !jobAuditLog.id"
          @click="deleteJobAuditLog"
        >
          <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
          {{ $t("actions.delete") }}
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useJobAuditLog } from "./composables/useJobAuditLog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "core-fe-lib/components-shadcn/ui/card";
import { Button } from "core-fe-lib/components-shadcn/ui/button";
import { Input } from "core-fe-lib/components-shadcn/ui/input";
import { Label } from "core-fe-lib/components-shadcn/ui/label";
import { Textarea } from "core-fe-lib/components-shadcn/ui/textarea";
import { Loader2 } from "lucide-vue-next";

const {
  jobAuditLog,
  loading,
  deleteJobAuditLog,
  fetchJobAuditLog,
  backToJobAuditLogList,
} = useJobAuditLog();

onMounted(async () => {
  await fetchJobAuditLog();
});
</script>
