import { TASK_STATUS, TASK_STATUS_COLOR } from "@/constants";

export const getColumnColor = (columnName) => {
  // Find the status key (TODO, IN_PROGRESS, etc.) that matches the column name
  const statusKey = Object.entries(TASK_STATUS).find(
    ([_, value]) => value === columnName,
  )?.[0];

  // Return the corresponding color or a default color if not found
  return statusKey ? TASK_STATUS_COLOR[statusKey] : "#A9A9A9";
};
