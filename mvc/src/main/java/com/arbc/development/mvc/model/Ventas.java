package com.arbc.development.mvc.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "ventas")
public class Ventas {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable=false )
    @JsonBackReference
    private Cliente cliente;

    private double monto;
    private Date fechaVenta;
}
