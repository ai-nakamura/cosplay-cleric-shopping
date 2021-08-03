import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispatch) => {
  console.log("fetching");
  const res = await fetch("/api/products");
  console.log("data");
  const data = await res.json();
  console.log("data received");
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data
  });
}