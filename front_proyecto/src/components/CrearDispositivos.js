import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";


const CrearDispositivos = (props) => {

  const [bodegas, setBodegas] = useState([]);
  const [modelos, setModelos] = useState([]);

  const [modelo, setModelo] = useState(0);
  const [bodega, setBodega] = useState(0);
  const [dispositivo, setDispositivo] = useState("");

  const navigate = useNavigate();

  const guardar = () => {
    fetch(
      `http://localhost/BackEnd-Mundo/Proyecto/public/api/dispositivo`,{
        method: "POST",
        body: JSON.stringify({
            mod_id:modelo,
            bod_id:bodega,
            nombre_dispo:dispositivo
        }),
        headers: { "Content-type": "application/json; charset=UTF-8", },
      }
    ).then((respuesta)=>respuesta.json()).then((datos)=>navigate("/"));

  };

  const llamadoBodegas = () => {
    fetch(`http://localhost/BackEnd-Mundo/Proyecto/public/api/bodegas`)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setBodegas(datos);
      });
  };

  const llamadosModelos = () => {
    fetch(`http://localhost/BackEnd-Mundo/Proyecto/public/api/modelos`)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setModelos(datos);
      });
  };

  useEffect(()=>{
    llamadoBodegas()
    llamadosModelos()
  },[]);

  return (
    <div className="flex justify-content-center">
      <Card>
          <div className="card">
            <h2>Inserte datos</h2>
            <div className="field">
                <label htmlFor="firstname1">Nombre dispositivo: </label>
                <span className="p-float-label">
                    <InputText
                    id="firstname1"
                    value={dispositivo}
                    onChange={(e) => setDispositivo(e.target.value)}
                    />
                    
                </span>
            </div>

            <div className="field">
                <label htmlFor="2">Seleccione Bodega: </label>
                <br/>
                <Dropdown
                    id="2"
                    showClear
                    value={bodega}
                    options={bodegas}
                    onChange={(e) => setBodega(e.value)}
                    placeholder="Seleccionar bodega"
                />
            </div>
            <div className="field">
                <label htmlFor="3">Seleccione Modelo: </label>
                <br/>

                <Dropdown
                id="3"
                showClear
                value={modelo}
                options={modelos}
                onChange={(e) => setModelo(e.value)}
                placeholder="Seleccionar modelos"
                />
            </div>

            <div className="col-4">
            <Button label="enviar" onClick={guardar}/>
            </div>
          </div>
      </Card>
    </div>
  );
};


export default CrearDispositivos;