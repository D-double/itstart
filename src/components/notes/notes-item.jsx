import { editImg, deleteImg } from "../../assets/image";
import { setSeminarInfo } from "../../store/features/seminars";
import { useDispatch, useSelector } from "react-redux";

// компонент карточки семинара
function NotesItem({ grid, note }) {
  const dispatch = useDispatch();
  const { words, lang } = useSelector((state) => state.languages);
  const { statusList } = useSelector((state) => state.seminars);

  return (
    <div className="card" >
      <img className="card__img" src={note.photo} alt={note.title} />
      <div>
        <div className={grid ? "card__content" : ""}>
          <h3 className="card__title">{note.title}</h3>
          <p className="card__date">
            {note.date} / {note.time}
          </p>
        </div>
        <p className="card__desc">{note.description}</p>
        <div className="card__controls">
          <button
            className="card__btn"
            onClick={() => dispatch(setSeminarInfo({id: note.id, status: statusList.edit}))}
          >
            <img src={editImg} alt="" />
            <span>{words.editbtn[lang]}</span>
          </button>
          <button
            className="card__btn card__btn_red"
            onClick={() => dispatch(setSeminarInfo({id: note.id, status: statusList.del}))}
          >
            <img src={deleteImg} alt="" />
            <span>{words.deletid[lang]}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotesItem;
