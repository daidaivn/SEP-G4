﻿using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Dependent
    {
        public Dependent()
        {
            DependentsStatusHistories = new HashSet<DependentsStatusHistory>();
        }

        public int DependentId { get; set; }
        public int? EmployeeId { get; set; }
        public string? FullName { get; set; }
        public string? IdentifierCode { get; set; }
        public bool? Gender { get; set; }
        public DateTime? Dob { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? IdentifierName { get; set; }
        public bool? Status { get; set; }
        public int? RelationshipId { get; set; }
        public string? NoteReason { get; set; }

        public virtual Employee? Employee { get; set; }
        public virtual RelationshipsType? Relationship { get; set; }
        public virtual ICollection<DependentsStatusHistory> DependentsStatusHistories { get; set; }
    }
}
