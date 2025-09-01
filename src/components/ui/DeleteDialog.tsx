"use client";

import { deleteProduct } from "@/app/actions/product.action";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AwardIcon, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface DeleteDialogProps {
  product: {
    id: string;
  };
}

export default function DeleteDialog({ product }: DeleteDialogProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteProduct(product.id);
      toast.success("產品刪除成功");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("刪除產品失敗");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className=" flex items-center gap-2"
          asChild
        >
          <span className="cursor-pointer">
            <Trash2 className="w-4 h-4 text-default" />
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>你確定嗎</AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            此操作無法撤銷。這將永久刪除該產品。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction type="submit">確認刪除</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
