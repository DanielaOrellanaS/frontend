import React, { useEffect, useState } from 'react';
import MenuFooter from '../Components/MenuFooter';
import '../routes.css';
import { economicCalendar } from '../constants';
import { getEvents, getEventsPerDay } from '../Api';
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
  const [currencyImpactData, setCurrencyImpactData] = useState([]);

  const handleButtonClick = () => {
    window.open(economicCalendar, '_blank');
  };

  const extractCurrencyImpactData = (data) => {
    const extractedData = data.map(event => ({
      moneda: event.moneda,
      impacto: event.impacto
    }));
    setCurrencyImpactData(extractedData);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : null;
    fetchData(formattedDate);
  };

  const fetchData = async () => {
    try {
      const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
      const data = formattedDate ? await getEventsPerDay(formattedDate) : await getEvents();
      setEventsTableData(data.results);
      extractCurrencyImpactData(data.results); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };  

  useEffect(() => {
    fetchData(); 
    const intervalId = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [selectedDate]); 

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
              </tr>
            </thead>
            <tbody>
            {eventsTableData.map((rowData, index) => (
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
              </tr>
            ))}
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
