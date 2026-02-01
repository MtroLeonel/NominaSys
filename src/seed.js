require('dotenv').config();
const db = require('./models');

async function seed() {
  try {
    await db.sequelize.sync({ force: true });

    const [admin] = await Promise.all([
      db.User.create({ email: 'admin@sigch.local', passwordHash: 'changeme', role: 'admin', twoFactorEnabled: false })
    ]);

    const departments = await db.Department.bulkCreate([
      { name: 'TI', code: 'TI', status: 'activo' },
      { name: 'Ventas', code: 'VEN', status: 'activo' }
    ], { returning: true });

    const positions = await db.Position.bulkCreate([
      { name: 'Senior Dev', level: 'Sr', baseSalary: 1200, status: 'activo' },
      { name: 'Ejecutiva de Ventas', level: 'Mid', baseSalary: 800, status: 'activo' }
    ], { returning: true });

    const employees = await db.Employee.bulkCreate([
      { firstName: 'Juan', lastName: 'Pérez', curp: 'JUAP800101HDFRRN09', hireDate: '2024-01-15', dailySalary: 1200 },
      { firstName: 'María', lastName: 'López', curp: 'MALO830202MDFLLR05', hireDate: '2023-11-02', dailySalary: 800 }
    ], { returning: true });

    await db.Assignment.bulkCreate([
      {
        employeeId: employees[0].id,
        departmentId: departments[0].id,
        positionId: positions[0].id,
        dailySalary: 1200,
        startDate: '2024-01-15'
      },
      {
        employeeId: employees[1].id,
        departmentId: departments[1].id,
        positionId: positions[1].id,
        dailySalary: 800,
        startDate: '2023-11-02'
      }
    ]);

    const bonusPuntualidad = await db.Bonus.create({ name: 'Bono de puntualidad', amountType: 'percent', amount: 5, active: true });

    const period = await db.PayrollPeriod.create({ type: 'quincenal', startDate: '2024-02-01', endDate: '2024-02-15', status: 'abierto' });

    await db.PayrollEntry.bulkCreate([
      {
        payrollPeriodId: period.id,
        employeeId: employees[0].id,
        daysWorked: 15,
        absences: 0,
        sickLeaveDays: 0,
        vacationDays: 0,
        grossSalary: 18000,
        imss: 1200,
        isr: 0,
        bonuses: 900, // 5% puntualidad
        netPay: 17700
      },
      {
        payrollPeriodId: period.id,
        employeeId: employees[1].id,
        daysWorked: 14,
        absences: 1,
        sickLeaveDays: 0,
        vacationDays: 0,
        grossSalary: 11200,
        imss: 750,
        isr: 0,
        bonuses: 560, // 5% puntualidad
        netPay: 10450
      }
    ]);

    await db.ChangeLog.bulkCreate([
      {
        employeeId: employees[0].id,
        changedBy: admin.id,
        changeType: 'salario',
        previousValue: '1150',
        newValue: '1200',
        reason: 'Ajuste por desempeño'
      },
      {
        employeeId: employees[1].id,
        changedBy: admin.id,
        changeType: 'departamento',
        previousValue: 'Administración',
        newValue: 'Ventas',
        reason: 'Reasignación comercial'
      }
    ]);

    console.log('✓ Seed completado');
    process.exit(0);
  } catch (err) {
    console.error('✗ Error en seed:', err);
    process.exit(1);
  }
}

seed();
