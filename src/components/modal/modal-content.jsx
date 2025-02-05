import { useSelector } from "react-redux";

const ModalContent = ({ info, setInfo }) => {
  const { words, lang } = useSelector((state) => state.languages);
  let newInfo = {...info};
  // получение данных даты
  const [day, month, year] = newInfo.date.split('.'); 
  // создание объекта даты
  let date = new Date(`${month}.${day}.${year}`);
  // подготовка даты для input
  date = date.toLocaleString().split('.').map((val, i)=> i == 2 ? val.substring(0, 4) : val).reverse().join('-');
  
  return (
    <div className="modal__content">
      <label>
        <span>{words.title[lang]}</span>
        <input
          type="text"
          placeholder={words.title[lang]}
          onChange={(e) => {
            newInfo.title = e.target.value;
            setInfo(newInfo)
          }}
          value={newInfo.title}
        />
      </label>
      <label>
        <span>{words.desc[lang]}</span>
        <textarea
          placeholder={words.desc[lang]}
          rows={3}
          onChange={(e) => {
            newInfo.description = e.target.value;
            setInfo(newInfo);
          }}
          value={newInfo.description}
        ></textarea>
      </label>
      <label>
        <span>{words.date[lang]}</span>
        <input
          type="date"
          placeholder={words.date[lang]}
          onChange={(e) => {
            const [year, month, day] = e.target.value.split('-');
            newInfo.date = `${day}.${month}.${year}`
            setInfo(newInfo)
          }}
          value={date}
        />
      </label>
      <label>
        <span>{words.time[lang]}</span>
        <input
          type="time"
          placeholder={words.time[lang]}
          onChange={(e) => {
            newInfo.time = e.target.value;
            setInfo(newInfo)
          }}
          value={newInfo.time}
        />
      </label>
      <label>
        <span>{words.photo[lang]}</span>
        <input
          type="text"
          placeholder={words.photo[lang]}
          onChange={(e) => {
            newInfo.photo = e.target.value;
            setInfo(newInfo)
          }}
          value={newInfo.photo}
        />
      </label>
    </div>
  );
};

export default ModalContent;
