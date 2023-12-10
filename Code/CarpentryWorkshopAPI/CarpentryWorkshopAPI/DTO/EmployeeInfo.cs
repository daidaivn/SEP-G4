namespace CarpentryWorkshopAPI.DTO
{
    public class EmployeeInfo
    {
        public string EmployeeId { get; set; }

        public int OrderNumber { get; set; }

        public string FullName { get; set; }

        public string Position { get; set; }

        public string Location { get; set; }

        public string Gender { get; set; }

        public int ActualWork { get; set; }

        public int HolidayWork { get; set; }

        public int Overtime { get; set; }

        public long BasicSalary { get; set; }

        public long InsuranceSalary { get; set; }

        public long ActualDaySalary { get; set; }

        public long OvertimeSalary { get; set; }

        public Allowances Allowances { get; set; }

        public long BusinessSalary { get; set; }

        public long TotalActualSalary { get; set; }

        public Deductions Deductions { get; set; }

        public long TaxableIncome { get; set; }

        public TaxDeductions TaxDeductions { get; set; }

        public long IncomeTax { get; set; }
        public long PersonalIncomeTax { get; set; }

        public long Advances { get; set; }
        public long JobIncentives { get; set; }
        public long Bonus { get; set; }
        public long SpecialOccasion { get; set; }
        public long CompanyWideBonus { get; set; }
        public long ActualReceived { get; set; }
    }

    public class Allowances
    {
        public long Meal { get; set; }

        public long Uniform { get; set; }

        public long Petrol { get; set; }
    }

    public class Deductions
    {
        public long SocialInsurance { get; set; }

        public long HealthInsurance { get; set; }

        public long UnemploymentInsurance { get; set; }

        public long UnionFees { get; set; }
    }

    public class TaxDeductions
    {
        public long PersonalRelief { get; set; }

        public long DependentRelief { get; set; }

        public long Insurance { get; set; }
    }

}
