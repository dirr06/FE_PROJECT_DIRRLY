import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const API_URL = 'http://localhost:5000/tickets';

  useEffect(() => {
    // Mendapatkan data tiket dari backend
    axios.get(API_URL)
      .then(response => {
        setTickets(response.data);
      })
      .catch(error => {
        console.error('Ada kesalahan saat mengambil data tiket:', error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Booking UID</th>
            <th className="py-2 px-4 border-b">Booking Number</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, i) => (
            <tr key={i}>
              <td className="py-2 px-4 border-b">{i+1}</td>
              <td className="py-2 px-4 border-b">{ticket.booking_uid}</td>
              <td className="py-2 px-4 border-b">{ticket.bookingId2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tickets;