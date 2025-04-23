import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

import { getSingleProduct } from '~/api/productServices';
import Header from '~/components/Header';

const Product = () => {
  const { product_id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (!product_id) return;

        const id = Array.isArray(product_id) ? product_id[0] : product_id;
        const response = await getSingleProduct(id);

        console.log('Product API Response:', response.data);
        setProduct(response.data?.data);
      } catch (error) {
        console.log('Error fetching product: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Product not found</Text>
      </View>
    );
  }

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setActiveIndex(index);
  };

  console.log('Product Images:', product.product_image);
  console.log('Type of product_image:', typeof product.product_image);

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="w-full">
        <Header />
      </View>

      {/* Top Bar (Back Button + Title) */}
      <View className="flex-row items-center justify-between bg-black px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text className="font-posterama text-lg font-semibold uppercase text-white">
          {String(product.product_title)}
        </Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1">
        {/* Image Carousel */}
        <View className="w-full">
          <View className="w-full">
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              className="flex-1"
              onScroll={handleScroll}
              scrollEventThrottle={16}>
              {product.product_image.map((image: string, index: number) => (
                <View key={index} className="w-screen">
                  <Image
                    source={{ uri: image }}
                    style={{ width: '100%', height: 400 }}
                    resizeMode="contain"
                  />
                </View>
              ))}
            </ScrollView>

            {/* Pagination Dots */}
            <View className="mt-2 flex-row justify-center">
              {product.product_image.map((_: any, index: number) => (
                <View
                  key={index}
                  className={`mx-1 h-2 w-2 rounded-full ${
                    activeIndex === index ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Product Info (Title, Quantity, Price, Icons) */}
        <View className="flex-row items-center justify-between px-4 py-4">
          <View>
            <Text className="font-worksans text-xl font-bold uppercase text-black">
              {String(product.product_title)}
            </Text>
            <Text className="mt-2 font-worksans text-gray-600">
              Available in stock: {String(product.product_quantity)}
            </Text>
            <Text className="mt-2 font-worksans text-lg font-semibold text-black">
              ₹ {String(product.product_price)}
            </Text>
          </View>
          <View className="flex-row items-center gap-x-4">
            <TouchableOpacity>
              <Feather name="share-2" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome5 name="heart" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Description */}
        <View className="px-4">
          <Text className="font-worksans text-xl font-bold uppercase text-black">Description</Text>
          <Text className="mt-2 font-worksans text-gray-600">
            {String(product.product_description || 'No description available')}
          </Text>
        </View>

        {/* Keywords */}
        <View className="mt-4 flex-row flex-wrap gap-2 px-4">
          {product.product_keywords.map((keyword: string, index: number) => (
            <View key={index} className="rounded-full bg-orange-500 px-4 py-2">
              <Text className="font-worksans text-black">{String(keyword)}</Text>
            </View>
          ))}
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity className="mx-4 my-6 flex flex-row items-center justify-center gap-x-4 rounded-lg bg-black py-4">
          <Text className="text-center text-xl font-bold uppercase text-white">Add to Cart</Text>
          <Feather name="shopping-cart" size={20} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Product;
