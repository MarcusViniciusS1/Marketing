export default function Header() {
  return (
    <header className="py-3 px-4 bg-transparent">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="text-muted mb-1" style={{fontSize: '0.85rem'}}>Páginas / Dashboard</h6>
          <h4 className="fw-bold text-dark m-0">Visão Geral</h4>
        </div>
        
        <div className="d-flex align-items-center bg-white rounded-pill px-3 py-2 shadow-sm">
            <i className="bi bi-search text-muted me-2"></i>
            <input type="text" placeholder="Buscar..." className="border-0 bg-transparent" style={{outline: 'none', fontSize: '0.9rem'}} />
            <div className="vr mx-3 text-muted"></div>
            <i className="bi bi-bell text-muted fs-5 cursor-pointer"></i>
            <div className="ms-3">
               <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: 35, height: 35}}>
                 M
               </div>
            </div>
        </div>
      </div>
    </header>
  );
}