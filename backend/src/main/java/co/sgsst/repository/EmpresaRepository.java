package co.sgsst.repository;

import co.sgsst.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    boolean existsByNit(String nit);
}
