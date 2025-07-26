const BASE_URL = "https://dummyjson.com/products";

export const useProducts = () => {
  const getAllProducts = async () => {
    return await $fetch(BASE_URL);
  };

  const search = async (query: string) => {
    return await $fetch(`${BASE_URL}/search?q=${query}`);
  };

  const getCategoryList = async () => {
    return await $fetch(`${BASE_URL}/category-list`);
  };

  const getByCategory = async (category: string) => {
    return await $fetch(`${BASE_URL}/category/${category}`);
  };

  const getById = async (id: number | string) => {
    return await $fetch(`${BASE_URL}/${id}`);
  };

  const getSorted = async (category: string, order: string) => {
    return await $fetch(`${BASE_URL}?sortBy=${category}&order=${order}`);
  };

  const create = async (product: {
    title: string;
    description: string;
    price: number;
    brand?: string;
    category?: string;
  }) => {
    return await $fetch(BASE_URL + "/add", {
      method: "POST",
      body: product,
    });
  };

  return {
    getAllProducts,
    search,
    getCategoryList,
    getByCategory,
    getById,
    getSorted,
    create,
  };
};
