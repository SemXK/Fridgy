import { PaginatedResponse, Product } from '@/constants/interfaces/productInterface'
import { AvailableProductPayload } from '@/constants/interfaces/requestPayloads/productPayloads'
import { primaryColor } from '@/constants/theme'
import { ProductController } from '@/controllers/ProductController'
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import ThemedFormField from '../inputs/CustomFormField'
import PrimaryButton from '../pressable/PrimaryButton'
import ProductMiniCard from './ProductMiniCard'

interface PATSInterface {
  onSubmit: (chosenProds: {productId: number, quantity: number}[]) => void
}

const ProductAdditionToStore = ({onSubmit}: PATSInterface) => {

  // * States
  const [products, setProducts] = useState<Product[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(12);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  // £ functions
  const productPress = (product: Product) => {
    if(selectedProducts.includes(product.id)) {
      setSelectedProducts(selectedProducts.filter(p => p !== product.id))
    }
    else {
      setSelectedProducts([...selectedProducts, product.id])
    }
  }
  const handleSubmit = () => {
    const submitPayload = selectedProducts.map((item) => {return {productId: item, quantity: 2}})
    onSubmit(submitPayload)
  }
  // % Effects
  useEffect(() => {
    getAvailableProducts()
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPageNumber(1)
      getAvailableProducts(true)
    }, 500)

    return () => clearTimeout(timeout)
  }, [filterText])

  // £ functions
  const getAvailableProducts = async(refreshList: boolean = false) => {
    const payload: AvailableProductPayload = {
      filterText,
      pageSize,
      pageNumber
    }

    ProductController.getAvailableProducts(payload)
    .then((res) => {
      const response = res as PaginatedResponse<Product>
      if(refreshList) {
        setProducts(response.data)
      }
      else {
        setProducts([...products, ...response.data])
      }
    })
    .catch(() => {})
  }

  return (
    <View className="p-4 gap-4">
      <ThemedFormField
        value={filterText}
        setValue={setFilterText}
        label="Cerca"
      />
      <PrimaryButton
        buttonText="Aggiungi Prodotti"
        onPress={handleSubmit}
      />
      <FlatList
        data={products}
        numColumns={3}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          flexWrap:'wrap',
          marginBottom: 20,
        }}
        onEndReached={() => {
          setPageNumber(prev => {
            const nextPage = prev + 1
            getAvailableProducts()
            return nextPage
          })
        }}
        renderItem={({ item }) => (
          <View
            
            style={{
              width: '30%',
              borderWidth: selectedProducts.includes(item.id) ? 1 : 0,
              borderRadius: 10,
              borderColor: primaryColor[500]
            }}
            className="aspect-square"
          >
            <ProductMiniCard
              onPress={() => productPress(item)}
              product={item}
            />
          </View>
        )}
      />
    </View>
  )
}

export default ProductAdditionToStore
