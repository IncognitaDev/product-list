import type { VFC } from 'react'
import React from 'react'
import classnames from 'classnames'
import { Loading } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import Selector from './components/QuantitySelector'
import QuantityStepper from './components/QuantityStepper'
import { useItemContext } from './ItemContext'
import { AVAILABLE } from './constants/Availability'
import { opaque } from './utils/opaque'
import styles from './styles.css'

const MAX_ITEM_QUANTITY = 99999
const CSS_HANDLES = ['quantitySelectorContainer'] as const

type QuantitySelectorMode = 'default' | 'stepper'
export type QuantitySelectorStepType = 'unitMultiplier' | 'singleUnit'

interface Props {
  mode?: QuantitySelectorMode
  quantitySelectorStep?: QuantitySelectorStepType
  IncreaseIcon?: React.ReactElement
  DecreaseIcon?: React.ReactElement
}

const QuantitySelector: VFC<Props> = ({
  mode = 'default',
  quantitySelectorStep = 'unitMultiplier',
  IncreaseIcon,
  DecreaseIcon,
}) => {
  const { item, loading, onQuantityChange } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  const unitMultiplier =
    quantitySelectorStep === 'singleUnit' ? 1 : item.unitMultiplier ?? undefined

  if (mode === 'stepper') {
    return (
      <div
        className={classnames(
          opaque(item.availability),
          handles.quantitySelectorContainer,
          styles.quantity,
          styles.quantityStepper
        )}
      >
        <QuantityStepper
          id={item.id}
          value={item.quantity}
          maxValue={MAX_ITEM_QUANTITY}
          onChange={onQuantityChange}
          disabled={item.availability !== AVAILABLE}
          unitMultiplier={unitMultiplier}
          measurementUnit={item.measurementUnit ?? undefined}
          IncreaseIcon={IncreaseIcon}
          DecreaseIcon={DecreaseIcon}
        />
      </div>
    )
  }

  return (
    <div
      className={classnames(
        opaque(item.availability),
        handles.quantitySelectorContainer,
        styles.quantity,
        styles.quantitySelector
      )}
    >
      <Selector
        id={item.id}
        value={item.quantity}
        maxValue={MAX_ITEM_QUANTITY}
        onChange={onQuantityChange}
        disabled={item.availability !== AVAILABLE}
        unitMultiplier={unitMultiplier}
        measurementUnit={item.measurementUnit ?? undefined}
      />
    </div>
  )
}

export default QuantitySelector
