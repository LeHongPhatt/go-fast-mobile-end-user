export const checkItemExistsByKey = (arr, keyCompare, key) => {
  try {
    return arr.filter(c => c?.[key] === keyCompare).length;
  } catch (error) {
    return false;
  }
};
