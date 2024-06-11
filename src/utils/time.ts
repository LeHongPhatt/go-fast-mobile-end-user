const getDateInMonth = (currentYear, currentMonth) =>
  new Date(currentYear, currentMonth, 0).getDate();

const genValue = (start, end) => {
  return Array(end - start + 1)
    .fill('')
    .map((v, idx) =>
      start + idx < 10 ? `0${start + idx}` : (start + idx).toString(),
    );
};
export { getDateInMonth, genValue };
