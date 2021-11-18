import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  setPagina,
  setNombre,
  setCategoria,
  setOrdenamiento
} from "../../Redux/actions/productAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

export default function FiltrosYOrden({ seteoDePropiedad, cambioDeProps }) {
  const { nombre, categoria, ordenamiento } = useSelector((state) => state.productos);
//   const [stateInput, setStateInput] = useState({
//     categoria: "",
//     ordenamiento: "",
//   });
  const dispatch = useDispatch();

  const handleStateInput = (e) => {
    if(e.target.name === "categoria"){
        dispatch(setCategoria(e.target.value))
        dispatch(
            getProducts({
              pagina: 1,
              nombre,
              ordenamiento,
              categoria: e.target.value
            })
          );
    }
    if(e.target.name === "ordenamiento") {
        dispatch(setOrdenamiento(e.target.value))
        dispatch(
            getProducts({
              pagina: 1,
              nombre,
              categoria,
              ordenamiento: e.target.value
            })
          );
    }
    dispatch(setPagina(1))
  };
  useEffect(() => {
      return () => {
        dispatch(setNombre(""))
        dispatch(setPagina(1))
        dispatch(setCategoria(""))
        dispatch(setOrdenamiento(""))
      }
  },[dispatch]) 
  const rechargeHome = (e) => {
    e.preventDefault();
    dispatch(
      getProducts({ pagina: 1, nombre: "", categoria: "", ordenamiento: "" })
    );
    dispatch(setNombre(""))
    dispatch(setPagina(1))
    dispatch(setCategoria(""))
    dispatch(setOrdenamiento(""))
  };
  return (
    <div className="OrderContainer">
      <div className="items">
        <select onChange={handleStateInput} name="ordenamiento" value={ordenamiento}>
          <option defaultValue value="">
            Orden
          </option>
          <option value="ascendente">A-Z</option>
          <option value="descendente">Z-A</option>
          <option value="menor precio">Menor Precio</option>
          <option value="mayor precio">Mayor Precio</option>
        </select>
      </div>
      <div className="items">
        <select
          onChange={handleStateInput}
          name="categoria"
          value={categoria}
        >
          <option defaultValue value="">
            Todas las Categorias
          </option>
          <option value="Plantines y Semillas">Plantines y Semillas</option>
          <option value="Composteras">Composteras</option>
          <option value="Cajones y Cultivos">Cajones y Cultivos</option>
          <option value="Insumos y Herramientas para Huertas">
            Insumos y Herramientas para Huertas
          </option>
          <option value="Lombrices Rojas Californeanas">
            Lombrices Rojas Californeanas
          </option>
        </select>
      </div>
      <form onSubmit={rechargeHome}>
          <button type="submit" className="recharge">
        <FontAwesomeIcon icon={faRedo} />
      </button>
      </form>
      
    </div>
  );
}

// const handleOrdenPorNombre = (e) => {
//     // if(ordenP){
//     //    dispatch(reset())
//     // }
//     dispatch(setOrdenA(e.target.value))
//     dispatch(getProducts({ nombre, ordenA: e.target.value, filtroC }))
//     dispatch(setPagina(1))
// }

// const handleOrdenPorPrecio = (e) => {
//     // if(ordenA){
//     //    dispatch(reset())
//     // }
//     dispatch(setOrdenP(e.target.value))
//     dispatch(getProducts({ nombre, ordenP: e.target.value, filtroC }))
//     dispatch(setPagina(1))
// }

// const handleFiltroPorCategoria = (e) => {
//     // if(e.target.value === "Categoria"){
//     //    return rechargeHome();
//     // }
//     setSelectInput({
//         [e.target.name]:e.target.value
//     })
//     dispatch(setFiltroC(selectInput.categorias))
//     dispatch(getProducts({ nombre, ordenA, ordenP, filtroC: e.target.value}))
//     dispatch(setPagina(1))
// }
