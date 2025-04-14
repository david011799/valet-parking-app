import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const found = tickets.find((t) => t.id === id);
    setTicket(found);
  }, [id]);

  const updateTicketStatus = (newStatus) => {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const updated = tickets.map((t) =>
      t.id === ticket.id
        ? { ...t, status: newStatus, requestTime: new Date().toLocaleString() }
        : t
    );
    localStorage.setItem("tickets", JSON.stringify(updated));
    setTicket({ ...ticket, status: newStatus });
  };

  if (!ticket) return <p>Cargando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Detalles del Ticket</h2>
      <p><strong>Número de Ticket:</strong> {ticket.ticketNumber}</p>
      <p><strong>Teléfono:</strong> {ticket.phone}</p>
      <p><strong>Destino:</strong> {ticket.destination}</p>
      {ticket.destination === "apartamento" && (
        <p><strong>Apartamento:</strong> {ticket.apartment}</p>
      )}
      <p><strong>Runner:</strong> {ticket.runner}</p>
      <p><strong>Espacio:</strong> {ticket.space}</p>
      <p><strong>Daños:</strong> {ticket.damage}</p>
      <p><strong>Hora de entrada:</strong> {ticket.entryTime}</p>
      <p><strong>Estado:</strong> {ticket.status}</p>
      {ticket.requestTime && <p><strong>Hora de pedido:</strong> {ticket.requestTime}</p>}

      <div style={{ marginTop: 20 }}>
        {ticket.status === "Estacionado" && (
          <button
            onClick={() => updateTicketStatus("Pedido")}
            style={{ backgroundColor: "green", color: "white", padding: 10, borderRadius: 5 }}
          >
            Pedir carro
          </button>
        )}
        {ticket.status === "Pedido" && (
          <button
            onClick={() => updateTicketStatus("Estacionado")}
            style={{ backgroundColor: "orange", color: "white", padding: 10, borderRadius: 5 }}
          >
            Cancelar pedido
          </button>
        )}
      </div>

      <br />
      <button onClick={() => navigate("/")}>Volver a inicio</button>
    </div>
  );
}


