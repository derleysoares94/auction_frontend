import React, { useState, useEffect } from 'react'
import { Box, Heading, Text, VStack, List, ListItem, Spinner, Button, SimpleGrid } from '@chakra-ui/react'
import { useAuth } from '../context/useAuth'
import { get_user_auctions, delete_auction, get_auctions } from "../api/endpoints"
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const UpcomingAuctions = () => {
    const [auctions, setAuctions] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6 // Número de itens por página
    const { user } = useAuth()
    const nav = useNavigate()

    useEffect(() => {
        const fetchAuctions = async () => {
            if (user.user_type === "company") {
                const auctions = await get_user_auctions(user.id)
                setAuctions(auctions)
            }

            if (user.user_type === "user") {
                const auctions = await get_auctions()
                setAuctions(auctions)
            }

            setLoading(false)
        }
        fetchAuctions()
    }, [])

    const confirmDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        })

        return result.isConfirmed
    }

    const handleDelete = (auction_id) => {
        confirmDelete().then(async (confirmed) => {
            if (confirmed) {
                setLoading(true);
                await delete_auction(auction_id);
                const auctions = await get_user_auctions(user.id)
                setAuctions(auctions)
                setLoading(false)
            } else {
                console.log('User canceled deletion!');
            }
        })
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentAuctions = auctions.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(auctions.length / itemsPerPage)

    return (
        <Box p={6}>
            <Heading mb={4}>Upcoming or Ongoing Auctions</Heading>
            {loading ? (
                <Spinner size="xl" />
            ) : auctions.length > 0 ? (
                <>
                    <SimpleGrid columns={[1, 2]} spacing={6}>
                        {currentAuctions.map((auction) => (
                            <Box key={auction.id} padding="20px" border="1px solid #ccc" borderRadius="8px" boxShadow="md">
                                <VStack align="start">
                                    <Heading size="md">{auction.title}</Heading>
                                    <Text>
                                        <strong>Start:</strong> {new Date(auction.start_date).toLocaleString('en-IE', { dateStyle: 'short' })}
                                    </Text>
                                    <Text>
                                        <strong>End:</strong> {new Date(auction.end_date).toLocaleString('en-IE', { dateStyle: 'short' })}
                                    </Text>
                                    <Box display="flex" gap="10px" mt="10px">
                                        {user.user_type === 'company' && (
                                            <>
                                                <Button colorScheme="green" onClick={() => nav(`/update_auction/${auction.id}/`)}>Edit</Button>
                                                <Button colorScheme="red" onClick={() => handleDelete(auction.id)}>Delete</Button>
                                            </>
                                        )}
                                        <Button colorScheme="blue" onClick={() => nav(`/auction/${auction.id}/`)}>View</Button>
                                    </Box>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>
                    <Box mt={6} display="flex" justifyContent="center" alignItems="center" gap={4}>
                        <Button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            isDisabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <Text>Page {currentPage} of {totalPages}</Text>
                        <Button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            isDisabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </Box>
                </>
            ) : (
                <Text>No upcoming or ongoing auctions.</Text>
            )}
        </Box>
    )
}

export default UpcomingAuctions