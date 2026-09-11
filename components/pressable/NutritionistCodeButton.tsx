import { NutritionistLinkCode } from '@/constants/interfaces/nutritionist'
import { primaryColor } from '@/constants/theme'
import { NutritionistController } from '@/controllers/NutritionistController'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper'
import LinkCodeDisplay from '../nutritionistComponents/LinkCodeDisplay'
import CustomModal from '../ui/CustomModal'

interface NutritionistInviteButtonInterface {
  iconColor?: string;
}

const NutritionistInviteButton = ({iconColor}: NutritionistInviteButtonInterface) => {
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false)
  const [linkCode, setLinkCode] = useState<string>("")    //Displayed Link Code

  // * Functions
  const handlePress = async () => {
    await NutritionistController.createInviteCode()
      .then((res) => {
        const resp = res as NutritionistLinkCode
        setLinkCode(resp.linkCode)
        setShowCodeModal(true)
      })
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={.1}
      className="relative"
      >
      <IconButton
        icon="email"
        size={20}
        iconColor={iconColor ?? primaryColor[500]}
      />
      {/* Modal */}
      <CustomModal
        visible={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        ChildComponent={() => <LinkCodeDisplay linkCode={linkCode} onPress={() => setShowCodeModal(false)} />}
      />
    </TouchableOpacity>
  )
}

export default NutritionistInviteButton