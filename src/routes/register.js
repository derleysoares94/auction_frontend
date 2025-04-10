import {
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
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

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const { register_user } = useAuth();
    const nav = useNavigate();

    const handleUserRegister = async ({ username, email, password, passwordConfirm, userType }) => {
        await register_user(username, email, password, passwordConfirm, userType)
    }

    const handleNavigate = () => {
        nav('/login')
    }

    return (
        <Tabs variant="enclosed" isFitted w="600px">
            <TabList>
                <Tab>User Register</Tab>
                <Tab>Company Register</Tab>
            </TabList>

            <TabPanels>
                {/* tab User register */}
                <TabPanel>
                    <VStack minH="500px" w="100%" maxW="800px" justifyContent="start" alignItems="start">
                        <Text mb="20px" color="gray.700" fontSize="44px" fontWeight="bold">User Register</Text>
                        <FormControl mb="20px">
                            <FormLabel>Username</FormLabel>
                            <Input bg="white" onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="User name" />
                        </FormControl>
                        <FormControl mb="20px">
                            <FormLabel>Email</FormLabel>
                            <Input bg="white" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="example@email.com" />
                        </FormControl>
                        <FormControl mb="20px">
                            <FormLabel>Password</FormLabel>
                            <Input bg="white" onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Users password" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input bg="white" onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} type="password" placeholder="Confirm your password" />
                        </FormControl>
                        <Button mb="10px" colorScheme="blue" mt="20px" w="100%" onClick={() => handleUserRegister({username, email, password, passwordConfirm, userType: 'user'})}>Register</Button>
                    </VStack>
                </TabPanel>

                {/* Tab company register */}
                <TabPanel>
                    <VStack minH="500px" w="100%" maxW="800px" justifyContent="start" alignItems="start">
                        <Text mb="20px" color="gray.700" fontSize="44px" fontWeight="bold">Company Register</Text>
                        <FormControl mb="20px">
                            <FormLabel>Company User Name</FormLabel>
                            <Input bg="white" onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Company user name" />
                        </FormControl>
                        <FormControl mb="20px">
                            <FormLabel>Email</FormLabel>
                            <Input bg="white" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="company@example.com" />
                        </FormControl>
                        <FormControl mb="20px">
                            <FormLabel>Senha</FormLabel>
                            <Input bg="white" onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Companys password" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input bg="white" onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} type="password" placeholder="Confirm your password" />
                        </FormControl>
                        <Input type="hidden" name='userType' value='company' />
                        <Button mb="10px" colorScheme="blue" mt="20px" w="100%" onClick={() => handleUserRegister({ username, email, password, passwordConfirm, userType: 'company' })}>Register</Button>
                    </VStack>
                </TabPanel>
                <Text onClick={handleNavigate} cursor='pointer' color='gray.600' fontSize='14px'>Have an account? Log In</Text>
            </TabPanels>
        </Tabs>
    )
}

export default Register;