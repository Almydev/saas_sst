package co.sgsst.model;

import java.io.Serializable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class MembresiaId implements Serializable {
    private Long usuarioId;
    private Long empresaId;

    public MembresiaId(Long usuarioId, Long empresaId) {
        this.usuarioId = usuarioId;
        this.empresaId = empresaId;
    }
}
