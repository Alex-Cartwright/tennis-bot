import { Table } from "@/components/Table/table";
import { Location } from "@/types";
import {
  CancelEditCell,
  ConfirmEditCell,
  EditCell,
  StartEditCell,
} from "../components/edit-location";
import { useLocationsTable } from "../hooks/use-locations-table";
import { useCallback, useMemo } from "react";
import { setEditLocationName, setEditLocationUrl } from "../actions/actions";
import { ContentLayout } from "@/components/Layout/content-layout";
import { CreateLocation } from "../components/create-location";
import { DeleteLocation } from "../components/delete-location";

export const Locations = () => {
  const { locations, state, dispatch } = useLocationsTable();

  const { editingId, editingName, editingUrl } = state;

  const isEditing = false; //until fixed

  return (
    <ContentLayout title="Locations">
      <CreateLocation />
      <Table<Location>
        data={locations}
        columns={[
          {
            title: "Name",
            field: "name",
          },
          {
            title: "URL",
            field: "url",
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
          // {
          //   title: "",
          //   field: "id",
          //   Cell: ({ entry: location }) =>
          //     isEditing ? (
          //       <CancelEditCell dispatch={dispatch} />
          //     ) : (
          //       <StartEditCell entry={location} dispatch={dispatch}/>
          //     ),
          // },
        ]}
      />
    </ContentLayout>
  );
};
