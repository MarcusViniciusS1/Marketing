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

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private IEnvioEmail iEnvioEmail;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private TokenService tokenService;

    public boolean validarSenha(LoginRequestDto login){
        return usuarioRepository.existsUsuarioByEmailContainingAndSenha(login.email(), login.senha());
    }

    public UsuarioResponseDto consultarPorId(Long id){
        return usuarioRepository.findById(id)
                .map(UsuarioResponseDto::new)
                .orElse(null);
    }

    public List<UsuarioResponseDto> consultarTodosSemFiltro(){
        return usuarioRepository.findAll().stream().map(UsuarioResponseDto::new).collect(Collectors.toList());
    }

    @Transactional
    public UsuarioResponseDto salvarUsuario(UsuarioRequestDto usuarioRequest) {
        // 1. Validação de E-mail Único
        var usuarioExistente = usuarioRepository.findByEmail(usuarioRequest.email()).orElse(null);

        if (usuarioExistente != null) {
            boolean isMesmoUsuario = usuarioExistente.getCpf().equals(usuarioRequest.cpf());

            if (!isMesmoUsuario) {
                throw new RuntimeException("Este e-mail já está em uso por outro usuário.");
            }
        }

        // 2. Busca a empresa (Pode ser NULL se for cadastro inicial ou admin)
        Empresa empresa = null;
        if (usuarioRequest.empresaId() != null && usuarioRequest.empresaId() > 0){
            empresa = empresaRepository.findById(usuarioRequest.empresaId())
                    .orElseThrow(() -> new RuntimeException("Empresa informada não encontrada."));
        }

        Empresa finalEmpresa = empresa;

        // 3. Upsert (Criar ou Atualizar)
        var usuario = usuarioRepository.findByCpf(usuarioRequest.cpf())
                .map(u -> {
                    u.setNome(usuarioRequest.nome());
                    if (usuarioRequest.senha() != null && !usuarioRequest.senha().isEmpty()) {
                        u.setSenha(usuarioRequest.senha());
                    }
                    u.setRole(usuarioRequest.role());
                    u.setEmail(usuarioRequest.email());
                    u.setTelefone(usuarioRequest.telefone());

                    // Se uma empresa foi passada, atualiza. Se não, mantém a antiga ou fica null.
                    if(finalEmpresa != null) {
                        u.setEmpresa(finalEmpresa);
                    }

                    return u;
                }) .orElse(new Usuario(usuarioRequest, finalEmpresa));

        usuarioRepository.save(usuario);
        return usuario.toDtoResponse();
    }

    public List<UsuarioResponseDto> consultarPaginadoFiltrado(Long take, Long page, String filtro) {
        return usuarioRepository.findAll().stream()
                .sorted(Comparator.comparing(Usuario::getId).reversed())
                .filter(a -> filtro != null ? a.getNome().contains(filtro) : true)
                .skip((long) page * take).limit(take).map(UsuarioResponseDto::new).collect(Collectors.toList());
    }

    public String gerarCodigoAleatorio(int length) {
        final String CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder senha = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(CHARS.length());
            senha.append(CHARS.charAt(randomIndex));
        }
        return senha.toString();
    }

    public void recuperarSenha(RecuperarSenhaDto recuperarSenhaDto) {
        var usuario = usuarioRepository.findByEmail(recuperarSenhaDto.email()).orElse(null);

        if (usuario != null){
            var codigo = gerarCodigoAleatorio(8);
            usuario.setTokenSenha(codigo);
            usuarioRepository.save(usuario);
            iEnvioEmail.enviarEmailComTemplate(recuperarSenhaDto.email(), "Código de recuperação", codigo);
        }
    }

    public void registrarNovaSenha(RegistrarNovaSenhaDto registrarNovaSenhaDto) {
        var usuario = usuarioRepository
                .findByEmailAndTokenSenha(
                        registrarNovaSenhaDto.email(),
                        registrarNovaSenhaDto.token()
                ).orElse(null);
        if (usuario != null) {
            usuario.setSenha(registrarNovaSenhaDto.senha());
            usuarioRepository.save(usuario);
        } else {
            throw new RuntimeException("Token inválido ou expirado.");
        }
    }

    @Transactional
    public UsuarioResponseDto editarUsuario(UsuarioRequestEdicao usuarioRequest, UsuarioPrincipalDto usuarioPrincipalDto) {
        Usuario usuarioLogado = usuarioRepository.findById(usuarioPrincipalDto.id())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuarioLogado.setNome(usuarioRequest.nome());
        usuarioLogado.setTelefone(usuarioRequest.telefone());
        usuarioLogado.setEmail(usuarioRequest.email());

        usuarioRepository.save(usuarioLogado);
        return usuarioLogado.toDtoResponse();
    }

    public UsuarioResponseDto buscarUsuarioLogado(UsuarioPrincipalDto principal) {
        var usuario = usuarioRepository.findById(principal.id())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return usuario.toDtoResponse();
    }

    @Transactional
    public UsuarioResponseDto vincularUsuarioComEmpresa(Long empresaId, Usuario usuarioLogado) {
        Empresa empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));

        usuarioLogado.setEmpresa(empresa);
        usuarioRepository.save(usuarioLogado);

        return usuarioLogado.toDtoResponse();
    }
}