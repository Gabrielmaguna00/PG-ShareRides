import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { postViajeConductor } from "../../redux/actions/actions";


export default function FormPasajero() {
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(new Array(5).fill(false));
  const [errors, setErrors] = useState({});
  const [viaje, setViaje] = useState({
    fecha: "",
    hora: "",
    origen: "",
    destino: "",
    dni: "",
    asiento: "",
    formaDePago: "A coordinar",
    email: "nahue@gmail.com"
  });

  const expresiones = {
    fecha: /^.{4,18}$/,
    hora: /^.{4,12}$/,
    asiento: /^.{1,7}$/,
    origen: /^[a-zA-ZÀ-ÿ\s]{4,15}$/,
    destino: /^[a-zA-ZÀ-ÿ\s]{4,15}$/,
    dni: /^(?!^0+$)[a-zA-Z0-9]{3,20}$/
  };

  function validacion(viaje) {
    let errors = {};

    if (!viaje.hora) {
      errors.hora = "Debes ingresar la hora del viaje";
    } else if (!expresiones.hora.test(viaje.hora)) {
      errors.hora = "Ingresa una hora valida";
    }
    if (!viaje.fecha) {
      errors.fecha = "Debes ingresar la fecha del viaje";
    } else if (!expresiones.fecha.test(viaje.fecha)) {
      errors.fecha = "Ingresa una fecha valida";
    }
    if (!viaje.origen) {
      errors.origen = "Debes ingresar el origen del viaje";
    } else if (!expresiones.origen.test(viaje.origen)) {
      errors.origen = "Ingrese un origen valido";
    }
    if (!viaje.destino) {
      errors.destino = "Debes ingresar el destino del viaje";
    } else if (!expresiones.destino.test(viaje.destino)) {
      errors.destino = "Ingrese un destino valido";
    }
    if (!viaje.dni) {
      errors.dni = "Debes ingesar DNI/Pasaporte";
    } else if (!expresiones.dni.test(viaje.dni)) {
      errors.dni = "Ingrese un Dni/Pasaporte valido";
    }
    if (!viaje.asiento) {
      errors.asiento = "Debes ingresar la fecha del viaje";
    } else if (!expresiones.asiento.test(viaje.asiento)) {
      errors.asiento = "Ingresa una fecha valida";
    }
    return errors;
  }
  const filtrosArray = [
    {
      id: 1,
      name: "Acepto fumador"
    },
    {
      id: 2,
      name: "Acepto mascota"
    },
    {
      id: 3,
      name: "Acepto equipaje"
    },
    {
      id: 4,
      name: "Uso de barbijo"
    },
    {
      id: 5,
      name: "Pago compartido"
    }
  ];

  function handleOnChange(e) {
    e.preventDefault();
    setViaje({
      ...viaje,
      [e.target.name]: e.target.value
    });
    setErrors(
      validacion({
        ...viaje,
        [e.target.name]: e.target.value
      })
    );
  }

  const handleCheckBox = (position) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updatedCheckedState);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !viaje.fecha ||
      !viaje.hora ||
      !viaje.origen ||
      !viaje.destino ||
      !viaje.dni ||
      !viaje.asiento
    ) {
      e.preventDefault();
      swal({
        title: "Alto!",
        text: "Por favor completá todos los campos",
        icon: "warning",
        button: true,
        dangerMode: true
      });
    } else {
      swal({
        title: "El registro ha sido exitoso!",
        icon: "success",
        button: "Crea tu viaje!",
      }).then(function(){window.location = "/home"});
      dispatch(postViajeConductor(isChecked, viaje));

      setViaje({
        fecha: "",
        hora: "",
        origen: "",
        destino: "",
        dni: "",
        asiento: "",
        formaDePago: "A coordinar",
        email: "nahue@gmail.com"
      });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>Fecha</span>

        <input
          type="text"
          name="fecha"
          value={viaje.fecha}
          onChange={(e) => handleOnChange(e)}
        />
        {errors.fecha && <span>{errors.fecha}</span>}

        <br></br>
        <span>Hora</span>

        <input
          type="text"
          name="hora"
          value={viaje.hora}
          onChange={(e) => handleOnChange(e)}
        />
        {errors.hora && <span>{errors.hora}</span>}
        <br></br>
        <span>Origen</span>
        <input
          type="text"
          name="origen"
          value={viaje.origen}
          onChange={(e) => handleOnChange(e)}
        />
        {errors.origen && <span>{errors.origen}</span>}
        <br></br>
        <span>Destino</span>
        <input
          type="text"
          name="destino"
          value={viaje.destino}
          onChange={(e) => handleOnChange(e)}
        />
        {errors.destino && <span>{errors.destino}</span>}
        <br></br>
        <span>Dni</span>
        <input
          type="text"
          name="dni"
          value={viaje.dni}
          onChange={(e) => handleOnChange(e)}
        />
        {errors.dni && <span>{errors.dni}</span>}
        <br></br>
        <span>Asientos a ocupar</span>
        <input
          type="number"
          name="asiento"
          placeholder="entre 1 y 7"
          value={viaje.asiento}
          onChange={(e) => handleOnChange(e)}
        />
        {errors.asiento && <span>{errors.asiento}</span>}

        <div>
          {filtrosArray.map((e, index) => {
            return (
              <div>
                <label>{e.name}</label>
                <input
                  type="checkbox"
                  key={e.id}
                  name={e.name}
                  value={e.name}
                  checked={isChecked[index]}
                  onChange={() => {
                    handleCheckBox(index);
                  }}
                />
              </div>
            );
          })}
          {isChecked[4] && (
            <select>
              <option value="Efecto">Efectivo</option>
              <option value="MP">Mercado Pago</option>
            </select>
          )}
        </div>
        <div>
          {!errors.dni &&
          !errors.hora &&
          !errors.destino &&
          !errors.origen &&
          !errors.fecha &&
          !errors.asiento ? (
            <input
              type="submit"
              value="Registrar viaje"
              name="Registrar viaje"
              className="btn_registro"
            />
          ) : (
            <input
              type="submit"
              value="Registrar viaje"
              name="Registrar viaje"
              disabled="disabled"
              className="disabled"
            />
          )}
        </div>
      </form>
    </div>
  );
}