import axios from "./customize-axios";

const GetAllWorkAreas = () => {
  return axios.get(
    `CCMSapi/WorkAreas/GetAllWorkAreas`
  );
};

export{GetAllWorkAreas};