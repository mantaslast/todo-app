<script setup>
import { computed, ref } from "vue";
import { useDraggable } from "@/composables/useDraggable";

const props = defineProps({
  item: Object,
});

const taskItemRef = ref(null);

useDraggable(taskItemRef, props.item);

const author = computed(() => {
  return props.item.author ? props.item.author : {};
});
</script>

<template>
  <div
    ref="taskItemRef"
    class="flex flex-col rounded-[6px] border-[1px] border-dashed border-[#989a9e] p-[8px] text-[#0a0a0a]"
  >
    <p class="mb-[8px] text-[15px] leading-[normal]">
      {{ item.title }}
    </p>
    <p class="text-[12px]">Created at {{ item.date_created }}</p>
    <p class="text-[12px]">Created by {{ author.display_name }}</p>
  </div>
</template>
