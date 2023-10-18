package com.arbc.development.mvc.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VentasRepository extends JpaRepository<Ventas, Long>{
    Ventas findById(long id);

    @Query("SELECT u.name, u.lastname, SUM(v.monto) as MontoTotal FROM Cliente u " +
           "INNER JOIN Ventas v ON u.id = v.cliente.id " +
           "WHERE v.fechaVenta BETWEEN :startDate AND :endDate " +
           "GROUP BY u.name, u.lastname, u.id")
    List<Object[]> getTotalMontoByUserAndDateRange(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
