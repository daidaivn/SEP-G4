using CarpentryWorkshopAPI.DTO;

namespace CarpentryWorkshopAPI.IServices.IBonus
{
    public interface IBonusService
    {
        dynamic CreateAndUpdatePersonalReward(PersonalRewardDTO personalRewardDTO);
        dynamic CreateAndUpdateCompanyRerward(CompanyRewardDTO companyRewardDTO);
        dynamic CreateAndUpdateSpecialOccasion(SpecialOccasionDTO specialOccasionDTO);
        dynamic GetPersonalReward(int id);
        dynamic GetCompanyReward(int id);
        dynamic GetSpecialOccasionReward(int id);
    }
}
