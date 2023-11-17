import { products } from '../../../data/mockData';
import ProductDetailsComponent from '../../../components/ProductDetailsComponent';
import { getSlug } from '@/data/getSlug';

const ProductDetails = ({ params }) => {
    const { slug } = params

    const product = products.find((p) => getSlug(p.name) === slug) // todo: backend (baza danych)
    console.log(products.map(p=>getSlug(p.name)))

    if (!product) {
        return <div>Product not found</div>
    }

    return <ProductDetailsComponent product={product} />
}

export default ProductDetails