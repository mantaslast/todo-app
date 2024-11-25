<script setup>
import TaskListColumn from "@/components/TaskListColumn.vue";
import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore();
</script>

<template>
  <div class="flex gap-[20px]">
    <template v-for="column in taskStore.taskData">
      <TaskListColumn :column="column"></TaskListColumn>
    </template>
  </div>
</template>
