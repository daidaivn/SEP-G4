import axios from "./customize-axios";

const GetRelationshipsType = () => {
    return axios.get(
        `/CWMSapi/RelationshipsType/GetAllRelationshipsTypes`
    );
};

export { GetRelationshipsType, };