import { useState } from 'react'
import { setItem } from '../utils/Store.jsx'
import { useNavigate } from 'react-router'
function App() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        // setLoading(true)
        setError(false)
        if (!email || !password) {
            setError("Please provide email and password!!")
            return
        }

        setIsLoading(true)
        try {
            const res = await fetch('http://127.0.0.1:8001/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()
            if (!res.ok) {
                setError(data.message || "Login Failed")
            }

            await setItem('token', data.token)
            navigate('/dashboard')

        }
        catch (err) {
            setError(err)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <section className="h-screen flex flex-col justify-center items-center">

                <div className="form border p-5 w-ft h-fit flex flex-col">
                    <h1 className="text-xl"> SignIn </h1>
                    <form onSubmit={(e) => handleLogin(e)}>
                        <div className="input my-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email}
                                onInput={(e) => setEmail(e.target.value)}
                                className="border rounded border-blue-100 hover:border-blue-400 block" />
                        </div>

                        <div className="input my-3">
                            <label htmlFor="pass">Password</label>
                            <input type="password" name="pass" value={password}
                                onInput={(e) => setPassword(e.target.value)}
                                className="border rounded border-blue-100 hover:border-blue-400 block" />
                        </div>

                        <button type="submit" className="bg-blue-200 hover:bg-blue-400 rounded py-1 px-4 ">
                            {isLoading ? "Signin in..." : "Sign In"}
                        </button>
                    </form>
                    <div className="text-red text-sm">{isLoading ? error : ''}</div>
                </div>

            </section>
        </>
    )
}

export default App
