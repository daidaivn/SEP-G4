import axios from "./customize-axios";

const GetAllWorkAreas = () => {
  return axios.get(
    `CWMSapi/WorkAreas/GetAllWorkAreas`
  );
};

export{GetAllWorkAreas};