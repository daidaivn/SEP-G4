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
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<RolesEmployee> RolesEmployees { get; set; } = null!;
        public virtual DbSet<RolesStatusHistory> RolesStatusHistories { get; set; } = null!;
        public virtual DbSet<UserAccount> UserAccounts { get; set; } = null!;
        public virtual DbSet<UserAccountsStatusHistory> UserAccountsStatusHistories { get; set; } = null!;

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
                    .HasConstraintName("FK__Contracts__Emplo__45F365D3");
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
                    .HasName("PK__Contract__4D7B4ADD0764A9FE");

                entity.ToTable("ContractTypeStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.ContractTypeId).HasColumnName("ContractTypeID");

                entity.HasOne(d => d.ContractType)
                    .WithMany(p => p.ContractTypeStatusHistories)
                    .HasForeignKey(d => d.ContractTypeId)
                    .HasConstraintName("FK__ContractT__Contr__48CFD27E");
            });

            modelBuilder.Entity<ContractsStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__Contract__4D7B4ADDF78A3B07");

                entity.ToTable("ContractsStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.ContractId).HasColumnName("ContractID");

                entity.HasOne(d => d.Contract)
                    .WithMany(p => p.ContractsStatusHistories)
                    .HasForeignKey(d => d.ContractId)
                    .HasConstraintName("FK__Contracts__Contr__47DBAE45");
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
                    .HasName("PK__DegreesS__4D7B4ADD20541AC1");

                entity.ToTable("DegreesStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.DegreeId).HasColumnName("DegreeID");

                entity.HasOne(d => d.Degree)
                    .WithMany(p => p.DegreesStatusHistories)
                    .HasForeignKey(d => d.DegreeId)
                    .HasConstraintName("FK__DegreesSt__Degre__49C3F6B7");
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.Property(e => e.DepartmentName).HasMaxLength(20);
            });

            modelBuilder.Entity<DepartmentsStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__Departme__4D7B4ADDE5E4DDC8");

                entity.ToTable("DepartmentsStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.DepartmentsStatusHistories)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK__Departmen__Depar__4AB81AF0");
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
                    .HasConstraintName("FK__Dependent__Emplo__4BAC3F29");
            });

            modelBuilder.Entity<DependentsStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__Dependen__4D7B4ADD8BDC552D");

                entity.ToTable("DependentsStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.DependentId).HasColumnName("DependentID");

                entity.HasOne(d => d.Dependent)
                    .WithMany(p => p.DependentsStatusHistories)
                    .HasForeignKey(d => d.DependentId)
                    .HasConstraintName("FK__Dependent__Depen__4CA06362");
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
                    .HasConstraintName("FK__Employees__Count__4F7CD00D");
            });

            modelBuilder.Entity<EmployeeDegree>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.DegreeId).HasColumnName("DegreeID");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.GraduateDate).HasColumnType("datetime");

                entity.Property(e => e.Major).HasMaxLength(100);

                entity.Property(e => e.School).HasMaxLength(100);

                entity.HasOne(d => d.Degree)
                    .WithMany()
                    .HasForeignKey(d => d.DegreeId)
                    .HasConstraintName("FK__EmployeeD__Degre__4D94879B");

                entity.HasOne(d => d.Employee)
                    .WithMany()
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__EmployeeD__Emplo__4E88ABD4");
            });

            modelBuilder.Entity<EmployeesStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__Employee__4D7B4ADDF8FA6B5C");

                entity.ToTable("EmployeesStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.EmployeesStatusHistories)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__Employees__Emplo__5070F446");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.RoleName).HasMaxLength(20);
            });

            modelBuilder.Entity<RolesEmployee>(entity =>
            {
                entity.HasKey(e => e.RoleEmployeeId)
                    .HasName("PK__RolesEmp__FB1ED0C25FB46863");

                entity.Property(e => e.RoleEmployeeId).HasColumnName("RoleEmployeeID");

                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.RolesEmployees)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK__RolesEmpl__Depar__5165187F");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.RolesEmployees)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__RolesEmpl__Emplo__52593CB8");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RolesEmployees)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__RolesEmpl__RoleI__534D60F1");
            });

            modelBuilder.Entity<RolesStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__RolesSta__4D7B4ADD03F5F9C5");

                entity.ToTable("RolesStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RolesStatusHistories)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__RolesStat__RoleI__5441852A");
            });

            modelBuilder.Entity<UserAccount>(entity =>
            {
                entity.HasKey(e => e.EmployeeId)
                    .HasName("PK__UserAcco__7AD04FF1FCBA23ED");

                entity.Property(e => e.EmployeeId)
                    .ValueGeneratedNever()
                    .HasColumnName("EmployeeID");

                entity.HasOne(d => d.Employee)
                    .WithOne(p => p.UserAccount)
                    .HasForeignKey<UserAccount>(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserAccou__Emplo__5535A963");
            });

            modelBuilder.Entity<UserAccountsStatusHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId)
                    .HasName("PK__UserAcco__4D7B4ADDC06C1D55");

                entity.ToTable("UserAccountsStatusHistory");

                entity.Property(e => e.HistoryId).HasColumnName("HistoryID");

                entity.Property(e => e.ActionDate).HasColumnType("datetime");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.UserAccountsStatusHistories)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__UserAccou__Emplo__5629CD9C");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
