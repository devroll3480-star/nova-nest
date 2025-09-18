import { Text } from "@medusajs/ui"

const NovastoreCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-small-plus items-center text-gray-500">
      © {new Date().getFullYear()} Novastore. All rights reserved.
    </Text>
  )
}

export default NovastoreCTA
