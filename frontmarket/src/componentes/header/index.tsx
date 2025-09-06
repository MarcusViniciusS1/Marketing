function Header(){
    return(
        <header className="bg-dark">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
                <a className="navbar-brand" href="/">Home</a>
                <div className="navbar-nav">
                <a className="nav-link" href="/usuarios">Usuários</a>
                </div>
            </nav>
        </header>
 
    );
}
 
export default Header;