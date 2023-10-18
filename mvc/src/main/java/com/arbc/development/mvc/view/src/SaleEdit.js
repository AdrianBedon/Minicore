import React, {useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import AppNavbar from "./AppNavbar";
import { request } from "./helper/axios_helper";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const SaleEdit = () => {
    const initialFormState = {
        user: '',
        monto: '',
        fechaVenta: new Date(),
    };
    const [sale, setSale] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();
    const date = new Date(sale.fechaVenta);

    useEffect(() => {
        if (id !== 'new') {
            request(
                'GET',
                `/api/venta/${id}`,
                {})
                .then(response => {
                    setSale(response.data);
                });
        }
    }, [id, setSale]);

    const handleChange = (event) => {
        const {name, value} = event.target
        setSale({...sale, [name]: value})
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await request(
            (sale.id) ? 'PUT' : 'POST',
            `/api/venta${sale.id ? `/${sale.id}` : ''}`,
            JSON.stringify(sale));
        setSale(initialFormState);
        navigate('/sales');
    }

    const title = <h2>{sale.id ? 'Edit Sale' : 'Add Sale'}</h2>

    return (<div>
        <AppNavbar/>
        <Container>
            {title}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Username</Label>
                    <Input type="text" name="username" id="username" value={sale.id_cliente || ''}
                        onChange={handleChange} autoComplete="username"/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Monto</Label>
                    <Input type="text" name="monto" id="monto" value={sale.monto || ''}
                        onChange={handleChange} autoComplete="monto"/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Fecha de la Venta</Label>
                    <DatePicker type="date" name="fecha'Venta" id="fecha" selected={date || ''} onChange={date => handleChange({target: {value: date, name: "fechaVenta"}})} dateFormat="dd-MM-yyyy"></DatePicker>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/sales">Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
    </div>)
};

export default SaleEdit;