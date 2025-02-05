import { useState, useEffect } from "react";
import "./modal.scss";
import Transition from "../ui";
import { useDispatch, useSelector } from "react-redux";
import {
  addSeminar,
  changeSeminar,
  setModal,
  closeModal,
  delSeminar,
} from "../../store/features/seminars";
import ModalContent from "./modal-content";

function Modal() {
  const dispatch = useDispatch();
  const { words, lang } = useSelector((state) => state.languages);
  const { currentId, seminarInfo, modal, modalStatus, statusList } = useSelector((state) => state.seminars);
  
  // базовые данные для добавления семинара
  const baseInfo = {
    "id": parseInt(currentId),
    "title": "",
    "description": "",
    "date": "",
    "time": "",
    "photo": ""
  }
  const [info, setInfo] = useState(baseInfo);
  
  useEffect(() => {
    if (seminarInfo) {
      setInfo(seminarInfo);
    } else {
      setInfo(baseInfo);
    }
  }, [modal]);

  // вызов асинхронного метода для добавления семинара 
  const addHandle = () => {
    dispatch(addSeminar(info));
  };

  // вызов асинхронного метода для изменения семинара 
  const changeHandle = () => {
    dispatch(changeSeminar(info));
  };

  // вызов асинхронного метода для удаления семинара 
  const deleteHandle = () => {
    dispatch(delSeminar());
  };

  // отмена выполения действий 
  const cancelHandle = () => {
    dispatch(closeModal());
  };

  return (
    <Transition
      className={"modal"}
      hide={!modal}
      onClick={() => dispatch(setModal(false))}
    >
      <div className="modal__form" onMouseDown={(e) => e.stopPropagation()}>
        <h3 className="modal__title">
          {
            modalStatus == statusList.edit ? words.titlewindowedit[lang] : 
            modalStatus == statusList.add ? words.titlewindow[lang] : 
            words.titlewindowdel[lang] + ` "${seminarInfo?.title}"`
          }
        </h3>
        {modalStatus != statusList.del ? (
          <ModalContent
            info={info}
            setInfo={setInfo}
          /> /* компонент с полями модального окна */
        ) : (
          ""
        )}

        <div className="modal__controls">
          <button
            onClick={cancelHandle}
            className="modal__btn modal__btn_red"
          >
            {words.closebtn[lang]}
          </button>
            {
              modalStatus == statusList.edit ? (
              <button className="modal__btn" onClick={changeHandle}>
                {words.editwindowbtn[lang]}
              </button> ) :
               modalStatus == statusList.add ? (
              <button className="modal__btn" onClick={addHandle}>
                {words.addbtn[lang]}
              </button>) : (
              <button className="modal__btn" onClick={deleteHandle}> 
                {words.deletid[lang]}
              </button>)
              }
        </div>
      </div>
    </Transition>
  );
}

export default Modal;
