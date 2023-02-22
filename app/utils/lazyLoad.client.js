const rt = window.devicePixelRatio || 1;
const io = new IntersectionObserver(
  function (entries) {
    entries.forEach(function ({ target: img, intersectionRatio: ir }) {
      if (ir > 0) {
        const w = rt * img.offsetWidth;
        img.sizes = `${w}px`;
      }
    });
  },
);
export default io;
