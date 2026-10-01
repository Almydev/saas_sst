package co.sgsst.dto;

import jakarta.validation.constraints.*;

public record RegisterRequest(
        @NotBlank @Size(max = 200) String razonSocial,
        @NotBlank @Pattern(regexp = "^[0-9]{6,12}(-?[0-9])?$", message = "NIT inválido") String nit,
        @NotNull @Min(1) Integer numTrabajadores,
        @NotNull @Min(1) @Max(5) Short claseRiesgo,
        @NotBlank @Size(max = 150) String nombre,
        @NotBlank @Email @Size(max = 200) String email,
        @NotBlank @Size(min = 8, max = 72, message = "La contraseña debe tener entre 8 y 72 caracteres") String password) {}
