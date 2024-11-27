<script setup>
import { computed } from "vue";
import TaskItem from "@/components/TaskItem.vue";
import { getColumnColor } from "@/utils/getColumnColor";

const props = defineProps({
  column: Object,
  default: () => {},
});

const columnBgColor = computed(() => {
  return getColumnColor(props.column.name);
});
</script>

<template>
  <div class="flex-1 self-start rounded-[4px] border-[1px] border-black">
    <div
      :style="{ backgroundColor: columnBgColor }"
      class="border-b-[1px] border-black py-[5px] text-center"
    >
      {{ column.name }}
    </div>
    <div v-if="!column.tasks.length">No tasks found</div>
    <template v-else v-for="task in column.tasks">
      <TaskItem :item="task"></TaskItem>
    </template>
  </div>
</template>
