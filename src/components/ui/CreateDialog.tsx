import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";
import { Combobox } from "@/components/ui/Combo-box";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Input } from "./input";
import { useState } from "react";
import { createProduct } from "@/app/actions/product.action";
import toast from "react-hot-toast";

export default function CreateDialog() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: 1,
    price: 1,
    category: "",
    userId: "",
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newProduct = await createProduct(formData);
      // console.log("product created:", newProduct);
      toast.success("產品創建成功");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("產品創建失敗");
    }
  };

  const isDisabled =
    formData.name.trim() === "" ||
    formData.description.trim() === "" ||
    formData.category.trim() === "" ||
    formData.price === 0 ||
    formData.stock === 0;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="ml-auto flex items-center gap-2">
          <Sprout className="w-4 h-4" />
          新增產品
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>新增產品</AlertDialogTitle>
          <AlertDialogDescription>填寫資料並新增產品</AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">名稱</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="category">種類</Label>
              <Combobox
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">敘述</Label>
            <Textarea
              id="description"
              placeholder="Type your message here."
              rows={5}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="stock">庫存</Label>
              <Input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="price">價格</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction type="submit" disabled={isDisabled}>
              提交
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
