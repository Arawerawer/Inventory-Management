import StockCard from "@/app/stock/[slug]/StockCard";
import { SignIn, StackServerApp } from "@stackframe/stack";
import { getProductById } from "@/app/actions/product.action";
import { stackServerApp } from "@/stack";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const [id] = params.slug.split("--");
  const product = await getProductById(id);

  return {
    title: product ? product.name : "Product Details",
    description: product ? product.description : "Product details page",
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const user = await stackServerApp.getUser();
  const [id] = params.slug.split("--");
  const product = await getProductById(id);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4">
      <StockCard product={product} />
    </div>
  );
};

export default Page;
