<template>
  <teleport to="body">
    <div v-if="show" class="modal">
      <div class="modal__overlay" @click="$emit('close')"></div>

      <div class="modal__dialog">
        <div class="modal__content">
          <div class="modal__header">
            <span class="modal__title">{{ title }}</span>

            <span class="modal__close-btn" @click="$emit('close')">
              &times;
            </span>
          </div>

          <div class="modal__body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: "ModalWindow",
  emits: ["close"],

  props: {
    title: {
      type: String,
      default: "",
    },

    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
  }

  &__dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__content {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__header {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__close-btn {
    cursor: pointer;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.45);
  }

  &__body {
    padding: 20px;
  }
}
</style>
