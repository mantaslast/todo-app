<script setup>
import { useTaskStore } from "@/stores/task";
import TaskListColumn from "@/components/TaskListColumn.vue";
import Loader from "@/components/ui/Loader.vue";
import TaskListFilters from "@/components//TaskListFilters.vue";

const taskStore = useTaskStore();
</script>

<template>
  <div class="relative">
    <Loader v-if="taskStore.isLoading"></Loader>
    <div v-else>
      <TaskListFilters class="mb-[20px]"></TaskListFilters>
      <div class="flex gap-[20px]">
        <template v-for="column in taskStore.taskData">
          <TaskListColumn :column="column"></TaskListColumn>
        </template>
      </div>
    </div>
  </div>
</template>
