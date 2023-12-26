import React, { useCallback, useEffect, useState } from 'react';
import MenuFooter from '../Components/MenuFooter';
import '../routes.css';
import { economicCalendar } from '../constants';
import { getEvents } from '../Api'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const desiredHeaders = [
  'fecha',
  'hora',
  'fecha_falta',
  'moneda',
  'evento',
  'impacto',
  'precedente',
  'consenso',
  'actual',
];

function Notices() {
  const [eventsTableData, setEventsTableData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleButtonClick = () => {
    window.open(economicCalendar, '_blank');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchData(date);
  };

  const isEventPassed = (eventTime) => {
    const currentDateTime = new Date();
    const eventDateTime = new Date(eventTime);

    if (isNaN(eventDateTime.getTime())) {
      console.error('Invalid time value:', eventTime);
      return false;
    }

    return eventDateTime < currentDateTime;
  };

  const fetchData = useCallback(async (date) => {
    try {
      const formattedDate = date ? format(date, 'yyyy-MM-dd') : null;
      const data = await getEvents(formattedDate);
      setEventsTableData(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setEventsTableData]);

  useEffect(() => {
    fetchData(selectedDate);
    const intervalId = setInterval(() => {
      fetchData(selectedDate);
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [selectedDate, fetchData]);

  return (
    <div>
      <h1>Noticias</h1>
      <div className='container-button'>
        <button className="custom-button-notices custom-centered-button" onClick={handleButtonClick}>
          Calendario Económico
        </button>
      </div>
      <div className="date-picker-container">
        <div className="label-container">
          <label>Seleccionar fecha: </label>
        </div>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          wrapperClassName="datePicker"
        />
      </div>
      <div className="container-notices">
        <div className="table-container-notices">
          <table className="custom-table-notices">
            <thead>
              <tr>
                {desiredHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
                <th>Check</th>
              </tr>
            </thead>
            <tbody>
              {eventsTableData.length === 0 ? ( 
                <tr>
                  <td colSpan={desiredHeaders.length + 1} className="no-data-message">
                    No hay datos disponibles para esta fecha.
                  </td>
                </tr>
              ) : (
                eventsTableData.map((rowData, index) => (
                  <tr key={index}>
                    {desiredHeaders.map((header, index) => (
                      <td key={index}>
                        {header === 'evento' ? (
                          <Link to={`/detalle-evento/${rowData['evento']}`} className="link-white">
                            {rowData[header]}
                          </Link>
                        ) : (
                          rowData[header] || '-'
                        )}
                      </td>
                    ))}
                    <td>
                      {isEventPassed(rowData['fecha'] + ' ' + rowData['hora']) ? (
                        <div className="check-green">✓</div>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="space"></div>
        <MenuFooter />
      </div>
    </div>
  );
}

export default Notices;
