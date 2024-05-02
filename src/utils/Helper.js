// Сортировка по алфавиту по возрастанию
function nameSorter(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}

// Рекурсивный поиск родителя элемента по его idParent
function findParent(items, idParent) {
  const findParentRecursive = (items) => {
    for (const item of items) {
      if (item.id === idParent) {
        return item;
      }
      if (item.children) {
        const parent = findParentRecursive(item.children);
        if (parent) {
          return parent;
        }
      }
    }
    return null;
  };

  return findParentRecursive(items);
}

// Преобразование древовидной структуры данных в одномерный массив
function flattenItemsParent(itemsParent) {
  const flatten = [];
  const traverse = (items) => {
    for (const item of items) {
      flatten.push(item);
      if (item.children) {
        traverse(item.children);
      }
    }
  };
  traverse(itemsParent);
  return flatten;
}

export { nameSorter, findParent, flattenItemsParent };
