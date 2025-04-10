import {
    FormControl,
    FormLabel,
    Button,
    VStack,
    Input,
    Text,
} from '@chakra-ui/react'

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router-dom'
import MyDropzone from '../components/dropzone'
import { get_auction_by_id } from "../api/endpoints"
import { format } from 'date-fns';
import '../css/auction.css'

const UpdateAuction = () => {
    const { auth_update_auction } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startPrice, setStartPrice] = useState('')
    const [currentPrice, setCurrentPrice] = useState('')
    const [image, setImage] = useState(null)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const { id } = useParams();

    useEffect(() => {
        const fetchAuction = async () => {
            const auction = await get_auction_by_id(id)

            setTitle(auction.title)
            setDescription(auction.description)
            setStartPrice(auction.start_price)
            setCurrentPrice(auction.current_price)
            setImage(auction.image)
            setStartDate(format(new Date(auction.start_date), 'yyyy-MM-dd'))
            setEndDate(format(new Date(auction.end_date), 'yyyy-MM-dd'))
        }
        fetchAuction()
    }, [id])

    const handleUpdate = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('start_price', startPrice);
        formData.append('current_price', currentPrice);
        formData.append('image', image);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);

        const response = await auth_update_auction(id, formData)

        navigate('/upcoming_auctions')
    }

    return (
        <VStack className='container' as="form" onSubmit={handleUpdate}>
            <Text mb="20px" color="gray.700" fontSize="44px" fontWeight="bold">Update Auction</Text>
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
                <MyDropzone onImageSelect={(file) => setImage(file)} initialImage={image} />
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
            <Button mb="10px" colorScheme="blue" mt="20px" w="100%" type="submit">Update</Button>
        </VStack>
    );
}

export default UpdateAuction;