import { useEffect } from "react"
import { useNavigate } from "react-router"
import config from "../config"
const Logout = () => {
    const navigate=useNavigate()
    const logedout = async () => {
        const res = await fetch(`${config.API_BASE_URL}/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        const response=await res.json()
        if (response.success==true){
            navigate('/')
        }
    }
    useEffect(() => {
        async function logingout() {
            await logedout()
        }
        logingout()
    }, [])

    return (
        <div>
            logout
        </div>
    )
}

export default Logout
