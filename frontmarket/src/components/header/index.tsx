export default function Header() {
  return (
    <header className="py-3 px-4 bg-white border-bottom shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="text-muted mb-0 small text-uppercase ls-1">Painel de Controle</h6>
          <h4 className="fw-bold text-dark m-0">Visão Geral</h4>
        </div>
        
        {/* Área limpa conforme solicitado */}
        <div className="text-end">
           <span className="badge bg-light text-dark border">v1.0.0</span>
        </div>
      </div>
    </header>
  );
}