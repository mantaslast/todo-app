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
    class="flex flex-col text-[#0a0a0a] border-dashed border-b-[1px] border-b-[#ff6650]"
  >
    <p>
      {{ item.title }}
    </p>
    <p>Created at {{ item.created_at }} by {{ author.display_name }}</p>
  </div>
</template>
