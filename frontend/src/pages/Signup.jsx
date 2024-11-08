import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Input, Card, Typography, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { signUpRequest } from '../redux/slices/SignUpSlice';

const { Title } = Typography;

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector(state => state.signup)
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const formRef = useRef(null); // Reference for the form

  const handleUploadChange = (info) => {
    if (info.file) {
      console.log('info.file ===>', info.file)
      setProfilePicture(info.file);
      const reader = new FileReader();
      console.log('reader ===>', reader)
      reader.onload = () => {
        console.log('reader.result ===>', reader.result)
        setPreviewUrl(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(info.file); // Read the file as a data URL
    }
  };

  const onFinish = async (values) => {
    if (!profilePicture) {
      message.error("Please upload a profile picture.");
      return;
    }
    const data = { ...values, profilePicture };
    dispatch(signUpRequest(data));
  };

  //   // Show error message when there's an error
  //  useEffect(() => {
  //   if (error) {
  //     message.error("Login failed! Please check your credentials.");
  //   }
  // }, [error]);

  useEffect(() => {
    if (success) {
      formRef.current.resetFields(); // Reset form after successful submission
      setProfilePicture(null); // Clear profile picture state
    }
  }, [success]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-3xl p-2 shadow-md">
        <Title level={3} className="text-center">Sign Up</Title>
        {/* Display the image preview if available */}
        {previewUrl && (
          <div className="my-2 flex justify-center">
            <img src={previewUrl} alt="Profile Preview" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          </div>
        )}
        <Form
          name="signup"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
          ref={formRef} // Attach the form ref here
          className='flex gap-5'
        >
          <div className='w-full'>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Age"
              name="age"
              rules={[{ required: true, message: 'Please input your age!' }]}
            >
              <Input type="number" />
            </Form.Item>
          </div>
          <div className='w-full'>
            <Form.Item
              label="Mobile Number"
              name="mobile_number"
              rules={[
                { required: true, message: 'Please input your mobile number!' },
                { pattern: /^[0-9]{10}$/, message: 'Please enter a valid mobile number!' }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Profile Picture"
              required
              rules={[{ required: true, message: 'Please upload a profile picture!' }]}
            >
              <Upload // Upload use kia ha pic k liye antd ka component 
                name="profile_picture"
                showUploadList={false}
                beforeUpload={() => false} // Prevent automatic upload
                onChange={handleUploadChange}
              >
                <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your address!' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                Sign Up
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;
