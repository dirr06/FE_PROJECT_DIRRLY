import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import backgroundImage from '../assets/gambar_langit_pesawat.jpg';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Chip,
} from "@material-tailwind/react";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/flights', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setProperties(response.data);
    })
    .catch(error => {
      console.error('Error fetching bookings:', error);
    });
  }, []);

  return (
    <div className="bg-cover bg-center bg-fixed h-screen" style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.8 }}>
      <div className="bg-blue-500 bg-opacity-90 text-white text-center p-12">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang di Treveloko!</h1>
        <p className="text-lg mb-4">Temukan pengalaman terbaik dalam pemesanan tiket dan perjalanan Anda bersama kami.</p>
        <p className="text-lg mb-8">Jangan lewatkan penawaran menarik dan kemudahan dalam setiap langkah perjalanan Anda.</p>
        <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} onClick={() => navigate('/FE_PROJECT_DIRRLY/booking')}>
          Pesan Sekarang
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {properties.map((property) => (
          <Card key={property.id} className="w-full max-w-[26rem] shadow-lg hover:scale-105 transition-transform duration-300">
            <CardHeader floated={false} color="blue-gray">
              <img src={property.imageUrl} alt={property.title} className="w-full h-48 object-cover" />
              <div className="absolute top-2 left-2">
                {property.promo && <Chip color="red" size="sm" value="Promo" className="text-white" />}
                {!property.promo && property.popular && <Chip color="blue" size="sm" value="Best Seller" className="text-white" />}
              </div>
            </CardHeader>
            <CardBody>
              <div className="mb-3 flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium">
                  {property.from} → {property.to}
                </Typography>
                <Typography color="gray" className="font-semibold">
                  Rp {property.price.toLocaleString()}
                </Typography>
              </div>
              <Typography color="gray">Berangkat: {new Date(property.departure).toLocaleString()}</Typography>
              <Typography color="gray">Tiba:{new Date(property.arrival).toLocaleString()}</Typography>
            </CardBody>
            <CardFooter className="pt-3">
              <Button size="lg" fullWidth={true} className="bg-black text-white hover:bg-gray-800">
                Reserve
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
