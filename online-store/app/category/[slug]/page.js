import { categories } from '../../../data/mockData';
import Category from '../../../components/Category';
import { getSlug } from '@/data/getSlug';

const CategoryPage = ({ params }) => {
    const { slug } = params

    const category = categories.find((c) => getSlug(c.name) === slug) // todo: backend (baza danych)
    //console.log(products.map(p=>getSlug(p.name)))

    if (!category) {
        return <div>Category not found</div>
    }

    return <Category category={category} />
}

export default CategoryPage