import axios from 'axios';

export const  creditDeduct = async (userId, credits) => {

    try{
         await axios.post(`${process.env.REACT_APP_API_URL}api/deduct-credit`, {
            userId: userId,
            credits: credits-=1,
        });
    }catch(err){
        console.log(err);
    }
}

