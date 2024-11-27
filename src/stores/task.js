import { defineStore } from "pinia";
import { httpProvider } from "@/core/httpProvider";

export const useTaskStore = defineStore("task", {
  state: () => ({
    isLoading: false,
    columns: [],
    authors: [],
    tasks: [],
  }),

  actions: {
    /**
     * TODO: Imitate a backend call here. Retrieve fake ID
     */
    async addTask(taskData) {
      this.isLoading = true;
      try {
        const newTask = await httpProvider.post("/api/task/create", taskData);
        this.tasks.unshift(newTask);

        return newTask;
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchTaskData() {
      this.isLoading = true;
      try {
        const { data } = await httpProvider.get("/data.json");
        this.columns = data.columns || [];
        this.authors = data.authors || [];
        this.tasks = data.tasks || [];
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    taskData(state) {
      const { authors, columns, tasks } = state;

      const authorMap = authors.reduce((acc, author) => {
        acc[author.id] = author;
        return acc;
      }, {});

      const mappedData = columns.map((column) => ({
        name: column,
        tasks: tasks
          .filter((task) => task.current_column === column)
          .map((task) => ({
            ...task,
            author: authorMap[task.author_id] || null,
          })),
      }));

      return mappedData;
    },
  },
});
