package co.sgsst.dto;

public record UsuarioResponse(
        Long id, String nombre, String email, String rol,
        Long empresaId, String empresa, String plan, String estadoSuscripcion) {}
