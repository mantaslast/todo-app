<script setup>
import TaskForm from "@/components/TaskForm.vue";
import TaskList from "@/components/TaskList.vue";

import { onBeforeMount } from "vue";
import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore();
onBeforeMount(async () => {
  await taskStore.fetchTaskData();
});
</script>

<template>
  <section class="container mx-auto py-[20px]">
    <TaskForm class="mb-[20px]"></TaskForm>
    <TaskList></TaskList>
  </section>
</template>
