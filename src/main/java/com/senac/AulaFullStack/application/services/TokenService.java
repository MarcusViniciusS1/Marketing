package com.senac.AulaFullStack.application.services;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.senac.AulaFullStack.application.dto.login.LoginRequestDto;
import com.senac.AulaFullStack.application.dto.usuario.UsuarioPrincipalDto;
import com.senac.AulaFullStack.domain.entity.Token;
import com.senac.AulaFullStack.domain.entity.Usuario;
import com.senac.AulaFullStack.domain.repository.TokenRepository;
import com.senac.AulaFullStack.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;


@Service
public class TokenService {

    @Value("${spring.secretkey}")
    private String secret;

    @Value("${spring.tempo_expiracao}")
    private Long tempo;


    private String emissor = "Topets";

    @Autowired
    TokenRepository tokenRepository;

    @Autowired
    UsuarioRepository usuarioRepository;




    public String gerarToken(LoginRequestDto loginRequestDto){
        var usuario = usuarioRepository.findByEmail(loginRequestDto.email()).orElse(null);

        Algorithm algorithm = Algorithm.HMAC256(secret);

        String token = JWT.create()
                .withIssuer(emissor)
                .withSubject(usuario.getEmail())//informação que vou carregar no token
                .withExpiresAt(this.gerarDataExpiracao())
                .sign(algorithm);
        tokenRepository.save(new Token(null, token, usuario));
        return token;
    }

    public UsuarioPrincipalDto validarToken(String token){
        Algorithm algorithm = Algorithm.HMAC256(secret);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(emissor)
                .build();
        verifier.verify(token);
        var tokenResult = tokenRepository.findByToken(token).orElse(null);

        if (tokenResult == null){
            throw new IllegalArgumentException("Token inválido");
        }

        return new UsuarioPrincipalDto(tokenResult.getUsuario());


    }




    private Instant gerarDataExpiracao(){
        var dataAtual = LocalDateTime.now();
        var novaData = dataAtual.plusMinutes(tempo);

        return novaData.toInstant(ZoneOffset.of("-03:00"));
    }



}
