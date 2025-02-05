import "./notes.scss";
import { listImg, gridImg } from "../../assets/image";
import { useState } from "react";
import NotesItem from "./notes-item";
import { useSelector } from "react-redux";

function Notes() {
  const { words, lang } = useSelector(state => state.languages);
  const { seminars, search } = useSelector(state => state.seminars);
  const [grid, setGrid] = useState(false);
  
  // фильтрация семинаров в соответствии с данными поиска
  const list = !seminars ? [] : seminars?.filter(val => {
    let result = val.title.concat(val.description).toLowerCase().includes(search.toLowerCase())
    return result;
  });

  return (
    <>
      <div className="notes">
        <div className="container">
          <div className="notes__top">
            <h2 className="notes__title">{ list.length > 0 ? words.infobar[lang] : words.noinfobar[lang] }</h2>
            <button className="notes__btn" onClick={() => setGrid(!grid)}>
              <img src={!grid ? listImg : gridImg} alt="" />
              <span>{!grid ? words.list[lang] : words.grid[lang]}</span>
            </button>
          </div>
          <div className={`notes__list ${grid && "active"}`}>
            {list.map((note) => (
              <NotesItem grid={grid} note={note} key={note.id} /> // компонент карточки семинара
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
