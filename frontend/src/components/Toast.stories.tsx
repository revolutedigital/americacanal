import type { Meta, StoryObj } from '@storybook/react'
import Toast from './Toast'
import { Toast as ToastType } from '@/contexts/ToastContext'

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    toast: {
      description: 'Toast object with message and type',
    },
    onClose: {
      description: 'Callback fired when toast is closed',
      action: 'closed',
    },
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

const successToast: ToastType = {
  id: '1',
  message: 'Produto adicionado ao carrinho com sucesso!',
  type: 'success',
  duration: 5000,
}

const errorToast: ToastType = {
  id: '2',
  message: 'Erro ao processar seu pedido. Tente novamente.',
  type: 'error',
  duration: 5000,
}

const warningToast: ToastType = {
  id: '3',
  message: 'Atenção: estoque limitado para este produto.',
  type: 'warning',
  duration: 5000,
}

const infoToast: ToastType = {
  id: '4',
  message: 'Nova atualização disponível. Recarregue a página.',
  type: 'info',
  duration: 5000,
}

const toastWithAction: ToastType = {
  id: '5',
  message: 'Item removido do carrinho',
  type: 'success',
  action: {
    label: 'Desfazer',
    onClick: () => alert('Ação desfeita!'),
  },
}

export const Success: Story = {
  args: {
    toast: successToast,
    onClose: () => console.log('Toast closed'),
  },
}

export const Error: Story = {
  args: {
    toast: errorToast,
    onClose: () => console.log('Toast closed'),
  },
}

export const Warning: Story = {
  args: {
    toast: warningToast,
    onClose: () => console.log('Toast closed'),
  },
}

export const Info: Story = {
  args: {
    toast: infoToast,
    onClose: () => console.log('Toast closed'),
  },
}

export const WithAction: Story = {
  args: {
    toast: toastWithAction,
    onClose: () => console.log('Toast closed'),
  },
}
