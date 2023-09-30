using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Contract
    {
        public Contract()
        {
            ContractsStatusHistories = new HashSet<ContractsStatusHistory>();
        }

        public int ContractId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? LinkDoc { get; set; }

        public virtual Employee? Employee { get; set; }
        public virtual ICollection<ContractsStatusHistory> ContractsStatusHistories { get; set; }
    }
}
