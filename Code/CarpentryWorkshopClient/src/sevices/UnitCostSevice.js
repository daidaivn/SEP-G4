import axios from "./customize-axios";

 const GetAllUnitCosts = () => {
   return axios.get(
     `/CWMSapi/UnitCost/GetAllUnitCosts`
   );
 };

export{GetAllUnitCosts};