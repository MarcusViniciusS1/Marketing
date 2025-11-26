package com.senac.AulaFullStack.application.services;

import com.senac.AulaFullStack.application.dto.canal.CanalResponseDto;
import com.senac.AulaFullStack.domain.repository.CanalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CanalService {

    @Autowired
    private CanalRepository canalRepository;

    public List<CanalResponseDto> listarTodos() {
        return canalRepository.findAll()
                .stream()
                .map(canal -> new CanalResponseDto(canal.getId(), canal.getNome()))
                .collect(Collectors.toList());
    }
}