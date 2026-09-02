import { PaginatedResponse, Product } from '@/constants/interfaces/productInterface'
import { AvailableProductPayload, ProductToQuantity } from '@/constants/interfaces/requestPayloads/productPayloads'
import { primaryColor } from '@/constants/theme'
import { ProductController } from '@/controllers/ProductController'
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import ThemedFormField from '../inputs/CustomFormField'
import PrimaryButton from '../pressable/PrimaryButton'
import PrimaryIconButton from '../pressable/PrimaryIconButton'
import ThemedText from '../ui/ThemedText'
import ProductMiniCard from './ProductMiniCard'

interface PATSInterface {
  onSubmit: (chosenProds: ProductToQuantity[]) => void
}

const ProductAdditionToStore = ({onSubmit}: PATSInterface) => {

  // * States
  const [products, setProducts] = useState<Product[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(12);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedProducts, setSelectedProducts] = useState<ProductToQuantity[]>([]);

  // £ functions
  const getSelectedProdById = (productId: number):ProductToQuantity | undefined  => {
    return selectedProducts.find(p => p.productId === productId)
  }
  const productPress = (product: Product) => {
    if(getSelectedProdById(product.id)) {
      setSelectedProducts(selectedProducts.filter(p => p.productId !== product.id))
    }
    else {
      setSelectedProducts([...selectedProducts, {productId: product.id, quantity: 1}])
    }
  }
  const handleQuantity = (productId: number, quantityToAdd: number) => {
    setSelectedProducts(prevProducts => {
      return prevProducts
        .map(product =>
          product.productId === productId
            ? {
                ...product,
                quantity: product.quantity + quantityToAdd,
              }
            : product
        )
        .filter(product => product.quantity > 0);
    });
  };

  const handleSubmit = () => {
    onSubmit(selectedProducts)
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
              borderWidth: getSelectedProdById(item.id) ? 1 : 0,
              borderRadius: 10,
              borderColor: primaryColor[500]
            }}
            className="aspect-square relative"
          >
            <ProductMiniCard
              onPress={() => productPress(item)}
              product={item}
            />
            {
              getSelectedProdById(item.id)?.quantity  ?
              <View className="absolute bottom-0 w-full h-1/3 flex flex-row justify-between items-center bg-stone-100 dark:bg-darkColor-900 rounded-xl">
                <PrimaryIconButton 
                  className='self-center'
                  onPress={() => {handleQuantity(item.id, -1)}} 
                  iconSpecs={{
                    name: "minus",
                    color: primaryColor[500],
                    size: 12
                  }}
                />
                <ThemedText label={String(getSelectedProdById(item.id)?.quantity)} font="Nunito-Bold" />
                <PrimaryIconButton
                  className='self-center'
                  onPress={() => {handleQuantity(item.id, 1)}} 
                  iconSpecs={{
                    name: "plus",
                    color: primaryColor[500],
                    size: 12
                  }}
                />
              </View>
              :
              null
            }
          </View>
        )}
      />
    </View>
  )
}

export default ProductAdditionToStore
