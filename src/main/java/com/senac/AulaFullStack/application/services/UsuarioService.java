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

import java.util.Comparator;
import java.util.List;
import java.util.Random;
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

        if ("ADMIN".equals(usuarioLogado.getRole())) {
            return usuarioRepository.findAll().stream()
                    .map(Usuario::toDtoResponse)
                    .collect(Collectors.toList());
        }

        if (usuarioLogado.getEmpresa() == null) {
            return List.of(usuarioLogado.toDtoResponse());
        }

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
                    u.setEmail(usuarioRequest.email());
                    u.setTelefone(usuarioRequest.telefone());
                    if(finalEmpresa != null) u.setEmpresa(finalEmpresa);
                    return u;
                })
                .orElse(new Usuario(usuarioRequest, finalEmpresa));

        if (finalEmpresa != null && finalEmpresa.getId() == 1L) {
            usuario.setRole("ADMIN");
        } else if (usuario.getRole() == null || usuario.getRole().isEmpty()) {
            usuario.setRole(usuarioRequest.role() != null ? usuarioRequest.role() : "USER");
        } else {
            usuario.setRole(usuarioRequest.role());
        }

        usuarioRepository.save(usuario);
        return usuario.toDtoResponse();
    }

    // --- LÓGICA DE EDIÇÃO CORRIGIDA ---
    @Transactional
    public UsuarioResponseDto editarUsuario(UsuarioRequestEdicao dto, UsuarioPrincipalDto principal) {
        // Verifica se é ADMIN
        boolean isAdmin = principal.autorizacao().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        // Se for Admin e mandou um ID, edita aquele ID. Se não, edita a si mesmo.
        Long idAlvo = (isAdmin && dto.id() != null) ? dto.id() : principal.id();

        Usuario usuario = usuarioRepository.findById(idAlvo)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(dto.nome());
        usuario.setTelefone(dto.telefone());
        usuario.setEmail(dto.email());

        // Apenas Admin pode alterar Permissões e Empresa
        if (isAdmin) {
            if (dto.role() != null && !dto.role().isEmpty()) {
                usuario.setRole(dto.role());
            }

            if (dto.empresaId() != null) {
                Empresa empresa = empresaRepository.findById(dto.empresaId())
                        .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
                usuario.setEmpresa(empresa);

                // Regra de negócio: Se for Empresa Matriz (ID 1), força ser Admin
                if (empresa.getId() == 1L) {
                    usuario.setRole("ADMIN");
                }
            }
        }

        usuarioRepository.save(usuario);
        return usuario.toDtoResponse();
    }
    // ----------------------------------

    public List<UsuarioResponseDto> consultarPaginadoFiltrado(Long take, Long page, String filtro) {
        return usuarioRepository.findAll().stream()
                .sorted(Comparator.comparing(Usuario::getId).reversed())
                .skip((long) page * take).limit(take)
                .map(UsuarioResponseDto::new).collect(Collectors.toList());
    }

    public void recuperarSenha(RecuperarSenhaDto dto) {
        var usuario = usuarioRepository.findByEmail(dto.email()).orElse(null);
        if (usuario != null){
            String codigo = String.format("%06d", new Random().nextInt(999999));
            usuario.setTokenSenha(codigo);
            usuarioRepository.save(usuario);
            iEnvioEmail.enviarEmailComTemplate(usuario.getEmail(), "Recuperação de Senha", codigo);
        }
    }

    public void registrarNovaSenha(RegistrarNovaSenhaDto dto) {
        var usuario = usuarioRepository.findByEmailAndTokenSenha(dto.email(), dto.token()).orElseThrow(() -> new RuntimeException("Token inválido"));
        usuario.setSenha(dto.senha());
        usuario.setTokenSenha(null);
        usuarioRepository.save(usuario);
    }

    public UsuarioResponseDto buscarUsuarioLogado(UsuarioPrincipalDto principal) {
        return usuarioRepository.findById(principal.id()).map(Usuario::toDtoResponse).orElseThrow();
    }

    @Transactional
    public UsuarioResponseDto vincularUsuarioComEmpresa(Long empresaId, Usuario usuarioLogado) {
        Empresa empresa = empresaRepository.findById(empresaId).orElseThrow();
        if (empresa.getId() == 1L) {
            usuarioLogado.setRole("ADMIN");
        }
        usuarioLogado.setEmpresa(empresa);
        usuarioRepository.save(usuarioLogado);
        return usuarioLogado.toDtoResponse();
    }

    public void deletar(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
        } else {
            throw new RuntimeException("Usuário não encontrado");
        }
    }
}