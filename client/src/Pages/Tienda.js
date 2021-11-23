import "../Styles/Tienda.css";
import { useSelector, useDispatch } from "react-redux";
import * as React from "react";
// import {productosFiltrados} from "../Redux/actions/action"
import Products from "../Components/Productos/Products";
import SearchBar from "../Components/Productos/SearchBar";
import FiltrosYOrden from "../Components/Productos/FiltrosYOrden";
import {
  getProducts,
  setPagina,
} from "../Redux/actions/productAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function Tienda({ props }) {
  const { products, nombre, pagina, ordenamiento, categoria } =
    useSelector((state) => state.productos);
  const dispatch = useDispatch();
  const changePagina = (pagina) => {
    dispatch(getProducts({ pagina, ordenamiento, categoria, nombre }));
    dispatch(setPagina(pagina));
  };

  useEffect(() => {
    dispatch(
      getProducts({
        categoria: props ? props : "",
      })
    );
  }, [dispatch, props]);


  return (
    <div className="Store">
      <h1>Tienda</h1>
      <div className="SearchContainer">
        <SearchBar />
        <FiltrosYOrden seteoDePropiedad={props} />
      </div>
      {/* Hacerle un Componente al Paginado Por Favor ↓ */}
      <div className="ProdContTitle">
        {/* <Products productos={productosPorCategorias}/>  */}
        <div className="ProductsContainer">
          <Products productos={products?.resultado} />
        </div>
      </div>
      <div className="PageButtons">
        <button
          className="Buttons Buttons_Left"
          disabled={pagina - 1 === 0}
          onClick={() => {
            changePagina(pagina - 1);
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <label className="PageNumber">{pagina}</label>
        <button
          className="Buttons Buttons_Right"
          disabled={products?.contador <= pagina * 6}
          onClick={() => {
            changePagina(pagina + 1);
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
