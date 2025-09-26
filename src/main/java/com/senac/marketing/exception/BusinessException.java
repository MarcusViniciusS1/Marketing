// src/main/java/com/senac/marketing/exception/BusinessException.java
package com.senac.marketing.exception;

import org.springframework.http.HttpStatus;

/**
 * Exceção personalizada para representar erros de regra de negócio.
 */
public class BusinessException extends RuntimeException {

    private final HttpStatus status;

    public BusinessException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}