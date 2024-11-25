<script setup>
import { useTaskStore } from "@/stores/task";
import { ref } from "vue";

const taskStore = useTaskStore();
const author = ref(null);
const taskTitle = ref("");

const handleSubmit = () => {
  const formData = {
    author_id: author.value,
    title: taskTitle.value,
  };
  taskStore.addTask(formData);
};
</script>

<template>
  <div class="max-w-[448px] mx-auto p-[24px] bg-white rounded-[8px] shadow-md">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-2">
        <label
          class="text-[#666] text-[12px] font-semibold leading-[1.5] block"
          for="author"
        >
          Author
        </label>
        <select
          id="author"
          v-model="author"
          name="author"
          class="p-[16px] rounded-[8px] bg-[#fff] border-[1px] border-[#CCC] w-full"
        >
          <option value="">Select an author</option>
          <template v-for="author in taskStore.authors">
            <option :value="author.id">{{ author.display_name }}</option>
          </template>
        </select>
      </div>

      <div class="space-y-2">
        <label
          class="text-[#666] text-[12px] font-semibold leading-[1.5] block"
          for="taskTitle"
        >
          Task Title
        </label>
        <input
          type="text"
          id="taskTitle"
          v-model="taskTitle"
          name="taskTitle"
          placeholder="Enter task title"
          required
          class="p-[16px] rounded-[8px] bg-[#fff] border-[1px] border-[#CCC] w-full"
        />
      </div>

      <button
        type="submit"
        class="w-full rounded-[8px] bg-[#7A5CFA] py-[10px] text-[#fff]"
      >
        Add Task
      </button>
    </form>
  </div>
</template>
