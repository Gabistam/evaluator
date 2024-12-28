import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getCategory } from "@/lib/data";

interface RouteParams {
  params: {
    categoryId: string;
  };
}

// GET /api/categories/[categoryId]/appreciations
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const category = getCategory(params.categoryId);
    
    if (!category) {
      return NextResponse.json(
        { error: "Catégorie non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(category.appreciations);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des appréciations" },
      { status: 500 }
    );
  }
}

// POST /api/categories/[categoryId]/appreciations
export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    if (!body.level || !body.comment) {
      return NextResponse.json(
        { error: "Niveau et commentaire requis" },
        { status: 400 }
      );
    }

    const category = getCategory(params.categoryId);
    if (!category) {
      return NextResponse.json(
        { error: "Catégorie non trouvée" },
        { status: 404 }
      );
    }

    const newAppreciation = {
      id: `app_${Date.now()}`,
      level: body.level,
      comment: body.comment
    };

    // TODO: Implémenter l'ajout à la base de données

    return NextResponse.json(newAppreciation, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création de l'appréciation" },
      { status: 500 }
    );
  }
}