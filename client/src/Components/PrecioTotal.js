import React from "react";

const PrecioTotal = ({ cartItems }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  let PrecioTotal = 0;
  if (PrecioTotal !== []) {
    for (let item of cartItems) {
      PrecioTotal = PrecioTotal + item.precio * (item.qty || item.cantidad);
    }
  } else {
    PrecioTotal = 0;
  }

  return (
    <h2>
      {PrecioTotal
        ? `Precio Total: ${formatter.format(PrecioTotal)}`
        : "No hay productos en tu carrito"}
    </h2>
  );
};

export default PrecioTotal;
