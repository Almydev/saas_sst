-- Núcleo SaaS: planes, empresas (tenants) y usuarios

CREATE TABLE plan (
    id                  BIGSERIAL PRIMARY KEY,
    codigo              VARCHAR(20)  NOT NULL UNIQUE,
    nombre              VARCHAR(80)  NOT NULL,
    max_trabajadores    INTEGER,                    -- NULL = sin límite
    precio_mensual_cop  NUMERIC(12,2) NOT NULL
);

INSERT INTO plan (codigo, nombre, max_trabajadores, precio_mensual_cop) VALUES
    ('BASICO', 'Básico (hasta 10 trabajadores)', 10, 0),
    ('PRO',    'Pro (11 a 50 trabajadores)',     50, 0),
    ('PLUS',   'Plus (más de 50 trabajadores)',  NULL, 0);

CREATE TABLE empresa (
    id                  BIGSERIAL PRIMARY KEY,
    razon_social        VARCHAR(200) NOT NULL,
    nit                 VARCHAR(20)  NOT NULL UNIQUE,
    num_trabajadores    INTEGER      NOT NULL CHECK (num_trabajadores >= 0),
    clase_riesgo        SMALLINT     NOT NULL CHECK (clase_riesgo BETWEEN 1 AND 5),
    plan_id             BIGINT       NOT NULL REFERENCES plan(id),
    estado_suscripcion  VARCHAR(20)  NOT NULL DEFAULT 'TRIAL',
    creada_en           TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE usuario (
    id             BIGSERIAL PRIMARY KEY,
    email          VARCHAR(200) NOT NULL UNIQUE,
    password_hash  VARCHAR(100) NOT NULL,
    nombre         VARCHAR(150) NOT NULL,
    rol            VARCHAR(30)  NOT NULL,
    activo         BOOLEAN      NOT NULL DEFAULT TRUE,
    creado_en      TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Un usuario puede pertenecer a varias empresas (asesores SST)
CREATE TABLE membresia (
    usuario_id  BIGINT NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    empresa_id  BIGINT NOT NULL REFERENCES empresa(id) ON DELETE CASCADE,
    rol         VARCHAR(30) NOT NULL,
    PRIMARY KEY (usuario_id, empresa_id)
);
