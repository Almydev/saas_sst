package co.sgsst.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "empresa")
@Getter
@Setter
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "razon_social")
    private String razonSocial;

    private String nit;

    @Column(name = "num_trabajadores")
    private Integer numTrabajadores;

    @Column(name = "clase_riesgo")
    private Short claseRiesgo;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @Column(name = "estado_suscripcion")
    private String estadoSuscripcion = "TRIAL";

    @Column(name = "creada_en", insertable = false, updatable = false)
    private OffsetDateTime creadaEn;
}
