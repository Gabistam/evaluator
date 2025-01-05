import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { MainModel } from "@/models";
import { connectDB } from "@/lib/mongodb";

// GET /api/categories
export async function GET() {
  try {
    await connectDB();
    const result = await MainModel.findOne({ _id: 'evaluator_db_001' });
    return NextResponse.json(result?.categories || []);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des catégories" },
      { status: 500 }
    );
  }
}

// POST /api/categories
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    if (!body.name || !body.image) {
      return NextResponse.json(
        { error: "Nom et image requis" },
        { status: 400 }
      );
    }

    const newCategory = {
      id: `cat_${Date.now()}`,
      name: body.name,
      image: body.image,
      appreciations: [],
      description: body.description || ''
    };

    await MainModel.updateOne(
      { _id: 'evaluator_db_001' },
      { $push: { categories: newCategory } }
    );
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la catégorie" },
      { status: 500 }
    );
  }
}