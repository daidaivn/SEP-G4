namespace CarpentryWorkshopAPI.Models
{
    public partial class AllowanceType
    {
        public AllowanceType()
        {
            EmployeesAllowances = new HashSet<EmployeesAllowance>();
            HistoryAllowanceTypes = new HashSet<HistoryAllowanceType>();
        }

        public int AllowanceTypeId { get; set; }
        public decimal? Amount { get; set; }
        public int? AllowanceId { get; set; }
        public DateTime? StartDate { get; set; }

        public virtual Allowance? Allowance { get; set; }
        public virtual ICollection<EmployeesAllowance> EmployeesAllowances { get; set; }
        public virtual ICollection<HistoryAllowanceType> HistoryAllowanceTypes { get; set; }
    }
}
