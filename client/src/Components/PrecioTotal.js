import React from "react";
import Typography from '@mui/material/Typography';

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
    <div>
      {PrecioTotal?
         <Typography variant="h4" component="div" gutterBottom >
          Precio Total: {formatter.format(PrecioTotal)}
         </Typography>
         :<Typography variant="h4" component="div" gutterBottom mt={17} color="#777">
          Tu carrito esta vacio
         </Typography>
      }
    </div>
    
    // <h2>
    //   {PrecioTotal
    //     ? `Precio Total: ${formatter.format(PrecioTotal)}`
    //     : "No hay productos en tu carrito"}
    // </h2>
  );
};

export default PrecioTotal;
