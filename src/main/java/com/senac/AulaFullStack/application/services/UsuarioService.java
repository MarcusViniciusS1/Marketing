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

    // --- LÓGICA DE CADASTRO CORRIGIDA ---
    @Transactional
    public UsuarioResponseDto salvarUsuario(UsuarioRequestDto usuarioRequest, UsuarioPrincipalDto userLogadoDto) {
        // Validação de E-mail duplicado
        var existente = usuarioRepository.findByEmail(usuarioRequest.email()).orElse(null);
        if (existente != null && (usuarioRequest.id() == null || !existente.getId().equals(usuarioRequest.id()))) {
            if (!existente.getCpf().equals(usuarioRequest.cpf())) {
                throw new RuntimeException("Email já cadastrado!");
            }
        }

        // Determinar quem está criando
        Usuario criador = null;
        boolean isCriadorAdmin = false;

        if (userLogadoDto != null) {
            criador = usuarioRepository.findById(userLogadoDto.id()).orElse(null);
            if (criador != null && "ADMIN".equals(criador.getRole())) {
                isCriadorAdmin = true;
            }
        } else {
            // Se for cadastro público (sem login), tratamos como usuario comum se cadastrando
            // ou podemos permitir criação livre dependendo da regra de negócio.
            // Assumindo aqui que auto-cadastro é permitido.
        }

        Empresa empresaVinculo = null;
        String roleVinculo = usuarioRequest.role();

        if (isCriadorAdmin) {
            // ADMIN: Pode escolher qualquer empresa e qualquer role
            if (usuarioRequest.empresaId() != null) {
                empresaVinculo = empresaRepository.findById(usuarioRequest.empresaId()).orElse(null);
            }
        } else {
            // GERENTE/USER ou PÚBLICO

            // 1. Regra da Role: Não pode criar ADMIN
            if ("ADMIN".equals(roleVinculo)) {
                throw new RuntimeException("Permissão negada: Você não pode criar usuários Administradores.");
            }
            // Se não informou role, padrão é USER
            if (roleVinculo == null || roleVinculo.isEmpty()) {
                roleVinculo = "USER";
            }

            // 2. Regra da Empresa:
            if (criador != null && criador.getEmpresa() != null) {
                // Se for um Gerente criando, OBRIGATORIAMENTE vincula na empresa dele
                empresaVinculo = criador.getEmpresa();
            } else if (usuarioRequest.empresaId() != null) {
                // Se for auto-cadastro público, permite escolher a empresa
                empresaVinculo = empresaRepository.findById(usuarioRequest.empresaId()).orElse(null);
            }
        }

        // Preparação final para salvar
        Empresa finalEmpresa = empresaVinculo;
        String finalRole = roleVinculo;

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

        // Regra de segurança final: Se a empresa for ID 1 (Matriz), força ADMIN se não tiver role definida
        // Mas se o criador não é Admin, ele já foi barrado de criar Admin acima.
        if (finalEmpresa != null && finalEmpresa.getId() == 1L && isCriadorAdmin) {
            usuario.setRole("ADMIN");
        } else {
            usuario.setRole(finalRole);
        }

        usuarioRepository.save(usuario);
        return usuario.toDtoResponse();
    }
    // ------------------------------------

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
            iEnvioEmail.enviarEmailComTemplate(usuario.getEmail(), "Recuperação de Senha - MktManager", codigo);
        }
    }

    public void registrarNovaSenha(RegistrarNovaSenhaDto dto) {
        var usuario = usuarioRepository.findByEmailAndTokenSenha(dto.email(), dto.token())
                .orElseThrow(() -> new RuntimeException("Token inválido ou expirado."));

        usuario.setSenha(dto.senha());
        usuario.setTokenSenha(null);
        usuarioRepository.save(usuario);
    }

    @Transactional
    public UsuarioResponseDto editarUsuario(UsuarioRequestEdicao dto, UsuarioPrincipalDto principal) {
        boolean isAdmin = principal.autorizacao().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        Long idAlvo = (isAdmin && dto.id() != null) ? dto.id() : principal.id();

        Usuario usuario = usuarioRepository.findById(idAlvo)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(dto.nome());
        usuario.setTelefone(dto.telefone());
        usuario.setEmail(dto.email());

        // Apenas Admin pode alterar Permissões e Empresa
        if (isAdmin) {
            if (dto.role() != null && !dto.role().isEmpty()) usuario.setRole(dto.role());
            if (dto.empresaId() != null) {
                Empresa empresa = empresaRepository.findById(dto.empresaId()).orElseThrow();
                usuario.setEmpresa(empresa);
                if (empresa.getId() == 1L) usuario.setRole("ADMIN");
            }
        }

        usuarioRepository.save(usuario);
        return usuario.toDtoResponse();
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