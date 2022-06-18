import nextId from 'react-id-generator'; // генерация случайного ID
import moment from 'moment'; // библиотека moment для работы с датой
import 'moment/locale/ru';
import PropTypes from 'prop-types';
import './Calendar.css';

moment.locale('ru');

function Calendar(props) {
  const date = moment(props.date);

  const [currentDay, currentMonth, currentYear] = date.format('LL').split(' '); //деструктуризация переданной в функцию даты

  const daysInPreviousMonth = moment(
    new Date(date.year(), date.month() - 1)
  ).daysInMonth(); //количество дней в предыдущем месяце

  const daysInCurrentMonth = moment(
    new Date(date.year(), date.month())
  ).daysInMonth(); // количество дней в текущем месяце

  const indexOfFirstDayInMonth = moment(
    new Date(date.year(), date.month())
  ).isoWeekday(); //индекс 1-го числа текущего месяца (пн-1, вт-2, ср-3, чт-4, пт-5, сб-6, вс-7)

  const rows = 5; // количество строк в таблице календаря
  const cols = 7; // количество столбцов в таблице календаря

  const daysFromPreviuosMonth = (indexOfFirstDayInMonth + rows + 1) % cols; //количество дней из "старого месяца", предшествующих первому дню из "нового" месяца

  let tableBody = []; // массив для таблицы с календарем
  let tableRow; // массив для отдельной строки
  let startDayOfMonth = 1; // число, с которго начинается нумерация в каждом новом месяце
  let count = 1 - daysFromPreviuosMonth; // установка начального счетчика для последующего заполнения таблицы с календарем

  for (let row = 0; row < rows; row++) {
    tableRow = [];
    for (let col = 0; col < cols; col++) {
      if (count <= 0) {
        tableRow.push(
          <td key={nextId()} className='ui-datepicker-other-month'>
            {count + daysInPreviousMonth}
          </td>
        );
      } else if (count === Number(currentDay)) {
        tableRow.push(
          <td key={nextId()} className='ui-datepicker-today'>
            {count}
          </td>
        );
      } else if (count > 0 && count <= daysInCurrentMonth) {
        tableRow.push(<td key={nextId()}>{count}</td>);
      } else if (count > daysInCurrentMonth) {
        tableRow.push(
          <td key={nextId()} className='ui-datepicker-other-month'>
            {startDayOfMonth++}
          </td>
        );
      }

      count++;
    }
    tableBody.push(<tr key={nextId()}>{tableRow}</tr>);
  }
  return (
    <div className='ui-datepicker'>
      <div className='ui-datepicker-material-header'>
        <div className='ui-datepicker-material-day'>{date.format('dddd')}</div>
        <div className='ui-datepicker-material-date'>
          <div className='ui-datepicker-material-day-num'>{currentDay}</div>
          <div className='ui-datepicker-material-month'>{currentMonth}</div>
          <div className='ui-datepicker-material-year'>{currentYear}</div>
        </div>
      </div>
      <div className='ui-datepicker-header'>
        <div className='ui-datepicker-title'>
          <span className='ui-datepicker-month'>{date.format('MMMM')}</span>
          &nbsp;
          <span className='ui-datepicker-year'>{currentYear} г.</span>
        </div>
      </div>
      <table className='ui-datepicker-calendar'>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className='ui-datepicker-week-end' />
          <col className='ui-datepicker-week-end' />
        </colgroup>
        <thead>
          <tr>
            <th scope='col' title='Понедельник'>
              Пн
            </th>
            <th scope='col' title='Вторник'>
              Вт
            </th>
            <th scope='col' title='Среда'>
              Ср
            </th>
            <th scope='col' title='Четверг'>
              Чт
            </th>
            <th scope='col' title='Пятница'>
              Пт
            </th>
            <th scope='col' title='Суббота'>
              Сб
            </th>
            <th scope='col' title='Воскресенье'>
              Вс
            </th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
}

Calendar.propTypes = {
  date: PropTypes.object.isRequired,
};

export default Calendar;
