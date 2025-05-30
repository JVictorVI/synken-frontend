export const sortMessagesByDate = (msgArray) => {
  return [...msgArray].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
};
