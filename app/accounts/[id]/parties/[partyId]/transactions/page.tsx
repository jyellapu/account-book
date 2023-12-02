"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MoreHorizontal,
  Edit,
  XSquare,
  Trash2,
  PlusIcon,
  MinusCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [isDeleteUserAccountDialogOpen, setIsDeleteUserAccountDialogOpen] =
    useState(false);
  const [isYouGaveDialogOpen, setIsYouGaveDialogOpen] = useState(false);
  return (
    <main>
      {/* Edit account */}
      {/* Close account */}
      {/* Delete account */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <ArrowLeft size={24} />
          <h3 className="text-lg font-semibold">{"Nanna"}</h3>
        </div>
        <div>
          {/* Delete user's account dialog */}
          <AlertDialog
            open={isDeleteUserAccountDialogOpen}
            onOpenChange={setIsDeleteUserAccountDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* You gave dialog */}
          <Dialog
            open={isYouGaveDialogOpen}
            onOpenChange={setIsYouGaveDialogOpen}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                <MoreHorizontal size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Edit className="mr-2 w-4 h-4" />
                <span>Edit Users Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsYouGaveDialogOpen(true)}>
                <MinusCircle className="mr-2 w-4 h-4" />
                <span>You Gave</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <XSquare className="mr-2 w-4 h-4" />
                <span>Close Users Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="bg-destructive"
                onClick={() => setIsDeleteUserAccountDialogOpen(true)}
              >
                <Trash2 className="mr-2 w-4 h-4" />
                <span className="text">Delete Users Account</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            {" "}
            <PlusIcon className="mr-2 w-4 h-4" />
            You got
          </Button>
        </div>
      </div>
      {/* Transactions */}
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">You Gave</TableHead>
            <TableHead className="text-right">You Got</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="whitespace-nowrap">1 Dec 23</TableCell>
            <TableCell className="text-right whitespace-nowrap"></TableCell>
            <TableCell className="text-right whitespace-nowrap">5000</TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"}>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>
                    <Edit className="mr-2 w-4 h-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="bg-destructive">
                    <Trash2 className="mr-2 w-4 h-4" />
                    <span className="text">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap">30 Nov 23</TableCell>
            <TableCell className="text-right whitespace-nowrap">
              5500000
            </TableCell>
            <TableCell className="text-right whitespace-nowrap"></TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"}>
                    <MoreHorizontal className="m-auto" size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>
                    <Edit className="mr-2 w-4 h-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="bg-destructive">
                    <Trash2 className="mr-2 w-4 h-4" />
                    <span className="text">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
