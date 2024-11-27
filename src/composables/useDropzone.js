import { ref, onMounted, onUnmounted } from "vue";

export function useDropzone(elementRef) {
  const isDraggingOver = ref(false);
  const dragData = ref(null);
  const dropCallback = ref(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragLeave = (event) => {
    const relatedTarget = event.relatedTarget;
    if (elementRef.value && !elementRef.value.contains(relatedTarget)) {
      isDraggingOver.value = false;
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    isDraggingOver.value = false;
    const data = event.dataTransfer.getData("text/plain");
    const parsedData = JSON.parse(data);
    dragData.value = parsedData;

    if (dropCallback.value) {
      dropCallback.value(parsedData);
    }
  };

  const handleDragEnter = () => {
    isDraggingOver.value = true;
  };

  const onDrop = (callback) => {
    dropCallback.value = callback;
  };

  onMounted(() => {
    if (elementRef.value) {
      elementRef.value.addEventListener("dragover", handleDragOver);
      elementRef.value.addEventListener("dragleave", handleDragLeave);
      elementRef.value.addEventListener("drop", handleDrop);
      elementRef.value.addEventListener("dragenter", handleDragEnter);
    }
  });

  onUnmounted(() => {
    if (elementRef.value) {
      elementRef.value.removeEventListener("dragover", handleDragOver);
      elementRef.value.removeEventListener("dragleave", handleDragLeave);
      elementRef.value.removeEventListener("drop", handleDrop);
      elementRef.value.removeEventListener("dragenter", handleDragEnter);
    }
  });

  return {
    isDraggingOver,
    onDrop,
    elementRef,
  };
}
