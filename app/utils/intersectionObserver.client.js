const io = new IntersectionObserver(function (entries) {
  entries.forEach(function ({ target: img }) {
    img.sizes = `${img.offsetWidth}px`;
  });
});
export default io;
