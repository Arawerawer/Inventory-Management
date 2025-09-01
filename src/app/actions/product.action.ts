"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.actions";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

// Get all products with optional search (visible to everyone)
export async function getProducts(searchTerm?: string) {
  try {
    const currentUserId = await getUserId();

    const whereClause: any = {
      userId: currentUserId,
    };

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userProducts = await prisma.products.findMany({
      where: whereClause,
    });

    revalidatePath("/stock");
    return { success: true, userProducts };
  } catch (error) {
    console.log("Error in getProducts", error);
    throw new Error("Failed to fetch products");
  }
}

//get product by id
export async function getProductById(id: string) {
  return await prisma.products.findUnique({
    where: { id },
  });
}
//create
export async function createProduct(data: Prisma.ProductsCreateInput) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;
    const newProduct = await prisma.products.create({
      data: {
        ...data,
        userId: currentUserId,
      },
    });

    revalidatePath("/stock");
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

// Update a product
export async function editProduct(
  id: string,
  data: Prisma.ProductsUpdateInput
) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;
    const updatedProduct = await prisma.products.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });

    revalidatePath("/stock");
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

//delete
export async function deleteProduct(id: string) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const deletedProduct = await prisma.products.delete({
      where: { id },
    });

    revalidatePath("/stock");
    return deletedProduct;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
