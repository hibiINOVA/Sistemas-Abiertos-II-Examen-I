export default function Order({ order, tip, setTip, removeFromOrder, subtotal, tipAmount, total, setOrder }) {
  return (
    <div className="right-column">
      {order.length === 0 ? (
        <p className="order-status">La orden está vacía</p>
      ) : (
        <div className="order-content">
          <h2 className="consumo-title">Consumo</h2>
          
          <div className="order-items">
            {order.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-item-details">
                  <div className="order-item-header">
                    <span className="order-item-name">{item.name} - ${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => removeFromOrder(item.id)}
                      className="delete-button"
                    >
                      X
                    </button>
                  </div>
                  <span className="order-item-quantity">Cantidad: {item.quantity} - ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="tip-section">
            <h3 className="section-subtitle">Propina:</h3>
            <div className="tip-options">
              <label className="tip-option">
                <input 
                  type="radio" 
                  name="tip" 
                  checked={tip === 10}
                  onChange={() => setTip(10)}
                />
                <span>10%</span>
              </label>
              <label className="tip-option">
                <input 
                  type="radio" 
                  name="tip" 
                  checked={tip === 20}
                  onChange={() => setTip(20)}
                />
                <span>20%</span>
              </label>
              <label className="tip-option">
                <input 
                  type="radio" 
                  name="tip" 
                  checked={tip === 50}
                  onChange={() => setTip(50)}
                />
                <span>50%</span>
              </label>
            </div>
          </div>

          <div className="totals-section">
            <h3 className="section-subtitle">Totales y Propina:</h3>
            <div className="totals-list">
              <div className="total-item">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-item">
                <span>Propina:</span>
                <span>${tipAmount.toFixed(2)}</span>
              </div>
              <div className="total-item total-final">
                <span>Total a Pagar:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => { setOrder([]); setTip(0); }}
            className="save-button"
          >
            GUARDAR ORDEN
          </button>
        </div>
      )}
    </div>
  )
}