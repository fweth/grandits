const rt = window.devicePixelRatio;
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function ({ target: img }) {
    img.sizes = `${rt *  img.offsetWidth}px`;
  });
});
export default io;
