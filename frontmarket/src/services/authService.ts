import api from "./api";

export interface LoginRequest {
    email: string;
    senha: string;
}

export interface LoginResponse{
    token: string;
    role?: "ADMIN" | "USER"; // ajustar conforme o backend
  userId?: number;
  ongId?: number;

}


 export async function LoginNovo(loginRequest : LoginRequest):Promise<LoginResponse>{
         const response = await api.post<LoginResponse>( "/auth/login", loginRequest); 
   return response.data;

 }


// const login = async (loginRequest:LoginRequest): Promise<LoginResponse> => {
    
//      const response = await axios.post<LoginResponse>( "auth/login", loginRequest); 

//     return response.data;
// }





// const authService = {
//     login

// }

