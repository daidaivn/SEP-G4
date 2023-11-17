const getCurrentDateSEAsia = () => {
  const now = new Date();
  now.setHours(now.getHours() + 7); // Thêm 7 giờ để đạt múi giờ GMT+7
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
  const year = now.getFullYear();
  return `${day}-${month}-${year}`; // Định dạng DD-MM-YYYY
};

const getTomorrowDateSEAsia = () => {
  const now = new Date();
  now.setHours(now.getHours() + 7); // Thêm 7 giờ để đạt múi giờ GMT+7
  now.setDate(now.getDate() + 1); // Thêm một ngày
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
  const year = now.getFullYear();
  return `${day}-${month}-${year}`; // Định dạng DD-MM-YYYY
};

export { getCurrentDateSEAsia, getTomorrowDateSEAsia };
