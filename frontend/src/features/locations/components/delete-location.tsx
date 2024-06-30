import { Button } from "@mui/material";
import { useDeleteLocation } from "../api/delete-location";

interface DeleteLocationProps {
  id: string;
}

export const DeleteLocation = ({ id }: DeleteLocationProps) => {
  const deleteLocation = useDeleteLocation();
  return (
    <Button 
      onClick={async () => await deleteLocation.mutateAsync(id)}
    >
      Delete
    </Button>
  )
};
