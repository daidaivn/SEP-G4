import axios from "./customize-axios";

const GetTeamForSchedule = () => {
    return axios.get(
        `/CCMSapi/Team/GetTeamForSchedule`
    );
};

export { GetTeamForSchedule };