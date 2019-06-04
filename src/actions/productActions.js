import { FETCH_PRODUCTS } from "./types";

export const fetchProducts = {} => {
  axios.get('http://localhost:4000/products')
    .then((response) => {
      // handle success
      console.log(response);
      return { type: FETCH_PRODUCTS, payload: response.data }
      /*this.setState({
        products: response.data
      }, () => {
        this.setState({ isLoading: true })
      })*/
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
  
}