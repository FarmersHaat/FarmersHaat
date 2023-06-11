import { createContext , useState , useEffect } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

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
        <Context.Provider value={{screenSize}}>
            {children}
        </Context.Provider>
    )
}

export default AppContext;