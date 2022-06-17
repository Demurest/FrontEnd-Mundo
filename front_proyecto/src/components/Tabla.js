import React, { react, useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import { Link } from "react-router-dom";
import { Card } from "primereact/card";

const Tabla = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [bodegas, setBodegas] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);

  const [bodega, setBodega] = useState(null);
  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);

  const columns = [
    { field: "nombre_dispo", header: "Nombre dispositivo" },
    { field: "nombre_modelo", header: "Nombre modelo" },
    { field: "nombre_marca", header: "Nombre marca" },
    { field: "id", header: "id" },
  ];

  const llamadoBodegas = () => {
    fetch(`http://localhost/BackEnd-Mundo/Proyecto/public/api/bodegas`)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setBodegas(datos);
      });
  };

  const llamadoMarcas = () => {
    fetch(`http://localhost/BackEnd-Mundo/Proyecto/public/api/marca`)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setMarcas(datos);
      });
  };

  const llamadosModelos = () => {
    fetch(`http://localhost/BackEnd-Mundo/Proyecto/public/api/modelos`)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setModelos(datos);
      });
  };

  const llamado = () => {
    fetch(
      `http://localhost/BackEnd-Mundo/Proyecto/public/api/dispositivos?bodId=${
        bodega ?? ""
      }&marId=${marca ?? ""}&modId=${modelo ?? ""}`
    )
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setDispositivos(datos);
      });
  };

  const borrarDispositivo = (id) => {
    fetch(`http://localhost/BackEnd-Mundo/Proyecto/public/api/dispositivo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((respuesta) => respuesta.json())
      .then((datos) => llamado());
  };

  useEffect(() => {
    llamado();
    llamadoBodegas();
    llamadoMarcas();
    llamadosModelos();
  }, []);

  const dynamicColumns = columns.map((col, i) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  const botones = (datos) => {
    return (
      <div>
        <Button
          label="Borrar"
          className="p-button-outlined p-button-danger"
          onClick={() => borrarDispositivo(datos.id)}
        />

        <Link to={`editar/${datos.id}`}>
          <Button style={{marginLeft:"3%"}}label="Editar" className=" p-button-outlined p-button-warning" />
        </Link>
      </div>
    );
  };

  return (
    <div>
      <div>
        <Card style={{marginLeft:"35%", marginBottom:"2%"}}>
        <Dropdown
          style={{marginRight:"2%"}}
          showClear
          value={bodega}
          options={bodegas}
          onChange={(e) => setBodega(e.value)}
          placeholder="Seleccionar bodega"
        />

        <Dropdown
          style={{marginRight:"2%"}}
          showClear
          value={marca}
          options={marcas}
          onChange={(e) => setMarca(e.value)}
          placeholder="Seleccionar marca"
        />

        <Dropdown
          style={{marginRight:"2%"}}
          showClear
          value={modelo}
          options={modelos}
          onChange={(e) => setModelo(e.value)}
          placeholder="Seleccionar modelos"
        />
        

        <Button style={{marginRight:"2%"}} label="Enviar" className="p-button-outlined " onClick={() => llamado()} />

        <Link to={"/crear"} params={{ listaBodega: bodegas }}>
          <Button style={{marginRight:"2%"}} label="Crear" className="p-button-outlined p-button-success" />
        </Link>
        </Card>

        <Card style={{width:"80%", margin:"auto"}}>
          <DataTable value={dispositivos} responsiveLayout="scroll">
            {dynamicColumns}
            <Column body={botones} field={""} header={"Acciones"} />
          </DataTable>
        </Card>
      </div>
    </div>
  );
};

export default Tabla;
