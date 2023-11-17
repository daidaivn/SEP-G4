import axios from "./customize-axios";

 const GetAllUnitCosts = () => {
   return axios.get(
     `/CCMSapi/UnitCost/GetAllUnitCosts`
   );
 };

export{GetAllUnitCosts};