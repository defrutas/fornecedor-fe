import { useState, useEffect } from 'react';
import './Home.css';

function DetalhesEncomenda({ encomenda }) {
  const estadoLabels = {
    1: 'Pendente',
    2: 'Cancelado',
    3: 'Aguardar Envio',
    4: 'Concluído',
  };

  const nomeMedicamento = encomenda.medicamentos && encomenda.medicamentos[0] ? encomenda.medicamentos[0].nomeMedicamento : 'N/A';

  return (
    <div className="order-details-card">
      <h2 className="section-title">Detalhes da Encomenda</h2>
      <div className="order-details">
        <div className="detail-item">
          <span className="detail-label">ID da Encomenda:</span>
          <span>{encomenda.OrderSHID}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Encomenda Completa:</span>
          <span>{encomenda.encomendaCompleta ? 'Sim' : 'Não'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Data da Encomenda:</span>
          <span>{encomenda.dataEncomenda || 'N/A'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Data de Entrega:</span>
          <span>{encomenda.dataEntrega || 'N/A'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Estado:</span>
          <span>{estadoLabels[encomenda.estadoID] || 'Desconhecido'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Nome do Fornecedor:</span>
          <span>{encomenda.nomeFornecedor}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Contacto do Fornecedor:</span>
          <span>{encomenda.contactoFornecedor}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Quantidade Enviada:</span>
          <span>{encomenda.quantidadeEnviada}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Nome do Medicamento:</span>
          <span>{nomeMedicamento}</span>
        </div>
      </div>
    </div>
  );
}



function FormularioAtualizacaoEncomenda({ OrderSHID, dataEntregaInicial }) {
  const [dataEntrega, setDataEntrega] = useState(dataEntregaInicial || '');
  const [estaCompleta, setEstaCompleta] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to match the backend structure
    const updatedData = {
      encomenda: {
        encomendaID: OrderSHID,  // Rename to encomendaID to match backend
        dataEntrega,  // Ensure this is in the correct format (YYYY-MM-DD)
        encomendaCompleta: estaCompleta,  // Use encomendaCompleta instead of estadoID
      },
    };

    try {
      const response = await fetch('http://4.251.113.179:5000/send-encomenda/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),  // Send the data as JSON
        mode: 'cors', // Handle CORS requests
      });

      if (!response.ok) {
        throw new Error('Failed to update the order.');
      }

      alert('Encomenda atualizada com sucesso!');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Ocorreu um erro ao atualizar a encomenda.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="order-update-form">
      <h2 className="section-title">Atualizar Encomenda</h2>
      <div className="form-group">
        <label htmlFor="dataEntrega" className="form-label">Data de Entrega</label>
        <input
          type="date"
          id="dataEntrega"
          value={dataEntrega}
          onChange={(e) => setDataEntrega(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="estaCompleta" className="form-label">Encomenda Completa</label>
        <input
          type="checkbox"
          id="estaCompleta"
          checked={estaCompleta}
          onChange={(e) => setEstaCompleta(e.target.checked)}
          className="checkbox-input"
        />
        <span className="checkbox-label">Marcar como completa</span>
      </div>
      <button type="submit" className="submit-btn">Atualizar Encomenda</button>
    </form>
  );
}

function Sidebar({ orders, onSelectOrder }) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Encomendas</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li
            key={order.OrderSHID}
            className="order-item"
            onClick={() => onSelectOrder(order)}
          >
            Encomenda #{order.OrderSHID}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://4.251.113.179:5000/orders/all');
        const data = await response.json();
        setOrders(data);
        setSelectedOrder(data[0]);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (orders.length === 0) {
    return <div className="no-orders">No orders available.</div>;
  }

  return (
    <div className="home-container">
      <h1 className="page-title">Gestão de Encomendas do Fornecedor de Medicamentos</h1>
      <div className="layout">
        <Sidebar orders={orders} onSelectOrder={setSelectedOrder} />
        <main className="main-content">
          {selectedOrder && (
            <>
              <DetalhesEncomenda encomenda={selectedOrder} />
              <FormularioAtualizacaoEncomenda
                OrderSHID={selectedOrder.OrderSHID}
                dataEntregaInicial={selectedOrder.dataEntrega}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
