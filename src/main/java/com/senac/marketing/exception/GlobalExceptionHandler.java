// src/main/java/com/senac/marketing/exception/GlobalExceptionHandler.java
package com.senac.marketing.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Componente global para tratamento de exceções.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ExceptionDetails> handleBusinessException(BusinessException ex) {
        ExceptionDetails details = new ExceptionDetails(
                ex.getMessage(),
                ex.getStatus().value(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(details, ex.getStatus());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        ExceptionDetails details = new ExceptionDetails(
                "Erro de validação",
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                errors
        );
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionDetails> handleGenericException(Exception ex) {
        System.err.println("Erro interno do servidor: " + ex.getMessage());
        ex.printStackTrace();

        ExceptionDetails details = new ExceptionDetails(
                "Ocorreu um erro inesperado no servidor.",
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(details, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    record ExceptionDetails(
            String message,
            int status,
            LocalDateTime timestamp,
            Map<String, String> errors
    ) {
        public ExceptionDetails(String message, int status, LocalDateTime timestamp) {
            this(message, status, timestamp, null);
        }
    }
}