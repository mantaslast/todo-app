import { defineStore } from "pinia";
import { httpProvider } from "@/core/httpProvider";

export const useTaskStore = defineStore("task", {
  state: () => ({
    isLoading: false,
    columns: [],
    authors: [],
    tasks: [],
    filters: {},
  }),

  actions: {
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
    setFilters(filterType, filterValue) {
      this.filters[filterType] = filterValue;
    },
  },
  getters: {
    taskData(state) {
      const { authors, columns, tasks } = state;

      const filteredTasks = applyFilters(tasks, state.filters);

      const authorMap = authors.reduce((acc, author) => {
        acc[author.id] = author;
        return acc;
      }, {});

      const mappedData = columns.map((column) => ({
        name: column,
        tasks: filteredTasks
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

const applyFilters = (tasks, filters) => {
  return Object.entries(filters).reduce(
    (filteredTasks, [filterType, filterValue]) => {
      if (!filterValue) return filteredTasks;

      const filterFunctions = {
        title: (task) =>
          task.title.toLowerCase().includes(filterValue.toLowerCase()),
        author_id: (task) => task.author_id === filterValue,
      };

      return filterFunctions[filterType]
        ? filteredTasks.filter(filterFunctions[filterType])
        : filteredTasks;
    },
    tasks,
  );
};
