<template>
  <main class="task-view-main">
    <section class="table-section">
      <div class="container">
        <div class="table-section__head">
          <span class="table-section__pretitle">Roistat</span>
          <h1 class="table-section__title">Техническое задание</h1>
        </div>

        <div class="table-section__btn-wrap">
          <button
            class="table-section__add-btn action-btn"
            @click="showModal = true"
          >
            Добавить
          </button>
        </div>

        <TreeTable :columns="columns" :items="itemsTable"></TreeTable>
      </div>
    </section>

    <WindowModal
      title="Добавление пользователя"
      :show="showModal"
      @close="showModal = false"
    >
      <AddUserTableForm :itemsParent="itemsTable" @submitted="addNewUser" />
    </WindowModal>
  </main>
</template>

<script>
import { nameSorter, findParent } from "@/utils/Helper.js";
import TreeTable from "@/components/TreeTable/App.vue";
import WindowModal from "@/components/WindowModal.vue";
import AddUserTableForm from "@/components/Forms/AddUserTableForm.vue";

export default {
  name: "TaskView",
  components: { TreeTable, WindowModal, AddUserTableForm },

  data() {
    return {
      showModal: false,
      columns: [
        {
          title: "Имя",
          dataIndex: "name",
          width: "30%",
          sorter: nameSorter,
        },
        {
          title: "Телефон",
          dataIndex: "phone",
        },
      ],
      itemsTable: [],
    };
  },

  mounted() {
    const savedItems = localStorage.getItem("itemsTable");
    if (savedItems) {
      this.itemsTable = JSON.parse(savedItems);
    }
  },

  methods: {
    addNewUser(newUser) {
      if (newUser.idParent === null) {
        newUser.children = null;
        this.itemsTable.push(newUser);
      } else {
        const parent = findParent(this.itemsTable, newUser.idParent);

        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(newUser);
        } else {
          this.itemsTable.push(newUser);
        }
      }

      localStorage.setItem("itemsTable", JSON.stringify(this.itemsTable));
      this.showModal = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.table-section {
  min-height: 100vh;
  background: url("../assets/images/background.png");
  padding-top: 100px;

  &__head {
    margin-bottom: 25px;
  }

  &__pretitle {
    display: block;
    font-size: 24px;
    margin-bottom: 5px;
  }

  &__title {
    font-size: 48px;
    font-weight: 900;
  }

  &__btn-wrap {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-bottom: 50px;
  }
}
</style>
