import { isRef, onMounted, onUnmounted } from "vue";

export function useDraggable(elementRef, data) {
  const onDragStart = (event) => {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    const dragData = isRef(data)
      ? JSON.stringify(data.value)
      : JSON.stringify(data);

    event.dataTransfer.setData("text/plain", dragData);
  };

  onMounted(() => {
    if (elementRef.value) {
      elementRef.value.setAttribute("draggable", "true");
      elementRef.value.addEventListener("dragstart", onDragStart);
    }
  });

  onUnmounted(() => {
    if (elementRef.value) {
      elementRef.value.removeAttribute("draggable");
      elementRef.value.removeEventListener("dragstart", onDragStart);
    }
  });
}
