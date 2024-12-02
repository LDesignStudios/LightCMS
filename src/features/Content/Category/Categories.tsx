"use client";

import CategoryList from "./CategoryList";
import { Category } from "./types";

interface CategoriesProps {
  initialCategories: Category[];
}

export default function Categories({ initialCategories }: CategoriesProps) {
  return <CategoryList categories={initialCategories} />;
}
