import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Tag } from "./Tags";
import type { TodoPreviewCardType } from "~/+types/TodoPreviewCardType";
import { DialogClose, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";

export function TodoPreviewCard({
  id,
  description,
  title,
}: TodoPreviewCardType) {
  return (
    <Dialog>
      <div className="flex flex-row p-2 ring-1 ring-slate-100 rounded-sm justify-between cursor-pointer">
        {/* cirlce and title +desc */}
        <div className="flex flex-row gap-3 w-2/3 justify-content-center items-center border-3 border-slate-400 rounded-sm p-2">
          {/* circle here */}
          <div className="flex-shrink-5">
            <div className="h-5 w-5 rounded-full border-3 border-red-500" />
          </div>
          {/* title and the desc */}
          <DialogTrigger className="cursor-pointer w-full overflow-hidden" asChild>
            <div className="w-full overflow-hidden gap-[0.5px] text-left ">
              <div className="max-w-2/3">
                {/* title */}
                <h2 className="text-xl font-bold truncate">{title}</h2>
              </div>
              {/* description */}
              <div className="max-w-2/3">
                <p className="text-sm bg-slate-100 truncate">{description}</p>
              </div>
            </div>
          </DialogTrigger >
          {/* tags */}
          <div className="flex flex-row  gap-1 max-w-[30%] flex-shrink-0 flex-end justify-end items-center ">
            <Tag tagText="Tag1" />
            <Tag tagText="Tag2" />
            <Tag tagText="Tag3" />
          </div>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Todo Item</DialogTitle>
            <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold ">{title}</h2>
            <p className="text-slate-600">{description}</p>
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            hello world
          </div>
          <DialogFooter>
            <DialogClose asChild>
            <Button type="button" variant="secondary" >
              Close
            </Button>
          </DialogClose>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
