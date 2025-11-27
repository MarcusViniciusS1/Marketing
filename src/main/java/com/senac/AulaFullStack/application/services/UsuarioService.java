package com.senac.AulaFullStack.application.services;

import com.senac.AulaFullStack.application.dto.login.LoginRequestDto;
import com.senac.AulaFullStack.application.dto.login.RecuperarSenhaDto;
import com.senac.AulaFullStack.application.dto.usuario.*;
import com.senac.AulaFullStack.domain.entity.Empresa;
import com.senac.AulaFullStack.domain.entity.Usuario;
import com.senac.AulaFullStack.domain.interfaces.IEnvioEmail;
import com.senac.AulaFullStack.domain.repository.EmpresaRepository;
import com.senac.AulaFullStack.domain.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private IEnvioEmail iEnvioEmail;
    @Autowired private EmpresaRepository empresaRepository;
    @Autowired private TokenService tokenService;

    public boolean validarSenha(LoginRequestDto login){
        return usuarioRepository.existsUsuarioByEmailContainingAndSenha(login.email(), login.senha());
    }

    public UsuarioResponseDto consultarPorId(Long id){
        return usuarioRepository.findById(id).map(UsuarioResponseDto::new).orElse(null);
    }

    public List<UsuarioResponseDto> consultarTodosSemFiltro(){
        return usuarioRepository.findAll().stream().map(UsuarioResponseDto::new).collect(Collectors.toList());
    }

    public List<UsuarioResponseDto> listarPorEmpresa(UsuarioPrincipalDto principal) {
        Usuario usuarioLogado = usuarioRepository.findById(principal.id()).orElseThrow();
        if (usuarioLogado.getEmpresa() == null) return List.of(usuarioLogado.toDtoResponse());

        return usuarioRepository.findAll().stream()
                .filter(u -> u.getEmpresa() != null && u.getEmpresa().getId().equals(usuarioLogado.getEmpresa().getId()))
                .map(Usuario::toDtoResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public UsuarioResponseDto salvarUsuario(UsuarioRequestDto usuarioRequest) {
        var existente = usuarioRepository.findByEmail(usuarioRequest.email()).orElse(null);
        if (existente != null && (usuarioRequest.id() == null || !existente.getId().equals(usuarioRequest.id()))) {
            if (!existente.getCpf().equals(usuarioRequest.cpf())) {
                throw new RuntimeException("Email já cadastrado!");
            }
        }

        Empresa empresa = null;
        if (usuarioRequest.empresaId() != null) {
            empresa = empresaRepository.findById(usuarioRequest.empresaId()).orElse(null);
        }

        Empresa finalEmpresa = empresa;
        Usuario usuario = usuarioRepository.findByCpf(usuarioRequest.cpf())
                .map(u -> {
                    u.setNome(usuarioRequest.nome());
                    if(usuarioRequest.senha() != null && !usuarioRequest.senha().isEmpty()) u.setSenha(usuarioRequest.senha());
                    u.setRole(usuarioRequest.role());
                    u.setEmail(usuarioRequest.email());
                    u.setTelefone(usuarioRequest.telefone());
                    if(finalEmpresa != null) u.setEmpresa(finalEmpresa);
                    return u;
                })
                .orElse(new Usuario(usuarioRequest, finalEmpresa));

        usuarioRepository.save(usuario);
        return usuario.toDtoResponse();
    }

    public List<UsuarioResponseDto> consultarPaginadoFiltrado(Long take, Long page, String filtro) {
        return usuarioRepository.findAll().stream()
                .sorted(Comparator.comparing(Usuario::getId).reversed())
                .skip((long) page * take).limit(take)
                .map(UsuarioResponseDto::new).collect(Collectors.toList());
    }

    public void recuperarSenha(RecuperarSenhaDto dto) {
        var usuario = usuarioRepository.findByEmail(dto.email()).orElse(null);
        if (usuario != null){
            String codigo = "123456";
            usuario.setTokenSenha(codigo);
            usuarioRepository.save(usuario);
        }
    }

    public void registrarNovaSenha(RegistrarNovaSenhaDto dto) {
        var usuario = usuarioRepository.findByEmailAndTokenSenha(dto.email(), dto.token()).orElse(null);
        if (usuario != null) {
            usuario.setSenha(dto.senha());
            usuarioRepository.save(usuario);
        }
    }

    @Transactional
    public UsuarioResponseDto editarUsuario(UsuarioRequestEdicao dto, UsuarioPrincipalDto principal) {
        Usuario usuario = usuarioRepository.findById(principal.id()).orElseThrow();
        usuario.setNome(dto.nome());
        usuario.setTelefone(dto.telefone());
        usuario.setEmail(dto.email());
        usuarioRepository.save(usuario);
        return usuario.toDtoResponse();
    }

    public UsuarioResponseDto buscarUsuarioLogado(UsuarioPrincipalDto principal) {
        return usuarioRepository.findById(principal.id()).map(Usuario::toDtoResponse).orElseThrow();
    }

    @Transactional
    public UsuarioResponseDto vincularUsuarioComEmpresa(Long empresaId, Usuario usuarioLogado) {
        Empresa empresa = empresaRepository.findById(empresaId).orElseThrow();
        usuarioLogado.setEmpresa(empresa);
        usuarioRepository.save(usuarioLogado);
        return usuarioLogado.toDtoResponse();
    }

    // --- MÉTODO QUE FALTAVA ---
    public void deletar(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
        } else {
            throw new RuntimeException("Usuário não encontrado para exclusão");
        }
    }
}