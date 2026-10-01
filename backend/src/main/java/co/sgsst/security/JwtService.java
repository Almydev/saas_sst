package co.sgsst.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private final SecretKey key;
    private final long ttlMillis;

    public JwtService(@Value("${app.jwt.secret}") String secret,
                      @Value("${app.jwt.ttl-minutes:120}") long ttlMinutes) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.ttlMillis = ttlMinutes * 60_000;
    }

    public String generate(AuthPrincipal p) {
        Date now = new Date();
        return Jwts.builder()
                .subject(String.valueOf(p.userId()))
                .claim("email", p.email())
                .claim("rol", p.rol())
                .claim("empresaId", p.empresaId())
                .issuedAt(now)
                .expiration(new Date(now.getTime() + ttlMillis))
                .signWith(key)
                .compact();
    }

    /** @return principal, o null si el token es inválido o expiró */
    public AuthPrincipal parse(String token) {
        try {
            Claims c = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
            Number empresa = c.get("empresaId", Number.class);
            return new AuthPrincipal(Long.valueOf(c.getSubject()), c.get("email", String.class),
                    c.get("rol", String.class), empresa == null ? null : empresa.longValue());
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }
}
