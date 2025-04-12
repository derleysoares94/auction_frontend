import React, { useState, useEffect, useRef } from 'react'
import { Box, VStack, Text, Divider, Button, Spinner, Badge, HStack, Input } from '@chakra-ui/react'
import { get_currencies, convert_currencies } from "../api/endpoints"

const Currencies = () => {
    const [currencies, setCurrencies] = useState([])
    const fromRef = useRef(null);
    const toRef = useRef(null);
    const [amount, setAmount] = useState()
    const [convertedValue, setConvertedValue] = useState(0)

    useEffect(() => {
        const fetchCurrencies = async () => {
            const response = await get_currencies()
            setCurrencies(Object.entries(response))
        }
        fetchCurrencies()
    }, [])

    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '')
        const formattedValue = new Intl.NumberFormat('en-IE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
        }).format(rawValue / 100)
        setAmount(formattedValue)
    }

    const handleConvert = async () => {
        const fromValue = fromRef.current.value;
        const toValue = toRef.current.value
        const response = await convert_currencies(fromValue, toValue, amount)
        setConvertedValue(response)
    }

    return (
        <VStack className='container'>
            <Text mb="20px" color="gray.700" fontSize="40px" fontWeight="bold">Currencies</Text>
            <Box width="100%" maxWidth="500px">
                <VStack spacing={4}>
                    <HStack width="100%">
                        <Text fontWeight="bold" flex="1">From:</Text>
                        <Input as="select" placeholder="Select currency" flex="2" ref={fromRef}>
                            {currencies.map(([code, name]) => (
                                <option key={code} value={code}>{code}</option>
                            ))}
                        </Input>
                    </HStack>
                    <HStack width="100%">
                        <Text fontWeight="bold" flex="1">To:</Text>
                        <Input as="select" placeholder="Select currency" flex="2" ref={toRef}>
                            {currencies.map(([code, name]) => (
                                <option key={code} value={code}>{code}</option>
                            ))}
                        </Input>
                    </HStack>
                    <HStack width="100%">
                        <Text fontWeight="bold" flex="1">Amount:</Text>
                        <Input type="number" placeholder="Enter amount" flex="2" onChange={(e) => setAmount(e.target.value)} value={amount} />
                    </HStack>
                    <Button colorScheme="teal" width="100%" onClick={handleConvert}>Convert</Button>
                    <Divider />
                    <Box textAlign="center" width="100%">
                        <Text fontSize="lg" fontWeight="bold">Converted Amount:</Text>
                        <Badge colorScheme="green" fontSize="xl">
                            {
                                toRef.current && toRef.current.selectedOptions.length > 0
                                    ? convertedValue.toLocaleString('en-IE', {
                                        style: 'currency',
                                        currency: toRef.current.selectedOptions[0].text
                                    })
                                    : '€0.00'
                            }
                        </Badge>
                    </Box>
                </VStack>
            </Box>
        </VStack>
    )
}

export default Currencies