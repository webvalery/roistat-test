<template>
  <tr :class="`tree-table__row level-${level}`" :data-row-key="node.id">
    <td class="tree-table__cell">
      <span
        :style="{ 'padding-left': indentLevel + 'px' }"
        class="tree-table__indent"
      ></span>

      <button
        type="button"
        :class="expandBtnClasses"
        :aria-label="isExpanded ? 'Свернуть строку' : 'Развернуть строку'"
        :aria-expanded="isExpanded ? true : false"
        @click="toggleRowExpand"
      ></button>
      {{ node.name }}
    </td>

    <td>{{ node.phone }}</td>
  </tr>

  <template v-if="!isCollapsed">
    <TreeNode
      v-for="child in sortedChildren"
      :key="child.id"
      :node="child"
      :level="level + 1"
      :sortColumn="sortColumn"
    />
  </template>
</template>

<script>
export default {
  props: {
    node: {
      type: Object,
      default: () => ({}),
    },

    level: {
      type: Number,
      default: 1,
    },

    sortColumn: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      isCollapsed: true,
    };
  },

  computed: {
    sortedChildren() {
      if (!this.node.children) {
        return [];
      }
      const sortedChildren = [...this.node.children];
      if (
        this.sortColumn.sorter &&
        typeof this.sortColumn.sorter === "function"
      ) {
        sortedChildren.sort(this.sortColumn.sorter);
      }
      return sortedChildren;
    },

    indentLevel() {
      return (this.level - 1) * 15;
    },

    isExpanded() {
      return !this.isCollapsed && this.node.children !== null;
    },

    expandBtnClasses() {
      return {
        "tree-table__expand": true,
        "tree-table__expand--collapsed":
          this.isCollapsed && this.node.children !== null,
        "tree-table__expand--expanded": this.isExpanded,
        "tree-table__expand--spaced": this.node.children === null,
      };
    },
  },

  methods: {
    toggleRowExpand() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-table {
  td {
    text-align: start;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
  }

  &__indent {
    height: 1px;
    float: left;
  }

  &__expand {
    margin-right: 8px;
    color: inherit;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    float: left;
    width: 17px;
    height: 17px;
    padding: 0;
    line-height: 17px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    user-select: none;

    &:hover {
      color: #69b1ff;
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      background: currentcolor;
      transition: transform 0.3s ease-out;
    }

    &::before {
      top: 7px;
      inset-inline-end: 3px;
      inset-inline-start: 3px;
      height: 1px;
    }

    &::after {
      top: 3px;
      bottom: 3px;
      inset-inline-start: 7px;
      width: 1px;
      transform: rotate(90deg);
    }

    &--collapsed {
      &::before {
        transform: rotate(-180deg);
      }

      &::after {
        transform: rotate(0deg);
      }
    }

    &--spaced {
      background: 0 0;
      border: 0;
      visibility: hidden;
    }
  }
}
</style>
