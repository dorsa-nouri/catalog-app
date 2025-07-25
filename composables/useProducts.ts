const BASE_URL = "https://dummyjson.com/products";

export const useProducts = () => {
  const getAllProducts = async () => {
    return await $fetch(BASE_URL);
  };

  const search = async (query: string) => {
    return await $fetch(`${BASE_URL}/search?q=${query}`);
  };

  const getByCategory = async (category: string) => {
    return await $fetch(`${BASE_URL}/category/${category}`);
  };

  const getById = async (id: number | string) => {
    return await $fetch(`${BASE_URL}/${id}`);
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
    getByCategory,
    getById,
    create,
  };
};
