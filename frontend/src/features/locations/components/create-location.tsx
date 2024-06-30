import { Box, Button, FormLabel, Input } from "@mui/material";
import { useAddLocation } from "../api/add-location";
import { Form, Formik, useFormik } from "formik";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";

export const CreateLocation = () => {
  const { mutateAsync: addLocation } = useAddLocation();
  const [open, setOpen] = useState(false);

  const initialValues = {
    name: "",
    url: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await addLocation(values);
      setOpen(false);
    },
  });

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          sx={{ marginBottom: "1rem" }}
        >
          Add Location
        </Button>
      </Box>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ height: "100%" }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "1rem",
              minWidth: "400px",
              flexGrow: 1,
              height: "100%",
            }}
          >
            <h2>Create Location</h2>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" name="name" placeholder="Name" onChange={formik.handleChange} />
            <FormLabel htmlFor="url">URL</FormLabel>
            <Input id="url" name="url" placeholder="URL" onChange={formik.handleChange}/>
          </Box>
          {/* Align box to bottom of form */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "auto",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{ marginRight: "1rem" }}
            >
              Confirm
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              sx={{ marginRight: "1rem" }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Drawer>
    </>
  );
};
