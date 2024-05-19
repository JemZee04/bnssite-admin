import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHealthCheck: build.query<
      GetHealthCheckApiResponse,
      GetHealthCheckApiArg
    >({
      query: () => ({ url: `/health/check` }),
    }),
    getMainPage: build.query<GetMainPageApiResponse, GetMainPageApiArg>({
      query: () => ({ url: `/main-page` }),
    }),
    getCatalogPage: build.query<
      GetCatalogPageApiResponse,
      GetCatalogPageApiArg
    >({
      query: (queryArg) => ({
        url: `/catalog-page`,
        params: {
          gender: queryArg.gender,
          categories: queryArg.categories,
          sizes: queryArg.sizes,
          colors: queryArg.colors,
          shops: queryArg.shops,
          searchValue: queryArg.searchValue,
          sort: queryArg.sort,
          limit: queryArg.limit,
          offset: queryArg.offset,
        },
      }),
    }),
    getProductPageByProductId: build.query<
      GetProductPageByProductIdApiResponse,
      GetProductPageByProductIdApiArg
    >({
      query: (queryArg) => ({ url: `/product-page/${queryArg["product-id"]}` }),
    }),
    getShopPageByShopCode: build.query<
      GetShopPageByShopCodeApiResponse,
      GetShopPageByShopCodeApiArg
    >({
      query: (queryArg) => ({ url: `/shop-page/${queryArg["shop-code"]}` }),
    }),
    postProductByProductIdUserAndUserIdAddToCart: build.mutation<
      PostProductByProductIdUserAndUserIdAddToCartApiResponse,
      PostProductByProductIdUserAndUserIdAddToCartApiArg
    >({
      query: (queryArg) => ({
        url: `/product/${queryArg["product-id"]}/user/${queryArg["user-id"]}/add-to-cart`,
        method: "POST",
      }),
    }),
    getUserByUserIdCart: build.query<
      GetUserByUserIdCartApiResponse,
      GetUserByUserIdCartApiArg
    >({
      query: (queryArg) => ({ url: `/user/${queryArg["user-id"]}/cart` }),
    }),
    postUserSignIn: build.mutation<
      PostUserSignInApiResponse,
      PostUserSignInApiArg
    >({
      query: (queryArg) => ({
        url: `/user/sign-in`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postUserSignUp: build.mutation<
      PostUserSignUpApiResponse,
      PostUserSignUpApiArg
    >({
      query: (queryArg) => ({
        url: `/user/sign-up`,
        method: "POST",
        body: queryArg.userSignIn,
      }),
    }),
    postUserRefresh: build.mutation<
      PostUserRefreshApiResponse,
      PostUserRefreshApiArg
    >({
      query: (queryArg) => ({
        url: `/user/refresh`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getProductByProductIdReviews: build.query<
      GetProductByProductIdReviewsApiResponse,
      GetProductByProductIdReviewsApiArg
    >({
      query: (queryArg) => ({
        url: `/product/${queryArg["product-id"]}/reviews`,
      }),
    }),
    getShopByShopCodeReviews: build.query<
      GetShopByShopCodeReviewsApiResponse,
      GetShopByShopCodeReviewsApiArg
    >({
      query: (queryArg) => ({ url: `/shop/${queryArg["shop-code"]}/reviews` }),
    }),
    postUserByUserIdProductandProductIdReviews: build.mutation<
      PostUserByUserIdProductandProductIdReviewsApiResponse,
      PostUserByUserIdProductandProductIdReviewsApiArg
    >({
      query: (queryArg) => ({
        url: `/user/${queryArg["user-id"]}/product${queryArg["product-id"]}/reviews`,
        method: "POST",
        body: queryArg.review,
      }),
    }),
    postShopSignUp: build.mutation<
      PostShopSignUpApiResponse,
      PostShopSignUpApiArg
    >({
      query: (queryArg) => ({
        url: `/shop/sign-up`,
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
        body: queryArg.body,
      }),
    }),
    postShopByShopIdProducts: build.mutation<
      PostShopByShopIdProductsApiResponse,
      PostShopByShopIdProductsApiArg
    >({
      query: (queryArg) => ({
        url: `/shop/${queryArg["shop-id"]}/products`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postShopSignIn: build.mutation<
      PostShopSignInApiResponse,
      PostShopSignInApiArg
    >({
      query: (queryArg) => ({
        url: `/shop/sign-in`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as beekneesApi };
export type GetHealthCheckApiResponse =
  /** status 200 A successful response. */ ОбъектСИнформациейОРаботоспособностиСервиса;
export type GetHealthCheckApiArg = void;
export type GetMainPageApiResponse =
  /** status 200 Метод успешно отработал */ ГлавнаяСтраница;
export type GetMainPageApiArg = void;
export type GetCatalogPageApiResponse =
  /** status 200 Метод успешно отработал */ СтраницаКаталогаТоваров;
export type GetCatalogPageApiArg = {
  /** Значение для фильтрации по категориям */
  gender?: string;
  /** Значение для фильтрации по категориям */
  categories?: string[];
  /** Значение для фильтрации по размерам */
  sizes?: string[];
  /** Значение для фильтрации по цвету */
  colors?: string[];
  /** Значение для фильтрации по брендам/магазинам */
  shops?: string[];
  /** Значение для поиска */
  searchValue?: string;
  /** Значение для сортировки */
  sort: string;
  /** Значение для лимита */
  limit: number;
  /** Значение для смещения */
  offset: number;
};
export type GetProductPageByProductIdApiResponse =
  /** status 200 Метод успешно отработал */ СтраницаТовара;
export type GetProductPageByProductIdApiArg = {
  /** ID страницы */
  "product-id": Uuid;
};
export type GetShopPageByShopCodeApiResponse =
  /** status 200 Метод успешно отработал */ СтраницаТовара2;
export type GetShopPageByShopCodeApiArg = {
  /** Код магазина/бренда */
  "shop-code": Sluggable;
};
export type PostProductByProductIdUserAndUserIdAddToCartApiResponse = unknown;
export type PostProductByProductIdUserAndUserIdAddToCartApiArg = {
  /** ID страницы */
  "product-id": Uuid;
  /** ID страницы */
  "user-id": Uuid;
};
export type GetUserByUserIdCartApiResponse =
  /** status 200 Метод успешно отработал */ Cart;
export type GetUserByUserIdCartApiArg = {
  /** ID страницы */
  "user-id": Uuid;
};
export type PostUserSignInApiResponse =
  /** status 200 Метод успешно отработал */ {
  accessToken?: string;
  refreshToken?: string;
};
export type PostUserSignInApiArg = {
  /** Данные элемента страницы */
  body: {
    phone?: string;
    password?: string;
  };
};
export type PostUserSignUpApiResponse =
  /** status 200 Метод успешно отработал */ Uuid;
export type PostUserSignUpApiArg = {
  /** Данные элемента страницы */
  userSignIn: UserSignIn;
};
export type PostUserRefreshApiResponse =
  /** status 200 Метод успешно отработал */ {
  accessToken?: string;
  refreshToken?: string;
};
export type PostUserRefreshApiArg = {
  /** Данные элемента страницы */
  body: {
    accessToken?: string;
    refreshToken?: string;
  };
};
export type GetProductByProductIdReviewsApiResponse =
  /** status 200 Метод успешно отработал */ Review[];
export type GetProductByProductIdReviewsApiArg = {
  /** ID страницы */
  "product-id": Uuid;
};
export type GetShopByShopCodeReviewsApiResponse =
  /** status 200 Метод успешно отработал */ Review[];
export type GetShopByShopCodeReviewsApiArg = {
  /** Код магазина/бренда */
  "shop-code": Sluggable;
};
export type PostUserByUserIdProductandProductIdReviewsApiResponse =
  /** status 201 Метод успешно отработал */ {
  /** Идентификатор отзыва */
  reviewId: string;
};
export type PostUserByUserIdProductandProductIdReviewsApiArg = {
  /** ID страницы */
  "user-id": Uuid;
  /** ID страницы */
  "product-id": Uuid;
  /** Данные элемента страницы */
  review: Review;
};
export type PostShopSignUpApiResponse =
  /** status 200 Метод успешно отработал */ {
  accessToken?: string;
  refreshToken?: string;
};
export type PostShopSignUpApiArg = {
  /** Данные элемента страницы */
  body: {
    file?: Файл;
    shop?: ShopSave;
  };
};
export type PostShopByShopIdProductsApiResponse =
  /** status 200 Метод успешно отработал */ Product;
export type PostShopByShopIdProductsApiArg = {
  /** ID страницы */
  "shop-id": Uuid;
  /** Данные товара */
  body: {
    file?: Файл;
    product?: ProductSave;
  };
};
export type PostShopSignInApiResponse =
  /** status 200 Метод успешно отработал */ {
  accessToken?: string;
  refreshToken?: string;
};
export type PostShopSignInApiArg = {
  /** Данные для авторизации */
  body: {
    phone?: string;
    password?: string;
  };
};
export type ОбъектСИнформациейОРаботоспособностиСервиса = {
  status?: string;
};
export type ОбъектОшибки = {
  error?: string;
  code?: number;
  message?: string;
  debug?: string;
};
export type Uri = string;
export type MenuItem = {
  text?: string;
  url?: Uri;
  menuItems?: MenuItem[];
};
export type Uuid = string;
export type Sluggable = string;
export type ОбъектМедиа = {
  /** ID */
  id?: string;
  /** Название файла */
  name?: string;
  /** Название файла с форматом */
  filename?: string;
  /** Значение alt */
  alt?: string;
  /** Значение title */
  title?: string;
  /** Размер файла */
  size?: number;
  /** Путь к файлу */
  filepath?: string;
  /** Время создания */
  createdAt?: string;
  /** Время последнего обновления */
  updatedAt?: string;
  /** ID папки */
  folderId?: string;
};
export type ShopInList = {
  id?: Uuid;
  code?: Sluggable;
  name?: string;
  logo_image?: ОбъектМедиа;
};
export type Размер = {
  id?: Uuid;
  name?: string;
};
export type ProductInList = {
  id?: Uuid;
  name?: string;
  shop?: ShopInList;
  price?: number;
  colors?: string[];
  sizes?: Размер[];
  images?: ОбъектМедиа[];
};
export type ГлавнаяСтраница = {
  headerMenu?: MenuItem[];
  shopList?: ShopInList[];
  saleProductList?: ProductInList[];
  popularProductList?: ProductInList[];
};
export type Error = {
  /** Код ошибки, к которому привел вызов метода
   */
  applicationErrorCode: string;
  /** Человекочитаемое сообщение об ошибке
   */
  message: string;
  /** Дополнительная отладочная информация
   */
  debug?: string;
};
export type КатегорияТоваров = {
  id?: Uuid;
  name?: string;
  subCategories?: КатегорияТоваров[];
};
export type Цвет = {
  id?: Uuid;
  name?: string;
  hex?: string;
};
export type ФильтрыИСортировка = {
  categories?: КатегорияТоваров[];
  sizes?: Размер[];
  colors?: Цвет[];
  shops?: ShopInList[];
  sortBy?: string[];
};
export type СтраницаКаталогаТоваров = {
  headerMenu?: MenuItem[];
  filters?: ФильтрыИСортировка;
  productList?: ProductInList[];
};
export type Product = {
  id?: Uuid;
  name?: string;
  description?: string;
  composition?: string;
  shop?: ShopInList;
  material?: string;
  price?: number;
  sizes?: Размер[];
  colors?: Цвет[];
  rating?: number;
  quantityReviews?: number;
  sizesInformationImg?: ОбъектМедиа;
  images?: ОбъектМедиа[];
};
export type СтраницаТовара = {
  headerMenu?: MenuItem[];
  product?: Product;
  popularProductList?: ProductInList[];
};
export type Shop = {
  id?: Uuid;
  code?: Sluggable;
  name?: string;
  description?: string;
  orderQuantity?: number;
  createdDate?: string;
  rating?: number;
  quantityReviews?: number;
  mainImage?: ОбъектМедиа;
  images?: ОбъектМедиа[];
  logo?: ОбъектМедиа;
};
export type Links = {
  text?: string;
  url?: Uri;
};
export type ФутерСтраницы = {
  links?: Links[];
};
export type СтраницаТовара2 = {
  headerMenu?: MenuItem[];
  shop?: Shop;
  popularProductOfShopList?: ProductInList[];
  footer?: ФутерСтраницы;
};
export type ProductInCart = {
  id?: Uuid;
  name?: string;
  price?: number;
  quantity?: number;
  image?: ОбъектМедиа;
};
export type Cart = {
  productList?: ProductInCart[];
  quantity?: number;
  totalPrice?: number;
};
export type UserSignIn = {
  phone?: string;
  name?: string;
  password?: string;
};
export type UserShort = {
  id?: Uuid;
  name?: string;
};
export type Review = {
  id?: Uuid;
  rating?: number;
  date?: string;
  text?: string;
  user?: UserShort;
};
export type Файл = Blob;
export type ShopSave = {
  code?: Sluggable;
  name?: string;
  description?: string;
  orderQuantity?: number;
  createdDate?: string;
  rating?: number;
  quantityReviews?: number;
};
export type ProductSave = {
  name?: string;
  description?: string;
  composition?: string;
  shopId?: Uuid;
  material?: string;
  price?: number;
  sizeIds?: Uuid[];
  colors?: Uuid[];
  gender?: string;
  categoryIds?: Uuid[];
};
export const {
  useGetHealthCheckQuery,
  useGetMainPageQuery,
  useGetCatalogPageQuery,
  useGetProductPageByProductIdQuery,
  useGetShopPageByShopCodeQuery,
  usePostProductByProductIdUserAndUserIdAddToCartMutation,
  useGetUserByUserIdCartQuery,
  usePostUserSignInMutation,
  usePostUserSignUpMutation,
  usePostUserRefreshMutation,
  useGetProductByProductIdReviewsQuery,
  useGetShopByShopCodeReviewsQuery,
  usePostUserByUserIdProductandProductIdReviewsMutation,
  usePostShopSignUpMutation,
  usePostShopByShopIdProductsMutation,
  usePostShopSignInMutation,
} = injectedRtkApi;
