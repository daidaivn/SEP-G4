using CarpentryWorkshopAPI.DTO;

namespace CarpentryWorkshopAPI.IServices.ISalaryDetail
{
    public interface ISalaryDetailService
    {
        dynamic GetAllSalaryDetail();
        dynamic AddSalaryDetail(CreateSalaryDetailDTO createSalaryDetailDTO);
        dynamic UpdateSalaryDetail(CreateSalaryDetailDTO createSalaryDetailDTO);
    }
}
