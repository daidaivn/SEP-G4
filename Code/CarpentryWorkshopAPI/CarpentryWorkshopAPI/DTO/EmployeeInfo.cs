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

        public decimal BasicSalary { get; set; }

        public decimal InsuranceSalary { get; set; }

        public decimal ActualDaySalary { get; set; }

        public decimal OvertimeSalary { get; set; }

        public Allowances Allowances { get; set; }

        public decimal BusinessSalary { get; set; }

        public decimal TotalActualSalary { get; set; }

        public Deductions Deductions { get; set; }

        public decimal TaxableIncome { get; set; }

        public TaxDeductions TaxDeductions { get; set; }

        public decimal IncomeTax { get; set; }
        public decimal PersonalIncomeTax { get; set; }

        public decimal Advances { get; set; }
        public decimal JobIncentives { get; set; }

        public decimal ActualReceived { get; set; }
    }

    public class Allowances
    {
        public decimal Meal { get; set; }

        public decimal Uniform { get; set; }

        public decimal Petrol { get; set; }
    }

    public class Deductions
    {
        public decimal SocialInsurance { get; set; }

        public decimal HealthInsurance { get; set; }

        public decimal UnemploymentInsurance { get; set; }

        public decimal UnionFees { get; set; }
    }

    public class TaxDeductions
    {
        public decimal PersonalRelief { get; set; }

        public decimal DependentRelief { get; set; }

        public decimal Insurance { get; set; }
    }

}
