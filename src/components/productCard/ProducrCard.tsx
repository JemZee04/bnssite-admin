import { useNavigate } from "react-router-dom";
import { ProductInList } from "../../store/beekneesApi";
import styles from "./ProductCard.module.css";
import NO_IMAGE from '../../assets/images/no_image.png';
import { Button, Image } from "antd";

type ProductCardProps = {
    item: ProductInList,
    addToCartButton: React.ReactElement,
    addToFavoriteButton: React.ReactElement
}

const ProductCard: React.FC<ProductCardProps> = ({ item, addToCartButton, addToFavoriteButton }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.DivCard}>

            <Image
                className={styles.ImageCard}
                fallback={NO_IMAGE}
                src={item.images !== undefined
                    ? item.images?.at(0)?.filepath
                    : NO_IMAGE}
                alt="image product" />
            <div className={styles.DivFavoriteButton}>
                {
                    addToFavoriteButton
                }
            </div>
            <div className={styles.CardContent}>
                <div className={styles.CardMainInfo}>
                    <p className={styles.CardTitle}>{item.name}</p>
                    <p className={styles.CardTitle}>{item.price}</p>
                </div>
                <div className={styles.CardMainInfo}>
                    <p className={styles.CardContent}>{item.shop?.name}</p>
                    {addToCartButton}
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Button>Редактировать</Button>
                    <Button>Удалить</Button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;