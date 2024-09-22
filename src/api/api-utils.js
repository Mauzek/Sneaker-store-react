import axios from "axios";
import { BASE_API, CART_API, endpoints } from "./api";


const getSneakersAll = async () => {
  try {
    const url = new URL(BASE_API);
    url.pathname += endpoints.sneakers;
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const getSneakersByCategory = async (length, page, category) => {
  try {
    const url = new URL(BASE_API);
    url.pathname += endpoints.sneakers;
    url.searchParams.append("limit", length);
    url.searchParams.append("page", page);
    url.searchParams.append("category", category);
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const getSneakerByName = async (title) => {
  try {
    const url = new URL(BASE_API);
    url.pathname += endpoints.sneakers;
    url.searchParams.append("title", title);
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const getSneakersByBrand = async (name) => {
  try {
    const url = new URL(BASE_API);
    url.pathname += endpoints.sneakers;
    url.searchParams.append("brand", name);
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const getSneakersByFilters = async (filters) => {
  try {
    const url = new URL(BASE_API);
    url.pathname += endpoints.sneakers;

    if (filters.brand && filters.brand !== "All Brands") {
      url.searchParams.append("brand", filters.brand);
    }
    if (filters.category && filters.category.length > 0) {
      filters.category.forEach((cat) => {
        url.searchParams.append("category", cat);
      });
    }
    if (filters.searchTerm) {
      url.searchParams.append("title", filters.searchTerm);
    }

    const response = await axios.get(url.toString());
    let data = response.data;

    if (filters.minPrice !== "") {
      data = data.filter((sneaker) =>
        sneaker.size.some((size) => size.price >= filters.minPrice)
      );
    }
    if (filters.maxPrice !== "") {
      data = data.filter((sneaker) =>
        sneaker.size.some((size) => size.price <= filters.maxPrice)
      );
    }
    if (filters.size !== "") {
      data = data.filter((sneaker) =>
        sneaker.size.some(
          (size) =>
            size.value === parseInt(filters.size, 10) && size.quantity > 0
        )
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const userAuthorization = async (email, password) => {
  try {
    const url = new URL(BASE_API);
    url.pathname += endpoints.users;
    url.searchParams.append("email", email);
    url.searchParams.append("password", password);
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const userRegistration = async (values) => {
  try {
    const url = new URL(BASE_API);
    url.pathname += endpoints.users;
    const response = await axios.post(url.toString(), values);
    createUserCart(response.data.id);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, error: error.message };
  }
};

const checkEmailExists = async (email) => {
  try {
    const url = new URL(BASE_API);
    url.pathname += endpoints.users;
    const response = await axios.get(url.toString(), {
      params: { email },
    });
    return response.data.length > 0;
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
};

const editUserData = async (userData) => {
  try {
    const url = new URL(BASE_API);
    url.pathname += endpoints.users + `/${userData.id}`;
    const response = await axios.put(url.toString(), userData);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating user data:", error);
    return false;
  }
};

const deleteUserCart = async (userId) => {
  try {
    const url = new URL(CART_API);
    url.pathname += endpoints.carts;
    url.searchParams.append("userId", userId);
    const res = await axios.get(url.toString());
    if (res.data.length === 0) {
      return { success: false, message: "Cart not found" };
    }
    const cartId = res.data[0].cartId;

    const deleteUrl = new URL(CART_API);
    deleteUrl.pathname += `${endpoints.carts}/${cartId}`;

    const response = await axios.delete(deleteUrl.toString());

    return {
      success: true,
      message: "Cart deleted successfully",
      data: response.data,
    };
  } catch (error) {
    console.error("Error during deletion:", error);
    return { success: false, error: error.message };
  }
};

const addToUserCart = async (userId, item) => {
  try {
    const cartResponse = await getUserCart(userId);
    let userCart = cartResponse.find((cart) => cart.userId === userId);
    if (!userCart) {
      userCart = {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
        userId: userId,
      };
    }
    const existingItemIndex = userCart.items.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItemIndex > -1) {
      userCart.items[existingItemIndex].quantity += 1;
    } else {
      userCart.items.push({
        id: item.id,
        image: item.image,
        title: item.title,
        description: item.description,
        size: item.size,
        price: item.price,
        quantity: 1,
      });
    }

    userCart.totalQuantity = userCart.items.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    userCart.totalPrice = userCart.items.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    let response;
    if (userCart.cartId) {
      const putUrl = new URL(CART_API);
      putUrl.pathname += `${endpoints.carts}/${userCart.cartId}`;
      response = await axios.put(putUrl.toString(), userCart);
    } else {
      const postUrl = new URL(CART_API);
      postUrl.pathname += endpoints.carts;
      response = await axios.post(postUrl.toString(), userCart);
    }

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return { success: false, error: error.message };
  }
};

const createUserCart = async (userId) => {
  try {
    const url = new URL(CART_API);
    url.pathname += endpoints.carts;
    const response = await axios.post(url.toString(), {
      userId: userId,
      totalQuantity: 0,
      totalPrice: 0,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, error: error.message };
  }
};

const getUserCart = async(userId) =>{
  try {
    const url = new URL(CART_API);
    url.pathname += endpoints.carts;
    url.searchParams.append('userId', userId);
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, error: error.message };
  }
}

const deleteSneakerFromCart = async ( userId, sneakerId) => {
  try {
    const cartResponse = await getUserCart(userId);
    let userCart = cartResponse.find((cart) => cart.userId === userId);

    if (!userCart) {
      throw new Error("Cart not found for the user");
    }

    const itemIndex = userCart.items.findIndex((item) => item.id === sneakerId);
    if (itemIndex === -1) {
      throw new Error("Sneaker not found in cart");
    }

    userCart.items.splice(itemIndex, 1);

    userCart.totalQuantity = userCart.items.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    userCart.totalPrice = userCart.items.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const putUrl = new URL(CART_API);
    putUrl.pathname += `${endpoints.carts}/${userCart.cartId}`;
    const response = await axios.put(putUrl.toString(), userCart);

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return { success: false, error: error.message };
  }
};

const updateSneakerQuantity = async (userId, itemId, newQuantity) => {
  try {
    const cartResponse = await getUserCart(userId);
    let userCart = cartResponse.find((cart) => cart.userId === userId);
    if (!userCart) {
      throw new Error("Cart not found");
    }
    const updatedItems = userCart.items.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    userCart.items = updatedItems;
    userCart.totalQuantity = updatedItems.reduce((total, item) => total + item.quantity, 0);
    userCart.totalPrice = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const putUrl = new URL(CART_API);
    putUrl.pathname += `${endpoints.carts}/${userCart.cartId}`;
    const response = await axios.put(putUrl.toString(), userCart);

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error updating sneaker quantity:", error);
    return { success: false, error: error.message };
  }
};

export {
  getSneakersByCategory,
  getSneakerByName,
  getSneakersByBrand,
  getSneakersAll,
  getSneakersByFilters,
  userAuthorization,
  userRegistration,
  checkEmailExists,
  editUserData,
  deleteUserCart,
  addToUserCart,
  getUserCart,
  deleteSneakerFromCart,
  updateSneakerQuantity
};
