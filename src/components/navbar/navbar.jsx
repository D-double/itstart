import { useState } from "react";
import { searchImg, backImg, clearImg } from "../../assets/image";
import "./navbar.scss";
import Transition from "../ui";
import { setLang } from "../../store/features/languages";
import { setSearch } from "../../store/features/seminars";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const { words, lang } = useSelector(state => state.languages)
  const { search } = useSelector(state => state.seminars)
  const [hide, setHide] = useState(true);
  
  // выход из режима поиска
  const hideHandle = () => {
    setHide(!hide);
    dispatch(setSearch(''));
  };

  // сброс данных поиска
  const clearHandle = () => {
    dispatch(setSearch(''));
  };

  // установка значения поиска 
  const searchHandle = (e) => {
    dispatch(setSearch(e.target.value));
  };

  // изменения языка
  const langHandle = (lang) => {
    dispatch(setLang(lang));
  };

  return (
    <header className="header">
      <Transition className="header__content" hide={!hide}>
        { 
          lang == 'ru' ? 
          <button className="header__lang" onClick={()=>langHandle('en')}>EN</button> :
          <button className="header__lang" onClick={()=>langHandle('ru')}>RU</button>
        }
        <h1 className="header__title">{words.appbartitle[lang]}</h1>
        <button className="header__search" onClick={hideHandle}>
          <img src={searchImg} alt="" />
        </button>
      </Transition>
      <Transition className="header__form" hide={hide}>
        <button className="header__back" onClick={hideHandle}>
          <img src={backImg} alt="" />
        </button>
        <input
          type="text"
          className="header__input container"
          placeholder={words.appbarseacrch[lang]}
          onChange={searchHandle}
          value={search}
        />
        <button className="header__close" onClick={clearHandle}>
          <img src={clearImg} alt="" />
        </button>
      </Transition>
    </header>
  );
}
export default Navbar;
