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

        public virtual DbSet<CheckInOut> CheckInOuts { get; set; } = null!;
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
        public virtual DbSet<EmployeeTeam> EmployeeTeams { get; set; } = null!;
        public virtual DbSet<EmployeesStatusHistory> EmployeesStatusHistories { get; set; } = null!;
        public virtual DbSet<HistoryChangeCheckInOut> HistoryChangeCheckInOuts { get; set; } = null!;
        public virtual DbSet<HistoryChangeShiftType> HistoryChangeShiftTypes { get; set; } = null!;
        public virtual DbSet<HistoryChangeTeam> HistoryChangeTeams { get; set; } = null!;
        public virtual DbSet<HoursWorkDay> HoursWorkDays { get; set; } = null!;
        public virtual DbSet<Page> Pages { get; set; } = null!;
        public virtual DbSet<PageStatusHistory> PageStatusHistories { get; set; } = null!;
        public virtual DbSet<RelationshipsType> RelationshipsTypes { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<RolesEmployee> RolesEmployees { get; set; } = null!;
        public virtual DbSet<RolesStatusHistory> RolesStatusHistories { get; set; } = null!;
        public virtual DbSet<Salary> Salaries { get; set; } = null!;
        public virtual DbSet<SalaryDetail> SalaryDetails { get; set; } = null!;
        public virtual DbSet<SalarySalaryDetail> SalarySalaryDetails { get; set; } = null!;
        public virtual DbSet<SalaryType> SalaryTypes { get; set; } = null!;
        public virtual DbSet<ShiftType> ShiftTypes { get; set; } = null!;
        public virtual DbSet<Team> Teams { get; set; } = null!;
        public virtual DbSet<TeamWork> TeamWorks { get; set; } = null!;
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
                optionsBuilder.UseSqlServer("server =tcp:sqlsepg4.database.windows.net,1433; database =SEP-G4-CCMS;User ID=admin123;Password=Sepg4@#$;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CheckInOut>(entity =>
            {
                entity.ToTable("CheckInOut");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.CheckInOuts)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_CheckInOut_Employees");
            });

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
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Contracts__Emplo__2645B050");
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
                    .HasName("PK__Contract__4D7B4ADDD57E8150");

                entity.ToTable("ContractTypeStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.ContractTypeId).HasColumnName("ContractTypeID");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.HasOne(d => d.ContractType)
                    .WithMany(p => p.ContractTypeStatusHistories)
                    .HasForeignKey(d => d.ContractTypeId)
                    .HasConstraintName("FK__ContractT__Contr__2CF2ADDF");
            });

            modelBuilder.Entity<ContractsStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__Contract__4D7B4ADD81CCA978");

                entity.ToTable("ContractsStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.ContractId).HasColumnName("ContractID");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.HasOne(d => d.Contract)
                    .WithMany(p => p.ContractsStatusHistories)
                    .HasForeignKey(d => d.ContractId)
                    .HasConstraintName("FK__Contracts__Contr__2BFE89A6");
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
                    .HasName("PK__DegreesS__4D7B4ADD6D68C730");

                entity.ToTable("DegreesStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.DegreeId).HasColumnName("DegreeID");

                entity.HasOne(d => d.Degree)
                    .WithMany(p => p.DegreesStatusHistories)
                    .HasForeignKey(d => d.DegreeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__DegreesSt__Degre__2A164134");
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.Property(e => e.DepartmentName).HasMaxLength(20);
            });

            modelBuilder.Entity<DepartmentsStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__Departme__4D7B4ADDDB06EC1A");

                entity.ToTable("DepartmentsStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.DepartmentsStatusHistories)
                    .HasForeignKey(d => d.DepartmentId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Departmen__Depar__2B0A656D");
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

                entity.Property(e => e.Relation)
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Dependents)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Dependent__Emplo__2BFE89A6");

                entity.HasOne(d => d.Relationship)
                    .WithMany(p => p.Dependents)
                    .HasForeignKey(d => d.RelationshipId)
                    .HasConstraintName("FK_Dependents_RelationshipsType");
            });

            modelBuilder.Entity<DependentsStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__Dependen__4D7B4ADD19F798E7");

                entity.ToTable("DependentsStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.DependentId).HasColumnName("DependentID");

                entity.HasOne(d => d.Dependent)
                    .WithMany(p => p.DependentsStatusHistories)
                    .HasForeignKey(d => d.DependentId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Dependent__Depen__2DE6D218");
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

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.CountryId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Employees__Count__30C33EC3");
            });

            modelBuilder.Entity<EmployeeDegree>(entity =>
            {
                entity.HasKey(e => new { e.DegreeId, e.EmployeeId })
                    .HasName("PK__Employee__4A399631D3006DA1");

                entity.Property(e => e.DegreeId).HasColumnName("DegreeID");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.GraduateDate).HasColumnType("datetime");

                entity.Property(e => e.Major).HasMaxLength(100);

                entity.Property(e => e.School).HasMaxLength(100);

                entity.HasOne(d => d.Degree)
                    .WithMany(p => p.EmployeeDegrees)
                    .HasForeignKey(d => d.DegreeId)
                    .HasConstraintName("FK__EmployeeD__Degre__2EDAF651");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.EmployeeDegrees)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__EmployeeD__Emplo__2FCF1A8A");
            });

            modelBuilder.Entity<EmployeeTeam>(entity =>
            {
                entity.Property(e => e.EmployeeTeamId).HasColumnName("EmployeeTeamID");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.TeamId).HasColumnName("TeamID");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.EmployeeTeams)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_EmployeeTeams_Employees");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.EmployeeTeams)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK_EmployeeTeams_Teams");
            });

            modelBuilder.Entity<EmployeesStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__Employee__4D7B4ADDC33B7F7B");

                entity.ToTable("EmployeesStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.EmployeesStatusHistories)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Employees__Emplo__32AB8735");
            });

            modelBuilder.Entity<HistoryChangeCheckInOut>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK_HistoryChangeTimeTracking");

                entity.ToTable("HistoryChangeCheckInOut");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.Action).HasMaxLength(100);

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.HasOne(d => d.CheckInOut)
                    .WithMany(p => p.HistoryChangeCheckInOuts)
                    .HasForeignKey(d => d.CheckInOutId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_HistoryChangeTimeTracking_CheckInOut");
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
                    .OnDelete(DeleteBehavior.Cascade)
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
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_HistoryChangeTeams_Teams");
            });

            modelBuilder.Entity<HoursWorkDay>(entity =>
            {
                entity.HasKey(e => e.HourWorkDayId);

                entity.Property(e => e.Day).HasColumnType("datetime");
            });

            modelBuilder.Entity<Page>(entity =>
            {
                entity.Property(e => e.PageId).HasColumnName("PageID");

                entity.Property(e => e.PageName).HasMaxLength(50);

                entity.Property(e => e.PageNameVn).HasColumnName("PageNameVN");

                entity.HasMany(d => d.Roles)
                    .WithMany(p => p.Pages)
                    .UsingEntity<Dictionary<string, object>>(
                        "RolePage",
                        l => l.HasOne<Role>().WithMany().HasForeignKey("RoleId").HasConstraintName("FK_RolePages_Roles"),
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
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_PageStatusHistory_Pages");
            });

            modelBuilder.Entity<RelationshipsType>(entity =>
            {
                entity.HasKey(e => e.RelationshipId);

                entity.ToTable("RelationshipsType");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.RoleName).HasMaxLength(20);
            });

            modelBuilder.Entity<RolesEmployee>(entity =>
            {
                entity.HasKey(e => e.RoleEmployeeId)
                    .HasName("PK__RolesEmp__FB1ED0C2BE491F43");

                entity.Property(e => e.RoleEmployeeId).HasColumnName("RoleEmployeeID");

                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.RolesEmployees)
                    .HasForeignKey(d => d.DepartmentId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__RolesEmpl__Depar__3B40CD36");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.RolesEmployees)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__RolesEmpl__Emplo__3C34F16F");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RolesEmployees)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__RolesEmpl__RoleI__10566F31");
            });

            modelBuilder.Entity<RolesStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__RolesSta__4D7B4ADDB307ED7F");

                entity.ToTable("RolesStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RolesStatusHistories)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__RolesStat__RoleI__114A936A");
            });

            modelBuilder.Entity<Salary>(entity =>
            {
                entity.ToTable("Salary");

                entity.Property(e => e.SalaryName).HasMaxLength(100);
            });

            modelBuilder.Entity<SalaryDetail>(entity =>
            {
                entity.ToTable("SalaryDetail");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.HasOne(d => d.SalaryType)
                    .WithMany(p => p.SalaryDetails)
                    .HasForeignKey(d => d.SalaryTypeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_SalaryDetail_SalaryType");
            });

            modelBuilder.Entity<SalarySalaryDetail>(entity =>
            {
                entity.HasKey(e => e.SlarySalaryDetailId);

                entity.ToTable("Salary.SalaryDetail");

                entity.Property(e => e.SlarySalaryDetailId).HasColumnName("Slary.SalaryDetailID");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.SalarySalaryDetails)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_Salary.SalaryDetail_Employees");

                entity.HasOne(d => d.SalaryDetail)
                    .WithMany(p => p.SalarySalaryDetails)
                    .HasForeignKey(d => d.SalaryDetailId)
                    .HasConstraintName("FK_Salary.SalaryDetail_SalaryDetail");

                entity.HasOne(d => d.Salary)
                    .WithMany(p => p.SalarySalaryDetails)
                    .HasForeignKey(d => d.SalaryId)
                    .HasConstraintName("FK_Salary.SalaryDetail_Salary");
            });

            modelBuilder.Entity<SalaryType>(entity =>
            {
                entity.ToTable("SalaryType");

                entity.Property(e => e.Name).HasMaxLength(100);
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

                entity.Property(e => e.TeamName).HasMaxLength(100);

                entity.Property(e => e.TeamSubLeaderId).HasColumnName("TeamSubLeaderID");
            });

            modelBuilder.Entity<TeamWork>(entity =>
            {
                entity.ToTable("TeamWork");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.TeamId).HasColumnName("TeamID");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.TeamWorks)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK_TeamWork_Teams");

                entity.HasOne(d => d.Work)
                    .WithMany(p => p.TeamWorks)
                    .HasForeignKey(d => d.WorkId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TeamWork_Work1");
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
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_UnitCostStatusHistory_UnitCost");
            });

            modelBuilder.Entity<UserAccount>(entity =>
            {
                entity.HasKey(e => e.EmployeeId)
                    .HasName("PK__UserAcco__7AD04FF19AC8C0E7");

                entity.Property(e => e.EmployeeId)
                    .ValueGeneratedNever()
                    .HasColumnName("EmployeeID");

                entity.HasOne(d => d.Employee)
                    .WithOne(p => p.UserAccount)
                    .HasForeignKey<UserAccount>(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserAccou__Emplo__47A6A41B");
            });

            modelBuilder.Entity<UserAccountsStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__UserAcco__4D7B4ADD939F5167");

                entity.ToTable("UserAccountsStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentEmployeeId).HasColumnName("CurrentEmployeeID");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.UserAccountsStatusHistories)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__UserAccou__Emplo__489AC854");
            });

            modelBuilder.Entity<Work>(entity =>
            {
                entity.ToTable("Work");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.WorkName).HasMaxLength(100);

                entity.HasOne(d => d.UniCost)
                    .WithMany(p => p.Works)
                    .HasForeignKey(d => d.UniCostId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Work_UnitCost");

                entity.HasOne(d => d.WorkArea)
                    .WithMany(p => p.Works)
                    .HasForeignKey(d => d.WorkAreaId)
                    .OnDelete(DeleteBehavior.Cascade)
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

                entity.Property(e => e.ShiftTypeId).HasColumnName("ShiftTypeID");

                entity.Property(e => e.TeamId).HasColumnName("TeamID");

                entity.HasOne(d => d.ShiftType)
                    .WithMany(p => p.WorkSchedules)
                    .HasForeignKey(d => d.ShiftTypeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_WorkSchedule_ShiftType");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.WorkSchedules)
                    .HasForeignKey(d => d.TeamId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_WorkSchedule_Teams");
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
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_WorkScheduleStatusHistory_WorkSchedule");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
