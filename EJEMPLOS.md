# 💼 Guía de Uso - Ejemplos Prácticos

Esta guía te mostrará cómo usar el sistema de nómina con ejemplos paso a paso.

## 📋 Tabla de Contenidos

1. [Configuración Inicial](#configuración-inicial)
2. [Gestión de Empleados](#gestión-de-empleados)
3. [Organización de la Empresa](#organización-de-la-empresa)
4. [Cálculo de Nómina](#cálculo-de-nómina)
5. [Sistema de Bonos](#sistema-de-bonos)
6. [Consulta de Bitácora](#consulta-de-bitácora)
7. [Casos de Uso Comunes](#casos-de-uso-comunes)

---

## 🚀 Configuración Inicial

### Escenario: Nueva empresa de tecnología

**Empresa:** TechCorp México  
**Empleados:** 5 personas  
**Periodicidad de nómina:** Quincenal

### Paso 1: Crear Departamentos

1. Ir a **Departamentos** → **Nuevo Departamento**

```
📁 Recursos Humanos
   Código: RH
   
📁 Desarrollo
   Código: DEV
   
📁 Ventas
   Código: VEN
```

### Paso 2: Crear Puestos

1. Ir a **Puestos** → **Nuevo Puesto**

```
👤 Gerente de RH
   Nivel: Sr
   Salario Base: $2,000/día
   
👨‍💻 Desarrollador Senior
   Nivel: Sr
   Salario Base: $1,500/día
   
👨‍💻 Desarrollador Junior
   Nivel: Jr
   Salario Base: $800/día
   
💼 Ejecutivo de Ventas
   Nivel: Mid
   Salario Base: $1,000/día
```

---

## 👥 Gestión de Empleados

### Ejemplo 1: Contratar un Desarrollador

**Escenario:** Contratar a Ana García como Desarrolladora Senior

1. Ir a **Empleados** → **Nuevo Empleado**
2. Llenar los datos:

```
Nombre(s): Ana
Apellidos: García López
CURP: GALA900515MDFRRN03
Fecha de Contratación: 2026-02-01
Salario Diario: $1,500
Estado: Activo
```

3. Click en **Guardar**
4. El sistema asignará un ID único

### Ejemplo 2: Contratar Varios Empleados

**Empleados a contratar:**

```
👨 Carlos Martínez (Desarrollador Jr)
   CURP: MAMC950820HDFRRL09
   Salario: $800/día
   Ingreso: 2026-02-01

👩 Laura Sánchez (Ejecutiva Ventas)
   CURP: SALL880305MDFNLR07
   Salario: $1,000/día
   Ingreso: 2026-02-01

👨 Roberto Pérez (Gerente RH)
   CURP: PERR850120HDFRZB04
   Salario: $2,000/día
   Ingreso: 2026-01-15
```

Repetir el proceso de creación para cada empleado.

---

## 🏢 Organización de la Empresa

### Ejemplo: Asignar Empleados a Departamentos

**Estructura organizacional:**

```
TechCorp México
│
├── 📁 Recursos Humanos (RH)
│   └── Roberto Pérez (Gerente RH)
│
├── 📁 Desarrollo (DEV)
│   ├── Ana García (Desarrollador Sr)
│   └── Carlos Martínez (Desarrollador Jr)
│
└── 📁 Ventas (VEN)
    └── Laura Sánchez (Ejecutiva)
```

**Proceso de asignación:**
1. Al crear el empleado, el sistema crea automáticamente una asignación
2. Las asignaciones vinculan: Empleado + Departamento + Puesto
3. Se registra la fecha de inicio

---

## 💰 Cálculo de Nómina

### Ejemplo 1: Nómina Quincenal Simple

**Periodo:** Del 1 al 15 de Febrero, 2026

1. Ir a **Nómina** → **Nuevo Periodo**
2. Configurar:

```
Tipo de Periodo: Quincenal
Fecha de Inicio: 2026-02-01
Fecha de Final: 2026-02-15
```

3. Click en **Crear Periodo**

**Resultado Automático:**

El sistema genera entradas para cada empleado activo:

```
👨 Roberto Pérez (Gerente RH)
   Salario Base: $2,000 × 15 días = $30,000
   Bonos: $0
   Deducciones: $0
   Pago Neto: $30,000

👩 Ana García (Desarrollador Sr)
   Salario Base: $1,500 × 15 días = $22,500
   Bonos: $0
   Deducciones: $0
   Pago Neto: $22,500

👨 Carlos Martínez (Desarrollador Jr)
   Salario Base: $800 × 15 días = $12,000
   Bonos: $0
   Deducciones: $0
   Pago Neto: $12,000

👩 Laura Sánchez (Ejecutiva)
   Salario Base: $1,000 × 15 días = $15,000
   Bonos: $0
   Deducciones: $0
   Pago Neto: $15,000

═══════════════════════════════════
TOTAL NÓMINA: $79,500
```

### Ejemplo 2: Empleado con Ingreso Parcial

**Escenario:** Juan Torres ingresó el 10 de Febrero

```
👨 Juan Torres
   Salario: $1,200/día
   Ingreso: 2026-02-10
   
Cálculo para periodo 01-15 Feb:
   Días trabajados: 6 días (del 10 al 15)
   Pago: $1,200 × 6 = $7,200
```

---

## 🎁 Sistema de Bonos

### Ejemplo 1: Bono de Puntualidad (Porcentaje)

**Crear bono de puntualidad del 5%**

1. Ir a **Bonos** → **Nuevo Bono**
2. Configurar:

```
Nombre: Bono de Puntualidad
Tipo: Porcentaje
Monto: 5
Activo: ✅ Sí
```

**Impacto en Nómina Quincenal:**

```
👨 Roberto Pérez
   Salario Base: $30,000
   Bono 5%: $1,500
   Pago Neto: $31,500

👩 Ana García
   Salario Base: $22,500
   Bono 5%: $1,125
   Pago Neto: $23,625

👨 Carlos Martínez
   Salario Base: $12,000
   Bono 5%: $600
   Pago Neto: $12,600

═══════════════════════════
AHORA TOTAL: $82,975
Incremento: +$3,475 (4.37%)
```

### Ejemplo 2: Bono de Despensa (Monto Fijo)

**Crear bono de despensa de $500**

1. Ir a **Bonos** → **Nuevo Bono**
2. Configurar:

```
Nombre: Bono de Despensa
Tipo: Fijo
Monto: 500
Activo: ✅ Sí
```

**Impacto en Nómina:**

Cada empleado recibe $500 extra, sin importar su salario.

```
👨 Roberto Pérez: +$500
👩 Ana García: +$500
👨 Carlos Martínez: +$500
👩 Laura Sánchez: +$500

Total en bonos: $2,000
```

### Ejemplo 3: Múltiples Bonos Activos

**Escenario:** Puntualidad (5%) + Despensa ($500) + Productividad (3%)

```
👨 Carlos Martínez (Desarrollador Jr)
   Salario Base: $12,000
   
   Bonos:
   • Puntualidad 5%: $600
   • Productividad 3%: $360
   • Despensa fija: $500
   ─────────────────────
   Total Bonos: $1,460
   
   Pago Neto: $13,460
```

### Ejemplo 4: Desactivar un Bono

**Escenario:** La empresa decide suspender el bono de productividad

1. Ir a **Bonos**
2. Buscar "Bono de Productividad"
3. Cambiar estado a **Inactivo**

**Resultado:** 
- El bono ya no se aplicará en nuevos periodos de nómina
- Los periodos anteriores no se afectan

---

## 📊 Consulta de Bitácora

### Ejemplo 1: Ver Cambios de un Empleado

**Escenario:** Revisar el historial de Ana García

1. Ir a **Bitácora**
2. Buscar o filtrar por "Ana García"

```
📝 Registro de Cambios - Ana García

[2026-02-01 10:15:23]
Tipo: CREACIÓN
Empleado creado
Valores: firstName: Ana, lastName: García López...

[2026-02-05 14:30:00]
Tipo: SALARIO_MODIFICADO
Cambio: $1,500 → $1,600
Razón: Aumento por desempeño

[2026-02-15 09:00:00]
Tipo: ASIGNACIÓN
Nueva asignación a proyecto especial
Departamento: Desarrollo
```

### Ejemplo 2: Auditoría Mensual

**Objetivo:** Revisar todos los cambios del mes

1. Ir a **Bitácora**
2. Filtrar por rango de fechas
3. Exportar reporte (si está disponible)

---

## 🎯 Casos de Uso Comunes

### Caso 1: Aumento de Salario

**Escenario:** Carlos Martínez recibe un aumento de $800 a $950/día

1. Ir a **Empleados**
2. Buscar "Carlos Martínez"
3. Editar → Cambiar salario diario a $950
4. Guardar

**Resultado:**
- El cambio se registra en la bitácora
- Los siguientes periodos de nómina usan el nuevo salario
- Los periodos anteriores no se modifican

### Caso 2: Empleado Inactivo

**Escenario:** Laura Sánchez renuncia el 28 de Febrero

1. Ir a **Empleados**
2. Buscar "Laura Sánchez"
3. Cambiar estado a **Inactivo**
4. Guardar

**Resultado:**
- Ya no aparece en nuevos periodos de nómina
- Su historial se conserva
- Puede reactivarse si es necesario

### Caso 3: Nómina Mensual

**Escenario:** Cambiar a nómina mensual para gerentes

1. Ir a **Nómina** → **Nuevo Periodo**
2. Configurar:

```
Tipo: Mensual
Fecha Inicio: 2026-02-01
Fecha Final: 2026-02-29
```

**Cálculo:**
```
👨 Roberto Pérez (Gerente)
   $2,000/día × 30 días = $60,000
   
Con bonos activos (5% puntualidad + $500 despensa):
   Base: $60,000
   Bono 5%: $3,000
   Despensa: $500
   ───────────────
   Total: $63,500
```

### Caso 4: Nuevo Departamento y Equipo

**Escenario:** Crear departamento de Marketing con 3 empleados

**Paso 1: Crear Departamento**
```
Departamento: Marketing
Código: MKT
```

**Paso 2: Crear Puestos**
```
• Director de Marketing (Sr) - $1,800/día
• Coordinador de Marketing (Mid) - $1,200/día
• Diseñador Gráfico (Jr) - $700/día
```

**Paso 3: Contratar Empleados**
```
• María González - Directora
• Pedro Ramírez - Coordinador
• Sofía Luna - Diseñadora
```

**Paso 4: Primera Nómina**
```
Total Departamento Marketing:
$1,800 + $1,200 + $700 = $3,700/día
Quincenal: $3,700 × 15 = $55,500
```

### Caso 5: Periodo de Prueba

**Escenario:** Nuevo empleado con salario reducido durante prueba

**Opción 1: Salario bajo inicial**
```
Mes 1-3 (Prueba): $800/día
Mes 4+: $1,000/día

1. Crear empleado con $800
2. Al terminar prueba, editar y cambiar a $1,000
```

**Opción 2: Crear asignación temporal**
```
Asignación 1 (Temp):
- Fecha inicio: 01/Feb
- Fecha fin: 30/Abr
- Salario: $800

Asignación 2 (Permanente):
- Fecha inicio: 01/May
- Fecha fin: -
- Salario: $1,000
```

---

## 📈 Análisis y Reportes

### Calcular Costo Mensual por Departamento

**Ejemplo:**

```
📊 Costo Mensual - Febrero 2026

📁 Recursos Humanos
   1 empleado × $2,000/día × 30 = $60,000

📁 Desarrollo
   2 empleados × ($1,500 + $800) × 30 = $69,000

📁 Ventas
   1 empleado × $1,000/día × 30 = $30,000

📁 Marketing
   3 empleados × ($1,800 + $1,200 + $700) × 30 = $111,000

═══════════════════════════════════════
TOTAL MENSUAL: $270,000

Con bonos estimados (7%): +$18,900
───────────────────────────────────────
TOTAL CON BONOS: $288,900
```

### Proyección Anual

```
💼 Proyección Anual 2026

Salarios base: $270,000 × 12 = $3,240,000
Bonos (7%): +$226,800
Aguinaldo (15 días): +$135,000*
───────────────────────────────────────
PROYECCIÓN TOTAL: $3,601,800

*Cálculo: (Total empleados × salario promedio × 15 días)
```

---

## 💡 Consejos y Mejores Prácticas

### ✅ Hacer

1. **Actualizar datos regularmente**
   - Mantener CURP correcto
   - Actualizar salarios cuando cambian
   - Marcar empleados inactivos

2. **Revisar nómina antes de cerrar**
   - Verificar que todos los empleados estén incluidos
   - Comprobar bonos activos
   - Revisar cálculos

3. **Usar la bitácora**
   - Consultar historial antes de cambios grandes
   - Verificar quién hizo qué cambio
   - Auditorías periódicas

4. **Planificar bonos**
   - Activar/desactivar según temporada
   - Documentar criterios de aplicación
   - Calcular impacto antes de aplicar

### ❌ Evitar

1. **No borrar registros**
   - Mejor marcar como inactivo
   - Preservar historial

2. **No modificar periodos cerrados**
   - Los periodos pagados no deben editarse
   - Crear correcciones en nuevo periodo

3. **No usar CURP duplicados**
   - Cada empleado debe tener CURP único
   - Validar antes de guardar

4. **No activar todos los bonos siempre**
   - Evaluar impacto financiero
   - Bonos deben tener criterio claro

---

## 📞 Soporte

Si necesitas ayuda adicional:

1. Consulta el [README.md](README.md) principal
2. Revisa la [Documentación Técnica](API.md)
3. Consulta [Solución de Problemas](README.md#-solución-de-problemas)
4. Abre un issue en GitHub

---

**¡Sistema de Nómina - TechCorp México 2026!** 🎉
