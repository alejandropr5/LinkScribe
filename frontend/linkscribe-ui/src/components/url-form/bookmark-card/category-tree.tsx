import React, { useState } from "react"
import { CategoryNode } from "@/components/utils/constants"
import ClientImage from "@/components/utils/client-image"
import downArrow from "@public/down-arrow.svg"

interface CategoryProps extends CategoryNode {
  setCategory: (newCategory: string) => void
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
  isFirst: boolean
}

const CategoryTree: React.FC<CategoryProps> = (categoryProps: CategoryProps) => {
  const [showChildren, setShowChildren] = useState<boolean>(categoryProps.isFirst)

  const handleCategoryClick = () => {
    categoryProps.setCategory(categoryProps.name as string)
    categoryProps.setShowDropdown(false)
  }

  const handleArrowClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setShowChildren(!showChildren)
  }

  return (
    <>
      <div
        onClick={handleCategoryClick}
        className="relative flex flex-row py-2 h-[38px] text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md overflow-hidden"
      >
        {categoryProps.children?.length > 0 &&
          <div
            className="w-5 h-5 ml-[3px] hover:bg-gray-300 rounded-md"
            onClick={handleArrowClick}
          >
            <ClientImage imageComponent={downArrow} description={"Down Arrow SVG"} />
          </div>
        }
        <div className="absolute left-[27px] overflow-hidden text-ellipsis">
          {categoryProps.name}
        </div>
      </div>
      <div 
        className="relative ml-3 border-l-[1px] border-gray-300 pl-2 my-[2px]"
      >
        {showChildren && (categoryProps.children ?? []).map(
          (node: CategoryNode) =>
            <CategoryTree
              {...node}
              setCategory={categoryProps.setCategory}
              setShowDropdown={categoryProps.setShowDropdown}
              isFirst={false}
              key={node.id}
            />
        )}
      </div>
    </>
  )
}

export default CategoryTree
