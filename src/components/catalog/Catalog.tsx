import { useParams, useSearchParams } from "react-router-dom";

import styles from "./Catalog.module.css";
import { CatalogFilter } from "./CatalogFilter";
import { useMemo, useState } from "react";
import { useGetCatalogPageQuery } from "../../store/beekneesApi";
import ProductCard from "../productCard/ProducrCard";
import { Button, Modal } from "antd";
import CreateItem from "../createItem/CreateItem";

export type FilterType = 'add' | 'delete' | 'set';

type Gender = 'man' | 'woman';

export type SelectedFiltersTypes = {
    categories?: string,
    colors?: string[],
    sizes?: string[],
    brands?: string[],
    gender: Gender
}

const Catalog: React.FC = () => {
    const [filters, setFilters] = useState<SelectedFiltersTypes>({ gender: 'man' });

    const [open, setOpen] = useState(false);

    const { isLoading, refetch, data } = useGetCatalogPageQuery({
        limit: 50,
        offset: 0,
        sort: '',
        gender: filters.gender,
        categories: filters.categories ? [filters.categories] : [],
        colors: filters.colors,
        sizes: filters.sizes,
        shops: filters.brands

    });

    const onSelectFilter = (filter: [keyof SelectedFiltersTypes, string], type: FilterType) => {
        const name = filter[0];
        const value = filter[1];
        switch (type) {
            case 'set': setFilters({ ...filters, [name]: value });
                break;
            case 'add':
                const prevValue = filters[name];
                if (!prevValue) setFilters({ ...filters, [name]: [value] });
                else if (typeof prevValue == 'string') setFilters({ ...filters, [name]: [prevValue, value] });
                else setFilters({ ...filters, [name]: [...prevValue, value] });
                break;
            case 'delete':
                const pValue = filters[name];
                if (!pValue) return;
                if (typeof pValue == 'string') setFilters({ ...filters, [name]: null });
                else setFilters({ ...filters, [name]: pValue.filter(v => v != value) });
                break;
        }
    }

    return (
        isLoading
            ? <p>Загрузка...</p>
            : <>
                <div>
                    <CatalogFilter filters={data?.filters ?? null} onSelectFilter={onSelectFilter} selectedFilters={filters} />
                </div>

                <div className={styles.WrapPage}>
                    <div className={styles.WrapListProduct}>
                        <Button onClick={() => setOpen(true)} >Добавить предемет</Button>
                        {
                            data?.productList?.map((item, index) => {
                                return <ProductCard
                                    key={index}
                                    item={item}
                                    addToCartButton={<></>}
                                    addToFavoriteButton={<></>}
                                />
                            })
                        }
                    </div>
                </div>
                <Modal open={open} onCancel={() => setOpen(false)} footer = {null}>
                    <CreateItem refetch={refetch} close={() => setOpen(false)}/>
                </Modal>
            </>

    )
}

export default Catalog;