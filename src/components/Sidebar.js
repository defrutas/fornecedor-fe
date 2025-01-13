function Sidebar({ orders, onSelectOrder }) {
    return (
      <aside className="sidebar">
        <h2 className="sidebar-title">Todas as Encomendas</h2>
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
  