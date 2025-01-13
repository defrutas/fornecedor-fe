import { useState } from 'react';
import './Home.css';

function DetalhesEncomenda({ encomenda }) {
  return (
    <div className="order-details-card">
      <h2 className="section-title">Detalhes da Encomenda</h2>
      <div className="order-details">
        <div className="detail-item">
          <span className="detail-label">ID da Encomenda:</span>
          <span>{encomenda.encomendaID}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Encomenda Completa:</span>
          <span>{encomenda.encomendaCompleta ? 'Sim' : 'Não'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">ID do Profissional:</span>
          <span>{encomenda.profissionalID}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Data da Encomenda:</span>
          <span>{encomenda.dataEncomenda}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Data de Entrega:</span>
          <span>{encomenda.dataEntrega}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Aprovado pelo Administrador:</span>
          <span>{encomenda.aprovadoPorAdministrador ? 'Sim' : 'Não'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">ID do Estado:</span>
          <span>{encomenda.estadoID}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">ID do Fornecedor:</span>
          <span>{encomenda.fornecedorID}</span>
        </div>
      </div>
    </div>
  );
}

function FormularioAtualizacaoEncomenda({ encomendaId, dataEntregaInicial }) {
  const [dataEntrega, setDataEntrega] = useState(dataEntregaInicial);
  const [estaCompleta, setEstaCompleta] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate the order update
    alert('Encomenda atualizada com sucesso!');
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
            key={order.encomendaID}
            className="order-item"
            onClick={() => onSelectOrder(order)}
          >
            Encomenda #{order.encomendaID}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default function Home() {
  const ordersMock = [
    {
      encomendaID: '12345',
      encomendaCompleta: false,
      profissionalID: 'PROF001',
      dataEncomenda: '2023-05-01',
      dataEntrega: '2023-05-10',
      aprovadoPorAdministrador: true,
      estadoID: 'PENDENTE',
      fornecedorID: 'FORN001',
    },
    {
      encomendaID: '67890',
      encomendaCompleta: true,
      profissionalID: 'PROF002',
      dataEncomenda: '2023-06-15',
      dataEntrega: '2023-06-20',
      aprovadoPorAdministrador: false,
      estadoID: 'CONCLUIDO',
      fornecedorID: 'FORN002',
    },
  ];

  const [selectedOrder, setSelectedOrder] = useState(ordersMock[0]);

  return (
    <div className="home-container">
      <h1 className="page-title">Gestão de Encomendas do Fornecedor de Medicamentos</h1>
      <div className="layout">
        <Sidebar orders={ordersMock} onSelectOrder={setSelectedOrder} />
        <main className="main-content">
          <DetalhesEncomenda encomenda={selectedOrder} />
          <FormularioAtualizacaoEncomenda
            encomendaId={selectedOrder.encomendaID}
            dataEntregaInicial={selectedOrder.dataEntrega}
          />
        </main>
      </div>
    </div>
  );
}
