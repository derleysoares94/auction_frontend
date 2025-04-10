import React, { useState, useEffect } from 'react'
import { Box, VStack, Heading, Text, Divider, Button, Spinner, Badge, Icon, HStack, Input, useToast } from '@chakra-ui/react'
import { FaClock, FaDollarSign, FaInfoCircle } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { get_auction_by_id } from '../api/endpoints'

const AuctionDetails = () => {
    const { id } = useParams()
    const [auction, setAuction] = useState(null)
    const [loading, setLoading] = useState(true)
    const [bids, setBids] = useState([]) // Estado para armazenar os lances
    const [highestBid, setHighestBid] = useState(0) // Estado para o maior lance
    const [bidValue, setBidValue] = useState('') // Estado para o valor do lance
    const toast = useToast()

    useEffect(() => {
        const fetchAuction = async () => {
            const auction = await get_auction_by_id(id)
            setAuction(auction)
            setHighestBid(auction.start_price) // Inicializar o maior lance com o preço inicial
            setLoading(false)
        }
        fetchAuction()
    }, [id])

    const handleBidSubmit = () => {
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        )
    }

    return (
        <Box className="container" maxW="800px" mx="auto" p={6} boxShadow="lg" borderRadius="md" bg="white">
            <VStack align="start" spacing={6}>
                <Heading size="lg" color="teal.500">{auction.title}</Heading>

                <HStack spacing={4}>
                    <Badge colorScheme={new Date() < new Date(auction.end_date) ? 'green' : 'red'}>
                        {new Date() < new Date(auction.end_date) ? 'Ongoing' : 'Closed'}
                    </Badge>
                    <Text fontSize="sm" color="gray.500">
                        Auction ID: {auction.id}
                    </Text>
                </HStack>

                <Divider />

                <VStack align="start" spacing={4} w="100%">
                    <HStack>
                        <Icon as={FaClock} color="gray.500" />
                        <Text>
                            <strong>Start:</strong> {new Date(auction.start_date).toLocaleString('en-IE', { dateStyle: 'short' })}
                        </Text>
                    </HStack>
                    <HStack>
                        <Icon as={FaClock} color="gray.500" />
                        <Text>
                            <strong>End:</strong> {new Date(auction.end_date).toLocaleString('en-IE', { dateStyle: 'short' })}
                        </Text>
                    </HStack>
                    <HStack>
                        <Icon as={FaInfoCircle} color="gray.500" />
                        <Text>
                            <strong>Description:</strong> {auction.description}
                        </Text>
                    </HStack>
                    <HStack>
                        <Icon as={FaDollarSign} color="gray.500" />
                        <Text>
                            <strong>Starting Price:</strong> ${auction.start_price}
                        </Text>
                    </HStack>
                    <HStack>
                        <Icon as={FaDollarSign} color="green.500" />
                        <Text>
                            <strong>Highest Bid:</strong>
                        </Text>
                    </HStack>
                </VStack>

                <Divider />

                {new Date() < new Date(auction.end_date) ? (
                    <>
                        <HStack w="100%">
                            <Input
                                placeholder="Enter your bid"
                                value={bidValue}
                                onChange={(e) => setBidValue(e.target.value)}
                                type="number"
                            />
                            <Button colorScheme="teal">
                                Place Bid
                            </Button>
                        </HStack>
                        <Text fontSize="sm" color="gray.500">
                            Note: Bids must be higher than the current highest bid.
                        </Text>
                    </>
                ) : (
                    <Text color="red.500" fontWeight="bold">
                        This auction has ended.
                    </Text>
                )}
            </VStack>
        </Box>
    )
}

export default AuctionDetails