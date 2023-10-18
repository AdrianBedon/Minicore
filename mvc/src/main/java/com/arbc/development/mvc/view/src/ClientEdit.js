import React, {useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { request } from "./helper/axios_helper";

const ClientEdit = () => {
    const initialFormState = {
        username: '',
        name: '',
        lastname: '',
        email: ''
    };
    const [client, setClient] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            request(
                'GET',
                `/api/client/${id}`,
                {})
                .then(response => {
                    setClient(response.data);
                });
        }
    }, [id, setClient]);

    const handleChange = (event) => {
        const {name, value} = event.target
        setClient({...client, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await request(
            (client.id) ? 'PUT' : 'POST',
            `/api/client${client.id ? `/${client.id}` : ''}`,
            JSON.stringify(client));
        setClient(initialFormState);
        navigate('/clients');
    }

    const title = <h2>{client.id ? 'Edit Client' : 'Add Client'}</h2>

    return (<div>
        <AppNavbar/>
        <Container>
            {title}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Username</Label>
                    <Input type="text" name="username" id="username" value={client.username || ''}
                        onChange={handleChange} autoComplete="username"/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={client.name || ''}
                        onChange={handleChange} autoComplete="name"/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Lastname</Label>
                    <Input type="text" name="lastname" id="lastname" value={client.lastname || ''}
                        onChange={handleChange} autoComplete="lastname"/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Email</Label>
                    <Input type="text" name="email" id="email" value={client.email || ''}
                        onChange={handleChange} autoComplete="email"/>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/clients">Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
    </div>)
};

export default ClientEdit;