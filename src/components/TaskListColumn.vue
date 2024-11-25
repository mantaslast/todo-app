<script setup>
import TaskItem from "@/components/TaskItem.vue";
defineProps({
  column: Object,
  default: () => {},
});
</script>

<template>
  <div class="flex-1 self-start border-[1px] border-black">
    <div class="border-b-[1px] border-black py-[5px] text-center">
      {{ column.name }}
    </div>
    <template v-for="task in column.tasks">
      <TaskItem :item="task"></TaskItem>
    </template>
  </div>
</template>
