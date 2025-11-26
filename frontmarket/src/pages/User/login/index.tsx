import React, { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSucesso } from "../../../redux/authSlice";
import { LoginNovo, type LoginRequest } from "../../../services/authService";
export default function Login() {

          const navigator = useNavigate();
            const dispatch = useDispatch();



    const [formData, setFormData] = useState<LoginRequest>({
        email: '',
        senha: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        setFormData(prevState => ({
            ...prevState,
            [name]: value,


        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const loginResponse = await LoginNovo(formData);
            const token = loginResponse.token;

            if(token !=null) {
        const usuarioLogin = {
          usuario: { email: formData.email, nome: "" },
          token: token
        };
        
        dispatch(loginSucesso(usuarioLogin));

                navigator("/home")
            }






        // EXEMPLO DE FETCH
        //     const response = await fetch(API_URL + "auth/login", {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //      body: JSON.stringify(formData)
        //      });

        //        if(!response.ok){
        //         throw new Error("Erro ao logar o usuário!")
        //        }

        //        const data : LoginResponse = await response.json();
        //        console.log(data.token);


         } catch (error) {
        console.error;
              alert("E-mail ou senha inválidos!");

         }

    }



return (
    <>
     <div className="text-center mb-4">
          <img
            src="/img/logo.png"
            alt="Logo"
            className="mb-3"
            style={{ width: "100px", height: "100px" }}
          />
          
        </div>
<h3 className="fw-bold text-info">Bem-vindo</h3>
          <p className="text-secondary">Faça login para continuar</p>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control bg-dark text-light border-secondary"
                placeholder="seu@email.com"
                required
                
            />
        </div>

        <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">Senha</label>
            <input
                type="password"
                id="password"
                name="senha"
                onChange={handleChange}
                value={formData.senha}
                className="form-control bg-dark text-light border-secondary"
                placeholder="Digite sua senha"
                required
            />
        </div>

  <div className="d-flex justify-content-end mb-3">
          <Link to="/recuperarSenha" className="small text-info text-decoration-none">
            Esqueceu sua senha?
          </Link>
        </div>

        <button type="submit" className="btn btn-info w-100 fw-bold">
            Entrar
        </button>

        <div className="text-center mt-3">
            <Link to="/usuarioCadastro" className="small text-info text-decoration-none">
                Criar conta
            </Link>
        </div>

    </form>
    </>
);


}
 