import axios from "./customize-axios";

const GetRelationshipsType = () => {
    return axios.get(
        `/CCMSapi/RelationshipsType/GetAllRelationshipsTypes`
    );
};

export { GetRelationshipsType, };