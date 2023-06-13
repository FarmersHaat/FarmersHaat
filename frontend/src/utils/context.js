import { createContext , useState , useEffect } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {
	const [screenSize, setScreenSize] = useState(getCurrentDimension());
	const [showCart, setShowCart] = useState(false);
	const [products, setProducts] = useState({ data: [] });
	const [cartItems, setCartItems] = useState(
			window.sessionStorage.getItem("cartItem") ?
			JSON.parse(window.sessionStorage.getItem("cartItem")):
			[]
	);
	const [cartCount, setCartCount] = useState(0);
	const [cartSubtotal, setCartSubtotal] = useState(0);

	console.log(cartItems);
	
	useEffect(() => {
		let count = 0;
		let subtotal  = 0;
		cartItems.map(product => {
			count += product.attributes.quantity;
			subtotal += product.attributes.quantity * product.attributes.discountedPrice;
		})

		setCartCount(count);
		setCartSubtotal(subtotal);
	}, [cartItems]);
	
	const handleAddToCart = (product, quantity) => {
		let items = [...cartItems];
		let index = items.findIndex(p => p.id === product.id);
		if (index !== -1)
			items[index].attributes.quantity += quantity;
		else{
			product.attributes.quantity = quantity;
			items = [...items, product];
		}

		window.sessionStorage.setItem("cartItem",JSON.stringify(items))
		setCartItems(items);
	}
	
	const handleRemoveFromCart = (product) => {
		let items = [...cartItems];
		items = items.filter(p => p.id !== product.id);
		window.sessionStorage.setItem("cartItem",JSON.stringify(items))
		setCartItems(items);
	}
	
	const handleCartProductQuantity = (type,product) => {
		let items = [...cartItems];
		let index = items.findIndex(p => p.id === product.id);
		if (type === 'inc')
			items[index].attributes.quantity += 1;
		else{
			if(items[index].attributes.quantity === 1){
				handleRemoveFromCart(product);
				return;
			}
			items[index].attributes.quantity -= 1;
		}
		window.sessionStorage.setItem("cartItem",JSON.stringify(items))
		setCartItems(items);
	}

  	function getCurrentDimension(){
    	return {
      		width: window.innerWidth,
      		height: window.innerHeight
    	}
  	}
  
  	useEffect(() => {
    		const updateDimension = () => {
      			setScreenSize(getCurrentDimension())
    		}
    		window.addEventListener('resize', updateDimension);
    
		
    		return(() => {
        		window.removeEventListener('resize', updateDimension);
    		})
    }, [screenSize])
    
    return (
		<Context.Provider value={{
			screenSize,
			products,
			setProducts,
			cartItems,
			setCartItems,
			cartCount,
			setCartCount,
			cartSubtotal,
			showCart , 
			setShowCart,
			setCartSubtotal,
			handleAddToCart,
			handleRemoveFromCart,
			handleCartProductQuantity
		}}>
            {children}
        </Context.Provider>
    )
}

export default AppContext;