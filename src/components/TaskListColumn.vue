<script setup>
import { computed, ref } from "vue";
import TaskItem from "@/components/TaskItem.vue";
import { getColumnColor } from "@/utils/getColumnColor";
import { useDropzone } from "@/composables/useDropzone";
import { useTaskStore } from "@/stores/task";

const props = defineProps({
  column: Object,
  default: () => {},
});

const taskStore = useTaskStore();

const columnRef = ref(null);
const { isDraggingOver, onDrop } = useDropzone(columnRef);

onDrop((data) => {
  if (data.current_column === props.column.name) return false;
  taskStore.updateTask(data.id, {
    title: data.title,
    author_id: data.author_id,
    date_created: data.date_created,
    current_column: props.column.name,
  });
});

const columnBgColor = computed(() => {
  return getColumnColor(props.column.name);
});
</script>

<template>
  <div
    ref="columnRef"
    class="flex-1 self-start rounded-[4px] border-[1px]"
    :class="{ 'border-dashed border-[green]': isDraggingOver }"
  >
    <div
      :style="{ backgroundColor: columnBgColor }"
      class="select-none rounded-t-[4px] border-b-[1px] py-[5px] text-center"
    >
      {{ column.name }} ({{ column.tasks.length }})
    </div>
    <div class="relative px-[8px]">
      <div
        v-if="isDraggingOver"
        class="absolute inset-0 bg-[#fff] opacity-90"
      ></div>
      <div
        v-if="!column.tasks.length"
        class="flex min-h-[100px] items-center justify-center"
      >
        No tasks found
      </div>
      <div v-else class="flex flex-col gap-[10px] py-[10px]">
        <template v-for="task in column.tasks" :key="task.id">
          <TaskItem :item="task"></TaskItem>
        </template>
      </div>
    </div>
  </div>
</template>
