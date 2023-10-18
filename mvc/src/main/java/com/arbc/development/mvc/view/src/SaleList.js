import React, {useEffect, useState} from "react";
import { Button, ButtonGroup, Container, ModalFooter, Table, Modal, ModalBody, ModalHeader } from "reactstrap";
import AppNavbar from "./AppNavbar";
import {Link} from "react-router-dom";
import { request } from "./helper/axios_helper";

const SaleList = () => {

    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [saleIdToDelete, setSaleIdToDelete] = useState(null);

    useEffect(() => {
        setLoading(true);

        request(
            'GET',
            'api/ventas',
            {   })
            .then(response => {
                setSales(response.data);
                setLoading(false);
            });
    }, []);

    const remove = (id) => {
        setShowConfirmation(true);
        setSaleIdToDelete(id);
    }

    const confirmDelete = async () => {
        await request(
            'DELETE',
            `/api/venta/${saleIdToDelete}`,
            {})
        .then(() => {
            let updatedSales = sales.filter(i => i.id !== saleIdToDelete);
            setSales(updatedSales);
            setShowConfirmation(false);
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const saleList = sales.map(sale => {
        return <tr key={sale.id}>
            <td style={{whiteSpace: 'nowrap'}}>{sale.cliente}</td>
            <td>{sale.monto}</td>
            <td>{new Date(sale.fechaVenta).toLocaleDateString()}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/sales/" + sale.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(sale.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/sales/new">Add Sale</Button>
                </div>
                <h3>My Sale List</h3>
                <p/>
                <Table className="mt-4 table-striped" hover responsive style={{borderRadius: 10, overflow: "hidden"}}>
                    <thead>
                        <tr className="table-dark">
                            <th>Cliente</th>
                            <th>Valor</th>
                            <th>Fecha de Venta</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {saleList}
                    </tbody>
                </Table>
            </Container>

            <Modal isOpen={showConfirmation}>
                <ModalHeader>Confirmation</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this sale?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={confirmDelete}>Delete</Button>
                    <Button color="secondary" onClick={() => setShowConfirmation(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default SaleList;