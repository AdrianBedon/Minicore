import React, {useEffect, useState} from "react";
import { Label, Button, ButtonGroup, Container, ModalFooter, Table, Modal, ModalBody, ModalHeader } from "reactstrap";
import AppNavbar from "./AppNavbar";
import {Link} from "react-router-dom";
import { request, getRole } from "./helper/axios_helper";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useParams } from "react-router-dom";

const ClientList = () => {

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [clientIdToDelete, setClientIdToDelete] = useState(null);
    const [idate, setiDate] = useState(new Date());
    const [fdate, setfDate] = useState(new Date());
    const [ventas, setVentas] = useState([]);
    let { role } = useParams();

    useEffect(() => {
        setLoading(true);

        request(
            'GET',
            'api/clients',
            {   })
            .then(response => {
                setClients(response.data);
                setLoading(false);
            });
    }, []);

    const remove = (id) => {
        setShowConfirmation(true);
        setClientIdToDelete(id);
    }

    const confirmDelete = async () => {
        await request(
            'DELETE',
            `/api/client/${clientIdToDelete}`,
            {})
        .then(() => {
            let updatedClients = clients.filter(i => i.id !== clientIdToDelete);
            setClients(updatedClients);
            setShowConfirmation(false);
        });
    }

    const getVentas = () => {
        request(
            'GET',
            `/api/ventas/total?startDate=${format(idate, 'yyyy-MM-dd')}&endDate=${format(fdate, 'yyyy-MM-dd')}`,
            {})
        .then(response => {
            setVentas(response.data);
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const clientList = clients.map(client => {
        return <tr key={client.id}>
            <td style={{whiteSpace: 'nowrap'}}>{client.username}</td>
            <td>{client.name}</td>
            <td>{client.lastname}</td>
            <td>{client.email}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/clients/" + client.id}>Edit</Button>
                    {role === 'ADMIN' && (<Button size="sm" color="danger" onClick={() => remove(client.id)}>Delete</Button>)}
                </ButtonGroup>
            </td>
        </tr>
    });

    const ventasList = ventas.map(venta => {
        return <tr>
            <td style={{whiteSpace: 'nowrap'}}>{venta.name}</td>
            <td>{venta.lastname}</td>
            <td>$ {venta.monto}</td>
        </tr>
    });


    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/clients/new">Add Client</Button>
                </div>
                <h3>My User List</h3>
                <p/>
                <Table className="mt-4 table-striped" hover responsive style={{borderRadius: 10, overflow: "hidden"}}>
                    <thead>
                        <tr className="table-dark">
                            <th>Username</th>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientList}
                    </tbody>
                </Table>
            </Container>

            <Container fluid>
                <h3>Sales Report</h3>
                <div>
                    <Label>Fecha de Inicio</Label>
                    <DatePicker type="date" name="fechaInicio" id="fechaInicio" selected={idate || ''} onChange={date => setiDate(date)} dateFormat="dd-MM-yyyy"></DatePicker>

                    <Label>Fecha de Fin</Label>
                    <DatePicker type="date" name="fechaFin" id="fechaFin" selected={fdate || ''} onChange={date => setfDate(date)} dateFormat="dd-MM-yyyy"></DatePicker>
                    <div className="float-end">
                        <Button color="success" onClick={() => getVentas()}>Get Report</Button>
                    </div>
                </div>
                <p></p>
                <Table className="mt-4 table-striped" hover responsive style={{borderRadius: 10, overflow: "hidden"}}>
                    <thead>
                        <tr className="table-dark">
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Monto de Ventas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasList}
                    </tbody>
                </Table>
            </Container>

            <Modal isOpen={showConfirmation}>
                <ModalHeader>Confirmation</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this client?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={confirmDelete}>Delete</Button>
                    <Button color="secondary" onClick={() => setShowConfirmation(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ClientList;