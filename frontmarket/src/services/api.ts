import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/authSlice";



const api = axios.create({
    baseURL: 
    import.meta.env.VITE_API_URL|| 
    'http://localhost:8080/'
});


api.interceptors.request.use(
    (config)=>{

        const state =store.getState();
        const token = state.auth.token;

        if(token){
            config.headers.Authorization =`Bearer ${token}`;
        }


        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado → desloga no Redux
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);



export default api;