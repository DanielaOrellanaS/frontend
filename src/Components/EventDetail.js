import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MenuFooter from '../Components/MenuFooter';
import '../routes.css';
import { getEvents } from '../Api';

function EventDetail() {
    const { nameEvent } = useParams();
    const [eventDetails, setEventDetails] = useState([]);
    const [currencyImpactData, setCurrencyImpactData] = useState([]);
  
    useEffect(() => {
      fetchData(nameEvent);
    }, [nameEvent]);
    
    const fetchData = async (eventName) => {
        try {
        const data = await getEvents(); // Obtén los detalles del evento desde la API
        const filteredData = data.results.filter(event => event.evento === eventName);
        setEventDetails(filteredData);
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    const renderTable = () => {
        return (
        <table className="custom-table-notices">
            <thead>
            <tr>
                <th>Moneda</th>
                <th>Impacto</th>
            </tr>
            </thead>
            <tbody>
            {eventDetails.map((event, index) => (
                <tr key={index}>
                <td>{event.moneda}</td>
                <td>{event.impacto}</td>
                </tr>
            ))}
            </tbody>
        </table>
        );
    };
    const renderCurrencyImpactTable = () => {
        return (
          <table className="custom-table-notices">
            <thead>
              <tr>
                <th>Moneda</th>
                <th>Impacto</th>
              </tr>
            </thead>
            <tbody>
              {currencyImpactData.map((data, index) => (
                <tr key={index}>
                  <td>{data.moneda}</td>
                  <td>{data.impacto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      };
    
      return (
        <div>
          <h1>Detalle del Evento: {nameEvent}</h1>
          <div className="container-notices">
            <div className="table-container-notices">
              {eventDetails.length > 0 ? renderTable() : <p>No hay detalles disponibles para este evento.</p>}
            </div>
            <div className="currency-impact-table-container">
              <h2>Pares de Moneda e Impacto</h2>
              {currencyImpactData.length > 0 ? renderCurrencyImpactTable() : <p>No hay datos disponibles.</p>}
            </div>
            <MenuFooter />
          </div>
        </div>
      );
    }
    
    export default EventDetail;
