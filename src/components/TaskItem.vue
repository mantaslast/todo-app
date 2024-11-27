<script setup>
import { computed } from "vue";

const props = defineProps({
  item: Object,
});

const author = computed(() => {
  return props.item.author ? props.item.author : {};
});
</script>

<template>
  <div
    class="flex flex-col border-b-[1px] border-dashed border-[#000] p-[8px] text-[#0a0a0a]"
  >
    <p class="mb-[4px] text-[18px] leading-[normal]">
      {{ item.title }}
    </p>
    <p class="text-[14px]">
      Created at {{ item.created_at }} by {{ author.display_name }}
    </p>
  </div>
</template>
