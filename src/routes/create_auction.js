import {
    FormControl,
    FormLabel,
    Button,
    VStack,
    Input,
    Text,
} from '@chakra-ui/react'

import { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import MyDropzone from '../components/dropzone';
import '../css/auction.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const CreateAuction = () => {
    const { user, isAuthenticated, create_auction } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startPrice, setStartPrice] = useState('')
    const [currentPrice, setCurrentPrice] = useState('')
    const [image, setImage] = useState(null)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    useEffect(() => {
        if (isAuthenticated && user.user_type !=='company') {
            navigate('/')
        }
    }, [isAuthenticated, user, navigate])

    const handleCreateAuction = async () => {
        if (title && description && startPrice && currentPrice && image && startDate && endDate) {

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', image); 
            formData.append('start_price', startPrice);
            formData.append('current_price', currentPrice);
            formData.append('start_date', startDate);
            formData.append('end_date', endDate);
            formData.append('user', user.id);

            try {
                await create_auction(formData);
                navigate('/upcoming_auctions');
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            toastr.error('All fields are required');
        }
    }

    return (
        <VStack className='container'>
            <Text mb="20px" color="gray.700" fontSize="44px" fontWeight="bold">New Auction</Text>
            <FormControl mb="20px">
                <FormLabel>Title</FormLabel>
                <Input bg="white" onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Title" />
            </FormControl>
            <FormControl mb="20px">
                <FormLabel>Description</FormLabel>
                <Input bg="white" onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder="Description" />
            </FormControl>
            <FormControl mb="20px">
                <FormLabel>Image</FormLabel>
                <MyDropzone onImageSelect={(file) => setImage(file)} />
            </FormControl>
            <FormControl mb="20px">
                <FormLabel>Start Price</FormLabel>
                <Input bg="white" onChange={(e) => setStartPrice(e.target.value)} value={startPrice} type="money" placeholder="Start price" />
            </FormControl>
            <FormControl>
                <FormLabel>Current Price</FormLabel>
                <Input bg="white" onChange={(e) => setCurrentPrice(e.target.value)} value={currentPrice} type="money" placeholder="Current price" />
            </FormControl>
            <FormControl mb="20px">
                <FormLabel>Start Date</FormLabel>
                <Input bg="white" onChange={(e) => setStartDate(e.target.value)} value={startDate} type="date" placeholder="Start date" />
            </FormControl>
            <FormControl mb="20px">
                <FormLabel>End Date</FormLabel>
                <Input bg="white" onChange={(e) => setEndDate(e.target.value)} value={endDate} type="date" placeholder="End date" />
            </FormControl>
            <Button onClick={handleCreateAuction}  mb="10px" colorScheme="blue" mt="20px" w="100%" >Create</Button>
        </VStack>
    )
}

export default CreateAuction;