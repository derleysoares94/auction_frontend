import {
    FormControl,
    FormLabel,
    Button,
    VStack,
    Input,
    Text,
} from '@chakra-ui/react'

import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import '../css/auction.css';

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { login_user } = useAuth();
    const nav = useNavigate();

    const handleLogin = () => {
        login_user(username, password)
    }

    const handleNavigate = () => {
        nav('/register')
    }

    return (
        <VStack className='container' justifyContent='start' alignItems='start'>
            <Text mb='20px' color='gray.700' fontSize='44px' fontWeight='bold'>Login</Text>
            <FormControl mb='20px'>
                <FormLabel>Username</FormLabel>
                <Input bg='white' onChange={(e) => setUsername(e.target.value)} value={username} type='email' placeholder='Your username here' />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input bg='white' onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Your password here' />
            </FormControl>
            <Button mb='10px' colorScheme='blue' mt='20px' w='100%' onClick={handleLogin}>Login</Button>
            <Text onClick={handleNavigate} cursor='pointer' color='gray.600' fontSize='14px'>Don't have an account? Sign up</Text>
        </VStack>
    )
}

export default Login;