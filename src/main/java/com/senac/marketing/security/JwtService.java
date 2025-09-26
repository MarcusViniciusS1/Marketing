// src/main/java/com/senac/marketing/security/JwtService.java
package com.senac.marketing.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

/**
 * Serviço responsável por gerar e validar JSON Web Tokens (JWT).
 */
@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    public String generateToken(String email) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
            Instant expiresAt = LocalDateTime.now().plusSeconds(jwtExpiration)
                    .toInstant(ZoneOffset.of("-03:00"));

            return JWT.create()
                    .withIssuer("marketing-api")
                    .withSubject(email)
                    .withExpiresAt(expiresAt)
                    .sign(algorithm);

        } catch (JWTCreationException exception) {
            throw new JWTCreationException("Erro ao gerar o token JWT", exception);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
            DecodedJWT decodedJWT = JWT.require(algorithm)
                    .withIssuer("marketing-api")
                    .build()
                    .verify(token);

            return decodedJWT.getSubject();

        } catch (JWTVerificationException exception) {
            throw new JWTVerificationException("Token JWT inválido ou expirado", exception);
        }
    }
}