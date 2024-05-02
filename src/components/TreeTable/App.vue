<template>
  <table class="tree-table">
    <colgroup>
      <col
        v-for="(col, index) in columns"
        :key="index"
        :style="col.width ? `width: ${col.width}` : ''"
      />
    </colgroup>

    <thead class="tree-table__thead">
      <tr>
        <th
          v-for="column in columns"
          :key="column.dataIndex"
          :class="{
            'tree-table__cell': true,
            'tree-table__has-sort':
              column.sorter && typeof column.sorter === 'function',
            active: sortColumn.dataIndex === column.dataIndex,
          }"
          @click="sortByColumn(column)"
        >
          <span class="tree-table__column-title">
            {{ column.title }}
          </span>
        </th>
      </tr>
    </thead>

    <tbody class="tree-table__tbody">
      <TreeNode
        v-for="item in sortedItems"
        :key="item.id"
        :node="item"
        :sortColumn="sortColumn"
      />
    </tbody>
  </table>
</template>

<script>
import TreeNode from "./TreeNode.vue";
export default {
  name: "TreeTable",
  components: {
    TreeNode,
  },

  props: {
    columns: {
      type: Array,
      default: () => [],
    },

    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      sortColumn: {},
    };
  },

  computed: {
    sortedItems() {
      if (!this.sortColumn.dataIndex) {
        return this.items;
      }
      const sortedItems = [...this.items];
      if (
        this.sortColumn.sorter &&
        typeof this.sortColumn.sorter === "function"
      ) {
        sortedItems.sort(this.sortColumn.sorter);
      }

      return sortedItems;
    },
  },

  methods: {
    sortByColumn(column) {
      if (column.sorter && typeof column.sorter === "function") {
        this.sortColumn.dataIndex === column.dataIndex
          ? (this.sortColumn = {})
          : (this.sortColumn = column);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-table {
  table-layout: auto;
  width: 100%;
  text-align: start;
  border-radius: 8px 8px 0 0;
  border-collapse: separate;
  border-spacing: 0;

  th {
    position: relative;
    text-align: start;
    padding: 16px;
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
  }

  &__cell:first-child {
    border-start-start-radius: 8px;
  }

  &__cell:last-child {
    border-start-end-radius: 8px;
  }

  &__has-sort {
    cursor: pointer;
    transition: all 0.3s;
    outline: none;

    &:hover {
      background: #f0f0f0;
    }

    &.active {
      background: #f0f0f0;
    }
  }
}
</style>
