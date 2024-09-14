import axios from "axios";

export const handleDeleteVideo = async (postId) => {
    
     try{
        const { status } = await axios.delete(`${process.env.REACT_APP_API_URL}api/post/${postId}`);
        if(status===200){
            alert('La vidéo à été supprimée!');
            return true;
        };
     }catch(error){
          alert('Une erreur à été enregistrée')

     }
}