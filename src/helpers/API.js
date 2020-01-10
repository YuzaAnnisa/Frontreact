import axios from 'axios'
import apiconfig from '../configs/api.configs.json'

const API = {
    login: async (username, password) => {
        
        let option ={
            url:apiconfig.BASE_URL + apiconfig.ENDPOINTS.LOGIN,
            method : 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            data:{
                username:username,
                password:password
            }
        }
        try {
            let result = await axios(option)
    
            return result.data
        } catch (error){
    
            return error
        }
    }
}

export default API
    
