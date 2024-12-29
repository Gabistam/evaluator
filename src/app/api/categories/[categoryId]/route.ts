//src/app/api/categories/[categoryId]/route.ts

import { getCategory } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

interface RouteParams {
  params: {
    categoryId: string;
  };
}

// GET /api/categories/[categoryId]
export async function GET(
    request: NextRequest,
    // 2e param = "context"
    { params }: { params: { categoryId: string } }
  ) {
    try {
      const category = getCategory(params.categoryId);
      if (!category) {
        return NextResponse.json(
          { error: "Catégorie non trouvée" },
          { status: 404 }
        );
      }
      return NextResponse.json(category);
    } catch (error) {
      return NextResponse.json(
        { error: "Erreur lors de la récupération de la catégorie" },
        { status: 500 }
      );
    }
  }

  
// PUT /api/categories/[categoryId]
export async function PUT(
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
    const existingCategory = getCategory(params.categoryId);

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Catégorie non trouvée" },
        { status: 404 }
      );
    }

    // TODO: Implémenter la mise à jour dans la base de données

    return NextResponse.json({
      ...existingCategory,
      ...body
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la catégorie" },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[categoryId]
export async function DELETE(
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

    const existingCategory = getCategory(params.categoryId);
    if (!existingCategory) {
      return NextResponse.json(
        { error: "Catégorie non trouvée" },
        { status: 404 }
      );
    }

    // TODO: Implémenter la suppression dans la base de données

    return NextResponse.json(
      { message: "Catégorie supprimée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la catégorie" },
      { status: 500 }
    );
  }
}