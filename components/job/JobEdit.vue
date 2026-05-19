<template>
  <div class="container mx-auto p-6">
    <Card class="max-w-2xl mx-auto">
      <form class="space-y-6" @submit.prevent>
        <CardHeader>
          <CardTitle>{{ $t("cron.job.detail.title") }}</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="name">{{ $t("cron.job.fields.name") }}</Label>
            <Input
              id="name"
              v-model="job.name"
              :class="{ 'border-destructive': (v$ as any).name.$error }"
            />
            <p v-if="(v$ as any).name.$error" class="text-sm text-destructive">
              Field required
            </p>
          </div>

          <div class="space-y-2">
            <Label for="status">{{ $t("cron.job.fields.status") }}</Label>
            <Input
              id="status"
              v-model="job.status"
              :class="{ 'border-destructive': (v$ as any).status.$error }"
            />
            <p
              v-if="(v$ as any).status.$error"
              class="text-sm text-destructive"
            >
              Field required
            </p>
          </div>

          <div class="space-y-2">
            <Label>{{ $t("cron.job.fields.lastExecutionTime") }}</Label>
            <b-datetime v-model="job.last_execution_time" />
          </div>

          <div class="space-y-2">
            <Label>{{ $t("cron.job.fields.nextExecutionTime") }}</Label>
            <b-datetime v-model="job.next_execution_time" />
          </div>

          <div class="space-y-2">
            <Label for="locked-by">{{ $t("cron.job.fields.lockedBy") }}</Label>
            <Input id="locked-by" v-model="job.locked_by" />
          </div>

          <div class="space-y-2">
            <Label>{{ $t("cron.job.fields.lockedAt") }}</Label>
            <b-datetime v-model="job.locked_at" />
          </div>
        </CardContent>
        <CardFooter class="flex gap-2 p-4">
          <Button
            type="button"
            variant="outline"
            :disabled="loading"
            @click="backToJobList"
          >
            {{ $t("actions.backToList") }}
          </Button>
          <Button
            type="button"
            variant="secondary"
            :disabled="loading || !job.id"
            @click="deleteJob"
          >
            <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
            {{ $t("actions.delete") }}
          </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useJob } from "./composables/useJob";
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
import { Loader2 } from "lucide-vue-next";

const { job, loading, deleteJob, fetchJob, backToJobList, v$ } = useJob();

onMounted(async () => {
  await fetchJob();
});
</script>
