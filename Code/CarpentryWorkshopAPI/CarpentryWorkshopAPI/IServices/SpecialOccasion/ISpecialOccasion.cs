using CarpentryWorkshopAPI.DTO;

namespace CarpentryWorkshopAPI.IServices.SpecialOccasion
{
    public interface ISpecialOccasion
    {
        dynamic GetAllSpecialOccasion();
        dynamic SearchSpecialOccasion(string input);
        dynamic AddSpecialOccasion(SpecialOccasionDTO specialOccasionDTO);
        dynamic UpdateSpecialOccasion(SpecialOccasionDTO specialOccasionDTO);
    }
}
