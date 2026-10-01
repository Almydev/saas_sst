package co.sgsst.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Relación usuario-empresa: un asesor SST puede pertenecer a varias empresas. */
@Entity
@Table(name = "membresia")
@IdClass(MembresiaId.class)
@Getter
@Setter
@NoArgsConstructor
public class Membresia {
    @Id
    @Column(name = "usuario_id")
    private Long usuarioId;

    @Id
    @Column(name = "empresa_id")
    private Long empresaId;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    public Membresia(Long usuarioId, Long empresaId, Rol rol) {
        this.usuarioId = usuarioId;
        this.empresaId = empresaId;
        this.rol = rol;
    }
}
