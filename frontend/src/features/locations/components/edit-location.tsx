import { Location } from "@/types";
import { Button, Input } from "@mui/material";
import { Action } from "redux-actions";
import {
  cancelledEditing,
  confirmedEditing,
  startedEditing,
} from "../actions/actions";
import { useEditLocation } from "../api/edit-location";
import { useEffect, useMemo } from "react";

interface EditLocationProps {
  entry: Location;
  dispatch: React.Dispatch<Action<Location>>;
}

type EditCellProps = {
  value?: string | null;
  actionCreator: (value: string) => Action<string>;
  dispatch: React.Dispatch<Action<string>>;
};

type CancelEditProps = {
  dispatch: React.Dispatch<Action<void>>;
};

export const StartEditCell: React.FC<EditLocationProps> = ({
  entry: location,
  dispatch,
}) => {
  return (
    <Button
      onClick={() => {
        dispatch(startedEditing(location));
      }}
    >
      Edit
    </Button>
  );
};

export const EditCell: React.FC<EditCellProps> = ({
  value,
  actionCreator,
  dispatch,
}) => {


  //mount and unmount logging
  useEffect(() => {
    console.log("mounted")
    return () => {
      console.log("unmounted")
    }
  }, [])


  return (
    <Input
      value={value}
      onChange={(e) => dispatch(actionCreator(e.target.value))}
    />
  );
};

export const CancelEditCell: React.FC<CancelEditProps> = ({ dispatch }) => {
  return <Button onClick={() => dispatch(cancelledEditing())}>Cancel</Button>;
};

export const ConfirmEditCell: React.FC<EditLocationProps> = ({
  entry: location,
  dispatch,
}) => {
  const { mutateAsync: putLocation } = useEditLocation();

  return (
    <Button
      onClick={async () => {
        try {
          await putLocation(location);
          dispatch(confirmedEditing());
        } catch (error) {
          console.error(error);
        }
      }}
    >
      Confirm
    </Button>
  );
};
