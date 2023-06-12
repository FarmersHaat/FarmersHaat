import {useEffect,useState} from 'react'
import {fetchData} from '../utils/api'

const useFetch = (endpoint) => {
    const [data,setData] = useState();

    const makeAPIcall = async () => {
        await fetchData(endpoint)
        .then(data => setData(data))
        .catch(error => console.log(error))
        
    };

    useEffect( () => {
        makeAPIcall()
    },[endpoint])

    return {data};
}

export default useFetch;