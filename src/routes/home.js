import { VStack, Heading, Text, Button, Box, SimpleGrid } from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { get_companies } from "../api/endpoints";

const Home = () => {
    const [companies, setCompanies] = useState([])
    const nav = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            const companies = await get_companies()
            setCompanies(companies)
        }
        fetchCompanies();
    }, [])

    return (
        <VStack spacing={8} p={8}>
            <Heading as="h1" size="2xl" textAlign="center">
                Welcome to Auction Project
            </Heading>
            <Text fontSize="lg" textAlign="center" maxW="600px">
                Auction Project is your go-to platform for creating, managing, and participating in auctions.
                Join us to explore exciting opportunities and connect with our trusted partners.
            </Text>
            <Button colorScheme="blue" size="lg" onClick={() => nav('/upcoming_auctions')}>
                Get Started
            </Button>
            <Heading as="h2" size="lg" mt={8}>
                Our Trusted Partners
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={6} w="100%">
                {companies.map((company) => (
                    <Box
                        key={company.id}
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                        boxShadow="md"
                        textAlign="center"
                    >
                        <Text fontWeight="bold">{company.username}</Text>
                        <Text fontSize="sm">{company.email}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </VStack>
    )
}

export default Home;