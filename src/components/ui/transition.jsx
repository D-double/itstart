import { useEffect, useRef } from "react";

function Transition({ children, className, hide, onClick }) {
  const elem = useRef(null);
  useEffect(() => {
    if (elem && hide) {
      elem.current.style.display = "none";
    }
  }, []);

  useEffect(() => {
    if (elem && hide) {
      elem.current.classList.add(`${className}_hide`);
      setTimeout(() => {
        elem.current.style.display = "none";
      }, 500);
    } else if (elem && !hide) {
      elem.current.removeAttribute("style");
      setTimeout(() => {
        elem.current.classList.remove(`${className}_hide`);
      }, 500);
    }
  });
  return (
<div ref={elem} className={className} onMouseDown={onClick}>
  {children}
</div>
  );
}

export default Transition;
