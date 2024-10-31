import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [newFlight, setNewFlight] = useState({ from: '', to: '', departure: '', arrival: '', price: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_URL = 'http://localhost:5000/flights';

  useEffect(() => {
    // Mendapatkan data penerbangan dari backend
    axios.get(API_URL)
      .then(response => {
        setFlights(response.data);
      })
      .catch(error => {
        console.error('Ada kesalahan saat mengambil data penerbangan:', error);
      });
  }, []);

  const handleAddFlight = () => {
    if (newFlight.from.trim() === '' || newFlight.to.trim() === '' || newFlight.departure.trim() === '' || newFlight.arrival.trim() === '' || newFlight.price.trim() === '') {
      alert('Form tidak boleh kosong');
      return;
    }
    // Menambahkan penerbangan ke backend
    axios.post(API_URL, newFlight)
      .then(response => {
        setNewFlight({ from: '', to: '', departure: '', arrival: '', price: '' });
        setIsModalOpen(false);
        // Update list penerbangan setelah menambahkan data baru
        axios.get(API_URL)
          .then(response => {
            setFlights(response.data);
          })
          .catch(error => {
            console.error('Ada kesalahan saat mengambil data penerbangan:', error);
          });
      })
      .catch(error => {
        console.error('Ada kesalahan saat menambahkan penerbangan:', error.response.data);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Flights</h1>
      <button
        className="bg-blue-500 text-white p-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Tambah Penerbangan
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Tambah Penerbangan Baru</h2>
            <input
              type="text"
              className="border p-2 rounded w-full mb-4"
              placeholder="Masukkan asal"
              value={newFlight.from}
              onChange={(e) => setNewFlight({ ...newFlight, from: e.target.value })}
            />
            <input
              type="text"
              className="border p-2 rounded w-full mb-4"
              placeholder="Masukkan tujuan"
              value={newFlight.to}
              onChange={(e) => setNewFlight({ ...newFlight, to: e.target.value })}
            />
            <input
              type="datetime-local"
              className="border p-2 rounded w-full mb-4"
              placeholder="Masukkan waktu keberangkatan"
              value={newFlight.departure}
              onChange={(e) => setNewFlight({ ...newFlight, departure: e.target.value })}
            />
            <input
              type="datetime-local"
              className="border p-2 rounded w-full mb-4"
              placeholder="Masukkan waktu kedatangan"
              value={newFlight.arrival}
              onChange={(e) => setNewFlight({ ...newFlight, arrival: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 rounded w-full mb-4"
              placeholder="Masukkan harga"
              value={newFlight.price}
              onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded mr-2"
              onClick={handleAddFlight}
            >
              Tambah
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </button>
          </div>
        </div>
      )}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">From</th>
            <th className="py-2 px-4 border-b">To</th>
            <th className="py-2 px-4 border-b">Departure</th>
            <th className="py-2 px-4 border-b">Arrival</th>
            <th className="py-2 px-4 border-b">Price</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, i) => (
            <tr key={i}>
              <td className="py-2 px-4 border-b">{i+1}</td>
              <td className="py-2 px-4 border-b">{flight.from}</td>
              <td className="py-2 px-4 border-b">{flight.to}</td>
              <td className="py-2 px-4 border-b">{new Date(flight.departure).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{new Date(flight.arrival).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{flight.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Flights;
