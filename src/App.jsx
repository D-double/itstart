import Navbar from "./components/navbar";
import Notes from "./components/notes";
import Modal from "./components/modal";
import AddBtn from "./components/add-btn";
import { useEffect } from "react";
import { getSeminars } from "./store/features/seminars";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch()
  // получение всех семинаров при монтировании компонента
  useEffect(() => {
    dispatch(getSeminars())
  }, [])
  return (  
    <>
      <Navbar></Navbar> {/* шапка для поиска по семанарам и выбора языка */}
      <Notes></Notes> {/* список карточек семинаров */}
      <Modal></Modal> {/* модальное окно для изменения, удаления и добавления семинаров */}
      <AddBtn></AddBtn> {/* кнопка добавления семинара */}
    </>
  );
}

export default App;