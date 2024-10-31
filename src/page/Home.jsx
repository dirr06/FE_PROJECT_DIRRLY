import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import backgroundImage from '../assets/gambar_langit_pesawat.jpg';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-cover bg-center bg-fixed h-screen" style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.8 }}>
      <div className="bg-blue-500 bg-opacity-90 text-white text-center p-12">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang di Treveloko!</h1>
        <p className="text-lg mb-4">Temukan pengalaman terbaik dalam pemesanan tiket dan perjalanan Anda bersama kami.</p>
        <p className="text-lg mb-8">Jangan lewatkan penawaran menarik dan kemudahan dalam setiap langkah perjalanan Anda.</p>
        <Button 
          variant="contained" 
          color="primary" 
          endIcon={<ArrowForwardIcon />} 
          onClick={() => navigate('/booking')}
        >
          Pesan Sekarang
        </Button>
      </div>
    </div>
  )
}

export default Home