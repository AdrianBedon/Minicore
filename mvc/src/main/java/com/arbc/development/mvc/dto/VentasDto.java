package com.arbc.development.mvc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VentasDto {
    private Long id;
    private String name;
    private String lastname;
    private double monto;
}
