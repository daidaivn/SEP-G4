using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class ContractType
    {
        public ContractType()
        {
            ContractTypeStatusHistories = new HashSet<ContractTypeStatusHistory>();
            Contracts = new HashSet<Contract>();
        }

        public int ContractTypeId { get; set; }
        public string? ContractName { get; set; }
        public bool? Status { get; set; }
        public int? Month { get; set; }

        public virtual ICollection<ContractTypeStatusHistory> ContractTypeStatusHistories { get; set; }
        public virtual ICollection<Contract> Contracts { get; set; }
    }
}
