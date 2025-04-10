import React, { useState, useEffect } from 'react'
import { Box, VStack, Heading, Text, Divider, Button, Spinner, Badge, Icon, HStack, Input, useToast } from '@chakra-ui/react'
import { FaClock, FaDollarSign, FaInfoCircle } from 'react-icons/fa'

const Currencies = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    })

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        )
    }

    return (
        <VStack className='container'>
            <Text mb="20px" color="gray.700" fontSize="40px" fontWeight="bold">Currencies</Text>
            <Box width="100%" maxWidth="500px">
                <VStack spacing={4}>
                    <HStack width="100%">
                        <Text fontWeight="bold" flex="1">From:</Text>
                        <Input as="select" placeholder="Select currency" flex="2">
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            {/* Add more currencies as needed */}
                        </Input>
                    </HStack>
                    <HStack width="100%">
                        <Text fontWeight="bold" flex="1">To:</Text>
                        <Input as="select" placeholder="Select currency" flex="2">
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            {/* Add more currencies as needed */}
                        </Input>
                    </HStack>
                    <HStack width="100%">
                        <Text fontWeight="bold" flex="1">Amount:</Text>
                        <Input type="number" placeholder="Enter amount" flex="2" />
                    </HStack>
                    <Button colorScheme="teal" width="100%">Convert</Button>
                    <Divider />
                    <Box textAlign="center" width="100%">
                        <Text fontSize="lg" fontWeight="bold">Converted Amount:</Text>
                        <Badge colorScheme="green" fontSize="xl">$0.00</Badge>
                    </Box>
                </VStack>
            </Box>
        </VStack>
    )
}

export default Currencies