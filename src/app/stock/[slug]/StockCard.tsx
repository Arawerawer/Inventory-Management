import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Download } from "lucide-react";
import { getProductById } from "@/app/actions/product.action";

// Mock type based on your schema
type getProductId = Awaited<ReturnType<typeof getProductById>>;

interface ProductCardProps {
  product: getProductId;
}

export default function ProductCard({ product }: ProductCardProps) {
  if (!product) {
    return <div>產品資訊不存在</div>;
  }

  return (
    <Card className="w-full">
      <div className="flex">
        <div className="basis-2/4 flex items-center justify-center">
          <CardHeader>
            <CardTitle className="text-5xl font-bold">{product.name}</CardTitle>
          </CardHeader>
        </div>

        <div className="basis-2/4 ">
          <CardContent className="grid grid-cols-2 gap-32">
            <CardTitle className="mt-8 text-3xl font-bold">
              價格：${product.price}
            </CardTitle>

            <CardDescription className="text-xl mt-8 text-yellow-500 break-words whitespace-pre-wrap">
              敘述：{product.description}
            </CardDescription>

            <CardDescription className="text-3xl text-red-500 font-bold">
              庫存：{product.stock}
            </CardDescription>

            <Badge className="text-2xl w-fit">類型：{product.category}</Badge>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
