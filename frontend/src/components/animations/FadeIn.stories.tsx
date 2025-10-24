import type { Meta, StoryObj } from '@storybook/react'
import { FadeIn } from './FadeIn'

const meta = {
  title: 'Animations/FadeIn',
  component: FadeIn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    delay: {
      description: 'Animation delay in seconds',
      control: { type: 'range', min: 0, max: 2, step: 0.1 },
    },
    duration: {
      description: 'Animation duration in seconds',
      control: { type: 'range', min: 0.1, max: 2, step: 0.1 },
    },
    direction: {
      description: 'Direction of fade animation',
      options: ['up', 'down', 'left', 'right', 'none'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof FadeIn>

export default meta
type Story = StoryObj<typeof meta>

const DemoCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-xl shadow-2xl text-white text-center">
    <h3 className="text-2xl font-bold mb-2">{children}</h3>
    <p className="text-white/80">Animated content</p>
  </div>
)

export const Default: Story = {
  args: {
    delay: 0,
    duration: 0.5,
    direction: 'none',
    children: null as any,
  },
  render: (args) => (
    <FadeIn {...args}>
      <DemoCard>Fade In Animation</DemoCard>
    </FadeIn>
  ),
}

export const FadeUp: Story = {
  args: {
    delay: 0,
    duration: 0.5,
    direction: 'up',
    children: null as any,
  },
  render: (args) => (
    <FadeIn {...args}>
      <DemoCard>Fade Up</DemoCard>
    </FadeIn>
  ),
}

export const FadeDown: Story = {
  args: {
    delay: 0,
    duration: 0.5,
    direction: 'down',
    children: null as any,
  },
  render: (args) => (
    <FadeIn {...args}>
      <DemoCard>Fade Down</DemoCard>
    </FadeIn>
  ),
}

export const FadeLeft: Story = {
  args: {
    delay: 0,
    duration: 0.5,
    direction: 'left',
    children: null as any,
  },
  render: (args) => (
    <FadeIn {...args}>
      <DemoCard>Fade Left</DemoCard>
    </FadeIn>
  ),
}

export const FadeRight: Story = {
  args: {
    delay: 0,
    duration: 0.5,
    direction: 'right',
    children: null as any,
  },
  render: (args) => (
    <FadeIn {...args}>
      <DemoCard>Fade Right</DemoCard>
    </FadeIn>
  ),
}

export const WithDelay: Story = {
  args: {
    delay: 1,
    duration: 0.5,
    direction: 'up',
    children: null as any,
  },
  render: (args) => (
    <FadeIn {...args}>
      <DemoCard>Delayed Animation (1s)</DemoCard>
    </FadeIn>
  ),
}

export const Multiple: Story = {
  args: {
    children: null as any,
  },
  render: () => (
    <div className="space-y-6">
      <FadeIn direction="up" delay={0}>
        <DemoCard>First (no delay)</DemoCard>
      </FadeIn>
      <FadeIn direction="up" delay={0.2}>
        <DemoCard>Second (0.2s delay)</DemoCard>
      </FadeIn>
      <FadeIn direction="up" delay={0.4}>
        <DemoCard>Third (0.4s delay)</DemoCard>
      </FadeIn>
    </div>
  ),
}
