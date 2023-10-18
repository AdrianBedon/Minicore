package com.arbc.development.mvc.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.arbc.development.mvc.dto.VentasDto;
import com.arbc.development.mvc.model.Ventas;
import com.arbc.development.mvc.model.VentasRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
class VentasController {
    private final Logger log = LoggerFactory.getLogger(VentasController.class);
    private VentasRepository ventasRepository;

    public VentasController(VentasRepository ventasRepository)
    {
        this.ventasRepository = ventasRepository;
    }

    @GetMapping("/ventas")
    public ResponseEntity<Collection<Ventas>> ventas() {
        return ResponseEntity.ok().body(ventasRepository.findAll());
    }

    @GetMapping("/venta/{id}")
    ResponseEntity<?> getVenta(@PathVariable Long id) {
        Optional<Ventas> venta = ventasRepository.findById(id);
        return venta.map(response -> ResponseEntity.ok().body(response))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/venta")
    ResponseEntity<Ventas> createVenta(@Valid @RequestBody Ventas venta) throws URISyntaxException {
        log.info("Request to create sale: {}", venta);
        Ventas result = ventasRepository.save(venta);
        return ResponseEntity.created(new URI("/api/client/" + result.getId()))
        .body(result);  
    }

    @GetMapping("/ventas/total")
    public ResponseEntity<Collection<VentasDto>> getTotalMontoByUserAndDateRange(
            @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        List<Object[]> dtos = ventasRepository.getTotalMontoByUserAndDateRange(startDate, endDate);

        List<VentasDto> result = new ArrayList<>();
        for (Object[] dto : dtos) {
            VentasDto vdto = new VentasDto();
            vdto.setName((String) dto[0]);
            vdto.setLastname((String) dto[1]);
            vdto.setMonto((Double) dto[2]);
            result.add(vdto);
        }

        return ResponseEntity.ok().body(result);
    }
}
