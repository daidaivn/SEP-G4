using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CarpentryWorkshopAPI.Models
{
    public partial class SEPG4CCMSContext : DbContext
    {
        public SEPG4CCMSContext()
        {
        }

        public SEPG4CCMSContext(DbContextOptions<SEPG4CCMSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Contract> Contracts { get; set; } = null!;
        public virtual DbSet<ContractType> ContractTypes { get; set; } = null!;
        public virtual DbSet<ContractTypeStatusHistory> ContractTypeStatusHistories { get; set; } = null!;
        public virtual DbSet<ContractsStatusHistory> ContractsStatusHistories { get; set; } = null!;
        public virtual DbSet<Country> Countries { get; set; } = null!;
        public virtual DbSet<Degree> Degrees { get; set; } = null!;
        public virtual DbSet<DegreesStatusHistory> DegreesStatusHistories { get; set; } = null!;
        public virtual DbSet<Department> Departments { get; set; } = null!;
        public virtual DbSet<DepartmentsStatusHistory> DepartmentsStatusHistories { get; set; } = null!;
        public virtual DbSet<Dependent> Dependents { get; set; } = null!;
        public virtual DbSet<DependentsStatusHistory> DependentsStatusHistories { get; set; } = null!;
        public virtual DbSet<Employee> Employees { get; set; } = null!;
        public virtual DbSet<EmployeeDegree> EmployeeDegrees { get; set; } = null!;
        public virtual DbSet<EmployeesStatusHistory> EmployeesStatusHistories { get; set; } = null!;
        public virtual DbSet<HistoryChangeShiftType> HistoryChangeShiftTypes { get; set; } = null!;
        public virtual DbSet<HistoryChangeTeam> HistoryChangeTeams { get; set; } = null!;
        public virtual DbSet<HistoryChangeTimeTracking> HistoryChangeTimeTrackings { get; set; } = null!;
        public virtual DbSet<Page> Pages { get; set; } = null!;
        public virtual DbSet<PageStatusHistory> PageStatusHistories { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<RolesEmployee> RolesEmployees { get; set; } = null!;
        public virtual DbSet<RolesStatusHistory> RolesStatusHistories { get; set; } = null!;
        public virtual DbSet<ShiftType> ShiftTypes { get; set; } = null!;
        public virtual DbSet<Team> Teams { get; set; } = null!;
        public virtual DbSet<TimeTracking> TimeTrackings { get; set; } = null!;
        public virtual DbSet<UnitCost> UnitCosts { get; set; } = null!;
        public virtual DbSet<UnitCostStatusHistory> UnitCostStatusHistories { get; set; } = null!;
        public virtual DbSet<UserAccount> UserAccounts { get; set; } = null!;
        public virtual DbSet<UserAccountsStatusHistory> UserAccountsStatusHistories { get; set; } = null!;
        public virtual DbSet<Work> Works { get; set; } = null!;
        public virtual DbSet<WorkArea> WorkAreas { get; set; } = null!;
        public virtual DbSet<WorkSchedule> WorkSchedules { get; set; } = null!;
        public virtual DbSet<WorkScheduleStatusHistory> WorkScheduleStatusHistories { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(local);Database=SEP-G4-CCMS;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contract>(entity =>
            {
                entity.Property(e => e.ContractId).HasColumnName("ContractID");

                entity.Property(e => e.ContractCode).HasMaxLength(20);

                entity.Property(e => e.ContractTypeId).HasColumnName("ContractTypeID");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.ContractType)
                    .WithMany(p => p.Contracts)
                    .HasForeignKey(d => d.ContractTypeId)
                    .HasConstraintName("FK_Contracts_ContractType");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Contracts)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__Contracts__Emplo__6383C8BA");
            });

            modelBuilder.Entity<ContractType>(entity =>
            {
                entity.ToTable("ContractType");

                entity.Property(e => e.ContractTypeId).HasColumnName("ContractTypeID");

                entity.Property(e => e.ContractName).HasMaxLength(100);
            });

            modelBuilder.Entity<ContractTypeStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__Contract__4D7B4ADD05DB979F");

                entity.ToTable("ContractTypeStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.ContractTypeId).HasColumnName("ContractTypeID");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.HasOne(d => d.ContractType)
                    .WithMany(p => p.ContractTypeStatusHistories)
                    .HasForeignKey(d => d.ContractTypeId)
                    .HasConstraintName("FK__ContractT__Contr__66603565");
            });

            modelBuilder.Entity<ContractsStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__Contract__4D7B4ADDFBF9E910");

                entity.ToTable("ContractsStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.ContractId).HasColumnName("ContractID");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.HasOne(d => d.Contract)
                    .WithMany(p => p.ContractsStatusHistories)
                    .HasForeignKey(d => d.ContractId)
                    .HasConstraintName("FK__Contracts__Contr__656C112C");
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.CountryCode).HasMaxLength(20);

                entity.Property(e => e.CountryName).HasMaxLength(20);
            });

            modelBuilder.Entity<Degree>(entity =>
            {
                entity.Property(e => e.DegreeId).HasColumnName("DegreeID");

                entity.Property(e => e.DegreeName).HasMaxLength(50);
            });

            modelBuilder.Entity<DegreesStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__DegreesS__4D7B4ADDC45A3D38");

                entity.ToTable("DegreesStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.DegreeId).HasColumnName("DegreeID");

                entity.HasOne(d => d.Degree)
                    .WithMany(p => p.DegreesStatusHistories)
                    .HasForeignKey(d => d.DegreeId)
                    .HasConstraintName("FK__DegreesSt__Degre__6754599E");
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.Property(e => e.DepartmentName).HasMaxLength(20);
            });

            modelBuilder.Entity<DepartmentsStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__Departme__4D7B4ADDC1712880");

                entity.ToTable("DepartmentsStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.DepartmentsStatusHistories)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK__Departmen__Depar__68487DD7");
            });

            modelBuilder.Entity<Dependent>(entity =>
            {
                entity.Property(e => e.DependentId).HasColumnName("DependentID");

                entity.Property(e => e.Dob)
                    .HasColumnType("date")
                    .HasColumnName("DOB");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.FullName).HasMaxLength(20);

                entity.Property(e => e.IdentifierCode).HasMaxLength(50);

                entity.Property(e => e.IdentifierName).HasMaxLength(50);

                entity.Property(e => e.Relationship).HasMaxLength(50);

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Dependents)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__Dependent__Emplo__693CA210");
            });

            modelBuilder.Entity<DependentsStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__Dependen__4D7B4ADDC6AE7A5F");

                entity.ToTable("DependentsStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.DependentId).HasColumnName("DependentID");

                entity.HasOne(d => d.Dependent)
                    .WithMany(p => p.DependentsStatusHistories)
                    .HasForeignKey(d => d.DependentId)
                    .HasConstraintName("FK__Dependent__Depen__6A30C649");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.Cic)
                    .HasMaxLength(20)
                    .HasColumnName("CIC");

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.Dob)
                    .HasColumnType("datetime")
                    .HasColumnName("DOB");

                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.FirstName).HasMaxLength(20);

                entity.Property(e => e.LastName).HasMaxLength(20);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.TaxId).HasColumnName("TaxID");

                entity.Property(e => e.TeamId).HasColumnName("TeamID");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("FK__Employees__Count__6D0D32F4");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK_Employees_Teams");
            });

            modelBuilder.Entity<EmployeeDegree>(entity =>
            {
                entity.HasKey(e => new { e.DegreeId, e.EmployeeId })
                    .HasName("PK__Employee__4A399631A65F9127");

                entity.Property(e => e.DegreeId).HasColumnName("DegreeID");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.GraduateDate).HasColumnType("datetime");

                entity.Property(e => e.Major).HasMaxLength(100);

                entity.Property(e => e.School).HasMaxLength(100);

                entity.HasOne(d => d.Degree)
                    .WithMany(p => p.EmployeeDegrees)
                    .HasForeignKey(d => d.DegreeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__EmployeeD__Degre__6B24EA82");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.EmployeeDegrees)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__EmployeeD__Emplo__6C190EBB");
            });

            modelBuilder.Entity<EmployeesStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__Employee__4D7B4ADD3F0F53E1");

                entity.ToTable("EmployeesStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.EmployeesStatusHistories)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__Employees__Emplo__6EF57B66");
            });

            modelBuilder.Entity<HistoryChangeShiftType>(entity =>
            {
                entity.HasKey(e => e.HistoryId);

                entity.ToTable("HistoryChangeShiftType");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.Action).HasMaxLength(100);

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.ShiftTypeId).HasColumnName("ShiftTypeID");

                entity.HasOne(d => d.ShiftType)
                    .WithMany(p => p.HistoryChangeShiftTypes)
                    .HasForeignKey(d => d.ShiftTypeId)
                    .HasConstraintName("FK_HistoryChangeShiftType_ShiftType");
            });

            modelBuilder.Entity<HistoryChangeTeam>(entity =>
            {
                entity.HasKey(e => e.HistoryId);

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.Action).HasMaxLength(100);

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.TeamId).HasColumnName("TeamID");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.HistoryChangeTeams)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK_HistoryChangeTeams_Teams");
            });

            modelBuilder.Entity<HistoryChangeTimeTracking>(entity =>
            {
                entity.HasKey(e => e.HistoryId);

                entity.ToTable("HistoryChangeTimeTracking");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.Action).HasMaxLength(100);

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.TimeTrackingId).HasColumnName("TimeTrackingID");

                entity.HasOne(d => d.TimeTracking)
                    .WithMany(p => p.HistoryChangeTimeTrackings)
                    .HasForeignKey(d => d.TimeTrackingId)
                    .HasConstraintName("FK_HistoryChangeTimeTracking_TimeTracking");
            });

            modelBuilder.Entity<Page>(entity =>
            {
                entity.Property(e => e.PageId).HasColumnName("PageID");

                entity.Property(e => e.PageName).HasMaxLength(50);

                entity.HasMany(d => d.Roles)
                    .WithMany(p => p.Pages)
                    .UsingEntity<Dictionary<string, object>>(
                        "RolePage",
                        l => l.HasOne<Role>().WithMany().HasForeignKey("RoleId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_RolePages_Roles"),
                        r => r.HasOne<Page>().WithMany().HasForeignKey("PageId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_RolePages_Pages"),
                        j =>
                        {
                            j.HasKey("PageId", "RoleId");

                            j.ToTable("RolePages");

                            j.IndexerProperty<int>("PageId").HasColumnName("PageID");

                            j.IndexerProperty<int>("RoleId").HasColumnName("RoleID");
                        });
            });

            modelBuilder.Entity<PageStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId);

                entity.ToTable("PageStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.PageId).HasColumnName("PageID");

                entity.HasOne(d => d.Page)
                    .WithMany(p => p.PageStatusHistories)
                    .HasForeignKey(d => d.PageId)
                    .HasConstraintName("FK_PageStatusHistory_Pages");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.RoleName).HasMaxLength(20);
            });

            modelBuilder.Entity<RolesEmployee>(entity =>
            {
                entity.HasKey(e => e.RoleEmployeeId)
                    .HasName("PK__RolesEmp__FB1ED0C2EE41C89B");

                entity.Property(e => e.RoleEmployeeId).HasColumnName("RoleEmployeeID");

                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.RolesEmployees)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK__RolesEmpl__Depar__75A278F5");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.RolesEmployees)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__RolesEmpl__Emplo__76969D2E");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RolesEmployees)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__RolesEmpl__RoleI__778AC167");
            });

            modelBuilder.Entity<RolesStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__RolesSta__4D7B4ADD3ECD46FC");

                entity.ToTable("RolesStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RolesStatusHistories)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__RolesStat__RoleI__787EE5A0");
            });

            modelBuilder.Entity<ShiftType>(entity =>
            {
                entity.ToTable("ShiftType");

                entity.Property(e => e.ShiftTypeId).HasColumnName("ShiftTypeID");

                entity.Property(e => e.TypeName).HasMaxLength(100);
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.Property(e => e.TeamId).HasColumnName("TeamID");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.TeamName).HasMaxLength(100);

                entity.Property(e => e.WorkScheduleId).HasColumnName("WorkScheduleID");

                entity.HasOne(d => d.WorkSchedule)
                    .WithMany(p => p.Teams)
                    .HasForeignKey(d => d.WorkScheduleId)
                    .HasConstraintName("FK_Teams_WorkSchedule");
            });

            modelBuilder.Entity<TimeTracking>(entity =>
            {
                entity.ToTable("TimeTracking");

                entity.Property(e => e.TimeTrackingId).HasColumnName("TimeTrackingID");

                entity.Property(e => e.CheckIn).HasColumnType("datetime");

                entity.Property(e => e.CheckOut).HasColumnType("datetime");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.TimeTrackings)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_TimeTracking_Employees");
            });

            modelBuilder.Entity<UnitCost>(entity =>
            {
                entity.HasKey(e => e.UniCostId);

                entity.ToTable("UnitCost");

                entity.Property(e => e.UnitName).HasMaxLength(100);
            });

            modelBuilder.Entity<UnitCostStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId);

                entity.ToTable("UnitCostStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.Action).HasMaxLength(100);

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId)
                    .HasMaxLength(10)
                    .HasColumnName("CurrentEmployeeID")
                    .IsFixedLength();

                entity.HasOne(d => d.UniCost)
                    .WithMany(p => p.UnitCostStatusHistories)
                    .HasForeignKey(d => d.UniCostId)
                    .HasConstraintName("FK_UnitCostStatusHistory_UnitCost");
            });

            modelBuilder.Entity<UserAccount>(entity =>
            {
                entity.HasKey(e => e.EmployeeId)
                    .HasName("PK__UserAcco__7AD04FF152E26045");

                entity.Property(e => e.EmployeeId)
                    .ValueGeneratedNever()
                    .HasColumnName("EmployeeID");

                entity.HasOne(d => d.Employee)
                    .WithOne(p => p.UserAccount)
                    .HasForeignKey<UserAccount>(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserAccou__Emplo__7C4F7684");
            });

            modelBuilder.Entity<UserAccountsStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__UserAcco__4D7B4ADD093A7E39");

                entity.ToTable("UserAccountsStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.UserAccountsStatusHistories)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__UserAccou__Emplo__7D439ABD");
            });

            modelBuilder.Entity<Work>(entity =>
            {
                entity.ToTable("Work");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.TeamId).HasColumnName("TeamID");

                entity.Property(e => e.WorkName).HasMaxLength(100);

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.Works)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK_Work_Teams");

                entity.HasOne(d => d.UniCost)
                    .WithMany(p => p.Works)
                    .HasForeignKey(d => d.UniCostId)
                    .HasConstraintName("FK_Work_UnitCost");

                entity.HasOne(d => d.WorkArea)
                    .WithMany(p => p.Works)
                    .HasForeignKey(d => d.WorkAreaId)
                    .HasConstraintName("FK_Work_WorkAreas");
            });

            modelBuilder.Entity<WorkArea>(entity =>
            {
                entity.Property(e => e.WorkAreaName).HasMaxLength(100);
            });

            modelBuilder.Entity<WorkSchedule>(entity =>
            {
                entity.ToTable("WorkSchedule");

                entity.Property(e => e.WorkScheduleId).HasColumnName("WorkScheduleID");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.ShiftTypeId).HasColumnName("ShiftTypeID");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.HasOne(d => d.ShiftType)
                    .WithMany(p => p.WorkSchedules)
                    .HasForeignKey(d => d.ShiftTypeId)
                    .HasConstraintName("FK_WorkSchedule_ShiftType");
            });

            modelBuilder.Entity<WorkScheduleStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId);

                entity.ToTable("WorkScheduleStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.Action).HasMaxLength(100);

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.WorkScheduleId).HasColumnName("WorkScheduleID");

                entity.HasOne(d => d.WorkSchedule)
                    .WithMany(p => p.WorkScheduleStatusHistories)
                    .HasForeignKey(d => d.WorkScheduleId)
                    .HasConstraintName("FK_WorkScheduleStatusHistory_WorkSchedule");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
