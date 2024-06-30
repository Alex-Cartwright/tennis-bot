import { Table } from "@/components/Table/Table";
import { ContentLayout } from "../../../components/Layout";
import { Location } from "@/types";
import { CreateLocation } from "../components/create-location";
import { DeleteLocation } from "../components/delete-location";
import { CancelEditCell, ConfirmEditCell, EditCell, StartEditCell } from "../components/edit-location";
import { useLocationsTable } from "../hooks/use-locations-table";
import { useCallback, useMemo } from "react";
import {
  setEditLocationName,
  setEditLocationUrl,
} from "../actions/actions";

export const Locations = () => {
  const { locations, state, dispatch } = useLocationsTable();

  const { editingId, editingName, editingUrl } = state;

  const isEditing = useMemo(() => editingId !== "", [editingId]);
  console.log("isEditing", isEditing)

  const nameEditCell = useCallback(
    () => <EditCell value={editingName} actionCreator={setEditLocationName} dispatch={dispatch} />,
    [editingName, dispatch]
  );

  const urlEditCell = useCallback(
    () => <EditCell value={editingUrl} actionCreator={setEditLocationUrl} dispatch={dispatch} />,
    [editingUrl, dispatch]
  );

  return (
    <ContentLayout title="Locations">
      <CreateLocation />
      <Table<Location>
        data={locations}
        columns={[
          {
            title: "Name",
            field: "name",
            Cell: ({ entry: location }) =>
              location.id === editingId ? (
                nameEditCell()
              ) : (
                <>{location.name}</>
              ),
          },
          {
            title: "URL",
            field: "url",
            Cell: ({ entry: location }) =>
              location.id === editingId ? (
                urlEditCell()
              ) : (
                <>{location.url}</>
              ),
          },
          {
            title: "",
            field: "id",
            Cell: isEditing
              ? () => (
                  <ConfirmEditCell
                    entry={{
                      name: editingName,
                      url: editingUrl,
                      id: editingId,
                    }}
                    dispatch={dispatch}
                  />
                )
              : ({ entry: location }) => <DeleteLocation id={location.id} />,
          },
          {
            title: "",
            field: "id",
            Cell: ({ entry: location }) =>
              isEditing ? (
                <CancelEditCell dispatch={dispatch} />
              ) : (
                <StartEditCell entry={location} dispatch={dispatch}/>
              ),
          },
        ]}
      />
    </ContentLayout>
  );
};
