import axios from "axios";

export const fetchUserInfos = async (userId) => { 
    
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

