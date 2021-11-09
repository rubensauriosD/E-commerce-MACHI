import React from "react";


export default function CartProductCheckout({imagen,nombre, precio, qty}){

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  let precioTotalProducto =precio;
  return (
    <div className="Mercado-infoContainer">
        <div className="Mercado-allInfo">
          <img className="Mercado-imgInfo" src={imagen} alt={nombre} />
        </div>
        <div className="Mercado-textInfo">
          <h3 className="Mercado-nameInfo">{nombre}</h3>
          <p className="Mercado-priceInfo"> Precio Unitario<br /> {formatter.format(precioTotalProducto)}</p>
        </div>
    </div>
  );
}