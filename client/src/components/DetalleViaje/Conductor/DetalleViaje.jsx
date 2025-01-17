import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetalleViaje, postOrder } from "../../../redux/actions/actions";
import NavBar from "../../NavBar/NavBar";
import "./DetalleViaje.css";
import link from "../../CardViaje/Links";
import { MdSmokeFree, MdMasks, MdPets } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import { VscLocation } from "react-icons/vsc";
import fondo from "../../../assets/fondo perfil.jpg";
import Cookies from "universal-cookie";
import axios from "axios";

export const DetalleViaje = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const viaje = useSelector(state => state.viajePorId);
  const { id } = useParams();
  const cookieMail = cookies.get("email");
  useEffect(
    () => {
      dispatch(getDetalleViaje(id));
    },
    [id]
  );

  const [datosMp, setDatosMp] = useState({
    unit_price: "",
    orderId: ""
  });

  const handleColaborar = async () => {
    await dispatch(postOrder(cookieMail)).then(data => {
      // console.log(data.payload[0])
      setDatosMp({ ...datosMp, orderId: data?.payload[0].id });
    });
    console.log("handle colaborar", datosMp);
  };

  const [redirect, setRedirect] = useState("");

  function handleSubmit(e) {
    e.preventDefault()(
      axios
        .get(
          `http://localhost:3001/api/mercadopago/${datosMp?.orderId}/${datosMp?.unit_price}`
        )
        .then(r => setRedirect(r.data))
    );
  }

  function handleChange(e) {
    e.preventDefault();
    setDatosMp({
      ...datosMp,
      unit_price: parseInt(e.target.value)
    });
  }

  return (
    <div className="container-detalle">
      <NavBar />
      <div className="card-detalle">
        <div className="card-usuario-detalle">
          <div className="card-usuario-infper-detalle">
            <div className="card-usuario-img-detalle">
              <img src={link} alt="" />
            </div>
            <div className="card-usuario-nombre-val-detalle text-xl">
              <span className="text-white my-9">
                Hard code{viaje.nombre} {viaje.apellido}
              </span>

              <span>Valoracion estrellas</span>
            </div>
          </div>
          <span className="ml-4 text-xl">Acerca de mi</span>
          <div className="card-usuario-resumen-detalle rounded-sm">
            <span className="m-2">
              Trabajo en un local, que queda en rosario y necesito viajar
              seguido a funes
            </span>
          </div>
          <div className="card-usuario-resumen-detalle rounded-sm">
            <span className="m-2">
              Viajo con dos valijas y un perrito chiquito, estoy dispuesto a
              compartir gastos! vamos a escrtibir mucho para ver como queda esto
              creo que son demasiados caracteres
            </span>
          </div>
          <div className="btn-detalle">
            <button className="detalle-mensaje">
              <Link to="/login">Enviar mensaje</Link>
            </button>
          </div>
          <br />
          {!redirect
            ? <button
                onClick={() => {
                  handleColaborar();
                }}
                class="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Quiero Colaborar!
              </button>
            : <button
                onClick={() => {
                  handleColaborar();
                }}
                class="btn btn-success"
                disabled="disabled"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Quiero Colaborar!
              </button>}

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel" />
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div class="modal-body">
                  <h3>Por favor, especificá el monto que deseas aportar</h3>
                  <br />
                  <input
                    class="form-control"
                    type="number"
                    placeholder="Monto a cobrar"
                    name="unit_price"
                    value={datosMp.unit_price}
                    onChange={e => handleChange(e)}
                  />
                </div>
                <div class="modal-footer">
                  <form onSubmit={e => handleSubmit(e)}>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Continuar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <br />
          {redirect !== "" &&
            <a href={`${redirect}`}>
              <input
                class="btn btn-success"
                type="submit"
                value="Continuar a MercadoPago"
                name="Continuar a MercadoPago"
              />
            </a>}
        </div>
        <div className="card-viaje-detalle text-xl">
          <div className="flex flex-col justify-evenly w-full ml-4">
            <span>Desde: </span>
            <span className="text-2xl flex items-center text-green-400">
              <VscLocation />
              {viaje.origen}
            </span>
            <span>Hacia:</span>
            <span className="text-2xl flex items-center text-red-600">
              <VscLocation />
              {viaje.destino}
            </span>
            <span>
              Fecha: <span className="font-bold">{viaje.fecha}</span>
            </span>
            <span>
              Hora: <span className="font-bold">{viaje.hora}</span>
            </span>
          </div>
          <div className="flex flex-col justify-evenly w-full ml-4">
            <span>
              Cantidad de asientos disponibles:{" "}
              <span
                className={`font-bold text-2xl ${viaje.asientosAOcupar > 3
                  ? "text-sky-600"
                  : viaje.asientosAOcupar < 1
                    ? "text-amber-500"
                    : "text-orange-700"}`}
              >
                {viaje.asientosAOcupar}
              </span>
            </span>
            <span>
              Forma de pago:{" "}
              <span className="font-bold">
                {/* no llega bien forma de pago */}
                {viaje.formaDePago ? viaje.formaDePago : "no"}
              </span>
            </span>
            <span>
              Comparte gastos:
              <span className="font-bold">
                {viaje.pagoCompartido ? "sí" : "no"}
              </span>
            </span>
            <span className="flex items-center">
              <MdSmokeFree className="mx-2" />
              Acepta Fumadorxs:{" "}
              <span className="font-bold">
                {viaje.aceptaFumador ? "sí" : "no"}
              </span>
            </span>
            <span className="flex items-center">
              <MdPets className="mx-2" />
              Acepta Mascota(s):{" "}
              <span className="font-bold">
                {viaje.aceptaMascota ? "sí" : "no"}
              </span>
            </span>
            <span className="flex items-center">
              <FaSuitcaseRolling className="mx-2" /> Acepta Equipaje:{" "}
              <span className="font-bold">
                {viaje.aceptaEquipaje ? "sí" : "no"}
              </span>
            </span>
            <span className="flex items-center">
              <MdMasks className="mx-2" />
              Usa obligatorio de Barbijo:{" "}
              <span className="font-bold">
                {viaje.usaBarbijo ? "sí" : "no"}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
};
