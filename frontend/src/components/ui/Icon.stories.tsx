import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'
import {
  ShoppingCart,
  Heart,
  Home,
  Search,
  Menu,
  X,
  ChevronRight,
  Star,
  Check,
  AlertCircle,
  Info,
} from 'lucide-react'

const meta = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'Lucide React icon component',
    },
    className: {
      description: 'Additional CSS classes for styling',
      control: 'text',
    },
    size: {
      description: 'Icon size',
      control: 'number',
    },
    color: {
      description: 'Icon color',
      control: 'color',
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: ShoppingCart,
  },
}

export const Large: Story = {
  args: {
    icon: Heart,
    className: 'w-12 h-12 text-red-500',
  },
}

export const Small: Story = {
  args: {
    icon: Home,
    className: 'w-4 h-4',
  },
}

export const WithColor: Story = {
  args: {
    icon: Star,
    className: 'w-8 h-8 text-yellow-400',
  },
}

export const IconShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-8">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={ShoppingCart} className="w-8 h-8 text-primary" />
        <span className="text-sm text-gray-600">Cart</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Heart} className="w-8 h-8 text-red-500" />
        <span className="text-sm text-gray-600">Wishlist</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Home} className="w-8 h-8 text-secondary" />
        <span className="text-sm text-gray-600">Home</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Search} className="w-8 h-8 text-gray-700" />
        <span className="text-sm text-gray-600">Search</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Menu} className="w-8 h-8 text-gray-700" />
        <span className="text-sm text-gray-600">Menu</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={X} className="w-8 h-8 text-gray-700" />
        <span className="text-sm text-gray-600">Close</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={ChevronRight} className="w-8 h-8 text-gray-700" />
        <span className="text-sm text-gray-600">Arrow</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Star} className="w-8 h-8 text-yellow-400" />
        <span className="text-sm text-gray-600">Rating</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Check} className="w-8 h-8 text-green-500" />
        <span className="text-sm text-gray-600">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={AlertCircle} className="w-8 h-8 text-red-500" />
        <span className="text-sm text-gray-600">Error</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Info} className="w-8 h-8 text-blue-500" />
        <span className="text-sm text-gray-600">Info</span>
      </div>
    </div>
  ),
}
