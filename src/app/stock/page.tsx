import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import { InventoryTable } from "@/components/ui/InventoryTable";
import { getProducts } from "../actions/product.action";

async function page() {
  const user = await stackServerApp.getUser();

  const products = await getProducts();

  return (
    <>
      {user ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 ">
          <InventoryTable products={products} />
        </div>
      ) : (
        <div className="flex justify-center mt-20">
          <SignUp />
        </div>
      )}
    </>
  );
}

export default page;
