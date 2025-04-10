import * as React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react'
import Login from './routes/login';
import Home from './routes/home';
import UpcomingAuctions from './routes/upcoming_auctions';
import CreateAuction from './routes/create_auction'
import { AuthProvider } from './context/useAuth';
import PrivateRoute from './components/private_route';
import Register from './routes/register';
import Layout from './components/layout';
import Cookies from "js-cookie";
import UpdateAuction from './routes/update_auction';
import Auction from './routes/auction';
import Currencies from './routes/currencies';

function App() {
  return (
    <ChakraProvider>
      <Flex minH='100vh' w='100%' justifyContent='center' alignItems='center'>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route element={<Register />} path='/register' />

              <Route path='/' element={<PrivateRoute><Layout><Home /></Layout></PrivateRoute>} />
              <Route path='/create/auction' element={<PrivateRoute><Layout><CreateAuction /></Layout></PrivateRoute>} />
              <Route path='/upcoming_auctions' element={<PrivateRoute><Layout><UpcomingAuctions /></Layout></PrivateRoute>} />
              <Route path='/update_auction/:id' element={<PrivateRoute><Layout><UpdateAuction /></Layout></PrivateRoute>} />
              <Route path='/auction/:id' element={<PrivateRoute><Layout><Auction /></Layout></PrivateRoute>} />
              <Route path='/currencies' element={<PrivateRoute><Layout><Currencies /></Layout></PrivateRoute>} />
            </Routes>
          </AuthProvider >
        </Router>
      </Flex>
    </ChakraProvider>
  );
}

export default App;