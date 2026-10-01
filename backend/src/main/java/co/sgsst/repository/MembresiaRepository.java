package co.sgsst.repository;

import co.sgsst.model.Membresia;
import co.sgsst.model.MembresiaId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MembresiaRepository extends JpaRepository<Membresia, MembresiaId> {
    List<Membresia> findByUsuarioId(Long usuarioId);
}
