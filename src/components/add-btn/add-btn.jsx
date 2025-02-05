import "./add-btn.scss";
import { editImg } from "../../assets/image";
import { setAddStatus } from "../../store/features/seminars";
import { useDispatch } from "react-redux";

function AddBtn() {
  const dispatch = useDispatch();
  // вызов модального окна для добавления семинара 
  const addHandle = () => {
    dispatch(setAddStatus());
  };
  return (
    <button className="add__btn" onClick={addHandle}>
      <img src={editImg} alt="" />
    </button>
  );
}

export default AddBtn;
