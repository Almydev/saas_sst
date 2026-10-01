package co.sgsst.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "plan")
@Getter
@Setter
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;
    private String nombre;

    @Column(name = "max_trabajadores")
    private Integer maxTrabajadores;

    @Column(name = "precio_mensual_cop")
    private BigDecimal precioMensualCop;
}
