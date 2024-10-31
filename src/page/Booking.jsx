import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ name: '', email: '', seat: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_URL = 'http://localhost:5000/bookings';

  useEffect(() => {
    // Placeholder untuk mendapatkan data booking dari backend
    axios.get(API_URL)
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Ada kesalahan saat mengambil data booking:', error);
      });
  }, []);

  const handleAddBooking = () => {
    if (newBooking.name.trim() === '' || newBooking.email.trim() === '' || newBooking.seat.trim() === '') {
      alert('Form tidak boleh kosong');
      return;
    }
    // Placeholder untuk menambahkan booking ke backend
    axios.post(API_URL, newBooking)
      .then(response => {
        setNewBooking({ name: '', email: '', seat: '' });
        setIsModalOpen(false);
        // Update list booking setelah menambahkan data baru
        axios.get(API_URL)
          .then(response => {
            setBookings(response.data);
          })
          .catch(error => {
            console.error('Ada kesalahan saat mengambil data booking:', error);
          });
      })
      .catch(error => {
        console.error('Ada kesalahan saat menambahkan booking:', error.response.data);
      });
  };

  const handleDeleteBooking = (id) => {
    // Placeholder untuk menghapus booking dari backend
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setBookings(bookings.filter(booking => booking.id !== id));
      })
      .catch(error => {
        console.error('Ada kesalahan saat menghapus booking:', error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Booking</h1>
      <button
        className="bg-blue-500 text-white p-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Tambah Booking
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Tambah Booking Baru</h2>
            <input
              type="text"
              className="border p-2 rounded w-full mb-4"
              placeholder="Masukkan nama"
              value={newBooking.name}
              onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
            />
            <input
              type="email"
              className="border p-2 rounded w-full mb-4"
              placeholder="Masukkan email"
              value={newBooking.email}
              onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
            />
            <select
              className="border p-2 rounded w-full mb-4"
              value={newBooking.seat}
              onChange={(e) => setNewBooking({ ...newBooking, seat: e.target.value })}
            >
              <option value="">Pilih Tempat Duduk</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
            </select>
            <button
              className="bg-blue-500 text-white p-2 rounded mr-2"
              onClick={handleAddBooking}
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
            <th className="py-2 px-4 border-b">Nama</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Tempat Duduk</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr> 
        </thead>
        <tbody>
          {bookings.map((booking, i) => (
            <tr key={i}>
              <td className="py-2 px-4 border-b">{i+1}</td>
              <td className="py-2 px-4 border-b">{booking.name}</td>
              <td className="py-2 px-4 border-b">{booking.email}</td>
              <td className="py-2 px-4 border-b">{booking.seat}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white p-1 rounded"
                  onClick={() => handleDeleteBooking(booking.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;