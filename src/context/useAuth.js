import { createContext, useContext, useEffect, useState } from 'react'

import { register, login, authenticated_user, new_auction, update_auction } from '../api/endpoints'

import { useNavigate } from 'react-router-dom'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const nav = useNavigate()

    const get_authenticated_user = async () => {
        try {
            const authentication = await authenticated_user();
            
            if (authentication.authenticated) {
                setUser(authentication.user)
                setIsAuthenticated(true)
            }
        } catch {
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }   
    }

    const login_user = async (username, password) => {
        try {
            const success = await login(username, password);
            if (success) {
                get_authenticated_user()
                nav('/')
            }
        } catch {
            setIsAuthenticated(false)
        }
    }

    const register_user = async (username, email, password, passwordConfirm, userType) => {
        if (password === passwordConfirm) {
            await register(username, email, password, userType);
            toastr.success('User registered')
            nav('/login')
        }else {
            toastr.error('Passwords do not match')
        }
    }

    const create_auction = async (formData) => {
        try {
            await new_auction(formData);
            toastr.success('Auction created')
        } catch (error) {
            return toastr.error('Error creating auction')
        }
    }

    const auth_update_auction = async (id, formData) => {
        if (!formData) {
            return toastr.error('No data to update')
        }
        try {
            await update_auction(id, formData)
            toastr.success('Auction updated')
        } catch (error) {
            return toastr.error('Error updating auction')
        }
    }

    useEffect(() => {
        get_authenticated_user()
    }, [window.location.pathname])

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login_user, register_user, create_auction, auth_update_auction }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)