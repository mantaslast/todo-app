<script setup>
import { useTaskStore } from "@/stores/task";
import { reactive } from "vue";

const taskStore = useTaskStore();

const initialTaskFormState = {
  author: "",
  taskTitle: "",
};

const taskForm = reactive({ ...initialTaskFormState });

const handleSubmit = async () => {
  const formData = {
    author_id: taskForm.author,
    title: taskForm.taskTitle,
  };

  try {
    await taskStore.addTask(formData);
  } catch (e) {
    console.error(e);
  } finally {
    resetTaskForm();
  }
};

const resetTaskForm = () => {
  Object.assign(taskForm, initialTaskFormState);
};
</script>

<template>
  <div class="mx-auto max-w-[448px] rounded-[8px] bg-white p-[24px] shadow-md">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-2">
        <label
          class="block text-[12px] font-semibold leading-[1.5] text-[#666]"
          for="author"
        >
          Author
        </label>
        <select
          id="author"
          v-model="taskForm.author"
          name="author"
          required
          class="w-full rounded-[8px] border-[1px] border-[#CCC] bg-[#fff] p-[16px]"
        >
          <option value="" disabled>Select an author</option>
          <template v-for="author in taskStore.authors">
            <option :value="author.id">{{ author.display_name }}</option>
          </template>
        </select>
      </div>

      <div class="space-y-2">
        <label
          class="block text-[12px] font-semibold leading-[1.5] text-[#666]"
          for="taskTitle"
        >
          Task Title
        </label>
        <input
          type="text"
          id="taskTitle"
          v-model="taskForm.taskTitle"
          name="taskTitle"
          placeholder="Enter task title"
          required
          class="w-full rounded-[8px] border-[1px] border-[#CCC] bg-[#fff] p-[16px]"
        />
      </div>

      <button
        :disabled="taskStore.isLoading"
        type="submit"
        class="w-full rounded-[8px] bg-[#7A5CFA] py-[10px] text-[#fff]"
      >
        Add Task
      </button>
    </form>
  </div>
</template>
