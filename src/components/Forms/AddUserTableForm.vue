<template>
  <form @submit.prevent="submitForm" class="add-user-table">
    <div class="add-user-table__group">
      <label for="name" class="add-user-table__label">Имя:</label>

      <input
        type="text"
        id="name"
        v-model="formData.name"
        class="add-user-table__input"
        required
      />
    </div>

    <div class="add-user-table__group">
      <label for="phone" class="add-user-table__label">Телефон:</label>

      <input
        type="text"
        id="phone"
        v-model="formData.phone"
        class="add-user-table__input"
      />
    </div>

    <div class="add-user-table__group">
      <label for="select" class="add-user-table__label">Начальник:</label>

      <select
        id="select"
        v-model="formData.idParent"
        class="add-user-table__input"
      >
        <option :value="null">Без начальника</option>

        <option
          v-for="option in flattenItemsParent"
          :key="option.id"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </select>
    </div>

    <div class="add-user-table__action">
      <button type="submit" class="add-user-table__btn action-btn">
        Сохранить
      </button>
    </div>
  </form>
</template>

<script>
import { flattenItemsParent } from "@/utils/Helper.js";

export default {
  name: "AddUserTable",
  emits: ["submitted"],

  data() {
    return {
      formData: {
        id: Math.floor(Math.random() * Date.now()),
        name: "",
        phone: "",
        idParent: null,
        children: null,
      },
    };
  },

  props: {
    itemsParent: {
      type: Array,
      required: true,
    },
  },

  computed: {
    flattenItemsParent() {
      return flattenItemsParent(this.itemsParent);
    },
  },

  methods: {
    submitForm() {
      this.$emit("submitted", this.formData);
      this.formData = {
        id: Math.floor(Math.random() * Date.now()),
        name: "",
        phone: "",
        idParent: null,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.add-user-table {
  width: 350px;

  &__label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  &__group {
    margin-bottom: 20px;
  }

  &__input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  &__action {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
