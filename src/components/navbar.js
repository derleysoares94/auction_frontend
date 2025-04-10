import React from "react";
import {
    Box,
    Flex,
    IconButton,
    useDisclosure,
    Heading,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Collapse,
    VStack
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";
import { logout } from "../api/endpoints";

const Navbar = ({ userType }) => {
    const navigate = useNavigate();
    const { isOpen, onToggle } = useDisclosure();
    const { isOpen: isAuctionOpen, onToggle: onAuctionToggle } = useDisclosure();

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            navigate('/login');
        }
    };

    return (
        <Box className="navbar">
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Heading size="md" color="white" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} >
                    Auction
                </Heading>
                <Flex display={{ base: "none", md: "flex" }} gap={4}>
                    <Button onClick={() => navigate('/')} variant="link" color="white">
                        Home
                    </Button>
                    <Menu>
                        <MenuButton as={Button} variant="link" color="white" rightIcon={<ChevronDownIcon />}>
                            Auction
                        </MenuButton>
                        <MenuList>
                            {userType === "company" && <MenuItem onClick={() => navigate('/create/auction')}>Create Auction</MenuItem>}
                            <MenuItem onClick={() => navigate('/upcoming_auctions')}>Upcoming Auctions</MenuItem>
                        </MenuList>
                    </Menu>
                    <Button variant="link" color="white" onClick={handleLogout}>
                        Log out
                    </Button>
                </Flex>
                <IconButton
                    size="md"
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label="Open Menu"
                    display={{ md: "none" }}
                    onClick={onToggle}
                />
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <Box pb={4} display={{ md: "none" }}>
                    <VStack align="start" spacing={2}>
                        <Button onClick={() => navigate('/')} variant="link" color="white">
                            Home
                        </Button>
                        <Button variant="link" color="white" onClick={onAuctionToggle}>
                            Auction <ChevronDownIcon />
                        </Button>
                        <Collapse in={isAuctionOpen} animateOpacity>
                            <VStack align="start" pl={4} spacing={2}>
                                {userType === "company" && (
                                    <Button variant="link" color="white" onClick={() => navigate('/create/auction')}>
                                        Create Auction
                                    </Button>
                                )}
                                <Button variant="link" color="white" onClick={() => navigate('/upcoming_auctions')}>
                                    Upcoming Auctions
                                </Button>
                            </VStack>
                        </Collapse>
                        <Button variant="link" color="white" onClick={handleLogout}>
                            Log out
                        </Button>
                    </VStack>
                </Box>
            </Collapse>
        </Box>
    );
};

export default Navbar;
