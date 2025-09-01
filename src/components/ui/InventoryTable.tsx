"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Combobox } from "@/components/ui/Combo-box";
import { useState } from "react";
import { getProducts } from "@/app/actions/product.action";
import { useRouter } from "next/navigation";
import { Skeleton } from "./skeleton";
import AlertDialogDemo from "./CreateDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

type getProductsType = Awaited<ReturnType<typeof getProducts>>;

interface InventoryTableProps {
  products: getProductsType;
}

export function InventoryTable({ products }: InventoryTableProps) {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //Filter
  const filteredProducts = products?.userProducts?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) &&
      (selectedCategory === "" || product.category === selectedCategory)
  );

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm w-full ">
          <Input
            placeholder="查詢"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <Combobox
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
        />
        <AlertDialogDemo />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名稱</TableHead>
            <TableHead>種類</TableHead>
            <TableHead>價格</TableHead>
            <TableHead>庫存</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts?.map((product) => {
            const slugifiedName = encodeURIComponent(
              product.name.toLowerCase().replace(/\s+/g, "-")
            );
            const slug = `${product.id}--${slugifiedName}`;
            const productUrl = `/stock/${slug}`;

            return (
              <TableRow
                key={product.id}
                onClick={() => router.push(productUrl)}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>

                <TableCell>
                  <div
                    className="flex justify-end gap-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EditDialog product={product} />
                    <DeleteDialog product={product} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
