import axios from "./customize-axios";

    const GetTimeKeepingInfo = (iMonth, iyear) => {
      const month = iMonth;
      const year = iyear;
      console.log("iMonth",iMonth)
      return axios.get(
        `/CWMSapi/CheckInOut/GetTimeKeepingInfo?month=${month}&year=${year}`
      );
    };
    
export{GetTimeKeepingInfo};