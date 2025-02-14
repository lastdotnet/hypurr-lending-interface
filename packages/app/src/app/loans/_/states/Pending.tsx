import { LoanCard } from '@/app/loans/_/LoanCard'
import { CardsContainer } from '@/astaria/components/CardsContainer'

const NUMBER_OF_INITIAL_SKELETON_CARDS_TO_SHOW = 1

const loadingArray = [...Array(NUMBER_OF_INITIAL_SKELETON_CARDS_TO_SHOW).keys()]

export const Pending = () => (
  <CardsContainer>
    {loadingArray.map((id) => (
      <LoanCard key={id} skeleton />
    ))}
  </CardsContainer>
)
