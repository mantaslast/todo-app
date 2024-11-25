<script setup>
import TaskItem from "@/components/TaskItem.vue";
defineProps({
  column: Object,
  default: () => {},
});
</script>

<template>
  <div class="flex-1 border-[1px] border-black self-start">
    <div class="text-center border-b-[1px] border-black py-[5px]">
      {{ column.name }}
    </div>
    <template v-for="task in column.tasks">
      <TaskItem :item="task"></TaskItem>
    </template>
  </div>
</template>
