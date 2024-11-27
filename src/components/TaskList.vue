<script setup>
import { useTaskStore } from "@/stores/task";
import TaskListColumn from "@/components/TaskListColumn.vue";
import Loader from "@/components/ui/Loader.vue";

const taskStore = useTaskStore();
</script>

<template>
  <div class="relative flex gap-[20px]">
    <Loader v-if="taskStore.isLoading"></Loader>
    <template v-else v-for="column in taskStore.taskData">
      <TaskListColumn :column="column"></TaskListColumn>
    </template>
  </div>
</template>
