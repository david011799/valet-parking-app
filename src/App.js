import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import TicketDetail from "./TicketDetail";
import { QRCodeSVG } from "qrcode.react";

function Home() {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem("tickets");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    ticketNumber: "",
    phone: "",
    destination: "",
    apartment: "",
    runner: "",
    space: "",
    damage: "",
    entryTime: "", // Cambié el valor inicial de entryTime
    status: "Estacionado",
    requestTime: "",
    exitTime: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now().toString();
    const newTicket = {
      ...formData,
      id,
      entryTime: new Date().toLocaleString() // Asigno la hora solo cuando se crea el ticket
    };
    const updated = [...tickets, newTicket];
    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
    setFormData({
      ticketNumber: "",
      phone: "",
      destination: "",
      apartment: "",
      runner: "",
      space: "",
      damage: "",
      entryTime: "", // Reinicio entryTime después de enviar el formulario
      status: "Estacionado",
      requestTime: "",
      exitTime: ""
    });
  };

  const goToTicket = (ticket) => {
    navigate(`/ticket/${ticket.id}`);
  };

  return (
    <div className="container">
      <h1>Registro de Vehículos</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="ticketNumber"
          placeholder="Número de ticket"
          onChange={handleChange}
          value={formData.ticketNumber}
          required
        />
        <input
          name="phone"
          placeholder="Teléfono"
          onChange={handleChange}
          value={formData.phone}
          required
        />
        <select
          name="destination"
          onChange={handleChange}
          value={formData.destination}
          required
        >
          <option value="">Destino</option>
          <option value="apartamento">Apartamento</option>
          <option value="restaurante">Restaurante</option>
          <option value="marina">Marina</option>
        </select>
        {formData.destination === "apartamento" && (
          <input
            name="apartment"
            placeholder="Número de apartamento"
            onChange={handleChange}
            value={formData.apartment}
          />
        )}
        <select name="runner" onChange={handleChange} value={formData.runner} required>
          <option value="">Runner</option>
          <option value="Runner 1">Runner 1</option>
          <option value="Runner 2">Runner 2</option>
          <option value="Runner 3">Runner 3</option>
        </select>
        <input
          name="space"
          placeholder="Espacio de parqueo"
          onChange={handleChange}
          value={formData.space}
          required
        />
        <input
          name="damage"
          placeholder="Daños del vehículo"
          onChange={handleChange}
          value={formData.damage}
        />
        <button
          type="submit"
          disabled={
            !formData.ticketNumber ||
            !formData.phone ||
            !formData.destination ||
            !formData.runner ||
            !formData.space
          }
        >
          Registrar vehículo
        </button>
      </form>

      <h2>Tickets Registrados</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {tickets.map((ticket) => (
          <div key={ticket.id} style={{ border: "1px solid #ccc", padding: 10, borderRadius: 8 }}>
            <p><strong>Ticket:</strong> {ticket.ticketNumber}</p>
            <p><strong>Tel:</strong> {ticket.phone}</p>
            <p><strong>Estado:</strong> {ticket.status}</p>
            <QRCodeSVG value={`https://valet-parking-400.vercel.app/ticket/${ticket.id}`} size={128} />
            <br />
            <button onClick={() => goToTicket(ticket)}>Ver Detalles</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ticket/:id" element={<TicketDetail />} />
      </Routes>
    </Router>
  );
}