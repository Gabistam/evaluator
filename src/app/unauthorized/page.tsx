import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Accès non autorisé</h1>
      <p className="text-gray-600 mb-6">
        Vous n&apos;avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      <Link
        href="/"
        className="text-blue-500 hover:text-blue-600 transition-colors"
      >
        Retourner à l&apos;accueil
      </Link>
    </div>
  );
}