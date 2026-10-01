package co.sgsst.repository;

import co.sgsst.model.Plan;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    Optional<Plan> findByCodigo(String codigo);
}
