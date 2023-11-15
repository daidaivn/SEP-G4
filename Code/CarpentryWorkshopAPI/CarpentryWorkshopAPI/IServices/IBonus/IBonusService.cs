using CarpentryWorkshopAPI.DTO;

namespace CarpentryWorkshopAPI.IServices.IBonus
{
    public interface IBonusService
    {
        dynamic CreateAndUpdatePersonalReward(PersonalRewardDTO personalRewardDTO);
        dynamic CreateAndUpdateCompanyRerward(CompanyRewardDTO companyRewardDTO);
        dynamic GetAllReward(string date);
    }
}
