package co.sgsst.security;

public record AuthPrincipal(Long userId, String email, String rol, Long empresaId) {}
