import { type Meta, type StoryFn } from '@storybook/react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/astaria/components/Accordion'

export default {
  component: Accordion,
  title: 'Components/Accordion',
} as Meta<typeof Accordion>

const Story: StoryFn<typeof Accordion> = () => (
  <Accordion collapsible type="single">
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
    </AccordionItem>
  </Accordion>
)

export const accordion = {
  args: {},
  render: Story,
}
