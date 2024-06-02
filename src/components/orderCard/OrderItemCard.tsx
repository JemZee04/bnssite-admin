import { ProductInOrder, Shop, Размер, Цвет } from "../../store/beekneesApi";
import styles from "./OrderCard.module.css";
import Picture from "../../assets/images/no_image.png";

export type Uuid = string;

export type ProductInList = {
    id?: Uuid;
    name?: string;
    shop?: Shop;
    price?: number;
    colors?: Цвет;
    sizes?: Размер;
    images?: string;
};

type CardOrderProps = {
    item : ProductInOrder;
    count: number;
}

const CardOrder: React.FC<CardOrderProps> = ({item, count}) => {
console.log('ITEM - ', item);


    return(
        <div className={styles.CardDiv}>
            <div className={styles.ContentDiv}>
                <img className={styles.CardImage} src={item.images !== undefined ? item.images.at(0)?.filepath : Picture}/>
                <div>
                    <p className={styles.CardTitle}>{item.name}</p>
                    <p>{item.sizes !== undefined ? item.sizes.name : ""}</p>
                    <p>{item.colors !== undefined ? item.colors.name : ""}</p>

                    <p>{item.shop?.name}</p>
                </div>
            </div>

            <div>
                <p>{`${item.price?.toFixed(2)} ₽ × ${Math.round(count)} = ${((item.price ?? 1) * count).toFixed(2)} ₽`}</p>
            </div>
        </div>
    )
}

export default CardOrder;