import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Menu, Button, Card, Modal, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploader, setUploader] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:8005/api/categories/');
        setCategories(res.data);
      } catch (error) {
        message.error('Failed to load categories');
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8005/api/products/');
        setProducts(res.data);
      } catch (error) {
        message.error('Failed to load products');
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  // Show modal with product and uploader details
  const showRequestModal = async (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
    try {
      const res = await axios.get(`http://localhost:8005/api/users/${product.user}`);
      setUploader(res.data);
    } catch (error) {
      message.error("Failed to load uploader's information");
    }
  };

  // Send request to uploader for claiming product
  const handleSendRequest = async () => {
    if (selectedProduct) {
      try {
        const token = localStorage.getItem('authToken')
        await axios.post(
          `http://localhost:8005/api/products/${selectedProduct.id}/request/`,
          {}, // No additional data needed for request
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        message.success('Request sent successfully!');
        setIsModalVisible(false);
        setSelectedProduct(null);

        // Reload products to check updated status if needed
        const res = await axios.get('http://localhost:8005/api/products/');
        setProducts(res.data);
      } catch (error) {
        message.error('Failed to send request');
      }
    }
  };

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-500">FS-Store</div>
          <Menu mode="horizontal" className="flex-1 justify-center" defaultSelectedKeys={['home']}>
            <Menu.Item key="home">Home</Menu.Item>
            <Menu.Item key="Products">Shop</Menu.Item>
          </Menu>
          <Button type="primary" icon={<ShoppingCartOutlined />}>
            Cart
          </Button>
        </div>
      </Header>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-2">Discover Amazing Products</h1>
        <p className="text-lg mb-4">Shop the latest trends and get the best deals</p>
        <Button type="primary" size="large">Shop Now</Button>
      </div>

      <Content className="container mx-auto py-8">
        <h2 className="text-2xl font-bold text-center mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-gray-100 p-6 text-center rounded-lg shadow hover:bg-blue-100 cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </Content>

      <Content className="container mx-auto py-8">
        <h2 className="text-2xl font-bold text-center mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              cover={<img alt={product.name} src={product.image} />}
              actions={[
                <Button type="primary">Add to Cart</Button>,
                <Button type="secondary" onClick={() => showRequestModal(product)}>
                  {product.status === 'claimed' ? 'Claimed' : 'Request to Claim'}
                </Button>
              ]}
            >
              <Meta title={product.name} description={`${product.description}`} />
            </Card>
          ))}
        </div>
      </Content>

      {/* Request Modal */}
      <Modal
        title="Request to Claim Product"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="sendRequest" type="primary" onClick={handleSendRequest}>
            Send Request
          </Button>,
        ]}
      >
        {selectedProduct && (
          <>
            <h3>{selectedProduct.name}</h3>
            <p>{selectedProduct.description}</p>
            <p>Uploaded by: {uploader ? `${uploader.username} (${uploader.email})` : 'Loading...'}</p>
            <p>Price: ${selectedProduct.price}</p>
          </>
        )}
      </Modal>

      {/* Footer */}
      <Footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} E-Commerce Store. All Rights Reserved.</p>
          <p>Contact us: support@ecommerce.com</p>
        </div>
      </Footer>
    </Layout>
  );
};

export default Home;
