import { type Meta, type StoryFn } from '@storybook/react'

import { Button } from '@/astaria/components/Button'
import {
  Dialog,
  DialogActions,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogError,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/astaria/components/Dialog'
import { Input } from '@/astaria/components/Input'
import { Label } from '@/astaria/components/Label'

export default {
  component: Dialog,
  title: 'Components/Dialog',
} as Meta<typeof Dialog>

const Story: StoryFn<typeof Dialog> = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button emphasis="medium">Edit Profile</Button>
    </DialogTrigger>
    <DialogContainer>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Make changes to your profile here. Click save when you’re done.</DialogDescription>
      </DialogHeader>
      <DialogContent>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input className="col-span-3" id="name" value="Pedro Duarte" />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input className="col-span-3" id="username" value="@peduarte" />
        </div>
      </DialogContent>
      <DialogActions>
        <Button className="border-r-0 border-b-0 border-l-0" fullWidth rounded="dialog" type="submit">
          Save changes
        </Button>
      </DialogActions>
    </DialogContainer>
  </Dialog>
)

export const dialog = {
  args: {},
  render: Story,
}

const StoryWithoutActions: StoryFn<typeof Dialog> = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button emphasis="medium">Edit Profile</Button>
    </DialogTrigger>
    <DialogContainer onOpenAutoFocus={(event) => event.preventDefault()}>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <p>Some text here</p>
      </DialogContent>
    </DialogContainer>
  </Dialog>
)

export const dialogWithoutActions = {
  args: {},
  render: StoryWithoutActions,
}

const StoryWithError: StoryFn<typeof Dialog> = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button emphasis="medium">Edit Profile</Button>
    </DialogTrigger>
    <DialogContainer>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Make changes to your profile here. Click save when you’re done.</DialogDescription>
      </DialogHeader>
      <DialogContent>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input className="col-span-3" id="name" value="Pedro Duarte" />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input className="col-span-3" id="username" value="@peduarte" />
        </div>
        <DialogError error={{ message: 'error message', name: 'error name' }} />
      </DialogContent>
      <DialogActions>
        <Button className="border-r-0 border-b-0 border-l-0" fullWidth rounded="dialog" type="submit">
          Save changes
        </Button>
      </DialogActions>
    </DialogContainer>
  </Dialog>
)

export const dialogWithError = {
  args: {},
  render: StoryWithError,
}
