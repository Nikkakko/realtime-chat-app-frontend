import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_API;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Signup = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    pic: '',
  });
  const navigate = useNavigate();
  const toast = useToast();

  const postDetails = pic => {
    setIsLoading(true);
    if (pic === undefined) {
      toast({
        title: 'Please select an image',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }
    if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
      const data = new FormData();
      data.append('file', pic);
      data.append('upload_preset', 'chat-app');
      data.append('cloud_name', 'dok7vcij4');
      data.append('api_key', CLOUDINARY_API_KEY);

      fetch(CLOUDINARY_URL, {
        method: 'post',
        body: data,
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setAuth({ ...auth, pic: data?.url?.toString() });
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      toast({
        title: 'Please select an image',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setIsLoading(false);
      return;
    }
  };

  const submitHandler = async e => {
    setIsLoading(true);
    if (
      !auth.name ||
      !auth.email ||
      !auth.password ||
      !auth.confirmPassword ||
      !auth.pic
    ) {
      toast({
        title: 'Please fill all fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setIsLoading(false);
      return;
    }

    if (auth.password !== auth.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setIsLoading(false);
      return;
    }

    try {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(`${BASE_URL}/api/user/`, auth, config);
      toast({
        title: 'Account created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsLoading(false);
      navigate('/chats');
    } catch (error) {
      toast({
        title: 'Error creating account',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing='5px' color='black'>
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type='text'
          placeholder='Enter your name'
          value={auth.name}
          onChange={e => setAuth({ ...auth, name: e.target.value })}
        />
      </FormControl>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type='email'
          placeholder='Email'
          value={auth.email}
          onChange={e => setAuth({ ...auth, email: e.target.value })}
        />
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder='Password'
            value={auth.password}
            onChange={e => setAuth({ ...auth, password: e.target.value })}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size='md'>
          <Input
            type={show ? 'text' : 'password'}
            placeholder='Confirm password'
            value={auth.confirmPassword}
            onChange={e =>
              setAuth({ ...auth, confirmPassword: e.target.value })
            }
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id='pic'>
        <FormLabel>Upload Profile Picture</FormLabel>
        <Input
          type='file'
          p={1.5}
          accept='image/*'
          onChange={e => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme='blue'
        width='100%'
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={isLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
