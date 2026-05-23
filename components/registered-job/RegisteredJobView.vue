<template>
  <div class="container mx-auto p-6">
    <Card class="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{{ $t("cron.registeredJob.detail.title") }}</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <div class="text-sm text-muted-foreground">
              {{ $t("cron.registeredJob.fields.jobName") }}
            </div>
            <div class="font-medium">
              {{ registeredJob.job_name }}
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm text-muted-foreground">
              {{ $t("cron.registeredJob.fields.schedule") }}
            </div>
            <div class="font-medium">
              {{ registeredJob.schedule }}
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm text-muted-foreground">
              {{ $t("cron.registeredJob.fields.isLongRunning") }}
            </div>
            <Badge
              :variant="registeredJob.is_long_running ? 'default' : 'secondary'"
            >
              {{
                registeredJob.is_long_running
                  ? $t("common.yes")
                  : $t("common.no")
              }}
            </Badge>
          </div>

          <div class="space-y-1">
            <div class="text-sm text-muted-foreground">
              {{ $t("cron.registeredJob.fields.isEnabled") }}
            </div>
            <Badge
              :variant="registeredJob.is_enabled ? 'default' : 'destructive'"
            >
              {{
                registeredJob.is_enabled
                  ? $t("common.enabled")
                  : $t("common.disabled")
              }}
            </Badge>
          </div>

          <div class="space-y-1">
            <div class="text-sm text-muted-foreground">
              {{ $t("cron.registeredJob.fields.lastRegisteredAt") }}
            </div>
            <div class="font-medium">
              {{ registeredJob.last_registered_at }}
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm text-muted-foreground">
              {{ $t("cron.registeredJob.fields.instanceId") }}
            </div>
            <div class="font-medium">
              {{ registeredJob.instance_id }}
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm text-muted-foreground">
              {{ $t("cron.registeredJob.fields.tenantId") }}
            </div>
            <div class="font-medium">
              {{ registeredJob.tenant_id }}
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm text-muted-foreground">
              {{ $t("cron.registeredJob.fields.createdAt") }}
            </div>
            <div class="font-medium">
              {{ registeredJob.created_at }}
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm text-muted-foreground">
              {{ $t("cron.registeredJob.fields.updatedAt") }}
            </div>
            <div class="font-medium">
              {{ registeredJob.updated_at }}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRegisteredJob } from "./composables/useRegisteredJob";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "core-fe-lib/components-shadcn/ui/card";
import { Badge } from "core-fe-lib/components-shadcn/ui/badge";

const { registeredJob, loading, fetchRegisteredJob } = useRegisteredJob();

onMounted(async () => {
  await fetchRegisteredJob();
});
</script>
