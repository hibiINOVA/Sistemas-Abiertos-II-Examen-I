export default function Menu({ db, addToOrder }) {
  return (
    <div className="left-column">
      <h2 className="section-title">Menú</h2>
      <div className="menu-list">
        {db.map((item) => (
          <button
            key={item.id}
            onClick={() => addToOrder(item)}
            className="menu-button"
          >
            <span className="item-name">{item.name}</span>
            <span className="item-price">${item.price}</span>
          </button>
        ))}
      </div>
    </div>
  )
}