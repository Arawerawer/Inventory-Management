import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { BackgroundPattern } from "@/components/ui/background-pattern";

import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <BackgroundPattern />

      <div className="relative z-10 text-center max-w-2xl">
        <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none">
          Next v14.2.26
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          雲端庫存系統
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          簡單好用的庫存管理工具，讓您隨時掌握產品數量與進出貨狀態
          <br />
          不再為存貨管理煩惱。
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            <Link href="/stock" className="flex items-center">
              <span>開始</span>
              <ArrowUpRight className="!h-5 !w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
