<script setup>
import { useTaskStore } from "@/stores/task";
import { reactive, watch } from "vue";

const taskStore = useTaskStore();

const initialFilters = {
  author_id: "",
  title: "",
};

const filters = reactive({ ...initialFilters });

watch(filters, (currentFilters) => {
  for (const [filterKey, filterValue] of Object.entries(currentFilters)) {
    updateFilters(filterKey, filterValue);
  }
});

const updateFilters = (filterType, value) => {
  taskStore.setFilters(filterType, value);
};

const resetFilters = () => {
  Object.assign(filters, initialFilters);
};
</script>

<template>
  <div class="flex items-center gap-[20px]">
    <input
      type="text"
      v-model="filters.title"
      placeholder="Search task title"
      required
      class="rounded-[8px] border-[1px] border-[#CCC] bg-[#fff] p-[16px]"
    />

    <select
      id="author"
      v-model="filters.author_id"
      name="author"
      required
      class="rounded-[8px] border-[1px] border-[#CCC] bg-[#fff] p-[16px]"
    >
      <option value="" disabled>Filter by author</option>
      <template v-for="author in taskStore.authors">
        <option :value="author.id">{{ author.display_name }}</option>
      </template>
    </select>

    <div @click="resetFilters" class="cursor-pointer p-[8px] text-[12px]">
      Clear
    </div>
  </div>
</template>
