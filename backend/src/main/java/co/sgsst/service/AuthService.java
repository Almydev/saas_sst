package co.sgsst.service;

import co.sgsst.dto.AuthResponse;
import co.sgsst.dto.LoginRequest;
import co.sgsst.dto.RegisterRequest;
import co.sgsst.dto.UsuarioResponse;
import co.sgsst.exception.ApiException;
import co.sgsst.model.Empresa;
import co.sgsst.model.Membresia;
import co.sgsst.model.Plan;
import co.sgsst.model.Rol;
import co.sgsst.model.Usuario;
import co.sgsst.repository.EmpresaRepository;
import co.sgsst.repository.MembresiaRepository;
import co.sgsst.repository.PlanRepository;
import co.sgsst.repository.UsuarioRepository;
import co.sgsst.security.AuthPrincipal;
import co.sgsst.security.JwtService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UsuarioRepository usuarios;
    private final EmpresaRepository empresas;
    private final PlanRepository planes;
    private final MembresiaRepository membresias;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    /** Plan según tamaño de empresa (alineado con Res. 0312/2019): hasta 10, 11 a 50, más de 50 trabajadores. */
    static String codigoPlan(int trabajadores) {
        if (trabajadores <= 10) return "BASICO";
        if (trabajadores <= 50) return "PRO";
        return "PLUS";
    }

    @Transactional
    public AuthResponse register(RegisterRequest r) {
        String email = r.email().trim().toLowerCase();
        if (usuarios.existsByEmailIgnoreCase(email))
            throw new ApiException(HttpStatus.CONFLICT, "Ya existe una cuenta con ese correo");
        if (empresas.existsByNit(r.nit()))
            throw new ApiException(HttpStatus.CONFLICT, "Ya existe una empresa registrada con ese NIT");

        Plan plan = planes.findByCodigo(codigoPlan(r.numTrabajadores()))
                .orElseThrow(() -> new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Plan no configurado"));

        Empresa e = new Empresa();
        e.setRazonSocial(r.razonSocial().trim());
        e.setNit(r.nit());
        e.setNumTrabajadores(r.numTrabajadores());
        e.setClaseRiesgo(r.claseRiesgo());
        e.setPlan(plan);
        e = empresas.save(e);

        Usuario u = new Usuario();
        u.setEmail(email);
        u.setNombre(r.nombre().trim());
        u.setPasswordHash(encoder.encode(r.password()));
        u.setRol(Rol.ADMIN_EMPRESA);
        u = usuarios.save(u);

        membresias.save(new Membresia(u.getId(), e.getId(), Rol.ADMIN_EMPRESA));
        return respuesta(u, e);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest r) {
        Usuario u = usuarios.findByEmailIgnoreCase(r.email().trim())
                .filter(x -> Boolean.TRUE.equals(x.getActivo()) && encoder.matches(r.password(), x.getPasswordHash()))
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Correo o contraseña incorrectos"));
        List<Membresia> ms = membresias.findByUsuarioId(u.getId());
        Empresa e = ms.isEmpty() ? null : empresas.findById(ms.get(0).getEmpresaId()).orElse(null);
        return respuesta(u, e);
    }

    @Transactional(readOnly = true)
    public UsuarioResponse me(AuthPrincipal p) {
        Usuario u = usuarios.findById(p.userId())
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Sesión inválida"));
        Empresa e = p.empresaId() == null ? null : empresas.findById(p.empresaId()).orElse(null);
        return usuario(u, e);
    }

    private AuthResponse respuesta(Usuario u, Empresa e) {
        String token = jwt.generate(new AuthPrincipal(u.getId(), u.getEmail(), u.getRol().name(),
                e == null ? null : e.getId()));
        return new AuthResponse(token, usuario(u, e));
    }

    private UsuarioResponse usuario(Usuario u, Empresa e) {
        return new UsuarioResponse(u.getId(), u.getNombre(), u.getEmail(), u.getRol().name(),
                e == null ? null : e.getId(), e == null ? null : e.getRazonSocial(),
                e == null ? null : e.getPlan().getNombre(), e == null ? null : e.getEstadoSuscripcion());
    }
}
