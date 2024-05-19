import { Menu, MenuProps } from "antd"
import { useMemo } from "react"
import { FilterType, SelectedFiltersTypes } from "./Catalog"
import { FiltersAndSorting } from "../../store/beekneesApi"


type CatalogFilterProps = {
    selectedFilters: SelectedFiltersTypes | null
    filters: FiltersAndSorting | null
    onSelectFilter: (filters: [keyof SelectedFiltersTypes, string], type: FilterType) => void
}

type MenuItem = Required<MenuProps>['items'][number];

export const CatalogFilter: React.FC<CatalogFilterProps> = ({ filters, onSelectFilter, selectedFilters }) => {

    console.log('SELECTED FILTERS = ', selectedFilters);
    

    const _buildCategories = (categories: FiltersAndSorting['categories']): MenuItem[] | undefined => {
        if (categories) return categories.map(category => ({
            label: category.name ?? 'Неизветсная категория',
            key: category.id ?? '',
            onClick: (info) => {
                if (info.key == selectedFilters?.categories) onSelectFilter(['categories', category?.id ?? ''], 'delete');
                onSelectFilter(['categories', category?.id ?? ''], 'set')
            },
            children: _buildCategories(category.subCategories)
        }));
        return undefined;
    }

    const menuItems = useMemo<MenuItem[]>(() => filters
        ? [
            {
                label: 'Категории',
                key: 'categories',
                children: _buildCategories(filters.categories)
            },
            {
                label: 'Размеры',
                key: 'sizes',
                onClick: (info: any) => {
                    if (selectedFilters?.sizes?.find(size => size == info.key)) onSelectFilter(['sizes', info.key], 'delete');
                    else onSelectFilter(['sizes', info.key], 'add');
                },
                children: filters.sizes?.map(size => ({ label: size.name, key: size.id }))
            },
            {
                label: 'Цвета',
                key: 'colors',
                onClick: (info) => {
                    console.log('SELECTED FILTERS ---', selectedFilters?.colors);
                    
                    if (selectedFilters?.colors?.find(color => color == info.key)) onSelectFilter(['colors', info.key], 'delete');
                    else onSelectFilter(['colors', info.key], 'add');
                },
                children: filters.colors?.map(color => ({ label: color.name, key: color.id }))
            },
            {
                label: 'Бренды',
                key: 'brands',
                onClick: (info) => {
                    if (selectedFilters?.brands?.find(color => color == info.key)) onSelectFilter(['brands', info.key], 'delete');
                    else onSelectFilter(['brands', info.key], 'add');
                },
                children: filters.shops?.map(shop => ({
                    label: shop.name,
                    key: shop.id
                }))
            },
            {
                label: 'Пол',
                key: 'gender',
                onClick: (info) => {
                    if (selectedFilters?.gender == info.key) onSelectFilter(['gender', info.key], 'delete');
                    else onSelectFilter(['gender', info.key], 'set');
                },
                children: [
                    {
                        label: 'Мужское',
                        key: 'man'
                    },
                    {
                        label: 'Женское',
                        key: 'woman'
                    },
                ]
            }
        ]
        : [],
        [filters]);


    return filters && <Menu
        selectedKeys={[
            ...selectedFilters?.colors ?? [],
            ...selectedFilters?.sizes ?? [],
            ...selectedFilters?.brands ?? [],
            ...(selectedFilters?.categories ? [selectedFilters.categories] : [])
        ]}
        mode='horizontal'
        items={menuItems}
    />
}