export function Header() {
    return (
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <span className="font-semibold text-xl">Evaluator</span>
            </div>
            
            {/* Ces liens seront activés plus tard avec l'authentification */}
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-900">
                Connexion
              </button>
            </div>
          </nav>
        </div>
      </header>
    );
  }